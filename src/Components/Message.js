import React, { Component } from 'react'

class Message extends Component {

  render() {
    let labels = ''
    if (this.props.message.labels.length > 0) {
      labels = this.props.message.labels.map(label => {
        return  <span className="label label-warning">{label}</span>
      })
    }

    let readStatus = this.props.message.read ? "row message read" : "row message unread"

    if (this.props.message.checked) {
      readStatus+=' selected'
    }

    let starStatus = this.props.message.starred ? "star fa fa-star" : "star fa fa-star-o"

    return(
      <div>
        <div className={readStatus}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" onClick={this.props.checkClick} />
              </div>
              <div className="col-xs-2">
                <i onClick={this.props.starClick} className={starStatus}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
          {labels}
            <a href="#">
              {this.props.message.subject}
            </a>
          </div>
        </div>
      </div>
    )

  }
}

export default Message
