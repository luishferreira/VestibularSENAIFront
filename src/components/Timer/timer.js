import React from 'react';
import moment from 'moment';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: { hours: this.props.hours ? this.props.hours : 0, minutes: this.props.minutes ? this.props.minutes : 0, seconds: this.props.seconds ? this.props.seconds : 0 },
        }
        var Timer_seconds = (((this.state.time.hours * 3600) + this.state.time.minutes * 60) + this.state.time.seconds);
        this.state = { ...this.state, Timer_seconds: Timer_seconds }
        this.iniciarContagem()
    }

    iniciarContagem = () => {
        setInterval(() => {
            let Timer_seconds = this.state.Timer_seconds
            if (Timer_seconds > 0) {
                Timer_seconds--;
                this.setState({ Timer_seconds })
            } else if (Timer_seconds === 0) {

            }
        }, 1000);
    }

    render() {
        let timer = moment("2020-01-01").startOf('day').seconds(this.state.Timer_seconds).format("HH:mm:ss");
        return (
            <div>{timer}</div>
        )
    }

} export default Timer;