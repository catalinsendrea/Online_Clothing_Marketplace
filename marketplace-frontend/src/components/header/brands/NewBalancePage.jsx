import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {DataContext} from '../../Context';
import FilterBar from '../../products/FilterBar';
import AuthService from '../../../services/AuthService';
import ProductsService from '../../../services/ProductsService';

class NewBalancePage extends Component {

    static contextType = DataContext;

    state = {
        currentUser: null,
        userRole: []
    }


    setUser = () => {
        
        const user = AuthService.getCurrentUser();

        if(user){
            this.setState({currentUser: user.id});
            this.setState({userRole: user.roles});
        }
        else{
            this.setState({currentUser: null});
            this.setState({userRole: null});
        }
    }


    componentDidMount(){
        this.setUser();
    }


    deleteProduct = (id) => {
        ProductsService.deleteProduct(id).then( res => {
            this.context.products = this.context.products.filter(product => product.id !== id);
            window.location.reload();
        });
    }


    updateProduct = (id) =>{
        this.props.history.push(`/update-product/${id}`);
    }

    render() {

        const {products} = this.context;
        const newBalanceProducts = products.filter(product => product.firma === "newBalance");
        const {currentUser} = this.state;
        const {userRole} = this.state;

        let admin = 0;


        if(userRole){
            userRole.forEach(role => {
                if(role.includes("ADMIN")){
                    admin = 1;
                }
            })
        }


        if(admin === 1 && currentUser != null){
            if(newBalanceProducts.length === 0){
                return (
                    <div className="col flex-column">
                        <div className="flex" style={{justifyContent:"space-around"}}>
                            <div style={{marginTop:"15px", marginBottom:"15px"}}>
                                <FilterBar/>
                            </div>

                            <div>
                                <h3 style={{textAlign:"center", marginTop:"12px"}}>Nu s-a gasit nici un produs disponibil!</h3>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div className="col flex-column">
    
                        <div className="flex">
    
                            <div style={{marginTop:"17px"}}>
                                <FilterBar/>
                            </div>
                            
                            <div id="product">
                                {
                                    newBalanceProducts.map(product =>(
    
                                        <div className="card-product" key = {product.id}>
                                            <Link to={`/product/${product.id}`}>
                                                <img src = {product.imagine} alt=""></img>
                                            </Link>
    
                                            <div className="content">
                                                <h3 style={{marginTop:"10px"}}>
                                                    <Link to={`/product/${product.id}`}>{product.titlu}</Link>
                                                </h3>
    
                                                <span className="card-product-span">{product.pret} RON</span>
    
                                                <span onClick = {() => this.deleteProduct(product.id)} style={{marginLeft:"155px"}}>
                                                    <i class="fas fa-trash-alt"></i>
                                                </span>
                                        
                                                <span onClick = {() => this.updateProduct(product.id)} style={{marginLeft:"15px"}}>
                                                    <i class="fas fa-edit"></i>
                                                </span>
    
                                                <span onClick = {() => this.context.addFavorite(product.id)}>
                                                    <i class="fas fa-heart" style={{marginLeft:"15px"}}></i>
                                                </span>
    
                                                <button onClick = {() => this.context.addCart(product.id)} className ="btn btn-dark btn-block" style={{marginTop:"15px"}}>Adauga in cos</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
    
                        </div>
    
                    </div>
                );
            }
        }
        else{
            if(newBalanceProducts.length === 0){
                return (
                    <div className="col flex-column">
                        <div className="flex" style={{justifyContent:"space-around"}}>
                            <div style={{marginTop:"15px", marginBottom:"15px"}}>
                                <FilterBar/>
                            </div>

                            <div>
                                <h3 style={{textAlign:"center", marginTop:"12px"}}>Nu s-a gasit nici un produs disponibil!</h3>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div className="col flex-column">
    
                        <div className="flex">
    
                            <div style={{marginTop:"17px"}}>
                                <FilterBar/>
                            </div>
                            
                            <div id="product">
                                {
                                    newBalanceProducts.map(product =>(
    
                                        <div className="card-product" key = {product.id}>
                                            <Link to={`/product/${product.id}`}>
                                                <img src = {product.imagine} alt=""></img>
                                            </Link>
    
                                            <div className="content">
                                                <h3 style={{marginTop:"10px"}}>
                                                    <Link to={`/product/${product.id}`}>{product.titlu}</Link>
                                                </h3>
    
                                                <span className="card-product-span">{product.pret} RON</span>
    
                                                <span onClick = {() => this.context.addFavorite(product.id)}>
                                                    <i class="fas fa-heart" style={{marginLeft:"215px"}}></i>
                                                </span>
    
                                                <button onClick = {() => this.context.addCart(product.id)} className ="btn btn-dark btn-block" style={{marginTop:"15px"}}>Adauga in cos</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
    
                        </div>
    
                    </div>
                );
            }
        }

    }
}

export default NewBalancePage;