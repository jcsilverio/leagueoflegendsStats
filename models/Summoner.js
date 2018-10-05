const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const SummonerSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  id: {
    type: String,
    required: false
  },
  profileIconId: {
    type: String,
    required: false
  },
  summonerLevel: {
    type: String,
    required: false
  }
});

module.exports = Summoner = mongoose.model("summoners", SummonerSchema);
