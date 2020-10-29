-- V3_1__create_roles_table.sql
DROP TABLE IF EXISTS
rexa.roles,
CASCADE;

CREATE TABLE rexa.roles
(
    id uuid PRIMARY KEY,
    name VARCHAR NOT NULL
);
