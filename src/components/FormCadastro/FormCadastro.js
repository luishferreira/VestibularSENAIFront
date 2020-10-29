import React from 'react';
import './FormCadastro.css'
import { Button, Input, FormGroup, Label } from 'reactstrap';
import { getUrlAPI } from '../../utils/Environment.js'
import axios from 'axios'
import { Util } from '../../utils/Utils.js'
import InputMask from 'react-input-mask'
import swal from 'sweetalert';
import { validateForm } from '../../utils/Validations.js'


const initFormObject = {
  Nome: "",
  CPF: "",
  Email: "",
  Telefone: "",
  Senha: "",
  ConfirmarSenha: ""
}

class FormCadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cadastroAluno: { ...initFormObject, CPF: this.props.location.cpf },
      formErrors: { ...initFormObject }
    }

  }
  handleChange = e => {
    let cadastroAluno = { ...this.state.cadastroAluno }
    cadastroAluno[e.target.id] = e.target.value
    this.setState({ cadastroAluno })

  }

  handleSubmit = e => {
    e.preventDefault();
    let cadastroAluno = { ...this.state.cadastroAluno }
    let formErrors = validateForm(cadastroAluno)
    if (cadastroAluno.Senha !== cadastroAluno.ConfirmarSenha)
      formErrors.ConfirmarSenha = "As senhas são diferentes"
    this.setState({ formErrors })
    if (Object.keys(formErrors).length === 0) {
      const api = getUrlAPI("Usuario", "CadastraAluno")
      cadastroAluno.CPF = Util.clearCPF(this.state.cadastroAluno.CPF)
      cadastroAluno.Telefone = Util.clearTel(this.state.cadastroAluno.Telefone)
      this.props.showLoader(true)
      //api de cadastro
      axios.post(api, cadastroAluno)
        .then(response => {
          this.props.showLoader(false)

          if (response.data > 0)
            swal({
              title: "Confirme seu Email",
              text: "Por favor, confirme seu email, enviamos um email de confirmação para " + this.maskEmail(this.state.cadastroAluno.Email),
              icon: "success",
            })
          else
            swal({
              title: "Ocorreu um erro no cadastro",
              icon: "error"
            })
          this.props.history.push('/')
        }).catch(error => {
          this.props.showLoader(false)
          console.log(error)
        })

      this.setState({ cadastroAluno })
    }
  }

  maskEmail = (email) => {
    let splitedEmail = email.split('')
    let index = splitedEmail.findIndex(e => e === '@')

    for (var i = 0; i < index; i++) {
      if (i >= index / 2) {
        splitedEmail[i] = '*'
      }
    }
    return splitedEmail.join('')
  }

  render() {
    return (
      <React.Fragment>
        <div className="auth-wrapper">
          <div className="auth-inner">
            {/* <form>


                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form> */}
            <h3>Finalizar Cadastro</h3>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                value={this.state.cadastroAluno.Nome}
                onChange={e => this.handleChange(e)}
                id="Nome"
                placeholder="Nome"
                className={this.state.formErrors.Nome ? 'is-invalid' : ''}
              />
              {this.state.formErrors.Nome && (
                <span className="text-danger">{this.state.formErrors.Nome}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>CPF</Label>
              <Input
                value={this.state.cadastroAluno.CPF}
                onChange={e => this.handleChange(e)}
                id="CPF"
                mask="999.999.999-99"
                tag={InputMask}
                placeholder="CPF"
                disabled
              />
              {this.state.formErrors.CPF && (
                <span className="text-danger">{this.state.formErrors.CPF}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                value={this.state.cadastroAluno.Email}
                onChange={e => this.handleChange(e)}
                id="Email"
                placeholder="Email"
                className={this.state.formErrors.Email ? 'is-invalid' : ''}
              />
              {this.state.formErrors.Email && (
                <span className="text-danger">{this.state.formErrors.Email}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Telefone</Label>
              <Input
                value={this.state.cadastroAluno.Telefone}
                onChange={e => this.handleChange(e)}
                id="Telefone"
                tag={InputMask}
                mask="(99) 99999-9999"
                placeholder="Telefone"
                className={this.state.formErrors.Telefone ? 'is-invalid' : ''}
              />
              {this.state.formErrors.Telefone && (
                <span className="text-danger">{this.state.formErrors.Telefone}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Senha</Label>
              <Input
                id="Senha"
                value={this.state.cadastroAluno.Senha}
                onChange={e => this.handleChange(e)}
                type="password"
                placeholder="Senha"
                className={this.state.formErrors.Senha ? 'is-invalid' : ''}
              />
              {this.state.formErrors.Senha && (
                <span className="text-danger">{this.state.formErrors.Senha}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Confirme sua Senha</Label>
              <Input
                id="ConfirmarSenha"
                value={this.state.cadastroAluno.ConfirmarSenha}
                onChange={e => this.handleChange(e)}
                type="password"
                placeholder="ConfirmarSenha"
                className={this.state.formErrors.ConfirmarSenha ? 'is-invalid' : ''}
              />
              {this.state.formErrors.ConfirmarSenha && (
                <span className="text-danger">{this.state.formErrors.ConfirmarSenha}</span>
              )}
            </FormGroup>
            <Button
              className="btn-block"
              color="primary"
              onClick={e => this.handleSubmit(e)}
            > Registrar </Button>
          </div>
        </div>
      </React.Fragment>


    );
  }
}

export default FormCadastro;
