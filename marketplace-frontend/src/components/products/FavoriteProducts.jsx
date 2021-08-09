import React, { Component } from 'react';
import {DataContext} from '../Context';

class FavoriteProducts extends Component {

    static contextType = DataContext;

    render() {

        const {favorite, removeFavorite} = this.context;

        if(favorite.length === 0){
            return (
                <h3 style={{textAlign:"center"}}>Nu aveti nici un produs preferat</h3>)
        }
        else{
            return (
                <div>
                    <div style={{marginLeft:"15px"}}>
                        <small>QBEC-MARKETPLACE / PRODUSE FAVORITE</small>
                    </div>

                    <div>
                        <h2 style={{textAlign:"center", marginBottom:"30px"}}>Produsele tale favorite</h2>
                    </div>

                    <div style={{marginBottom:"15px"}}>
                    {
                            favorite.map(item =>(
        
                                <div className="card-details-product cart" key={item.id}>
                                    
                                    <img src={item.imagine} alt=""/>
                                    
                                    <div className="box">
                                        <div className="row">                                        
                                            <h2>{item.titlu}</h2>                            
                                        </div>
                                                                                                                
                                        <div style={{marginBottom:"15px"}}>
                                            <span style={{color:"red", fontSize:"x-large"}}>{item.pretReducere} RON</span>
                                        </div>

                                        <div>
                                            <p style={{marginLeft:"3px"}}>{item.descriere}</p>
                                        </div>
                                    </div>
        
                                    <div className="delete" onClick={() => removeFavorite(item.id)}>X</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        }
    };
}


export default FavoriteProducts;