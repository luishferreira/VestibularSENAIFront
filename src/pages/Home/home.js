import React from 'react';
import ModalExample from '../../components/Modal/Modal.js';
import { Button } from 'reactstrap'
import Loader from 'react-loader-spinner'
import '../../App.css'

class Home extends React.Component {
    state = { show: false }
    toggleModal = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return (
            <div className="App">
                <Button color='danger' onClick={() => this.toggleModal()}>Clique aqui</Button>
                <ModalExample show={this.state.show} toggle={this.toggleModal} {...this.props}></ModalExample>
            </div>
        );
    }
}
export default Home;