import React, { Component } from 'react';
import './HistoryItem.css';

class HistoryItem extends Component {
    render() {
        return (
            <div className="historyItem">
                <div className="name-box">
                    {this.props.type === "sent" ?
                        <p>Sent to: {this.props.receiver}</p> :
                        <p>Received from: {this.props.sender}</p>}
                </div>
                <p id="amount">{this.props.amount}$ </p>
                {this.props.type === "sent" ?
                <i id="minus" className="fas fa-minus-circle"></i> :
                <i id="plus" className="fas fa-plus-circle"></i>
                }
            </div>
        );
    }
}

export default HistoryItem;
