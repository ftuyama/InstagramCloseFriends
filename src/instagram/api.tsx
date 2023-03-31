import axios from 'axios';

export async function getFriendsLists(searchTerm) {
    try {
        const response = await axios.get(`http://localhost:4000/friends?searchTerm=${searchTerm}`);
        console.log(`${response.data.length} friends returned`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function setCloseFriends(closeFriendsList) {
    try {
        const response = await axios.post(`http://localhost:4000/close-friends`, { closeFriendsList });
        console.log(`${response.data} returned`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCloseFriendsLists() {
    try {
        const response = await axios.get(`http://localhost:4000/close-friends`);
        console.log(`${response.data.length} close friends returned`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
