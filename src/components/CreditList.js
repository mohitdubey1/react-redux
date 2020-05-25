import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/CreditAction";
import CreditForm from "./CreditForm";
import UTILS from "../utils/utils";

class CreditList extends React.Component {
  handleEdit = (e, index) => {
    this.props.updateCreditIndex(index);
  };

  handleDelete = (e, index) => {
    this.props.deleteCredit(index);
  };

  expiry = (m, y) => {
    const { months, years } = UTILS;
    return `${months[m]}/${years[y]}`;
  };

  render() {
    return (
      <div className="container">
        <CreditForm />
        <hr />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Expiry Date</th>
              <th>CVC code</th>
              <th>Name on Card</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {this.props.list.length > 0 ? (
              this.props.list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.cardNumber}</td>
                    <td>
                      {this.expiry(item.selectedMonth, item.selectedYear)}
                    </td>
                    <td>{item.cvv}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => this.handleDelete(e, index)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={(e) => this.handleEdit(e, index)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  {" "}
                  No Result Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateCreditIndex: actions.updateIndex,
      deleteCredit: actions.deletes,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditList);
