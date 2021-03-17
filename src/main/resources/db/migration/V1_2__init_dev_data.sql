-- V1_2__init_dev_data.sql
-- mdp : admin
INSERT INTO rexa.user VALUES ('910669d4-18e6-447e-8baa-269c104a6925', 'admin@rexa.fr', '$2a$04$4ofNfivMSB7aZDfNK0GO7uRTqIY.iKHsxqip79jFSEXwTF9Kjs9Be', 'local', 'true');
INSERT INTO rexa.user VALUES ('a8e966b4-f39f-11ea-adc1-0242ac120002', 'user@rexa.fr', '$2a$04$m2di/qa0bTYOgpnAzPspae.AYY2OlMs3RwPBxUTVsHBKG2RtPh8.q', 'local', 'true');

INSERT INTO rexa.user_settings VALUES ('910669d4-18e6-447e-8baa-269c104a6925', 'admin', 'n68trSbeXcwEoJn6ALSexw==', 'http://localhost');

INSERT INTO rexa.roles VALUES ('42becc1c-f39f-11ea-adc1-0242ac120002', 'ADMIN');
INSERT INTO rexa.roles VALUES ('6e91b1c4-f39f-11ea-adc1-0242ac120002', 'USER');

INSERT INTO rexa.user_role VALUES ('910669d4-18e6-447e-8baa-269c104a6925', '42becc1c-f39f-11ea-adc1-0242ac120002');
INSERT INTO rexa.user_role VALUES ('a8e966b4-f39f-11ea-adc1-0242ac120002', '6e91b1c4-f39f-11ea-adc1-0242ac120002');
