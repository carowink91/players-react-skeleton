import React from 'react';
import { Grid } from 'semantic-ui-react';

const Home = () => (
  <Grid textAlign="center" columns={2} padded relaxed="very" id="home">
    <Grid.Row>
      <Grid.Column width={7} className="column">
        <div className="top-left">
          <div className="text">Granny Swap</div>
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
    <br />
    <Grid.Row>
      <Grid.Column width={7} className="column">
        <div className="bottom-left">
          <a href="/login" className="text">
            Login
          </a>
        </div>
      </Grid.Column>

      <Grid.Column width={7} className="column">
        <div className="bottom-right">
          <div className="text">The international grandmother marketplace.</div>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Home;

// <div className="home-container">
//   <Grid
//     verticalAlign="middle"
//     columns={4}
//     centered
//     divided
//     padded
//     relaxed="very"
//     className="centered"
//   >
//     <Grid.Row>
//       <Grid.Column>
//         <div className="outer-container">Granny Swap</div>
//       </Grid.Column>
//       <Grid.Column>
//         <a href="/login">Login</a>
//         <br />
//         <a href="/register">Register</a>
//       </Grid.Column>
//       <Grid.Column>
//         <div className="outer-container">
//           The International Grandmother Market.
//         </div>
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
// </div>
