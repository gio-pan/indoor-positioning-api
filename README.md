# indoor-positioning-api
Backend API for Indoor Positioning Project

## Documentation

API documentation is available on [Swagger](https://app.swaggerhub.com/apis/jlvmoster/IndoorLocationAPI/1.0.0)

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
    └── index.js        // server entry point
```

## Development Setup

### Before you begin

1. Clone this repo

2. Create a `.env` file (name it `.env` and it should not be committed to Git). A sample is given in `example.env`. Any user, password, and db can be used, but do not change the variable names. If Docker or Mongo has previously been set up, use the correct user, password, and db to enable the server to connect to Mongo.

### Using Docker

#### Prerequisites

1. Install __Docker__ (for Windows, install __Docker Toolbox__)

2. Install __Docker Compose__ if not included in __Docker__ install (step 1)

3. Update the user, password, and db in `docker/mongo-init.js` to match those in the `.env` file.

<!-- #### 3. Environment Variables -->
#### Running

Navigate into the `indoor-positioning-api` folder

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

3. Make sure the `MONGO_URL` environment variable is set to `mongodb://localhost:27017/`.

_Note: You must change the `indoor-positioning-mongo` to `localhost`._

4. Set up MongoDB - create database and user. The script in `docker/mongo-init.js` is copied here. Make sure to have the user, password, and db match the variables in the `.env` file. Run the following commands in the Mongo Shell.

```
> use indoor-positioning
> db.createUser({
    user: "<your-user>",
    pwd: "<your-pwd>",
    roles: [
        {
            role: "readWrite",
            db: "<your-db",
        },
    ],
});

```

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
