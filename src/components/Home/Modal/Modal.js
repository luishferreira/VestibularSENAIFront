import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { getUrlAPI } from '../../../utils/Environment.js'
import axios from 'axios'
import { Util } from '../../../utils/Utils.js'
import InputMask from 'react-input-mask'
import { validateForm } from '../../../utils/Validations.js'



class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CPF: "",
      formErrors: "",
      show: false
    }
  }

  toggleModal = () => {
    this.setState({
      show: !this.state.show
    })
  }

  handleChange = e => {
    this.setState({ CPF: e.target.value })
  }

  sendCPFToAPI = e => {
    e.preventDefault();
    let cpf = Util.clearCPF(this.state.CPF)
    let obj = { CPF: cpf }
    let formErrors = validateForm(obj)
    this.setState({ formErrors })
    if (Object.keys(formErrors).length === 0) {
      const api = getUrlAPI("Usuario", "VerifyExistsCPF")
      this.props.showLoader(true)
      axios.get(api + '?cpf=' + cpf)
        .then(e => {
          this.props.showLoader(false)
          if (!e.data)
            this.props.history.push({
              pathname: '/cadastro/',
              cpf: cpf
            });
          else {
            this.props.history.push({
              pathname: '/login/',
              cpf: cpf
            });
          }
        })
    }
  }

  render() {
    return (
      <div>
        <Button color='danger' onClick={() => this.toggleModal()}>Clique aqui</Button>
        <Modal isOpen={this.state.show} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>CPF</ModalHeader>
          <ModalBody>
            <Input
              value={this.state.CPF}
              onChange={e => this.handleChange(e)}
              type="cpf"
              mask="999.999.999-99"
              tag={InputMask}
              className={this.state.formErrors.CPF ? 'is-invalid' : ''}
            />
            {this.state.formErrors.CPF && (
              <span className="text-danger">{this.state.formErrors.CPF}</span>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={e => this.sendCPFToAPI(e)}>Confirmar</Button>{' '}
            <Button color='secondary' onClick={this.toggleModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
