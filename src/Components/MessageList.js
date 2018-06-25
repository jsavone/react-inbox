import React, { Component } from 'react'
import Message from './Message'
import ComposeForm from './ComposeForm'

class MessageList extends Component {

  state = {expanded: null}

  expandedBodyToggle = (index) => {
    if(index === this.state.expanded) {
      this.setState({expanded: null})
    }else{
      this.setState({expanded: index})
    }
  }

  render () {
    const messagesState = this.props.messages.map((message, index) => <Message key={message.id} starClick ={() => this.props.starClick(index)} checkClick ={() => this.props.checkClick(message.id)} expandClick={()=>this.expandedBodyToggle(index)} message={message} index={index} expanded={this.state.expanded} checked= {this.props.checked} />)

    return(
      <div>
        {this.props.showCompose ? <ComposeForm newMessage={this.props.newMessage} /> : null}
        {messagesState}
      </div>
    )
  }
}
export default MessageList
