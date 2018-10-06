const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Kayn, REGIONS } = require("kayn");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const HTTPS_ROOT = "https://na1.api.riotgames.com";
const SUMM_URL = "/lol/summoner/v3/summoners/by-name/";
const MATCH_URL = "/lol/match/v3/matches/";
const MATCHLOG_URL = "/lol/match/v3/matchlists/by-account/";

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

async function getMatchList(userId) {
  try {
    let response = await fetch(
      HTTPS_ROOT + MATCHLOG_URL + userId + "/" + "?api_key=" + API_KEY
    );
    console.log("<---getMatchList response: ", response);
    let matchList = await response.json();
    return matchList;
  } catch (err) {
    throw new Error(response.status);
  }
}

async function getMatchLog(username) {
  const { accountId } = await kayn.Summoner.by.name(username);
  const { matches } = await kayn.Matchlist.by
    .accountID(accountId)
    .query({ season: 11 });
  return matches;
}

async function getUser(username) {
  try {
    let response = await fetch(
      HTTPS_ROOT + SUMM_URL + username + "/" + "?api_key=" + API_KEY
    );
    let user = await response.json();
    return user;
  } catch (err) {
    throw new Error(response.status);
  }
}

async function getScores(username) {
  let matches = [];
  try {
    let user = await getUser(username);
    let matchList = await getMatchList(user.accountId);
    let i = 0;
    for (const match of matchList.matches) {
      const matchDetail = await getMatchDetail(match.gameId);
      matches.push(matchDetail);
      if (i >= RATE_LIMIT) {
        break;
      }
      i++;
    }
  } catch (err) {
    console.log(err);
  }
  return matches;
}

router.get("/:summName", function(req, res, next) {
  var name_toSearch = req.params.summName;
  const summoner = getSummoner(name_toSearch).then(summoner =>
    console.log("here's summoner: ", summoner)
  );

  const matchLog = getMatchLog(name_toSearch).then(matches =>
    console.log(matches)
  );

  getScores(name_toSearch)
    .then(matches => res.json(matches))
    .catch(err => console.log(err));

  // var URL =
  //   "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" +
  //   name_toSearch +
  //   "?api_key=" +
  //   API_KEY;
  // console.log("<---URL: ", URL);
  // axios
  //   .get(URL)
  //   .then(response => {
  //     console.log(response.data);
  //     res.send(response.data);
  //   })
  //   .catch(error => {
  //     console.log("---> Error fetching and parsing data: summ.js:28");
  //   });
});

module.exports = router;
