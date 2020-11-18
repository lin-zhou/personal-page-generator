CREATE TABLE Users (
    id integer primary key,
    username text unique,
    password text,
    email text,
    firstname text,
    lastname text,
    parsedresume json,
    resumefile binary
);