import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import WagerInstructions from './WagerInstructions';

const Wager = (props) => {
  if (!localStorage.getItem('token')) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Grid>
        <Grid.Column
          verticalAlign="middle"
          width={3}
          id="nav-column"
          textAlign="center"
          style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
        >
          <Navbar logout={props.logout} />
        </Grid.Column>

        <Grid.Column
          width={10}
          id="wager-background"
          textAlign="center"
          style={{ height: '110vh' }}
        />
        <Grid.Column
          width={3}
          style={{
            background: 'rgb(56, 65, 93)',
            height: '110vh',
            paddingLeft: '1em',
            paddingRight: '1em',
          }}
        >
          <WagerInstructions user={props.user} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Wager;
