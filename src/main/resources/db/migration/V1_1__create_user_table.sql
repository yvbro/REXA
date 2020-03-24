-- V1_1__create_user_table.sql
DROP TABLE IF EXISTS
rexa.user,
CASCADE;

CREATE TABLE rexa.user
(
    email VARCHAR PRIMARY KEY,
    password VARCHAR NOT NULL
);


