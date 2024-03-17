import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Game} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/leaderboard" component={LeaderBoard} />
    </Switch>
  );
}

export default App;
