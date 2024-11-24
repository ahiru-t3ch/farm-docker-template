# Project farm-docker-template

## Presentation
This project is a blank template with a Dockerise FARM tech stack (FastAPI, React and MongoDB).<br>
With Mongo express, it's used to interact with Mongo DB.<br>
Project's goal is to help anyone who wants to "start or shift fast" a web application with Dokerise FARM tech stack on without starting from scratch.<br>
But you may also use it just for fun.<br>

## I Quick start on your local machine
Run the project with the essential explanations and configurations needed.

### I.1 Install Docker (requirement)
Go to [Docker Website](https://www.docker.com/).<br>
I personnaly use Docker Desktop because it includes:<br>
* Docker Compose
* Docker Engine
* Docker Cli

### I.2 Get code
Clone project:<br>
`git clone https://github.com/ahiru-t3ch/farm-docker-template.git`<br>
Or simply download code from github and unzip it.<br>

### I.3 Setup environements files for each container
There are 4 containers configured into the `docker-compose.yaml` file (see service attribute):<br>
* backend-fastapi
* backend-mongo-express
* backend-mongodb
* frontend-vite-react
In `docker-compose.yaml` file you'll find in each service the attribute `env_file`.<br>
It contains the path for each environement file of each container, those files do set up the environments variables used by this application.<br>
**One <file_name>.env file has to be created foreach container.**<br>

> [!CAUTION]
> Avoid commiting those files

> [!NOTE]
> In this readme the *.env files content is shared to give an example.

#### I.3.a Container frontend-vitereact
Create one file `vitereact.env` in directory `frontend-vitereact/` and set it as follow:<br>
```
# Nota Bene: env variables should start with VITE_ to work
VITE_FASTAPI_BASE_URL=http://localhost:8000
```
#### I.3.b Container backend-fastapi
Create one file `fastapi.env` in directory `backend-fastapi/` and set it as follow:<br>
```
MONGO_URI=mongodb://admin:password@backend-mongodb:27017
DATABASE_NAME=farmapp_db
COLLECTION_NAME=dummy_collection
```

#### I.3.c Containers backend-mongodb and backend-mongo-express
Create 2 files `mongoexpress.env` and `mongodb.env` in directory `backend-mongo/` and set them as follow:<br>

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

### I.4 Setup SSL/TLS certs for frontend-vitereact and backend-fastapi
Run commands to install mkcert and generate keys:<br>
```
sudo apt install mkcert
sudo apt install libnss3-tools
mkcert -install
```

This'll generate 2 files:<br>
* localhost.pem
* localhost-key.pem

Copy those 2 files into: <br>
* frontend-vitereact/certs/
* backend-fastapi/certs/

### I.5 Launch application on your local Docker
In project root (where the docker-compose.yaml is) run commant:<br>
`docker compose up --build -d`<br>
Then access:<br>
Webapp on link: [https://localhost:5173/](http://localhost:5173/)
FastAPI on link: [https://localhost:8000/docs/](https://localhost:8000/docs/)
Mongo DB on link: [http://localhost:27017/](http://localhost:27017/)
Monexpress on link: [http://localhost:8081/](http://localhost:8081/)

# II Annexes
## Ports
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