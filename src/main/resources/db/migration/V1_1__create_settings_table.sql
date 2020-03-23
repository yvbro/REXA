-- V1_1__create_settings_table.sql
DROP TABLE IF EXISTS
rexa.settings,
CASCADE;

CREATE TABLE rexa.settings
(
    id UUID PRIMARY KEY,
    xnat_username VARCHAR NOT NULL,
    xnat_password VARCHAR NOT NULL,
    xnat_url VARCHAR NOT NULL
);


