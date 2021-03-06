import React from 'react';
import { Grid } from 'semantic-ui-react';

const Home = () => (
  <Grid textAlign="center" columns={2} padded relaxed="very" id="home">
    <Grid.Row>
      <Grid.Column width={7} className="column">
        <div className="top-left">
          <div className="text">GranData</div>
        </div>
      </Grid.Column>

      <Grid.Column width={7} className="column">
        <div className="top-right">
          <a href="/register" className="text">
            Register
          </a>
        </div>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={7} className="column">
        <div className="bottom-left">
          <a href="/login" className="text">
            Login
          </a>
        </div>
      </Grid.Column>

      <Grid.Column width={7} className="column">
        <div className="bottom-right text" style={{ textWrap: 'wrap' }}>
          The international grandfather database.
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Home;
