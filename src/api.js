import axios from 'axios';

export async function getFriendsLists() {
    try {
        const response = await axios.get(`http://localhost:4000/friends`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
