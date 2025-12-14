const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, "public")));


// this api is used for new user registration
// data is stored in json file for simplicity

function readData(file) {
    return JSON.parse(fs.readFileSync(file));
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}



app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    const userList = readData("users.json");

    const userExists = userList.find(u => u.email === email);
    if (userExists) {
        return res.json({ message: "User already exists" });
    }

    userList.push({ email, password });
    writeData("users.json", userList);

    res.json({ message: "Signup successful" });
});

// this api returns all posts created by users
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const userList = readData("users.json");

    const user = userList.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.json({ message: "Invalid credentials", success: false });
    }

    res.json({ message: "Login successful", success: true });
});

app.post("/posts", (req, res) => {
    const { text } = req.body;
    const posts = readData("posts.json");

    posts.push({ text });
    writeData("posts.json", posts);

    res.json({ message: "Post created" });
});

app.get("/posts", (req, res) => {
    const posts = readData("posts.json");
    res.json(posts);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
