const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// JSON database file
const usersFile = path.join(__dirname, "users.json");

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Register user
app.post("/register", (req, res) => {

    const newUser = req.body;

    fs.readFile(usersFile, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to read database"
            });
        }

        let users = JSON.parse(data);

        // Check duplicate username
        const existingUser = users.find(
            user => user.username === newUser.username
        );

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        // Add new voter
        users.push(newUser);

        fs.writeFile(
            usersFile,
            JSON.stringify(users, null, 2),
            err => {

                if (err) {
                    return res.status(500).json({
                        message: "Unable to save voter"
                    });
                }

                res.json({
                    message: "Voter registration successful"
                });
            }
        );
    });
});

// Login user
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    fs.readFile(usersFile, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to read database"
            });
        }

        const users = JSON.parse(data);

        const user = users.find(
            user =>
                user.username === username &&
                user.password === password
        );

        if (user) {

            res.json({
                success: true,
                message: "Login successful",
                user: user
            });

        } else {

            res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});