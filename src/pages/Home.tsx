import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Link as MuiLink,
} from "@mui/material";
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
      <span className="home-page-title">
        <img className="home-logo" src="/logo512.png" alt="" />
        <span>Subsolver</span>
      </span>
      <span className="home-page-subtitle">A Substitution Cipher Game!</span>
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
    <footer>
      <div>Created by Evin Sellin</div>

      <div className="footer-links">
        <MuiLink href="https://forms.gle/TEYQHP5SdYB5jGtf8">
          Suggest a Plaintext
        </MuiLink>
        <MuiLink href="https://en.wikipedia.org/wiki/Substitution_cipher">
          Wiki
        </MuiLink>
        <MuiLink href="https://github.com/evinism/subsolver2">Github</MuiLink>
        <MuiLink href="https://github.com/evinism">Author</MuiLink>
      </div>
    </footer>
  </div>
);

export default Home;
