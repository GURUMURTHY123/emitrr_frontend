import { withRouter } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./index.css";

const Header = (props) => {
  const { userDetails } = props;
  const { username, score } = userDetails;

  const onClickLeaderBoard = () => {
    const { history } = props;
    history.push("/leaderboard");
  };

  return (
    <div className="header-container">
      <div className="profile-container">
        <CgProfile color="#ffffff" size={25} />
        <h1 className="user-name">{username}</h1>
      </div>
      <div className="score-container">
        <p className="score">
          score: <span>{score}</span>
        </p>
        <button
          type="button"
          className="leader-board-btn"
          onClick={onClickLeaderBoard}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default withRouter(Header);
