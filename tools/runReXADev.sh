#!/usr/bin/env bash
# Script to start the dockers for ReXA development

set -e

function printUsage() {
    echo "Usage:"
    echo "$(basename "$0") - to run"
    echo "$(basename "$0") stop"
}

function startXnatDocker {
    cd ~/workspace/projects/yvbro/git/xnat-docker-compose
    docker-compose up -d --build
}

function stopXnatDocker {
    cd ~/workspace/projects/yvbro/git/xnat-docker-compose
    docker-compose stop
}

function startReXAPostgres {
    cd ~/workspace/projects/yvbro/git/REXA/tools/
    docker-compose up -d --build
}

function stopReXAPostgres {
    cd ~/workspace/projects/yvbro/git/REXA/tools/
    docker-compose stop
}

while [ "$1" != "" ]; do
    KEY=`echo $1 | awk -F= '{print $1}'`
    VALUE=`echo $1 | awk -F= '{print $2}'`
    case $KEY in
    -h | --help)
        printUsage
        exit
        ;;
    stop)
        action="stop"
        ;;
    *)
        echo "ERROR: unknown parameter \"$KEY\""
        printUsage
        exit 1
        ;;
    esac
    shift
done

if [[ "$action" == "stop" ]]
then
	#stopPostgres
    stopXnatDocker
    stopReXAPostgres
else
    startXnatDocker
    startReXAPostgres
fi



