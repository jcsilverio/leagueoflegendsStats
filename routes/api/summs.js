const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Kayn, REGIONS } = require("kayn");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

// @route   GET api/summoners/
// @desc    summoner route
// @access  Public

const kayn = Kayn(API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  debugOptions: {
    isEnabled: true,
    showKey: false
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: false,
    shouldExitOn403: false
  },
  cacheOptions: {
    cache: null,
    timeToLives: {
      useDefault: false,
      byGroup: {},
      byMethod: {}
    }
  }
});

async function getSummoner(username) {
  const user = await kayn.Summoner.by.name(username);
  return user;
}

router.get("/:summName", function(req, res, next) {
  var name_toSearch = req.params.summName;
  const summoner = getSummoner(name_toSearch).then(summoner =>
    console.log("here's summoner: ", summoner)
  );

  var URL =
    "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" +
    name_toSearch +
    "?api_key=" +
    API_KEY;
  console.log("<---URL: ", URL);
  axios
    .get(URL)
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(error => {
      console.log("---> Error fetching and parsing data: summ.js:28");
    });
});

module.exports = router;
