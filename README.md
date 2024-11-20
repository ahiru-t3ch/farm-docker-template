# Project farm-docker-template
## Presentation
This project is a blank template with a Dockerise FARM tech stack (FastAPI, React, and MongoDB).  
It's goal is to help anyone who wants to start a an application with FARM stack on Docker without starting from scratch.
## Docker commands to launch project on your computer
Creates and starts containers, build images before starting container, in detach mode:
`docker compose up --build -d`
Stops and removes containers and netwokrs, also removes declared volumes:
`docker compose down -v`
Removes images (backend and frontend) created by docker compose:
`docker rmi backend-fastapi-image:latest frontend-react-image:latest`
This enables code synchronisation with running containers configured in copose file in develop/watch, to run after docker compose up:
`docker compose watch`