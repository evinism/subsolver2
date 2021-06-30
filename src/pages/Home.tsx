import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import "./Home.css";

interface GameModeLinkProps {
  to: string;
  title: string;
  description: string;
}

const GameModeLink = ({ to, title, description }: GameModeLinkProps) => (
  <Grid item xs>
    <Link to={to}>
      <Card>
        <CardHeader title={title} />
        <CardContent>{description}</CardContent>
      </Card>
    </Link>
  </Grid>
);

const Home = () => (
  <div className="main-content home-page">
    <h2>Select a Game Mode!</h2>
    <Grid container spacing={1}>
      <GameModeLink to="/classic" title="Classic" description="No Time Limit" />
    </Grid>
    <Grid container spacing={1}>
      <GameModeLink
        to="/hard"
        title="Hard"
        description="Spaces have been removed!"
      />
    </Grid>
  </div>
);

export default Home;
