import React, { Component } from 'react'

class Toolbar extends Component {

  render() {
    let disabled = 'disabled'
    let selectAll = 'fa fa-square-o'
    if (this.props.checked > 0 && this.props.checked < this.props.total) {
      disabled = ''
      selectAll = 'fa fa-minus-square-o'
    }else if (this.props.checked === this.props.total){
      disabled = ''
      selectAll = 'fa fa-check-square-o'
    }

    return(
      <div>
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">{this.props.unread}</span>
              unread {this.props.unread == 1 ? 'message' : 'messages'}
            </p>

            <button className="btn btn-default">
              <i className={selectAll} onClick={this.props.checkAll}></i>
            </button>

            <button className="btn btn-default" disabled={disabled} onClick={this.props.markRead}>
              Mark As Read
            </button>

            <button className="btn btn-default" disabled={disabled} onClick={this.props.markUnread}>
              Mark As Unread
            </button>

            <select className="form-control label-select" disabled={disabled} onChange={this.props.applyLabel} value='Apply label'>
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" disabled={disabled} onChange={this.props.removeLabel} value='Remove label'>
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" disabled={disabled} onClick={this.props.deleteMessage}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    )

  }
}

export default Toolbar
