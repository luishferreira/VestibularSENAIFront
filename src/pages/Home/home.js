import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import '../../App.css'
import ModalCPF from '../../components/Home/Modal/Modal.js';
import Login from '../../components/Home/FormLogin/FormLogin.js';
import Cadastro from '../../components/Home/FormCadastro/FormCadastro';
import TrocaSenha from '../../components/Home/FormTrocaSenha/FormTrocaSenha'
import ConfirmaEmail from '../../components/Home/ConfirmaEmail/confirmaEmail'

import Timer from '../../components/Timer/timer'

class Home extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (<div><ModalCPF {...this.props} /> <Timer hours={3} seconds={11} /></div>)} />
                <Route exact path="/login" render={() => <Login {...this.props} />} />
                <Route exact path="/cadastro" render={() => <Cadastro {...this.props} />} />
                <Route exact path="/confirmarEmail" render={() => <ConfirmaEmail {...this.props} />} />
                <Route exact path="/confirmarTrocaSenha" render={() => <TrocaSenha {...this.props}/>} />
            </Switch>
        );
    }
}
export default withRouter(Home);