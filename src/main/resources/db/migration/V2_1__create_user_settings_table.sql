-- V2_1__create_user_settings_table.sql
DROP TABLE IF EXISTS
    rexa.user_settings,
    CASCADE;

CREATE TABLE rexa.user_settings
(
    user_id       uuid PRIMARY KEY REFERENCES rexa.user (id),
    xnat_username VARCHAR NOT NULL,
    xnat_password VARCHAR NOT NULL,
    xnat_url      VARCHAR NOT NULL
);
