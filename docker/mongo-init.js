db.createUser({
    user: "example",
    pwd: "password",
    roles: [
        {
            role: "readWrite",
            db: "indoor-positioning",
        },
    ],
});
