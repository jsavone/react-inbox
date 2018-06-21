import React from 'react'

const Toolbar = (props) => {

    let disabled = 'disabled'
    let selectAll = 'fa-square-o'
    if (props.checked > 0 && props.checked < props.total) {
      disabled = ''
      selectAll = 'fa-minus-square-o'
    }else if (props.checked === props.total){
      disabled = ''
      selectAll = 'fa-check-square-o'
    }

    return(
      <div>
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">{props.unread}</span>
              unread {props.unread === 1 ? 'message' : 'messages'}
            </p>

            <button className="btn btn-default">
              <i className={'fa ' +selectAll} onClick={props.checkAll}></i>
            </button>

            <button className="btn btn-default" disabled={disabled} onClick={props.markRead}>
              Mark As Read
            </button>

            <button className="btn btn-default" disabled={disabled} onClick={props.markUnread}>
              Mark As Unread
            </button>

            <select className="form-control label-select" disabled={disabled} onChange={props.applyLabel} value='Apply label'>
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" disabled={disabled} onChange={props.removeLabel} value='Remove label'>
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" disabled={disabled} onClick={props.deleteMessage}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    )

  }

export default Toolbar
