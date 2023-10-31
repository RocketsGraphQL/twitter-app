// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Client } from "twitter-api-sdk";
// import * as dotenv from "dotenv";

// dotenv.config();
const client = new Client(process.env.BEARER_TOKEN);
console.log(process.env.BEARER_TOKEN);

async function main() {
    const tweet = await client.tweets.findTweetById("20");
    console.log(tweet.data.text);
}
  
main();