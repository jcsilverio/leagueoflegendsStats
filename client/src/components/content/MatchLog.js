import React, { Component } from "react";
import PropTypes from "prop-types";
import Match from "./Match";
class MatchLog extends Component {
  constructor(props) {
    super();
    this.state = {
      matches: [
        {
          matchId: "1001",
          matchNumber: 1,
          outcome: "Victory",
          duration: "56:12",
          championName: "Darius",
          championItems: [
            "Item 1",
            "Item 2",
            "Item 3",
            "Item 4",
            "Item 5",
            "Item 6",
            "Item 7"
          ],
          championLevel: 18,
          summonerSpells: ["Spell 1", "Spell 2", "Spell 3"],
          kills: 12,
          deaths: 2,
          assists: 27,
          creepScore: 260,
          creepScoreMin: 6.3
        },
        {
          matchId: "1002",
          matchNumber: 2,
          outcome: "Victory",
          duration: "56:12",
          championName: "Darius",
          championItems: [
            "Item 1",
            "Item 2",
            "Item 3",
            "Item 4",
            "Item 5",
            "Item 6",
            "Item 7"
          ],
          championLevel: 18,
          summonerSpells: ["Spell 1", "Spell 2", "Spell 3"],
          kills: 12,
          deaths: 2,
          assists: 27,
          creepScore: 260,
          creepScoreMin: 6.3
        },
        {
          matchId: "1003",
          matchNumber: 3,
          outcome: "Victory",
          duration: "56:12",
          championName: "Darius",
          championItems: [
            "Item 1",
            "Item 2",
            "Item 3",
            "Item 4",
            "Item 5",
            "Item 6",
            "Item 7"
          ],
          championLevel: 18,
          summonerSpells: ["Spell 1", "Spell 2", "Spell 3"],
          kills: 12,
          deaths: 2,
          assists: 27,
          creepScore: 260,
          creepScoreMin: 6.3
        }
      ],
      message: ""
    };
    super(props);
  }
  componentDidMount() {
    this.getMatches(36997775);
  }

  getMatches = accountID => {
    console.log("Searching for Matches: " + accountID);
    fetch(`/api/matches/` + accountID)
      .then(res => res.json())
      .then(res => this.setState({}))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="MatchLog">
        <p>Matches:</p>
        <ul>
          {this.state.matches.map((match, index) => {
            return <Match key={match.gameId} match={match} />;
          })}
        </ul>
      </div>
    );
  }
}

MatchLog.propTypes = {
  matches: PropTypes.array.isRequired
};

export default MatchLog;
