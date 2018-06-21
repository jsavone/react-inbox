import React from 'react'

const Message = (props) => {

    let labels = ''

    if (props.message.labels.length > 0) {
      labels = props.message.labels.map((label, index) => {
        return  <span key={index} className="label label-warning">{label}</span>
      })
    }

    let readStatus = props.message.read ? "read" : "unread"
    let checkedToggle = ''

    if (props.message.checked) {
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
                <input type="checkbox" onClick={props.checkClick} checked={checkedToggle} />
              </div>
              <div className="col-xs-2">
                <i onClick={props.starClick} className={'star fa '+starStatus}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
          {labels}
            <a href="#">
              {props.message.subject}
            </a>
          </div>
        </div>
      </div>
    )

  }

export default Message
