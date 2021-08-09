import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {DataContext} from '../Context';
import AuthService from '../../services/AuthService';
import ProductsService from '../../services/ProductsService';

class ReduceriPage extends Component {

    static contextType = DataContext;


    state = {
        currentUser: null,
        userRole: []
    }


    deleteProduct = (id) => {
        ProductsService.deleteProduct(id).then( res => {
            this.context.products = this.context.products.filter(product => product.id !== id);
            window.scrollTo(0, 0);
            window.location.reload();
        });
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


    updateProduct = (id) =>{
        this.props.history.push(`/update-product/${id}`);
    }

    render() {

        const {products} = this.context;
        const reduceProducts = products.filter(product => product.reducere !== 0);
        const {currentUser} = this.state;
        const {userRole} = this.state;

        console.log(reduceProducts);

        let admin = 0;

        if(userRole){
            userRole.forEach(role => {
                if(role.includes("ADMIN")){
                    admin = 1;
                }
            })
        }

        if(admin === 1 && currentUser != null){
            if(reduceProducts.length === 0){
                return (
                    <h3 style={{textAlign:"center"}}>Nu exista nici un produs la reducere momentan!</h3>)
            }
            else{
                return (
                    
                    <div id="product">
                        {
                            reduceProducts.map(product =>(
    
                                <div className="card-product" key = {product.id}>
                                    <Link to={`/product/${product.id}`}>
                                        <img src = {product.imagine} alt=""></img>
                                    </Link>
    
                                    <div className="content">
                                        <h3 style={{marginTop:"10px"}}>
                                            <Link to={`/product/${product.id}`}>{product.titlu}</Link>
                                        </h3>
    
                                        <span className="card-product-span" style={{textDecoration:"line-through"}}>{product.pret} RON</span>

                                        <span className="card-product-span" style={{marginLeft:"15px"}}>{product.pretReducere} RON</span>

                                        <span onClick = {() => this.deleteProduct(product.id)} style={{marginLeft:"80px"}}>
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
    
                    
                );
            }
        }
        else{
            if(reduceProducts.length === 0){
                return (
                    <h3 style={{textAlign:"center"}}>Nu exista nici un produs la reducere momentan!</h3>)
            }
            else{
                return (
                    
                    <div id="product">
                        {
                            reduceProducts.map(product =>(
    
                                <div className="card-product" key = {product.id}>
                                    <Link to={`/product/${product.id}`}>
                                        <img src = {product.imagine} alt=""></img>
                                    </Link>
    
                                    <div className="content">
                                        <h3 style={{marginTop:"10px"}}>
                                            <Link to={`/product/${product.id}`}>{product.titlu}</Link>
                                        </h3>
    
                                        <span className="card-product-span" style={{textDecoration:"line-through"}}>{product.pret} RON</span>

                                        <span className="card-product-span" style={{marginLeft:"15px"}}>{product.pret - (product.reducere * product.pret) *0.01} RON</span>
    
                                        <span onClick = {() => this.context.addFavorite(product.id)}>
                                            <i class="fas fa-heart" style={{marginLeft:"140px"}}></i>
                                        </span>
    
                                        <button onClick = {() => this.context.addCart(product.id)} className ="btn btn-dark btn-block" style={{marginTop:"15px"}}>Adauga in cos</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                );
            }
        }
    }
}

export default ReduceriPage;