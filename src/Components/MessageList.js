import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message, index) => <Message key={message.id} starClick ={() => this.props.starClick(index)} checkClick ={() => this.props.checkClick(index)} message={message} />)
    return(
      <div>
        {messages}
      </div>
    )
  }
}

export default MessageList
