import React, { Component } from 'react';
import io from 'socket.io-client';

class Prospect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prospects: []
    };
  }
  
  componentDidMount() {
    var socket = io.connect(process.env.MESSAGE_SERVER_URL || 'http://localhost:4001');
    socket.on('receive_crm_entity', this.messageReceived);
  }
  
  messageReceived(data) {
    var json = JSON.parse(data);
    
    dispatch(getProspectRequest(json));
    
    getProspect(json).then((r) => {
      dispatch(getProspectSuccess(r));
      
      var {prospects} = this.state;
      prospects.push(r);
      this.setState(prospects);
      
    }).catch((e) => {
      dispatch(getProspectFailure(e));
    });
  }
  
  render() {
    return (
      <div className="prospects">
        <h4> Prospects: </h4>
        {
          this.state.prospects.map((prospect) => {
            return (
              <Prospect key={prospect.Id} prospect={prospect} />
            );
          })
        }
      </div>
    )
  }
}

const ProspectRow = (props) => {
  return (
    <div className="prospect">
      <span>{this.props.prospect.FirstName} {this.props.prospect.LastName}</span>
    </div>
  )
}

export default Prospect;
