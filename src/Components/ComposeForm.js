import React, { Component } from 'react'

class ComposeForm extends Component {
  state = {subject: '', body: ''}

  subjectHandler = (event) => {
    this.setState({subject: event.target.value})
  }

  bodyHandler = (event) => {
    this.setState({body: event.target.value})
  }

  render() {
    return(
      <div>
        <form  className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" value={this.state.subject} onChange={this.subjectHandler} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control" onChange={this.bodyHandler}>{this.state.body}</textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary" onClick={()=> this.props.newMessage(this.state)} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ComposeForm
