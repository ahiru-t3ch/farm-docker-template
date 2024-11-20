# Project farm-docker-template
## Presentation
This project is a blank template with a Dockerise FARM tech stack (FastAPI, React, and MongoDB).<br>
It's goal is to help anyone who wants to start a an application with FARM stack on Docker without starting from scratch.<br>
## Docker commands to launch project on your computer
Creates and starts containers, build images before starting container, in detach mode:<br>
`docker compose up --build -d`<br>
Stops and removes containers and netwokrs, also removes declared volumes:<br>
`docker compose down -v`<br>
Removes images (backend and frontend) created by docker compose:<br>
`docker rmi backend-fastapi-image:latest frontend-react-image:latest`<br>
This enables code synchronisation with running containers configured in copose file in develop/watch, to run after docker compose up:<br>
`docker compose watch`<br>