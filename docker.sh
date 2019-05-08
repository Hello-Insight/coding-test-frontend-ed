#!/bin/bash
# exec docker for the frontend

sudo docker build -t edgar/xkcd-webapp .

sudo docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 edgar/xkcd-webapp:latest
