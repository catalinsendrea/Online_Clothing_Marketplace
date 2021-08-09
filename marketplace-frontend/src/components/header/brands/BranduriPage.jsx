import React, { Component } from 'react';
import brand from "../../../images/brand2.png"
import {Link } from "react-router-dom";

class BranduriPage extends Component {

    render() {

        return (
            <div>
                <div>
                    <small>QBEC-MARKETPLACE / BRANDURI</small>
                </div>

                <div className="center-brand">
                    <img src = {brand} alt="logo" height="100px" style={{marginTop:"30px"}}></img>
                </div>

                
                <div className = "brands-container-1">
                    <div className="brands-container-2">
                        <div className = "brand-img">
                            <Link to={"/adidas"}>
                                <img src = {"https://www.buzzsneakers.com/files/images/2017/4/6/Originals_Logo_BWp.png"} alt="adidas"></img>
                            </Link>
                        </div>
                        
                        <div className = "brand-img">
                            <Link to={"/nike"}>
                                <img src = {"https://www.buzzsneakers.com/files/images/brendovi/nike(1).png"} alt="nike"></img>
                            </Link>
                        </div>

                        <div className = "brand-img">
                            <Link to={"/puma"}>
                                <img src = {"https://www.buzzsneakers.com/files/images/2017/3/28/puma-logo-crni.png"} alt ="puma"></img>
                            </Link>
                        </div>

                        <div className = "brand-img">
                            <Link to={"/newbalance"}>
                                <img src = {"https://www.buzzsneakers.com/files/images/brendovi/nb.png"} alt ="nb"></img>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default BranduriPage;