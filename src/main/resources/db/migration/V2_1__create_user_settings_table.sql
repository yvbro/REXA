-- V2_1__create_user_settings_table.sql
DROP TABLE IF EXISTS
rexa.user_settings,
CASCADE;

CREATE TABLE rexa.user_settings
(
  xnat_username VARCHAR NOT NULL,
  xnat_password VARCHAR NOT NULL,
  xnat_url VARCHAR NOT NULL,
  user_id uuid REFERENCES rexa.user (id),
  CONSTRAINT pk_id PRIMARY KEY (xnat_username,xnat_url)
);
