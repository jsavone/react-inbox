import React, { Component } from 'react';
import './App.css';
import Toolbar from './Components/Toolbar.js'
import MessageList from './Components/MessageList.js'
import axios from 'axios'

class App extends Component {
  state = {
    messages: [],
    showCompose: false,
    checked: []
  }

  async componentDidMount() {
  axios(`http://localhost:8082/api/messages`)
  .then(response => this.setState({ messages: response.data}))
  }

  starHandler = async (index) => {
    axios.patch(`http://localhost:8082/api/messages`, {"messageIds": [this.state.messages[index].id], "command": "star"})
      .then(response => {
        this.setState({messages: response.data})
      })
  }

  composeFormToggle = () => {
    this.setState({showCompose: !this.state.showCompose})
  }

  newMessage = async (message) => {
    axios.post(`http://localhost:8082/api/messages`, message)
      .then(response => {
        this.setState({messages: response.data})
      })
  }

  checkBoxHandler = (id) => {
    let messageChecked = [...this.state.checked]
    if (messageChecked.includes(id)) {
      messageChecked = messageChecked.filter(checked => checked!==id)
      this.setState({checked: messageChecked})
    }else{
      this.setState({checked: [...this.state.checked, id]})
    }
  }

  checkAllHandler = (checked, total) => {
    if (checked < total) {
      let checkAllMessages = [...this.state.messages].map(message => message.id)
      this.setState({checked: checkAllMessages})
    }else{
      this.setState({checked: []})
    }
  }

  markReadHandler = async () => {
    axios.patch(`http://localhost:8082/api/messages`, {"messageIds": [...this.state.checked], "command": "read", "read": true})
      .then(response => {
        this.setState({messages: response.data})
      })
  }

  markUnreadHandler = async () => {
    axios.patch(`http://localhost:8082/api/messages`, {"messageIds": [...this.state.checked], "command": "read", "read": false})
      .then(response => {
        this.setState({messages: response.data})
      })
  }

  deleteMessageHandler = async () => {
    axios.patch(`http://localhost:8082/api/messages`, {"messageIds": [...this.state.checked], "command": "delete"})
      .then(response => {
        this.setState({messages: response.data, checked: []})
      })
  }

  applyLabelHandler = async (event) => {
    axios.patch(`http://localhost:8082/api/messages`, {"messageIds": [...this.state.checked], "command": "addLabel", "label": event.target.value})
      .then(response => {
        this.setState({messages: response.data})
      })
  }

  removeLabelHandler = async (event) => {
    axios.patch(`http://localhost:8082/api/messages`, {"messageIds": [...this.state.checked], "command": "removeLabel", "label": event.target.value})
      .then(response => {
        this.setState({messages: response.data})
      })
  }

  render() {
    let unreadMessages = this.state.messages.filter((message) => !message.read).length
    let checkedMessages = this.state.checked.length
    let totalMessages = this.state.messages.length
    return (
      <div className="App">
        <Toolbar
        unread={unreadMessages}
        total={totalMessages}
        checked={checkedMessages}
        showCompose = {this.composeFormToggle}
        markRead={this.markReadHandler}
        markUnread={this.markUnreadHandler}
        deleteMessage={this.deleteMessageHandler}
        applyLabel={this.applyLabelHandler}
        removeLabel={this.removeLabelHandler}
        checkAll={()=> this.checkAllHandler(checkedMessages, totalMessages)} />

        <MessageList
        checked={this.state.checked}
        starClick={this.starHandler}
        checkClick={this.checkBoxHandler}
        messages={this.state.messages}
        showCompose={this.state.showCompose}
        newMessage={this.newMessage}
        state={this.state}/>
      </div>
    );
  }
}

export default App;
