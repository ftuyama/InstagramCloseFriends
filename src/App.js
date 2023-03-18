import React from 'react';
import Lists from './Lists';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const App = () => {
  return (
    <div className="App">
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h4" color="primary" gutterBottom>Instagram Close Friends List Manager</Typography>
          <Lists />
        </Paper>
      </Grid>
    </Grid>
  </div>
  );
};

export default App;
