import React from 'react';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios'
import { getUrlAPI } from '../../../utils/Environment.js'
import swal from 'sweetalert';
import { validateForm } from '../../../utils/Validations.js'

const initFormObject = {
    CPF: "",
    Senha: "",
    ConfirmarSenha: ""
}

class FormTrocaSenha extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        if(!this.props.location.search) this.props.history.push('/')
        this.state = {
            trocaSenha: { ...initFormObject, CPF: this.props.location.search.replace('?','') },
            formErrors: { ...initFormObject }
        }
    }

    handleChange = e => {
        let trocaSenha = { ...this.state.trocaSenha }
        trocaSenha[e.target.id] = e.target.value
        this.setState({ trocaSenha })
    }

    handleSubmit = e => {
        e.preventDefault();
        let trocaSenha = { ...this.state.trocaSenha }
        let validate = {Senha: trocaSenha.Senha, ConfirmarSenha: trocaSenha.ConfirmarSenha}
        let formErrors = validateForm(validate)
        if (!trocaSenha.Senha) {
            formErrors.Senha = "*Campo Obrigatório";
        }
        if (trocaSenha.Senha !== trocaSenha.ConfirmarSenha)
            formErrors.ConfirmarSenha = "As senhas não coincidem";
        this.setState({ formErrors })

        if (Object.keys(formErrors).length === 0) {
            const api = getUrlAPI("Usuario", "AlterarSenha")
            this.props.showLoader(true)
            axios.post(api, trocaSenha)
                .then(response => {
                    this.props.showLoader(false)
                    if (response.data){
                        swal('Senha alterada com sucesso', '', 'success')
                        this.props.history.push({
                            pathname: '/login/',
                            cpf: response.data
                          });
                    }
                    else
                        swal('Occoreu um erro ao alterar a senha', '', 'error')
                }).catch(error => {
                    this.props.showLoader(false)
                    console.log(error)
                })
        }
        this.setState({ trocaSenha })
    }

    render() {
        return (
            <React.Fragment>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h3>Alterar Senha</h3>
                        <FormGroup>
                            <Label>Senha</Label>
                            <Input
                                id="Senha"
                                value={this.state.trocaSenha.Senha}
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
                            <Label>Confirmar Senha</Label>
                            <Input
                                id="ConfirmarSenha"
                                value={this.state.trocaSenha.ConfirmarSenha}
                                onChange={e => this.handleChange(e)}
                                type="password"
                                placeholder="Confirmar Senha"
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
                        > Alterar </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default FormTrocaSenha;
