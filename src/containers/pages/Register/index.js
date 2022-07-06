import { Component } from "react";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";
import Button from "../../../components/atoms/Button";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;
    const res = await this.props
      .registerAPI({ email, password })
      .catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h4 className="mt-3">Register Page</h4>
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
            onClick={this.handleRegisterSubmit}
            title="Register"
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
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
