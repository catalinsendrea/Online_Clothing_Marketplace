import axios from 'axios';

const API_URL = "http://localhost:8080/users";

const getUsers = () =>{
    return axios.get(API_URL);
}

const deleteUser = (userID) =>{
    return axios.delete(API_URL + '/' + userID);
}

const UserService = {
    getUsers,
    deleteUser
};

export default UserService;