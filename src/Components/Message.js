import React from 'react'
import MessageBody from './MessageBody'

const Message = (props) => {

    let labels = ''

    if (props.message.labels.length > 0) {
      labels = props.message.labels.map((label, index) => {
        return  <span key={index} className="label label-warning">{label}</span>
      })
    }

    let readStatus = props.message.read ? "read" : "unread"
    let checkedToggle = ''
    if (props.checked.includes(props.message.id)) {
      readStatus+=' selected'
      checkedToggle = 'checked'
    }

    let starStatus = props.message.starred ? "fa-star" : "fa-star-o"

    return(
      <div key={props.message.id}>
        <div className={'row message '+readStatus}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" onChange={props.checkClick} checked={checkedToggle} />
              </div>
              <div className="col-xs-2">
                <i onClick={props.starClick} className={'star fa '+starStatus}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
          {labels}
            <a href="#" onClick={props.expandClick}>
              {props.message.subject}
            </a>
          </div>
        </div>
        {props.index === props.expanded ? <MessageBody message={props.message}/> : null}
      </div>
    )
}
export default Message
