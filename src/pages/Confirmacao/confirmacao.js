import React from 'react';

class Confirmacao extends React.Component {
constructor(props){
    super(props)
    this.state = {CPF: this.props.location.search.replace('?','')}
    console.log(this.state.CPF)
}

    render() {
        return (
            <div className="App">
                Teste
            </div>
        );
    }
}
export default Confirmacao;