import React from 'react';
import { Switch, Route, withRouter, RouteComponentProps, Link, BrowserRouter as Router } from 'react-router-dom';
import tasklist_home from './tasklist_home';
import tasklist_datatable from './tasklist_datatable';
import tasklistForm from './tasklist_Form';
import API from './API';
import Redux from './Redux';
import Redux_1 from './Redux_1';
import ImportExcel from './ImportFromExcel';


class RounterConfig extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
          <Router>
            <div>
            <nav>
              <ul>
                <li>
                  <Link to={'/Home'}> Home </Link>
                </li>
                <li>
                  <Link to={'/CreateTask'}> Create a Task </Link>
                </li>
                <li>
                  <Link to={'/API'}> API </Link>
                </li>
                <li>
                  <Link to={'/Redux'}> Redux </Link>
                </li>
                {/* <li>
                  <Link to={'/Redux1'}> Redux 1</Link>
                </li> */}
                <li>
                  <Link to={'/ImportExcel'}> Import Excel Data</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path={'/Home'} exact component={tasklist_home} />
              <Route path={'/CreateTask'} exact component={tasklistForm} />
              <Route path={'/API'} exact component={API} />
              <Route path={'/Redux'} exact component={Redux} />
              {/* <Route path={'/Redux1'} exact component={Redux_1} /> */}
              <Route path={'/ImportExcel'} exact component={ImportExcel} />
            </Switch>
          </div>
          </Router>
        );
    }
}

export default RounterConfig;