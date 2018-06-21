import React from 'react'
import Message from './Message'

const MessageList = (props) => {

    const messages = props.messages.map((message, index) => <Message key={message.id} starClick ={() => props.starClick(index)} checkClick ={() => props.checkClick(index)} message={message} />)

    return(
      <div>
        {messages}
      </div>
    )
  }

export default MessageList
