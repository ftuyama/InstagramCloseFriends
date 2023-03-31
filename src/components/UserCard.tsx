import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
        margin: '0 auto',
    },
}));

const UserCard = ({ instagram }) => {
    const classes = useStyles();
    return (
        <Card key={instagram.pk} className={classes.root}>
            <CardHeader
                avatar={<Avatar alt={instagram.username} src={instagram.profile_picture_url} />}
                title={instagram.username}
            />
        </Card>

    );
};

export default UserCard;
