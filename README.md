![Java CI with Maven](https://github.com/yvbro/ReXA/workflows/Java%20CI%20with%20Maven/badge.svg)

![](./frontend/src/assets/rexa_logo.png | width=200px)
# REXA
Reporting Xnat App to generate report over its content especially related to DAX metadata.


# Database migration

To manage our schema we are using Flyway. You can find more about it here (un lien ici).

To clean the database :
`mvn clean compile flyway:clean`

To run the migration, you can run the following command : 
`mvn clean compile flyway:migrate`

# Docker image:

To generate a docker image of our application, run:
`mvn clean package docker:build`

