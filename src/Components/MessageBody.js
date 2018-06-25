import React from 'react'

const MessageBody = ({message}) => {
  return (
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        {message.body}
      </div>
    </div>
  )
}
export default MessageBody
