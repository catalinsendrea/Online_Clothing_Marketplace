import React, { Component } from 'react';
import {DataContext} from '../Context';
import {Link } from "react-router-dom";

class FilterBar extends Component {

    static contextType = DataContext;

    constructor(props){
        super(props)

        this.state = {
            minPrice:'',
            maxPrice:''
        }

        this.setMinPriceHandler = this.setMinPriceHandler.bind(this);
        this.setMaxPriceHandler = this.setMaxPriceHandler.bind(this);
    }

    setMinPriceHandler = (event) => {
        this.setState({minPrice: event.target.value});
    }

    setMaxPriceHandler = (event) => {
        this.setState({maxPrice: event.target.value});
    }

    render() {
        return (
            <div className="filter-bar">
                
                <h4 style={{textAlign:"center", paddingTop:"5px"}}>PRODUSE</h4>
                
                <hr/>
                
                <ul className ="list-unstyled">
                    <Link style={{color:"black"}}>
                        <li onClick={() => this.context.filterPapuci()} className ="space-left">Papuci</li>
                    </Link>
                    <Link style={{color:"black"}}>
                        <li onClick={() => this.context.filterImbracaminte()} className ="space-left">Imbracaminte</li>
                    </Link>    
                </ul>

                <hr/>

                <strong className ="space-left">GEN</strong>

                <hr/>
                
                <div className="space-left">
                    <input onClick={() => this.context.filterBarbati()} type="checkbox" value="Barbati"></input>
                    <span style={{marginLeft:"5px"}}>Barbati</span>
                </div>

                <div className ="space-left">
                    <input onClick={() => this.context.filterFemei()} type="checkbox" value="Femei"></input>
                    <span style={{marginLeft:"5px"}}>Femei</span>
                </div>

                <div className ="space-left">
                    <input onClick={() => this.context.filterCopii()} type="checkbox" value="Copii"></input>
                    <span style={{marginLeft:"5px"}}>Copii</span>
                </div>

                <hr/>

                <strong className ="space-left">BRAND</strong>
                
                <hr/>

                <div className ="space-left">
                    <input onClick={() => this.context.filterAdidas()} type="checkbox" value="Adidas"></input>
                    <span style={{marginLeft:"5px"}}>Adidas</span>
                </div>

                <div className ="space-left">
                    <input onClick={() => this.context.filterNike()} type="checkbox" value="Nike"></input>
                    <span style={{marginLeft:"5px"}}>Nike</span>
                </div >

                <div className ="space-left">
                    <input onClick={() => this.context.filterPuma()} type="checkbox" value="Puma"></input>
                    <span style={{marginLeft:"5px"}}>Puma</span>
                </div>

                <div className ="space-left">
                    <input onClick={() => this.context.filterNewBalance()} type="checkbox" value="NewBalance"></input>
                    <span style={{marginLeft:"5px"}}>New Balance</span>
                </div>

                <hr/>

                <strong className ="space-left">MARIME</strong>

                <hr/>

                <div className ="col flex-column">

                    <div className="flex">

                        <div> 
                            <span>Papuci</span>

                            <div>
                                <input type="checkbox" value="30-36"></input>
                                <span style={{marginLeft:"5px"}}>30-36</span>
                            </div>

                            <div>
                                <input type="checkbox" value="36-38"></input>
                                <span style={{marginLeft:"5px"}}>36-38</span>
                            </div>

                            <div>
                                <input type="checkbox" value="38-40"></input>
                                <span style={{marginLeft:"5px"}}>38-40</span>
                            </div>

                            <div>
                                <input type="checkbox" value="40-42"></input>
                                <span style={{marginLeft:"5px"}}>40-42</span>
                            </div>

                            <div>
                                <input type="checkbox" value="42-44"></input>
                                <span style={{marginLeft:"5px"}}>42-44</span>
                            </div>

                            <div>
                                <input type="checkbox" value="44-48"></input>
                                <span style={{marginLeft:"5px"}}>44-48</span>
                            </div>
                        </div>
                        

                        <div style={{marginLeft:"10px"}}>
                            <span>Imbracaminte</span>
                            
                            <div className ="space-left">
                                <input type="checkbox" value="XS"></input>
                                <span style={{marginLeft:"5px"}}>XS</span>
                            </div>
                            
                            <div className ="space-left">
                                <input type="checkbox" value="S"></input>
                                <span style={{marginLeft:"5px"}}>S</span>
                            </div>

                            <div className ="space-left">
                                <input type="checkbox" value="M"></input>
                                <span style={{marginLeft:"5px"}}>M</span>
                            </div>

                            <div className ="space-left">
                                <input type="checkbox" value="L"></input>
                                <span style={{marginLeft:"5px"}}>L</span>
                            </div>

                            <div className ="space-left"> 
                                <input type="checkbox" value="XL"></input>
                                <span style={{marginLeft:"5px"}}>XL</span>
                            </div>

                            <div className ="space-left">
                                <input type="checkbox" value="XXL"></input>
                                <span style={{marginLeft:"5px"}}>XXL</span>
                            </div>
                        </div> 

                    </div> 
                </div>

                <hr/>

                <strong className ="space-left">PRET</strong>

                <hr/>

                <div className="space-left">
                    <input className="price-input-form" type="text" name="min" placeholder="min" value={this.state.minPrice} onChange={this.setMinPriceHandler}/>
                    <input className="price-input-form" type="text" name="max" placeholder="max" value={this.state.maxPrice} onChange={this.setMaxPriceHandler} style={{marginLeft:"20px"}}/>
                </div>

                <hr/>

                <strong className ="space-left">STARE PRODUS</strong>

                <hr/>

                <div className ="space-left">
                    <select className="select-stare-produs" name="stare" id="stare">
                        <option value="Toate">Toate</option>
                        <option onChange = {() => this.context.filterNou()} value="Nou">Nou</option>
                        <option onChange = {() => this.context.filterFolosit()} value="Folosit">Folosit</option>
                    </select>
                </div>

                <hr/>

                <div style={{padding:"10px"}}>
                    <button onClick={() => this.context.refreshProducts()} className="btn btn-warning btn-block">ELIMINA FILTRELE</button>
                </div>

                <div style={{padding:"10px"}}>
                    <button onClick={() => this.context.filterPret(this.state.minPrice, this.state.maxPrice)} className="btn btn-success btn-block">CAUTARE</button>
                </div>

            </div>
        );
    }
}

export default FilterBar;