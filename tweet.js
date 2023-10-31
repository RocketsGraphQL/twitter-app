import axios from "axios"
import addOAuthInterceptor from "axios-oauth-1.0a"


// Create a client whose requests will be signed
const client = axios.create();
// Specify the OAuth options
const options = {
    algorithm: 'HMAC-SHA1',
    key: 'yQfuGgSP12lEz6FlFxJWC7hYF',
    secret: 'DZoWs6kTrJZ37h4cWKZXnTT4WPk0Ry718hRhcUZHTBhsLqG7lE',
    token: '1054546747-79Bb6CQEwrQFt05eKpHwpubLKDCWvqFaLSfGn3A',
    tokenSecret: 'jrLrp9Vd8jJdthxPlThXVTXzdaqjpbeDqeev9KAkt931X',
};

const data = {
    "text": "Hello status sir!"
};

console.log("addOAuthInterceptor is not a function: ", addOAuthInterceptor)
// Add interceptor that signs requests
addOAuthInterceptor.default(client, options);

client.post("https://api.twitter.com/2/tweets", 
data)
.then(response => {
    console.log("resp: ", response);
})
.catch(err => {
    console.log(err);
});