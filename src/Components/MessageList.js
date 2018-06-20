import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => <Message key={message.id} message={message} />)
    return(
      <div>
        <h1>MessageList</h1>
        {messages}
      </div>
    )
  }
}

export default MessageList
