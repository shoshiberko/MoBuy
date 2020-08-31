import React from "react";
import Card from "react-credit-cards";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils.js";

import "react-credit-cards/es/styles-compiled.css";
import styles from "./styles.css";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <h1>React Credit Cards</h1>
          <h4>Beautiful credit cards for your payment forms</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr style={{ margin: "60px 0 30px" }} />

          <hr style={{ margin: "30px 0" }} />
        </div>
        <div className="App-cards-list">
          <Card
            name="John Smith"
            number="5555 4444 3333 1111"
            expiry="10/20"
            cvc="737"
          />

          <Card
            name="John Smith"
            number="4111 1111 1111 1111"
            expiry="10/20"
            cvc="737"
          />

          <Card
            name="John Smith"
            number="3700 0000 0000 002"
            expiry="10/20"
            cvc="737"
          />

          <Card
            name="John Smith"
            number="3600 666633 3344"
            expiry="10/20"
            cvc="737"
          />
          <Card
            name="John Smith"
            number="6011 6011 6011 6611"
            expiry="10/20"
            cvc="737"
          />

          <Card
            name="John Smith"
            number="5066 9911 1111 1118"
            expiry="10/20"
            cvc="737"
          />

          <Card
            name="John Smith"
            number="6250 9460 0000 0016"
            expiry="10/20"
            cvc="737"
          />

          <Card
            name="John Smith"
            number="6062 8288 8866 6688"
            expiry="10/20"
            cvc="737"
          />

          <Card
            name="John Smith"
            number="**** **** **** 7048"
            expiry="10/20"
            cvc="737"
            preview={true}
            issuer="visa"
          />
        </div>
      </div>
    );
  }
}
