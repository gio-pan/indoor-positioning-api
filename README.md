# indoor-positioning-api
Backend API for Indoor Positioning Project

## Directory Structure

```
indoor-positioning-api
├── .dockerignore       // files ignored by docker
├── .gitignore          // files ignored by git
├── README.md
├── package.json
├── package-lock.json
├── postman
│   └── Indoor Postioning API...json  // import into Postman to test endpoints
├── docker
│   ├── docker-compose.yml  // defines NodeJS and MongoDB containers to be run
│   ├── Dockerfile      // defines NodeJS image to be built for the backend
│   └── mongo-init.js   // initializes MongoDB in a fresh container (first time)
└── src                 
    ├── controllers     // handlers for endpoints (routes use these controllers)
    │   └── ...
    ├── models          // models for documents stored in DB defined here
    │   └── ...
    ├── routes          // endpoints for API defined here
    │   └── ...
    ├── config.js
    └── index.js        // server entry point
```

## Development Setup

### Using Docker

#### Prerequisites

1. Install __Docker__ (for Windows, install __Docker Toolbox__)

2. Install __Docker Compose__ if not included in __Docker__ install (step 1)

3. Clone this Repo

<!-- #### 3. Environment Variables -->
#### Running

Navigate into the `indoor-positioning-api/docker` folder

For the first run:
```
$ docker-compose up
```

Or to run in the background:
```
$ docker-compose up -d
```

_Note: If the server fails to connect to Mongo on first build, try stopping then starting the containers again._

For subsequent runs:
```
$ docker-compose start
```

To stop containers:
```
$ docker-compose stop
```

To stop & remove containers:
```
$ docker-compose down
```

For more information:
```
$ docker-compose help
```

_Note: `Dockerfile` defines that the server is started inside the container using the `npm run start:dev` command, which uses `nodemon` to automatically restart the server on changes. By mounting the project files (using `volumes` in `docker-compose.yml` the server inside the container reflects the changes and restarts on file saves._

### Using NodeJS & MongoDB

#### Prerequisites

1. Install __NodeJS__

2. Install __MongoDB__

3. Clone this Repo

4. Set up MongoDB - create database and user. The script in `docker/mongo-init.js` is copied here. You can specify your own user, pwd, and db.

```
> use indoor-positioning
> db.createUser({
    user: "<your-user>",
    pwd: "<your-pwd>",
    roles: [
        {
            role: "readWrite",
            db: "<your-db>",
        },
    ],
});

```

5. Change content of `src/config.js` to:

```javascript
mongo_url: 'mongodb://localhost:27017/<your-db>',
mongo_user: '<your-user>',
mongo_password: '<your-pwd>',
```

where the db, user, and pwd matches those in step 4. 

_Note: You must change the `indoor-positioning-mongo` to `localhost`._

<!-- #### 3. Environment Variables -->
#### Running

Navigate into the `indoor-positioning-api` folder

First, install dependencies:
```
$ npm install
```

To start server:
```
$ npm start
```

Or to start server for development and auto restart on change:
```
$ npm run start:dev
```


### Other Considerations

#### Linting

This project is using ESLint with the Airbnb Style Guide. Use the following command to lint your code. (You will need to have __Node JS__ installed.):
```
$ npm install
$ npm run lint
```
