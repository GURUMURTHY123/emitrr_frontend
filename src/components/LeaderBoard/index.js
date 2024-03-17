import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

class LeaderBoard extends Component {
  state = { leaderBoardData: [] };

  componentDidMount() {
    this.getLeaderBoardData();
  }

  getLeaderBoardData = async () => {
    const jwtToken = Cookies.get("jwtToken");
    const apiUrl =
      "https://emitrrbackend-production.up.railway.app/leader_board";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const responseData = await response.json();
    const { leaderBoardList } = responseData;
    this.setState({
      leaderBoardData: leaderBoardList,
    });
  };

  returnToGame = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { leaderBoardData } = this.state;
    return (
      <div className="leader-board-container">
        <ul className="leader-board-list-container">
          <li className="leader-board-header">
            <p className="header-text">Username</p>
            <p className="header-score">Score</p>
          </li>
          {leaderBoardData.map((eachData) => (
            <li className="leader-board-list">
              <p className="leader-board-name">{eachData.username}</p>
              <p className="leader-board-score">{eachData.score}</p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="return-btn"
          onClick={this.returnToGame}
        >
          Return to Game
        </button>
      </div>
    );
  }
}

export default LeaderBoard;
