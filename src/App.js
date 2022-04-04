import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login";
import Analysis from "./Analysis"
import Payment from "./Payment"
import SignUp from "./SignUp"
import Account from "./Account"
import CreateTask from './CreateTask';

/**
 * login page
 */
function App() { 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/SignUp" element={<SignUp/>}/>
        <Route exact path="/Analysis" element={<Analysis/>}/>
        <Route exact path="/Account" element={<Account/>}/>
        <Route exact path="/CreateTask" element={<CreateTask/>}/>
        <Route exact path="/Payment" element={<Payment/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
