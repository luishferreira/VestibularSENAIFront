import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { getUrlAPI } from '../../utils/Environment.js'
import axios from 'axios'
import { Util } from '../../utils/Utils.js'
import InputMask from 'react-input-mask'
// import swal from 'sweetalert';
import { validateForm } from '../../utils/Validations.js'



class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CPF: "",
      formErrors: ""
    }
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
        <Modal isOpen={this.props.show} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>CPF</ModalHeader>
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
            <Button color='secondary' onClick={this.props.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
