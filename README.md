# Project farm-docker-template

## Presentation
This project is a blank template with a Dockerise FARM tech stack (FastAPI, React, and MongoDB).<br>
With Mongo express is used to interact with Mongo DB.<br>
It's goal is to help anyone who wants to start a an application with FARM stack on Docker without starting from scratch.<br>
There are 4 containers configured into the `docker-compose.yaml` file:<br>
* backend-fastapi
* backend-mongo-express
* backend-mongodb
* frontend-vite-react

## Setup environements files for each container
In `docker-compose.yaml` file you'll find in each service the attribute `env_file`.<br>
<br>
It contains the path for each environement file of each container, those files do set up the environments variables used by this application.<br>

> [!CAUTION]
> Avoid commiting those files

> [!NOTE]
> In this readme the *.env files content is shared for the example.

For the 3 backend containers create 3 files in `backend/` directory and set them as follow:<br>
`fastapi.env`:<br>
```
MONGO_URI=mongodb://admin:password@backend-mongodb:27017
DATABASE_NAME=farmapp_db
COLLECTION_NAME=dummy_collection
```

`mongoexpress.env`:<br>
```
ME_CONFIG_MONGODB_ADMINUSERNAME=admin
ME_CONFIG_MONGODB_ADMINPASSWORD=password
ME_CONFIG_MONGODB_SERVER=backend-mongodb

# If set to true uncomment bellow 2 lines
ME_CONFIG_BASICAUTH=false
#ME_CONFIG_BASICAUTH_USERNAME=user
#ME_CONFIG_BASICAUTH_PASSWORD=password
```
`mongodb.env`:<br>
```
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=farmapp_db
```

For the frontkend container create 1 files in `frontend/` directory and set it as follow:<br>
`vitereact.env`:<br>
```
# Nota Bene: env variables should start with VITE_ to work
VITE_FASTAPI_BASE_URL=http://localhost:8000
```

> [!TIP]
> If you change the ports make sure they are the same into `docker-compose.yaml` and `vite.config.js`.

## Docker commands to launch project on your computer
Creates and starts containers, build images before starting container, in detach mode:<br>
`docker compose up --build -d`<br>
Stops and removes containers and netwokrs, also removes declared volumes:<br>
`docker compose down -v`<br>
Removes images (backend and frontend) created by docker compose:<br>
`docker rmi backend-fastapi-image:latest frontend-react-image:latest`<br>
This enables code synchronisation with running containers configured in copose file in develop/watch, to run after docker compose up:<br>
`docker compose watch`<br>