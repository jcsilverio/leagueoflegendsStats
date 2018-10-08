const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Kayn, REGIONS } = require("kayn");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const HTTPS_ROOT = "https://na1.api.riotgames.com";

const MATCH_URL = "/lol/match/v3/matches/";
const MATCHLOG_URL = "/lol/match/v3/matchlists/by-account/";

// @route   GET api/maches/:accountID
// @desc    matches route
// @access  Public

// GET account match listing
router.get("/log/:accountID", function(req, res, next) {
  var ID_toSearch = req.params.accountID;
  var URL = HTTPS_ROOT + MATCHLOG_URL + ID_toSearch + "?api_key=" + API_KEY;
  axios
    .get(URL)
    .then(response => {
      console.log("matches.js: log/:accountID fires");
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(error => {
      console.log(
        "matches.js: /api/matches.js: Error fetching and parsing match log data"
      );
    });
});

// @route   GET api/maches/:matchID
// @desc    individual matches route
// @access  Public

// GET account match detail listing
router.get("/detail/:matchID", function(req, res, next) {
  var matchID_toSearch = req.params.matchID;
  var URL = HTTPS_ROOT + MATCH_URL + matchID_toSearch + "?api_key=" + API_KEY;
  axios
    .get(URL)
    .then(response => {
      console.log("matches.js: detail/:matchID fires");
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(error => {
      console.log(
        "/api/matches.js: Error fetching and parsing indiv match data"
      );
    });
});

//https://na1.api.riotgames.com/lol/match/v3/matches/2830296170?api_key=RGAPI-291f5d58-37f4-4140-a68f-05271d084f12
https: module.exports = router;
