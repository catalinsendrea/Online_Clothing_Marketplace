import axios from 'axios';

const API_URL = "http://localhost:8080/mesaj";


const createMesaj = (mesaj) =>{
    return axios.post(API_URL, mesaj);
}


const getMesaje = () =>{
    return axios.get(API_URL);
}


const getMesajByDestinatar = (mesajDestinatar) => {
    return axios.get(API_URL + '/' + mesajDestinatar);
}


const deleteMesaj = (mesajID) =>{
    return axios.delete(API_URL + '/' + mesajID);
}


const MesajeService = {
    createMesaj,
    getMesaje,
    getMesajByDestinatar,
    deleteMesaj
};

export default MesajeService;