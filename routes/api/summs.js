const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Kayn, REGIONS } = require("kayn");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const HTTPS_ROOT = "https://na1.api.riotgames.com";
const SUMM_URL = "/lol/summoner/v3/summoners/by-name/";

// @route   GET api/:summName
// @desc    summoner route
// @access  Public

// GET summoner listing
router.get("/:summName", function(req, res, next) {
  var name_toSearch = req.params.summName;
  var URL = HTTPS_ROOT + SUMM_URL + name_toSearch + "?api_key=" + API_KEY;
  axios
    .get(URL)
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(error => {
      console.log(
        "/api/summs: Error fetching and parsing summoner data",
        error
      );
    });
});

module.exports = router;
