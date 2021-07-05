import "./App.css";
import Classic from "./pages/Classic";
import Home from "./pages/Home";
import Tutorial from "./pages/Tutorial";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Helmet from "react-helmet";
import TouchscreenInputHandler from "./inputTypes/TouchscreenInputHandler";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Title = ({ title }: { title: string }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/classic">
              <Title title="Subsolver - Classic" />
              <Classic headerText="Classic" />
            </Route>
            <Route path="/hard">
              <Title title="Subsolver - Hardcore" />
              <Classic
                gameModifiers={{ hideSpaces: true }}
                headerText="Hardcore"
              />
            </Route>
            <Route path="/casual">
              <Title title="Subsolver - Casual" />
              <Classic
                headerText="Casual"
                gameModifiers={{ showPunctuation: true, keepCapitals: true }}
              />
            </Route>
            <Route path="/tutorial">
              <Title title="Subsolver - Tutorial" />
              <Tutorial />
            </Route>
            <Route path="/test">
              <TouchscreenInputHandler />
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
