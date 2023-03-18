import React, { useState, useEffect } from 'react';
import List from './List';
import LoadingOverlay from './LoadingOverlay';
import { getFriendsLists } from './api';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Lists = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Call the API to fetch the user's Close Friends lists
        getFriendsLists()
            .then(lists => {
                setLists(lists);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);


    const handleCreateList = () => {
        // Create a new Close Friends list using the Instagram API
        // Add the new list to the state using setLists()
    };

    const handleEditList = (listId, newName) => {
        // Update the name of the Close Friends list using the Instagram API
        // Update the list in the state using setLists()
    };

    const handleDeleteList = (listId) => {
        // Delete the Close Friends list using the Instagram API
        // Remove the list from the state using setLists()
    };

    return (
        <div>
            {loading && <LoadingOverlay />}
            <Typography variant="h5" gutterBottom>Friends</Typography>
            <ul>
                {lists.map((list) => (
                    <List
                        key={list.pk}
                        instagram={list}
                        onEdit={(newName) => handleEditList(list.id, newName)}
                        onDelete={() => handleDeleteList(list.id)}
                    />
                ))}
            </ul>
            <div>
                <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary" onClick={handleCreateList}>
                    Create List
                </Button>
            </div>
        </div>

    );
};

export default Lists;
