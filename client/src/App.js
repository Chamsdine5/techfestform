import { BrowserRouter as Router, Route } from "react-router-dom";
import VolunteerForm from "./components/layout/VolunteerForm";
import ThankYou from "./components/layout/ThankYou";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
      <Router>
          <div className="App">
              <Route exact path="/" component={VolunteerForm} />
              <Route exact path="/ThankYou" component={ThankYou} />
          </div>
      </Router>
  );
}

export default App;
