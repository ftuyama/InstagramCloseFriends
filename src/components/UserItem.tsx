import React, { useState } from 'react';
import { ListItem, Checkbox } from "@material-ui/core";
import UserCard from './UserCard';
import User from '../instagram/User';

const UserItem = ({ user, onUserSelect }: { user: User, onUserSelect: (user: User) => void }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = (user) => {
        if (!checked) {
            console.log(`${user.pk} selected`);
        } else {
            console.log(`${user.pk} deselected`);
        }
        setChecked(!checked);
        onUserSelect(user);
    };

    return (
        <ListItem key={'list-item' + user.pk} dense button onClick={() => handleToggle(user)}>
            <Checkbox key={'checkbox' + user.pk} checked={checked} tabIndex={-1} disableRipple />
            <UserCard
                key={'user' + user.pk}
                instagram={user}
            />
        </ListItem>
    );
};

export default UserItem;
