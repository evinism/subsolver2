import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import "./Home.css";
import Header from "../Header";

interface GameModeLinkProps {
  to: string;
  title: string;
  description: string;
}

const GameModeLink = ({ to, title, description }: GameModeLinkProps) => (
  <Grid item xs>
    <Link to={to}>
      <Card className="game-mode-card">
        <CardHeader title={title} />
        <CardContent>{description}</CardContent>
      </Card>
    </Link>
  </Grid>
);

const Home = () => (
  <div className="home-page">
    <h1>Subsolver: Free online substitution cipher puzzles!</h1>
    <article className="main-content">
      <h2>Select a Game Mode</h2>
      <Grid container spacing={1}>
        <GameModeLink
          to="/classic"
          title="Classic"
          description="Solve substitution ciphers at your own pace."
        />
      </Grid>
      <Grid container spacing={1}>
        <GameModeLink
          to="/casual"
          title="Casual"
          description="Punctuation and capitalization included!"
        />
        <GameModeLink
          to="/hard"
          title="Hardcore"
          description="Spaces have been removed!"
        />
      </Grid>
    </article>
  </div>
);

export default Home;
