import React, { Component } from 'react';
import './App.css';
import Toolbar from './Components/Toolbar.js'
import MessageList from './Components/MessageList.js'

class App extends Component {
  state = {
    messages: [],
    showCompose: false,
    checked: []
  }

  async componentDidMount() {
  const messagesResponse = await fetch('http://localhost:8082/api/messages')
  let messagesJson = await messagesResponse.json()
  messagesJson = messagesJson.map(message => {
    message.selected = false
    return message
  })
  this.setState({messages: messagesJson})
}

  starHandler = async (index) => {

    const itemResponse = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({"messageIds": [this.state.messages[index].id], "command": "star"}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let itemJson = await itemResponse.json()
    itemJson = itemJson.map(message => {
      message.selected = false
      return message
    })
    this.setState({messages: itemJson})
  }

  composeFormToggle = () => {
    this.setState({showCompose: !this.state.showCompose})
  }

  newMessage = async (message) => {

    const itemResponse = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let itemJson = await itemResponse.json()
    itemJson = itemJson.map(message => {
      message.selected = false
      return message
    })
    this.setState({messages: itemJson})
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
    let checkedMessages = [...this.state.checked]

    const itemResponse = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({"messageIds": checkedMessages, "command": "read", "read": true}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let itemJson = await itemResponse.json()
    this.setState({messages: itemJson})
  }

  markUnreadHandler = async () => {
    let checkedMessages = [...this.state.checked]

    const itemResponse = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({"messageIds": checkedMessages, "command": "read", "read": false}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let itemJson = await itemResponse.json()
    this.setState({messages: itemJson})
  }

  deleteMessageHandler = async () => {
    let checkedMessages = [...this.state.checked]

    const itemResponse = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({"messageIds": checkedMessages, "command": "delete"}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let itemJson = await itemResponse.json()

    this.setState({messages: itemJson, checked: []})
  }

  applyLabelHandler = async (event) => {
    let checkedMessages = [...this.state.checked]

    const itemResponse = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({"messageIds": checkedMessages, "command": "addLabel", "label": event.target.value}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let itemJson = await itemResponse.json()
    this.setState({messages: itemJson})
  }

  removeLabelHandler = async (event) => {
    let checkedMessages = [...this.state.checked]

    const itemResponse = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({"messageIds": checkedMessages, "command": "removeLabel", "label": event.target.value}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let itemJson = await itemResponse.json()
    this.setState({messages: itemJson})
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
