import React from 'react';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import InputMask from 'react-input-mask'
import axios from 'axios'
import { getUrlAPI } from '../../utils/Environment.js'
import { Util } from '../../utils/Utils.js'
import swal from 'sweetalert';

const initFormObject = {
    Nome: "",
    CPF: "",
    Email: "",
    Telefone: "",
    Senha: ""
}

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginAluno: { ...initFormObject, CPF: this.props.location.cpf },
            formErrors: { ...initFormObject }
        }
    }

    handleChange = e => {
        let loginAluno = { ...this.state.loginAluno }
        loginAluno[e.target.id] = e.target.value
        this.setState({ loginAluno })
    }

    handleSubmit = e => {
        e.preventDefault();
        let loginAluno = { ...this.state.loginAluno }
        if (loginAluno.Senha) {
            const api = getUrlAPI("Usuario", "LogarAluno")
            loginAluno.CPF = Util.clearCPF(this.state.loginAluno.CPF)
            this.props.showLoader(true)
            axios.post(api, loginAluno)
                .then(response => {
                    this.props.showLoader(false)
                    if (response.data.idAluno > 0) {
                        if (response.data.isValido) {
                            let user = { idAluno: response.data.idAluno, idPerfilUsuario: response.data.idPerfilUsuario, cpf: response.data.cpf }
                            window.localStorage.setItem("Usuario", JSON.stringify(user))
                            this.setState({ formErrors: {} })
                            swal('Logado com sucesso', '', 'success')
                        }
                        else {
                            this.reenviarEmail(response.data)
                        }
                    } else {
                        let formErrors = { Senha: "Usuario ou Senha incorreta" }
                        this.setState({ formErrors })
                    }
                }).catch(error => {
                    this.props.showLoader(false)
                    console.log(error)
                })
        } else {
            let formErrors = { Senha: "*Campo Obrigatório" }
            this.setState({ formErrors })
        }


        this.setState({ loginAluno })
    }

    reenviarEmail = (loginAluno) => {
        console.log(loginAluno)
        swal({
            title: "Confirme seu Email",
            text: "Seu email ainda não está confirmado, reenvie seu email e tente logar novamente",
            icon: "warning",
            buttons: ["Reenviar o Email", "Ok"],
        }).then((reenviar) => {
            if (!reenviar) {
                this.props.showLoader(true)
                axios.post(getUrlAPI("Usuario", "ReenviarEmail"), loginAluno)
                    .then(response => {
                        this.props.showLoader(false)
                        swal('Reenviando seu email', '', 'success')
                    })
            }
        });
    }

    esqueciMinhaSenha = () => {
        swal({
            title: 'Insira seu email cadastrado.',
            content: "input",
            button: {
                text: "Enviar",
                closeModal: false,
            },
        })
            .then(name => {
                axios.get(getUrlAPI("Usuario", "EsqueciMinhaSenha") + '?email=' + name + '&cpf=' + this.state.loginAluno.CPF)
                    .then(function (response) {
                        if (response.data === 'email')
                            swal('Este email não esta cadastrado em nenhuma conta do sistema', '', 'warning')
                        else
                            swal('Enviamos um email de confirmação para você alterar sua senha', '', 'success')
                    }).catch(function (error) {
                        console.log(error)
                    })
            })
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
                        <h3>Efetuar Login</h3>
                        <FormGroup>
                            <Label>CPF</Label>
                            <Input
                                value={this.state.loginAluno.CPF}
                                onChange={e => this.handleChange(e)}
                                id="CPF"
                                mask="999.999.999-99"
                                tag={InputMask}
                                placeholder="CPF"
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Senha</Label>
                            <Input
                                id="Senha"
                                value={this.state.loginAluno.Senha}
                                onChange={e => this.handleChange(e)}
                                type="password"
                                placeholder="Senha"
                                className={this.state.formErrors.Senha ? 'is-invalid' : ''}
                            />
                            {this.state.formErrors.Senha && (
                                <span className="text-danger">{this.state.formErrors.Senha}</span>
                            )}
                        </FormGroup>
                        <Button
                            className="btn-block"
                            color="primary"
                            onClick={e => this.handleSubmit(e)}
                        > Logar </Button>
                        <a href="#" onClick={() => this.esqueciMinhaSenha()} style={{ float: "right" }}>Esqueceu a senha?</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default FormLogin;
