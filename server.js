const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

const port = process.env.PORT || 5000; 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


app.listen(port, () => console.log(`Server up and running on port ${port} !`));