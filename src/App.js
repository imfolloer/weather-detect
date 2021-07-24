import React, { Component } from "react";
//import "./App.css";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { transform } from "@babel/core";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  initializeData() {
    // Simple GET request using fetch
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?q=" +
        this.state.value,
      {
        headers: {
          "x-rapidapi-key": "YOUR-API-KEY",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          totalReactPackages: JSON.stringify(data.weather[0].main)
        });
        console.log(JSON.stringify(data.weather));
      });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    this.initializeData();
    event.preventDefault();
  }

  render() {
    let didSubmit;
    if (this.state.value.trim === "") {
      didSubmit = <p>No Data</p>;
    } else {
      didSubmit = (
        <h2 style={{ textTransform: "capitalize" }}>
          {this.state.value} - {this.state.totalReactPackages}
        </h2>
      );
    }

    return (
      <React.Fragment>
        <br />
        <br />
        <Container maxWidth="sm">
          <form
            className=""
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Get Details >>>
            </Button>
          </form>
          <div>
            <h3>
              <b>Details:</b>
            </h3>
            {didSubmit}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
