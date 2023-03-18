import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
    },
}));


function LoadingOverlay() {
    const classes = useStyles();

    return (
        <div className={classes.overlay}>
            <CircularProgress color="primary" />
        </div>
    );
}

export default LoadingOverlay;
