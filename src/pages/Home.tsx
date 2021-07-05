import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import "./Home.css";

interface GameModeLinkProps {
  to: string;
  title: string;
  description: string;
}

const GameModeLink = ({ to, title, description }: GameModeLinkProps) => (
  <Link to={to}>
    <Card className="game-mode-card">
      <CardHeader title={title} />
      <CardContent>{description}</CardContent>
    </Card>
  </Link>
);

const Home = () => (
  <div className="home-page">
    <h1>
      Subsolver
      <span className="home-page-subtitle">
        : Online Substitution Cipher Game
      </span>
    </h1>
    <article className="main-content">
      <h2>Select a Game Mode</h2>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <GameModeLink
            to="/classic"
            title="Classic"
            description="Solve substitution ciphers at your own pace."
          />
        </Grid>
        <Grid item xs={6}>
          <GameModeLink
            to="/casual"
            title="Casual"
            description="Punctuation and capitalization included!"
          />
        </Grid>
        <Grid item xs={6}>
          <GameModeLink
            to="/hard"
            title="Hardcore"
            description="Spaces have been removed!"
          />
        </Grid>
        <Grid item xs={12}>
          <GameModeLink
            to="/tutorial"
            title="Tutorial"
            description="Learn the basics of how to play this game!"
          />
        </Grid>
      </Grid>
    </article>
  </div>
);

export default Home;
