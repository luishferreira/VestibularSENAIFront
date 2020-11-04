import React from 'react';
import { Button } from 'reactstrap'
import { Switch, Route, withRouter } from 'react-router-dom';
import '../../App.css'

class Portal extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Switch>
                <Route exact path="/Portal/" render={() => (
                    <>
                        <Button color='danger' onClick={() => this.toggleModal()}>Clique aqui</Button>
                    </>
                )}>
                </Route>
            </Switch>
        );
    }
}
export default withRouter(Portal);