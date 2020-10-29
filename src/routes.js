import React/*, { useState } */from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import SideBar from './components/Sidebar/sidebar';
// import Topbar from './components/Topbar/';
import Footer from './components/Footer/footer';
import Home from './pages/Home/home';
import Cadastro from './pages/Cadastro/cadastro';
import Login from './pages/Login/login';
import ConfirmacaoEmail from './pages/Confirmacao/confirmacao';
import ConfirmacaoSenha from './pages/ConfirmacaoTrocaSenha/confirmarTrocaSenha'
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Routes = (props) => {
    const renderCadastro = (prop) => {
        return(
            <Cadastro {...prop} 
            showLoader={props.showLoader}/>
        )
    }

    const renderHome = (prop) => {
        return(
            <Home {...prop}
            showLoader={props.showLoader}
            />
        )
    }

    const renderLogin = (prop) => {
        return(
            <Login 
            {...prop}
            showLoader={props.showLoader}
            />

        )
    }

    const renderTrocaSenha = (prop) => {
        return(
            <ConfirmacaoSenha 
            {...prop}
            showLoader={props.showLoader}
            />

        )
    }
    // const [sidebarIsOpen, setSidebarOpen] = useState(true);
    // const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
    return (
        <>
                <BrowserRouter>
                        {/* <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} /> */}
                        <Switch>
                            <Route exact path="/" render={renderHome}></Route>
                            <Route exact path="/1" component={() => <h1>Componente 2</h1>}></Route>
                            <Route exact path="/2" component={() => <h1>Componente 3</h1>}></Route>
                            <Route exact path="/login" render={renderLogin}></Route>
                            <Route exact path="/cadastro" render={renderCadastro}></Route>
                            <Route exact path="/confirmarEmail" component={ConfirmacaoEmail} ></Route>
                            <Route exact path="/confirmarTrocaSenha" render={renderTrocaSenha} ></Route>

                        </Switch>
                    {/* <Footer /> */}
                </BrowserRouter>
        </>
    );
}
export default Routes