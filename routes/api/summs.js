const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// @route   GET api/summoners/
// @desc    summoner route
// @access  Public

// Load Summoner model

// router.get("/", function(req, res, next) {
//   var api_key = process.env.API_KEY;
//   var input_toSearch = "RiotSchmick";
//   var URL =
//     "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" +
//     input_toSearch +
//     "?api_key=" +
//     api_key;

//   axios
//     .get(URL)
//     .then(response => {
//       console.log(response.data);
//       res.send(response.data);
//     })
//     .catch(error => {
//       console.log("Error fetching and parsing data", error);
//     });
// });

// });

module.exports = router;
