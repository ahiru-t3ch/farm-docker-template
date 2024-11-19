# Project farm-docker-template
## Presentation
This project is a blank template with a Dockerise FARM tech stack (FastAPI, React, and MongoDB).
It's goal is to help anyone who wants to start a an application with FARM stack on Docker without starting from scratch.
## Docker commands to launch project on your computer
```
docker compose up --build -d
docker compose down -v
docker rmi backend-fastapi-image:latest
```