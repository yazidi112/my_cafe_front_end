import React from 'react';
import Popout from 'react-popout';

export default class Commande extends React.Component{
    constructor(props) {
      super(props);
      this.popout = this.popout.bind(this);
      this.popoutClosed = this.popoutClosed.bind(this);
      this.state = { isPoppedOut: true };
    }
  
    popout() {
      this.setState({isPoppedOut: true});
    }
  
    popoutClosed() {
      this.setState({isPoppedOut: false});
    }
  
    render() {
      if (this.state.isPoppedOut) {
        return (
          <Popout url='popout.html' title='Window title' onClosing={this.popoutClosed}>
            <div>Popped out content!</div>
          </Popout>
        );
      } else {
        var popout = <span onClick={this.popout} className="buttonGlyphicon glyphicon glyphicon-export"></span>
        return (
          <div>
            <strong>Section {popout}</strong>
            <div>Inline content</div>
          </div>
        );
      }
    }
  }