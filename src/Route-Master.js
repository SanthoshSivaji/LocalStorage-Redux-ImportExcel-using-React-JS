import React from 'react';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Tasklist_Form from './Tasklist_Form';
import tasklist_datatable from './tasklist_datatable';
import tasklist_home from './tasklist_home'


class RouteMaster extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div>
            <nav>
              <ul>
                <li>
                  <Link to={'/tasklist_home'}> Home </Link>
                </li>
                <li>
                  <Link to={'/Tasklist_Form'}> Create a Task </Link>
                </li>
                <li>
                  <Link to={'/tasklist_datatable'}> Task List </Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path={'/tasklist_home'} exact component={tasklist_home} />
              <Route path={'/Tasklist_Form'} exact component={Tasklist_Form} />
              <Route path={'/tasklist_datatable'} exact component={tasklist_datatable} />
            </Switch>
          </div>
        );
    }
}

export default RouteMaster;