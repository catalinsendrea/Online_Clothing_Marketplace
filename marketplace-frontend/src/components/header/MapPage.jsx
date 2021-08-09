import React, { Component } from 'react';

class MapPage extends Component {
    render() {
        return (
            <div className="container-fluid" style={{paddingBottom:"20px"}}>
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.117686717479!2d24.533926315557004!3d46.52557297912786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474bb7e9c990494f%3A0x3ed4ffbcdbf35a96!2sStrada%20Rozmarinului%208%2C%20T%C3%A2rgu%20Mure%C8%99!5e0!3m2!1sro!2sro!4v1618502816945!5m2!1sro!2sro" width="100%" height="600px" title="map"></iframe>
            </div>
        );
    }
}

export default MapPage;