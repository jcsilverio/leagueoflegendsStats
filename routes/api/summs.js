const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// @route   GET api/summoners/
// @desc    summoner route
// @access  Public

// Load Summoner model
const Summoner = require("../../models/Summoner");

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

router.post("/queryName", (req, res) => {
  // Summoner.findOne({ name: req.body.name }).then(summoner => {
  // if (summoner) {
  //   Summoner.findOneAndRemove({ summoner: req.body.id }).then(() => {
  //     res.json({ success: true });
  //   });
  // }
  const newSummoner = new Summoner({
    name: req.body.name,
    id: req.body.id,
    profileIconId: req.body.profileIconId,
    summonerLevel: req.body.summonerLevel
  });
  newSummoner
    .save()
    .then(summoner => res.json(summoner))
    .catch(err => console.log(err));
});
// });

module.exports = router;
