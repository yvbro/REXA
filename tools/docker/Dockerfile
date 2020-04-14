FROM openjdk:11-jdk

# Define environment variables.
ENV REXA_HOME /rexa
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

# COPY atifact
ADD  maven/@project.build.finalName@.jar $REXA_HOME/rexa.jar

# Setting default work directory. Easier to find work files and folders when going inside the container
WORKDIR /rexa


# Bin start command / pensez a mettre la commande java pour gerer les fuites de mémoire de docker (datalake)
ENTRYPOINT exec java -jar /rexa/rexa.jar

