import React from 'react';
import Routes from './routes';
import { Container } from 'reactstrap'
import './App.css'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      appFunc: {
        loader: show => {
          this.setState({ showLoader: show });
        }
      },
    }
  }

  renderLoader = () => {
    if (this.state.showLoader)
      return (
        <React.Fragment>
          <div className="overlay"></div>
          <div className="modal33">
            <div className="windows8">
              <div className="wBall" id="wBall_1">
                <div className="wInnerBall"></div>
              </div>
              <div className="wBall" id="wBall_2">
                <div className="wInnerBall"></div>
              </div>
              <div className="wBall" id="wBall_3">
                <div className="wInnerBall"></div>
              </div>
              <div className="wBall" id="wBall_4">
                <div className="wInnerBall"></div>
              </div>
              <div className="wBall" id="wBall_5">
                <div className="wInnerBall"></div>
              </div>
            </div>

            <span className="spanLoader">Aguarde...</span>
          </div>
        </React.Fragment>
      )
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid>
          {this.renderLoader()}

          <Routes showLoader={this.state.appFunc.loader} />

        </Container>
      </React.Fragment>
    );
  }
}
