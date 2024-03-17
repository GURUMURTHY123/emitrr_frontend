import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Register extends Component {
  state = { username: "" };

  registerUser = async () => {
    const { username } = this.state;
    const apiUrl = "https://emitrrbackend-production.up.railway.app/register";
    const data = {
      username: username,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(apiUrl, options);
    const responseData = await response.json();
    const { token } = responseData;
    Cookies.set("jwtToken", token, { expires: 20 });
    const { history } = this.props;
    history.push("/");
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    this.registerUser();
  };

  onChangeUserInput = (e) => {
    this.setState({ username: e.target.value });
  };

  render() {
    const { username } = this.state;
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="register-container">
        <form className="register-form" onSubmit={this.onSubmitForm}>
          <div className="input-container">
            <label className="label-element">Username :</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input-element"
              value={username}
              onChange={this.onChangeUserInput}
            />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
