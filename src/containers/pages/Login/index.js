import { Component } from "react";
import { connect } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";
import Button from "../../../components/atoms/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);
    if (res) {
      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      window.location = "/";
    }
  };

  render() {
    return (
      <div className="container">
        <h4 className="mt-3">Login Page</h4>
        <hr />
        <div className="mb-3">
          <label htmlFor="email" className="form-label mt-3">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            onChange={this.handleChangeText}
            value={this.state.email}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            rows="3"
            onChange={this.handleChangeText}
            value={this.state.password}
          ></input>
          <Button
            onClick={this.handleLoginSubmit}
            title="Login"
            loading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
