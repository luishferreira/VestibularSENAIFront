import React from 'react';

class Error extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = { tempo: 3 }
        // window.addEventListener("beforeunload", (ev) => {
        //     ev.preventDefault();
        //     return ev.returnValue = 'Are you sure you want to close?';
        // });

        setInterval((_this) => {
            let tempo = this.state.tempo
            if (tempo > 0) {
                tempo--
                this.setState({ tempo })
            }
            else if (tempo === 0) {
                this.props.history.push('/')
                //logica para quando acabar o tempo da prova
            }
        }, 1000, this);
    }

    render() {
        return (
            <div style={{ fontSize: '35px' }}>Você não está logado, será redirecionado em {this.state.tempo}</div>
        );
    }
}
export default Error;