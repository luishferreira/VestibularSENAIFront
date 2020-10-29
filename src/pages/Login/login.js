import React from 'react';
import FormLogin from '../../components/FormLogin/FormLogin.js';

class Login extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="App">
                {/* <Button color='danger'>Clique aqui</Button> */}
                <FormLogin {...this.props}/>
            </div>
        );
    }
}
export default Login;