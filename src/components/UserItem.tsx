import React, { useState, useEffect } from 'react';
import { ListItem, Checkbox } from "@material-ui/core";
import UserCard from './UserCard';
import User from '../instagram/User';

interface UserItemProps {
    user: User;
    onUserSelect: (user: User) => void;
  }

const UserItem = ({ user, onUserSelect }: UserItemProps) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = (user) => {
        setChecked(!checked);
        onUserSelect(user);
    };

    const setSelected = (_) => {
        setChecked(true);
    }

    const setUnSelected = (_) => {
        setChecked(false);
    }

    useEffect(() => {
        window.addEventListener('allSelected', setSelected);
        window.addEventListener('noSelected',  setUnSelected);
    }, []);

    return (
        <ListItem key={'list-item' + user.pk} dense button onClick={() => handleToggle(user)}>
            <Checkbox key={'checkbox' + user.pk} checked={checked} tabIndex={-1} disableRipple />
            <UserCard
                key={'user' + user.pk}
                user={user}
            />
        </ListItem>
    );
};

export default UserItem;
