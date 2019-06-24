import React, { Component } from 'react';
import './App.css';
import History from './Components/History/History'
import axios from './axios.js';

class App extends Component {
  state = {
    sender: null,
    receiver: null,
    amount: null,
    balance: 0,
    showHistory: false,
    historyList: null
  }

  componentDidMount = () => {
    if (!localStorage.getItem('userName')) {
      localStorage.setItem('userName', prompt("Please enter your name (for the demo purposes)"));
    }
    this.setState({ sender: localStorage.getItem('userName') })

    axios.get(`/balance?sender=${localStorage.getItem('userName')}`)
      .then((response) => {
        this.setState({ balance: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sendMoney = () => {
    let transferDetails = {
      sender: this.state.sender,
      receiver: this.state.receiver,
      amount: this.state.amount
    }
    axios.post('/send', transferDetails)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data);
      });
    this.setState({ receiver: '', amount: ''})
  }

  getHistory = () => {
    axios.get(`/history?sender=${this.state.sender}`)
      .then((response) => {
        this.setState({ historyList: response.data })
        this.setState({ showHistory: true })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeHistoryBox = () => {
    this.setState({ showHistory: false })
  }

  logout = () => {
    localStorage.removeItem('userName')
    window.location.reload()
  }

  render() {
    return (
      <div className="App">
        <div>
          <ul>
            <li onClick={this.closeHistoryBox}><a className={!this.state.showHistory ? "active" : ""}>Home</a></li>
            <li onClick={this.getHistory}><a className={this.state.showHistory ? "active" : ""}>History</a></li>
            <li id="logout" onClick={this.logout}><a>Logout</a></li>
          </ul>
        </div>
        <div className="main">
          {!this.state.showHistory ?
            <div>
              <h1>Hello {this.state.sender}!</h1>
              <p id="balance">your current balance is: {this.state.balance} $</p>
              <div id="tranaction-box">
                <h2>Transfer Money</h2>
                <form>
                  <label>Name:
                    <input type="text"
                      name="name"
                      placeholder="who to send to?"
                      value={this.state.receiver}
                      autoComplete="off"
                      onChange={(event) => this.setState({ receiver: event.target.value })} />
                  </label>
                  <label>Amount:
                    <input type="number"
                      min="1"
                      name="amount"
                      placeholder="how much to send?"
                      value={this.state.amount}
                      onChange={(event) => this.setState({ amount: event.target.value })} />
                  </label>
                
                </form>
                <button onClick={this.sendMoney}>send money</button>
              </div>
            </div>
            : <History historyList={this.state.historyList} user={this.state.sender} closeHistoryBox={this.closeHistoryBox}></History>
          }
        </div>
      </div>
    );
  }
}
export default App;
