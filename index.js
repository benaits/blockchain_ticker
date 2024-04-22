// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";

/* const express = require('express');
const axios = require('axios'); */

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

async function getBTCUSDTicker(apiKey) {
    const url = "https://api.blockchain.com/v3/exchange/tickers/BTC-USD";
    const headers = {
        "X-API-Token": apiKey
    };

    try {
        const response = await axios.get(url, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Failed to retrieve ticker. Status code: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'YOUR_API_KEY';

app.get('/', async (req, res) => {
    try {
        const ticker = await getBTCUSDTicker(apiKey);
        res.render('index', { ticker });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// // Set up data object for the request
// const data = {
//   method: 'get/tickers/BTC-USD', // Set request method
//   params: ['45d4e6b6-8a86-4858-923b-4954932a294a'], // Insert the EVM address
//   id: 1,
//   jsonrpc: "2.0"
// }

// // Set up headers object for the request
// const headers = {
//   'Authorization': `Bearer YOUR_API_KEY`, // Insert API key in Authorization header
// }

// // Send POST request using axios to base request url ( you can get the base request url from your Alchemy dashboard )
// axios.post('https://api.blockchain.com/v3/exchange/tickers/BTC-USD', data, { headers: headers })
//   .then(response => console.log(response.data.result)) // Log response data
//   .catch(error => console.error(error)); // Log any errors




// app.get("/", async (req, res) => {
//   try {
//     const result = await axios.get("https://api.blockchain.com/v3/exchange/tickers/BTC-USD");
//     res.render("index.ejs", {
//       secret: result.data.secret,
//       user: result.data.username,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     res.status(500);
//   }
// });

