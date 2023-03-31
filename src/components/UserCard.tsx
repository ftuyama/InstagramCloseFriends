import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import User from '../instagram/User';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
        margin: '0 auto',
    },
}));

interface UserCardProps {
    user: User;
  }

const UserCard = ({ user } : UserCardProps) => {
    const classes = useStyles();
    return (
        <Card key={user.pk} className={classes.root}>
            <CardHeader
                avatar={<Avatar alt={user.username} src={`/instagram/${user.username}.jpg`} />}
                title={user.username}
            />
        </Card>

    );
};

export default UserCard;
