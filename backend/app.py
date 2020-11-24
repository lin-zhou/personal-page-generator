from flask import Flask, g, render_template, request, jsonify
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import sys
import requests
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from flask_cors import CORS
import json
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_EXPIRATION_DELTA'] = timedelta(seconds=262980)
#app.config['CORS_SEND_WILDCARD'] = True
# CORS(app)

app.secret_key = 'ResumeUploaderSecret'

DATABASE = 'database.db'


@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    return response


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def commit_db(query, args=()):
    db = get_db()
    cur = db.cursor()
    cur.execute(query, args)
    db.commit()


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


class User(object):
    id = None
    username = None

    def __init__(self, id, username):
        self.id = id
        self.username = username

    def __str__(self):
        return "User(id='%s')" % self.id


def authenticate(username, password):
    with app.app_context():
        user = query_db('select * from Users where username = ?',
                        (username,), one=True)
        if user and check_password_hash(user[2], password):
            return User(user[0], user[1])


def identity(payload):
    with app.app_context():
        user = query_db('select * from Users where id = ?',
                        (payload['identity'],), one=True)
        if user:
            return User(user[0], user[1])
    return None


jwt = JWT(app, authenticate, identity)


@app.route('/upload', methods=['POST'])
@jwt_required()
def upload():
    print(current_identity, file=sys.stderr)
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file included."})

    res = requests.post('https://jobs.lever.co/parseResume',
                        files={"resume": request.files['resume']})

    with app.app_context():
        commit_db("update Users set parsedresume = ? where id = ?",
                  (res.text, current_identity.id))

    return res.text


@app.route('/users')
def get_users():
    with app.app_context():
        users = query_db('select * from Users')
        return render_template('users.html', users=users)


@app.route('/resume/<int:userid>')
def get_resume(userid):
    with app.app_context():
        user = query_db('select * from Users where id = ?',
                        (userid,), one=True)
        return jsonify(json.loads(user['parsedresume']))


@app.route('/random')
def random():
    with app.app_context():
        user = query_db(
            'select id, parsedresume FROM Users where parsedresume is not NULL order by RANDOM() limit 1;', one=True)
        # return jsonify({"id": user['id'], "parsedresume": json.loads(user['parsedresume'])})
        return jsonify({"id": user['id']})


@app.route('/autocomplete/<i>')
def autocomplete(i):
    with app.app_context():
        users = query_db(
            "select id, firstname, lastname from Users where firstname like ? or lastname like ?", (i+'%', i+'%'))
        users_list = []
        for user in users:
            users_list.append(
                {"id": user['id'], "firstname": user['firstname'], "lastname": user['lastname']})
        return jsonify({"users": users_list})


@app.route('/profile', methods=['DELETE', 'GET', 'POST'])
@jwt_required()
def profile():
    userid = current_identity.id

    if request.method == 'DELETE':
        with app.app_context():
            commit_db('delete from Users where id = ?',
                      (current_identity.id,))
            return jsonify({"message": "User deleted."})
    elif request.method == 'GET':
        with app.app_context():
            user = query_db('select * from Users where id = ?',
                            (userid,), one=True)
            return jsonify({"id": userid, "username": user['username'], "firstname": user['firstname'], "lastname": user['lastname'], "email": user['email'], "parsedresume": user['parsedresume']})
    elif request.method == "POST":
        with app.app_context():
            username = request.json['username']
            password = request.json['password']
            email = request.json['email']
            firstname = request.json['firstname']
            lastname = request.json['lastname']
            if len(password.strip()) > 0:
                commit_db('update Users set username = ?, password = ?, email = ?, firstname = ?, lastname = ? where id = ?',
                          (username, generate_password_hash(password, "sha256"), email, firstname, lastname, userid))
            else:
                commit_db('update Users set username = ?, email = ?, firstname = ?, lastname = ? where id = ?',
                          (username, email, firstname, lastname, userid))
            return jsonify({"message": "User updated."})

    return jsonify({"error": "User not found"})


@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    if (username is None or password is None or email is None or firstname is None or lastname is None
            or len(username.strip()) == 0 or len(password.strip()) == 0 or len(email.strip()) == 0 or len(firstname.strip()) == 0 or len(lastname.strip()) == 0):
        return jsonify({"error": "Did not include all required information"})

    with app.app_context():
        commit_db('insert into Users ( username, password, email, firstname, lastname) values( ?, ?, ?, ?, ?)',
                  (username, generate_password_hash(password, "sha256"), email, firstname, lastname))
        return jsonify({"message": "User created."})

    return jsonify({"error": "Internal server error."})


@app.route('/init_db')
def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()
    return "database created"


@app.route('/')
def hello_world():
    return 'Hello, World!'


app.run(host="0.0.0.0", debug=True, port=1080)
