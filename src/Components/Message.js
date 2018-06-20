import React, { Component } from 'react'

class Message extends Component {
  render() {
    return(
      <div>
        <p>{this.props.message.subject}</p>
      </div>
    )

  }
}

export default Message
