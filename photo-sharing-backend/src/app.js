const express = require("express");
const app = express();
const cors = require("cors");
const models = require('./modelData/models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Photo Sharing Backend");
});

app.get("/user/list", (req, res) => {
    const users = models.userListModel();
    if (users && users.length > 0) {
        res.json(users);
    } else {
        res.status(404).send("No users found");
    }
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = models.userModel(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/photosOfUser/:id', (req, res) => {
    const userId = req.params.id;
    const photos = models.photoOfUserModel(userId);
    if (photos && photos.length > 0) {
        res.json(photos);
    } else {
        res.status(404).send('Photos not found');
    }
});

app.get('/test/info', (req, res) => {
    const schema = models.schemaInfo();
    res.json(schema);
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
