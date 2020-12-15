# COMP 426: Personal Page Generator

This repository contains the code for Lindsay Zhou and Shara He's COMP 426 final project, created during Fall 2020.

The personal website generator is designed to create a website page based on your resume content in a few simple steps! A user can create an account and upload a resume in PDF form. Lever API parser will transform the content into a one-page personal website.

The personal website generator is coded using ReactJS, Flask, Lever API, etc. A SQLite database to store user information and resume files which can be updated or deleted as needed.

# Installation Backend
Install [Python](https://www.python.org/downloads/).

Follow this link https://docs.python.org/3/library/venv.html in backend folder to create a virtual environment and source the virtual environment.

`cd backend`
`pip install -r requirements.txt`
`python app.py`

Visit `localhost:1080/init_db` in browser to initialize the database.

# Installation Frontend
Install [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm).

`npm install`
`npm run start`
