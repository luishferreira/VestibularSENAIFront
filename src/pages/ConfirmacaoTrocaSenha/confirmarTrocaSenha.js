import React from 'react';
import FormTrocaSenha from '../../components/FormTrocaSenha/FormTrocaSenha'

class ConfirmacaoSenha extends React.Component {
constructor(props){
    super(props)
    this.state = {CPF: this.props.location.search.replace('?','')}
    console.log(this.state.CPF)
}

    render() {
        return (
            <div className="App">
                <FormTrocaSenha cpf={this.state.CPF} {...this.props}/>
            </div>
        );
    }
}
export default ConfirmacaoSenha;