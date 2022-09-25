const express = require('express');
const path = require('path');

const app = express();

const port: number = 3000;

app.use(express.static("public"));

app.get('/', (_req, _res) => {
    _res.sendFile( path.join(`${__dirname}\index.html`) );
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});