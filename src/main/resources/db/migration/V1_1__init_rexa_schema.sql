-- V1_1__init_rexa_schema.sql

CREATE TABLE rexa.user
(
    id uuid PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    auth_provider VARCHAR NOT NULL,
    enabled boolean NOT NULL
);

CREATE TABLE rexa.roles
(
    id uuid PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE rexa.user_role
(
    user_id uuid NOT NULL REFERENCES rexa.user (id),
    role_id uuid NOT NULL REFERENCES rexa.roles (id)
);

CREATE TABLE rexa.user_settings
(
    user_id       uuid PRIMARY KEY REFERENCES rexa.user (id),
    xnat_username VARCHAR NOT NULL,
    xnat_password VARCHAR NOT NULL,
    xnat_url      VARCHAR NOT NULL
);