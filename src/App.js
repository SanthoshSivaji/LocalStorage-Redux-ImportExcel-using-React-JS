// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react';
import './App.css';
import { Provider } from "react-redux";
import stores from './Redux/Reducer';
import stores1 from './Redux/Reducer_1';

// import FormDataComponent from './components/form-data-component';
import RounterConfig from './router_config';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={stores}>
          <RounterConfig />
        </Provider>
        
      </div>
    );
  }
}

export default App;
