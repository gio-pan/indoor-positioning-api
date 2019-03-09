db.createUser({
    user: "exampleusername",
    pwd: "examplepassword",
    roles: [
        {
            role: "readWrite",
            db: "indoor-positioning",
        },
    ],
});
