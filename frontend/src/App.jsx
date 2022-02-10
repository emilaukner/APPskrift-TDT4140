import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FrontPage from "./containers/FrontPage/FrontPage";
import CreateRecipePage from "./containers/CreateRecipePage/CreateRecipePage";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ backgroundColor: "#F8F8F8" }}>
        <Switch>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <Route path="/my-recepies/">
            <p>My recepies page</p>
          </Route>
          <Route path="/create-recipe/">
            <CreateRecipePage />
          </Route>
        </Switch>
      </div>
      <p>Footer component</p>
    </Router>
  );
}

export default App;
