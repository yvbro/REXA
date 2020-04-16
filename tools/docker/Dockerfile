FROM openjdk:11-jdk

# Define environment variables.
ENV REXA_HOME /rexa

# COPY atifact
ADD  maven/@project.build.finalName@.jar $REXA_HOME/rexa.jar

WORKDIR /rexa

ENTRYPOINT exec java -jar /rexa/rexa.jar

