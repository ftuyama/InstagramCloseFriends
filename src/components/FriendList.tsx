import React, { useState, useEffect } from 'react';
import debounce from "lodash/debounce";
import User from '../instagram/User';
import UserItem from './UserItem';
import LoadingOverlay from './LoadingOverlay';
import { getFriendsLists, setCloseFriends } from '../instagram/api';
import { Typography, TextField, Button } from "@material-ui/core";

const FriendList = () => {
    const [lists, setLists] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    useEffect(() => {
        fetchFriends('')
    }, []);


    const handleCreateList = (event) => {
        event.preventDefault();
        setLoading(true);

        // Create a new Close Friends list using the Instagram API
        // Add the new list to the state using setLists()
        setCloseFriends(selectedUsers)
            .catch(error => console.error(error)).finally(() => setLoading(false))
    };

    const handleUserToggle = (user: User) => {
        const currentIndex = selectedUsers.indexOf(user.pk);
        const newSelectedUsers = [...selectedUsers];

        if (currentIndex === -1) {
            newSelectedUsers.push(user.pk);
        } else {
            newSelectedUsers.splice(currentIndex, 1);
        }

        setSelectedUsers(newSelectedUsers);

        console.log(`Selected users: ${newSelectedUsers}`);
    };

    const fetchFriends = (searchTerm) => {
        // Call the API to fetch the user's Close Friends lists
        console.log(`Searching for term: ${searchTerm}`);
        getFriendsLists(searchTerm)
            .then(lists => {
                setLists(lists);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }

    const searchFriends = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        handleSearch(value);
    };

    const handleSearch = debounce((searchTerm) => {
        fetchFriends(searchTerm)
    }, 1000);

    return (
        <div>
            {loading && <LoadingOverlay />}
            <Typography variant="h5" gutterBottom>Friends List</Typography>
            <div>
                <TextField
                    required
                    fullWidth
                    label="Search by username"
                    margin="normal"
                    variant="outlined"
                    onChange={searchFriends}
                />
            </div>
            <div style={{ padding: '20px 0 40px 0', maxHeight: "400px", overflow: "scroll" }}>
                {lists && lists.length > 0 && lists.map((user: User) => (
                    <UserItem key={user.pk} user={user} onUserSelect={handleUserToggle} />
                ))}
            </div>
            <div>
                <Button type="submit" variant="contained" color="primary" onClick={handleCreateList}>
                    Create List
                </Button>
            </div>
        </div>

    );
};

export default FriendList;
