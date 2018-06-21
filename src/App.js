import React, { Component } from 'react';
import './App.css';
import Toolbar from './Components/Toolbar.js'
import MessageList from './Components/MessageList.js'

class App extends Component {
  state = {
    messages:
      [
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        },
        {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        },
        {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        },
        {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        },
        {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        },
        {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ]
  }

  starHandler = (index) => {
    let messageArr = [...this.state.messages]
      if (messageArr[index].starred) {
        messageArr[index].starred = false
      }else{
        messageArr[index].starred = true
      }
      this.setState({messages: messageArr})
  }

  checkBoxHandler = (index) => {
    let messageArr = [...this.state.messages]
    if (messageArr[index].checked) {
      messageArr[index].checked = false
    }else{
      messageArr[index].checked = true
    }
    this.setState({messages: messageArr})
  }

  checkAllHandler = (checked, total) => {
    if (checked < total) {
      let checkMessages = [...this.state.messages]
      checkMessages = checkMessages.map(message => {
        message.checked = true
        return message
      })
      this.setState({messages: checkMessages})
    }else{
      let checkMessages = [...this.state.messages]
      checkMessages = checkMessages.map(message => {
        message.checked = false
        return message
      })
      this.setState({messages: checkMessages})
    }
  }

  markReadHandler = () => {
    let readMessages = [...this.state.messages].map(message => {
      if (message.checked) {
        message.read = true
      }
      return message
    })
    this.setState({messages: readMessages})
  }

  markUnreadHandler = () => {
    let unreadMessages = [...this.state.messages].map(message => {
      if (message.checked) {
        message.read = false
      }
      return message
    })
    this.setState({messages: unreadMessages})
  }

  deleteMessageHandler = () => {
    let deleteMessages = [...this.state.messages].filter(message => !message.checked)
    this.setState({messages: deleteMessages})
  }

  applyLabelHandler = (event) => {
    let applyLabel = [...this.state.messages].map(message => {
      if(message.checked && message.labels.indexOf(event.target.value)===-1) {
        message.labels = [...message.labels, event.target.value]
      }
      return message
    })
    this.setState({messages: applyLabel})
  }

  removeLabelHandler = (event) => {
    let removeLabel = [...this.state.messages].map(message => {
      if(message.checked && message.labels.indexOf(event.target.value)!==-1) {
        message.labels = message.labels.filter(label => label !==event.target.value)
      }
      return message
    })
    this.setState({messages: removeLabel})
  }

  render() {
    let unreadMessages = this.state.messages.filter((message) => !message.read).length
    let checkedMessages = this.state.messages.filter((message) => message.checked).length
    let totalMessages = this.state.messages.length
    return (
      <div className="App">
        <Toolbar
        unread={unreadMessages}
        checked={checkedMessages}
        total={totalMessages}
        markRead={this.markReadHandler}
        markUnread={this.markUnreadHandler}
        deleteMessage={this.deleteMessageHandler}
        applyLabel={this.applyLabelHandler}
        removeLabel={this.removeLabelHandler}
        checkAll={()=> this.checkAllHandler(checkedMessages, totalMessages)} />

        <MessageList
        starClick={this.starHandler}
        checkClick={this.checkBoxHandler}
        messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
