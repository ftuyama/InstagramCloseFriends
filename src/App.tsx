import React from 'react';
import FriendList from './components/FriendList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TopMenu from './base/TopMenu';
import SideMenu from './base/SideMenu';
import Footer from './base/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
    <TopMenu />
    <SideMenu />
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <Paper elevation={3} style={{ padding: 24, margin: 24 }}>
          <Typography variant="h4" color="primary" gutterBottom>Instagram Close Friends List Manager</Typography>
          <FriendList />
        </Paper>
      </Grid>
    </Grid>
    <Footer />
  </div>
  );
};

export default App;
