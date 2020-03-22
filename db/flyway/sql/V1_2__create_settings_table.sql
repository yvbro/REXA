-- V1_2__create_settings_table.sql
DROP TABLE IF EXISTS
rexa.seller,
CASCADE;

CREATE TABLE rexa.settings
(
    id BIGSERIAL PRIMARY KEY,
    xnat_username VARCHAR NOT NULL,
    xnat_password VARCHAR NOT NULL,
    xnat_url VARCHAR NOT NULL
);


