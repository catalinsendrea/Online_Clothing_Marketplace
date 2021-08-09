import axios from 'axios';

const API_URL = "http://localhost:8080/produse";

const getProducts = () =>{
    return axios.get(API_URL);
}

const deleteProduct = (productID) =>{
    return axios.delete(API_URL + '/' + productID);
}

const createProduct = (product) =>{
    return axios.post(API_URL, product);
}

const updateProduct = (product, productID) =>{
    return axios.put(API_URL + '/' + productID, product);
}

const getProductById = (productID) => {
    return axios.get(API_URL + '/' + productID);
}

const ProductsService = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
};

export default ProductsService;