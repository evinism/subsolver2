import "./App.css";
import Classic from "./pages/Classic";
import Header from "./Header";
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
          <Header />
          <Switch>
            <Route path="/hard">
              <Classic gameModifiers={{ hideSpaces: true }} />
            </Route>
            <Route path="/">
              <Classic />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
      <CssBaseline />
    </div>
  );
}

export default App;
