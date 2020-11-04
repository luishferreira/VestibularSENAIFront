import React from 'react';
import '../../../App.css'

class ConfirmaEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tempo: 3, cpf: this.props.location.search.replace('?','') }

        setInterval((_this) => {
            let tempo = this.state.tempo
            if (tempo > 0) {
                tempo--
                this.setState({ tempo })
            }
            else {
                this.props.history.push({
                    pathname: '/login/',
                    cpf: this.state.cpf
                  });
            }
        }, 1000, this);
    }

    render() {
        return (
            <div style={{ fontSize: '35px' }}>Email Confirmado, Redirecionando em: {this.state.tempo}</div>
        );
    }
}
export default ConfirmaEmail;