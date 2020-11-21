-- V1_1__create_user_table.sql
DROP TABLE IF EXISTS
rexa.user,
CASCADE;

CREATE TABLE rexa.user
(
    id uuid PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    auth_provider VARCHAR NOT NULL,
    enabled boolean NOT NULL
);
