import "./App.css";
import Classic from "./pages/Classic";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/classic">
              <Classic headerText="Classic" />
            </Route>
            <Route path="/hard">
              <Classic
                gameModifiers={{ hideSpaces: true }}
                headerText="Hardcore"
              />
            </Route>
            <Route path="/casual">
              <Classic
                headerText="Casual"
                gameModifiers={{ showPunctuation: true, keepCapitals: true }}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
      <CssBaseline />
    </div>
  );
}

export default App;
