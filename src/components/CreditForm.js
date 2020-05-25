import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/CreditAction";

import UTILS from "../utils/utils";
import "../credit.css";

class CreditForm extends React.Component {
  returnStateObject = () => {
    if (this.props.currentIndex === -1) {
      return {
        selectedMonth: 0,
        selectedYear: 0,
        cardNumber: "",
        cvv: "",
        name: "",
      };
    }
    return this.props.list[this.props.currentIndex];
  };

  state = {
    ...this.returnStateObject(),
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentIndex !== prevProps.currentIndex) {
      this.setState({ ...this.returnStateObject() });
    }
  }

  changeHandler = (name) => (e) => {
    this.setState({ ...this.state, [name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.currentIndex === -1) {
      this.props.insertCardDetails(this.state);
      this.setState({ ...this.returnStateObject() });
    } else {
      this.props.updateCardDetails(this.state);
    }
  };

  render() {
    const { selectedMonth, selectedYear, cardNumber, cvv, name } = this.state;
    const { months, years } = UTILS;
    const isMonth = Number(selectedMonth);
    const isYear = Number(selectedYear);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="head">Payment Gateway</h1>
            <form className="form-group" onSubmit={this.handleSubmit}>
              <label htmlFor="cardNumber" className="label-edit">
                Card Number
              </label>

              <div className="card-container">
                <div className="card-type"></div>
                <input
                  placeholder="0000 0000 0000 0000"
                  required
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  className="input-field"
                  value={cardNumber}
                  onChange={this.changeHandler("cardNumber")}
                  onKeyUp={(event) => UTILS.validation(event)}
                  maxLength={19}
                />
              </div>

              <label className="label-edit">Expiration Date</label>
              <select
                defaultValue={isMonth}
                selected={selectedMonth}
                className="input-sm input-field"
                onChange={this.changeHandler("selectedMonth")}
              >
                {months.map((month, index) => {
                  return (
                    <option
                      key={index}
                      value={index}
                      selected={isMonth === index}
                    >
                      {month}
                    </option>
                  );
                })}
              </select>
              <select
                defaultValue={isYear}
                className="input-sm input-field"
                onChange={this.changeHandler("selectedYear")}
              >
                {years.map((year, index) => {
                  return (
                    <option
                      key={index}
                      value={index}
                      selected={isYear === index}
                    >
                      {year}
                    </option>
                  );
                })}
              </select>
              <label
                htmlFor="cvv"
                className="label-edit"
                style={{ marginLeft: "40px" }}
              >
                CVC Code
              </label>
              <input
                type="number"
                required
                name="cvv"
                id="cvv"
                className="input-field cvv-field"
                placeholder="CVV/CVC"
                value={cvv}
                onChange={this.changeHandler("cvv")}
              />
              <br />
              <input
                type="text"
                name="cname"
                id="cname"
                className="input-field name"
                placeholder="Name on your card..."
                value={name}
                onChange={this.changeHandler("name")}
              />

              <button className="btn btn-success">
                {this.props.currentIndex === -1 ? "Proceed" : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    currentIndex: state.currentIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      insertCardDetails: actions.insert,
      updateCardDetails: actions.update,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditForm);
