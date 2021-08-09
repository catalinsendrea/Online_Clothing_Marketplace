import axios from 'axios';

const API_URL = "http://localhost:8080/comanda";

const createOrder = (order) =>{
    return axios.post(API_URL, order);
}

const getOrders = () =>{
    return axios.get(API_URL);
}

const getOrderByEmailCumparator = (email) => {
    return axios.get(API_URL + '/' + email);
}

const ComandaService = {
    createOrder,
    getOrders,
    getOrderByEmailCumparator
};

export default ComandaService;