import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Error from '../../components/Portal/PortalError/error'
import '../../App.css'

class PortalError extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/Portal" render={() => <Error {...this.props} />} />
            </Switch>
        );
    }
}
export default withRouter(PortalError);