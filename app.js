// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const addOAuthInterceptor = require("axios-oauth-1.0a");

const app = express();
const port = 3000

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use(express.json());



app.post("/tweet", function (req, res) {
    // Create a client whose requests will be signed
    const client = axios.create();
    // Specify the OAuth options
    const payload = req.body.payload;
    const options = {
        algorithm: 'HMAC-SHA1',
        // key: 'yQfuGgSP12lEz6FlFxJWC7hYF',
        key: `${payload.key}`,
        // secret: 'DZoWs6kTrJZ37h4cWKZXnTT4WPk0Ry718hRhcUZHTBhsLqG7lE',
        secret: `${payload.secret}`,
        // token: '1054546747-79Bb6CQEwrQFt05eKpHwpubLKDCWvqFaLSfGn3A',
        token: `${payload.token}`,
        // tokenSecret: 'jrLrp9Vd8jJdthxPlThXVTXzdaqjpbeDqeev9KAkt931X',
        tokenSecret: `${payload.tokenSecret}`,
    };

    const data = {
        "text": `${payload.tweet}`
    };

    console.log("addOAuthInterceptor is not a function: ", addOAuthInterceptor)
    // Add interceptor that signs requests
    addOAuthInterceptor.default(client, options);

    console.log("params: ", req.body);
    client.post("https://api.twitter.com/2/tweets", 
    data)
    .then(response => {
        console.log("resp: ", response, req.body.key);
        res.status(200).send(`<h2> the result is : Tweeted </h2>` );
    })
    .catch(err => {
        console.log(err);

        res.status(500).send(`<h2> the result is : Error </h2>` );
    });
});

app.post("/schedule-tweet", function (req, res) {
    const body = JSON.parse(req.body);
    console.log("body", body)
    const jsonb = {
        "type": "create_scheduled_event",
        "args": {
            "webhook": "https://guhys2s4uv24wbh6zoxl3by4xa0imsdb.lambda-url.us-east-2.on.aws/tweet",
            "schedule_at": `${body.schedule_at}`,
            "include_in_metadata": true,
            "payload": {
                "tweet": `${body.tweet}`,
                "algorithm": 'HMAC-SHA1',
                // key: 'yQfuGgSP12lEz6FlFxJWC7hYF',
                "key": `${body.key}`,
                // secret: 'DZoWs6kTrJZ37h4cWKZXnTT4WPk0Ry718hRhcUZHTBhsLqG7lE',
                "secret": `${body.secret}`,
                // token: '1054546747-79Bb6CQEwrQFt05eKpHwpubLKDCWvqFaLSfGn3A',
                "token": `${body.token}`,
                // tokenSecret: 'jrLrp9Vd8jJdthxPlThXVTXzdaqjpbeDqeev9KAkt931X',
                "tokenSecret": `${body.tokenSecret}`,
            },
            "comment": "sample scheduled event comment"
        }
    }
    // const stringified = JSON.stringify(jsonb)
    console.log(req.body);
    // axios.post("https://hasura-vlklxvo.rocketgraph.app/v1/metadata", stringified, {
    //     // "headers" : {
    //     //     "Content-Type": "application/json",
    //     //     "X-Hasura-Role":"admin",
    //     //     "X-hasura-admin-secret":"a117bb97"
    //     // },
    // } , function (error, response, body){
    //     console.log(response, error);
    //     console.log("Error from Hasura: ", error)
    // });

    axios.post("https://hasura-vlklxvo.rocketgraph.app/v1/metadata", jsonb, {
        "headers" : {
            "Content-Type": "application/json",
            "X-Hasura-Role":"admin",
            "X-hasura-admin-secret":"a117bb97"
        },   
    }).then(function (response) {
        console.log("response: ", response);
        res.status(200).send({
            message: "Your result is tweeted"
        })
    }).catch(function (error) {
        console.log("Error from Hasura: ", error);
        res.status(500).send(error)
    });
})

app.listen(port, () => console.log(`calculator listening on port ${port}!`))

module.exports = app;