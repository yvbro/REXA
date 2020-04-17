# REXA
Reporting Xnat App to generate report over its content especially related to DAX metadata.


# Database migration

To manage our schema we are using Flyway. You can find more about it here (un lien ici).

To run the migration, you can run the following command : 
`mvn clean compule flyway: migrate`

# Docker image:

To generate a docker image of our application, run:
`mvn clean package docker:build`

