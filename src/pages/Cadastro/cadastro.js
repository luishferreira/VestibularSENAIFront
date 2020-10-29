import React from 'react';
import FormCadastro from '../../components/FormCadastro/FormCadastro';

class Cadastro extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <Button color='danger'>Clique aqui</Button> */}
                <FormCadastro {...this.props}/>
            </div>
        );
    }
}
export default Cadastro;