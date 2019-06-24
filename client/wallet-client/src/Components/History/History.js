import React, { Component } from 'react';
import './History.css';
import HistoryItem from './HistoryItem/Historyitem'

class History extends Component {

  render() {

    let transactionHistory = null;
    if (this.props.historyList) {
      transactionHistory = this.props.historyList.map((item) => {
        if (item.sender === this.props.user) {
          return <HistoryItem type="sent" receiver={item.receiver} amount={item.amount} />
        } else {
          return <HistoryItem type="received" sender={item.sender} amount={item.amount} />
        }
      })
    }

    return (
      <div className="main history">
        <h2>History</h2>
        <div id="history-box">
          {transactionHistory}
        </div>
      </div>
    );
  }
}
export default History;
