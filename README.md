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

### Prerequisites

#### 1. Install Docker

#### 2. Clone this Repo

<!-- #### 3. Environment Variables -->

### Running

Navigate into the `indoor-positioning-api/docker` folder

For the first run:
```
$ docker-compose up
```

To run in the background:
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

To stop/remove containers:
```
$ docker-compose down
```

For more information:
```
$ docker-compose help
```

_Note: `Dockerfile` defines that the server is started inside the container using the `npm run start:dev` command, which uses `nodemon` to automatically restart the server on changes. By mounting the project files (using `volumes` in `docker-compose.yml` the server inside the container reflects the changes and restarts on file saves._

### Other Considerations

#### Linting

This project is using ESLint with the Airbnb Style Guide. Use the following command to lint your code. (You will need to have __Node JS__ installed.):
```
$ npm install
$ npm run lint
```
