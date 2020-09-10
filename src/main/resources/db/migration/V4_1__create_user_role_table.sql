-- V2_1__create_user_role_table.sql
DROP TABLE IF EXISTS
rexa.user_role,
CASCADE;

CREATE TABLE rexa.user_role
(
    user_id uuid NOT NULL REFERENCES rexa.user (id),
    role_id uuid NOT NULL REFERENCES rexa.roles (id)
);
