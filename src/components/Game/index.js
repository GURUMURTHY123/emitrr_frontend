import { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../Header";
import CardItem from "../CardItem";
import Cookies from "js-cookie";
import "./index.css";

const cardDetails = [
  {
    id: "cat_card",
    imageIcon: "cat",
    isClicked: false,
  },
  {
    id: "defuse_card",
    imageIcon: "defuse",
    isClicked: false,
  },
  {
    id: "shuffle_card",
    imageIcon: "shuffle",
    isClicked: false,
  },
  {
    id: "exploding_card",
    imageIcon: "exploding",
    isClicked: false,
  },
];

const initialCardDetailsList = [
  ...cardDetails,
  {
    id: "extra_card",
    isClicked: false,
    imageIcon: null,
  },
];

class Game extends Component {
  state = {
    userDetails: {},
    cardsData: initialCardDetailsList,
    isGameStarted: false,
    isDefusingCardAvailable: false,
  };

  getUserData = async () => {
    const apiUrl = "https://emitrrbackend-production.up.railway.app/user";
    this.jwtToken = Cookies.get("jwtToken");
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const { data } = await response.json();
    const userData = {
      id: data.id,
      username: data.username,
      score: data.score,
    };
    this.setState({ userDetails: userData });
  };

  componentDidMount() {
    this.getUserData();
  }

  renderGame = () => {
    const { cardsData, isGameStarted } = this.state;
    return (
      <div className="game-container">
        <ul className="card-list-container">
          {cardsData.map((eachCard) => (
            <CardItem
              cardDetails={eachCard}
              isGameStarted={isGameStarted}
              updateCardProperties={this.updateCardProperties}
              key={eachCard.id}
            />
          ))}
        </ul>
        {!isGameStarted && (
          <button
            type="button"
            className="start-button"
            onClick={this.startGame}
          >
            Start Game
          </button>
        )}
      </div>
    );
  };

  startGame = () => {
    this.setState((prevState) => ({ isGameStarted: !prevState.isGameStarted }));
  };

  removeCard = async (id) => {
    const { cardsData } = this.state;
    const updatedCardsData = cardsData.filter((eachCard) => eachCard.id !== id);
    this.setState({ cardsData: updatedCardsData });
  };

  explodingCard = (id) => {
    // lost game
    const { isDefusingCardAvailable } = this.state;
    if (isDefusingCardAvailable) {
      this.removeCard(id);
    } else {
      this.restartGame();
    }
  };

  updateScore = async () => {
    const { userDetails } = this.state;
    const { score } = userDetails;
    const updatedScore = score + 1;
    const data = {
      score: updatedScore,
    };
    const apiUrl =
      "https://emitrrbackend-production.up.railway.app/update_score";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.jwtToken}`,
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, options);
    const updatedUserDetails = { ...userDetails, score: updatedScore };
    await this.setState({ userDetails: updatedUserDetails });
  };

  defuseCard = async (id) => {
    await this.setState({ isDefusingCardAvailable: true });
    await this.removeCard(id);
  };

  restartGame = async () => {
    const { cardsData } = this.state;
    if (cardsData.length === 1) {
      await this.updateScore();
    }
    const updatedCardDetails = initialCardDetailsList.sort(
      () => 0.5 - Math.random()
    );
    console.log(updatedCardDetails);
    await this.setState({
      cardsData: updatedCardDetails,
      isGameStarted: false,
      isDefusingCardAvailable: false,
    });
  };

  updateCardData = async (id) => {
    switch (id) {
      case "cat_card":
        await this.removeCard(id);
        break;
      case "exploding_card":
        await this.explodingCard(id);
        break;
      case "defuse_card":
        await this.defuseCard(id);
        break;
      case "shuffle_card":
        await this.restartGame();
        break;
      default:
        await this.removeCard(id);
    }
  };

  updateCardProperties = async (id) => {
    const { cardsData } = this.state;
    const updatedCardDetails = cardsData.map((eachCard) => {
      if (eachCard.id === id) {
        return { ...eachCard, isClicked: !eachCard.isClicked };
      }
      return eachCard;
    });
    await this.setState({ cardsData: updatedCardDetails });
    setTimeout(() => {
      this.updateCardData(id);
    }, 100);
  };

  render() {
    const token = Cookies.get("jwtToken");
    if (token === undefined) {
      return <Redirect to="/register" />;
    }
    const { userDetails } = this.state;
    return (
      <div className="game-bg-container">
        <Header userDetails={userDetails} />
        {this.renderGame()}
      </div>
    );
  }
}

export default Game;
