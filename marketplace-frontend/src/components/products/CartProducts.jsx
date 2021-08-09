import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import {DataContext} from '../Context';

class Cart extends Component {

    static contextType = DataContext;

    state = {
        currentUser: null
    }

    setUser = () => {
        
        const user = AuthService.getCurrentUser();

        if(user){
            this.setState({currentUser: user.id});
        }
        else{
            this.setState({currentUser: null});
        }
    }

    componentDidMount(){
        this.context.getTotal();
        this.setUser();
    }

    finalizeazaComanda = () =>{
        if(this.state.currentUser !== null){
            this.props.history.push('/plata');
        }
        else{
            alert("Trebuie sa fii autentificat pentru a finaliza comanda!");
        }
    }
    
    render() {

        const {cart, increase, reduction, removeProduct, total} = this.context;


        if(cart.length === 0){
            return (
                <h3 style={{textAlign:"center"}}>Cosul tau de cumparaturi este gol!</h3>)
        }
        else{
            return (

                <div>
                    <div style={{marginLeft:"15px"}}>
                        <small>QBEC-MARKETPLACE / COS CUMPARATURI</small>
                    </div>

                    <div>
                        <h2 style={{textAlign:"center", marginBottom:"30px"}}>Cosul de cumparaturi</h2>
                    </div>
                
                    <div style={{marginBottom:"15px"}}>
                    {
                            cart.map(item =>(
        
                                <div className="card-details-product cart" key={item.id}>
                                    
                                    <img src={item.imagine} alt=""/>
                                    
                                    <div className="box">
                                        <div className="row">                                        
                                            <h2>{item.titlu}</h2>                                  
                                        </div>
        
                                        
                                        <div style={{marginBottom:"25px"}}>
                                            <span style={{color:"red", fontSize:"x-large"}}>{item.pretReducere * item.count} RON</span>
                                        </div>

                                        <div>
                                            <p style={{marginLeft:"3px"}}>{item.descriere}</p>
                                        </div>
        
                                        <div className="amount">
                                            <button className="count" onClick={() => reduction(item.id)}> - </button>
                                            <span>{item.count}</span>
                                            <button className="count" onClick={() => increase(item.id)}> + </button>
                                        </div>
                                    </div>
        
                                    <div className="delete" onClick={() => removeProduct(item.id)}>X</div>
                                </div>
                            ))
                        }
        
                        <div className="total">
                            <button onClick={() => this.finalizeazaComanda()} className="btn btn-dark">PLASEAZA COMANDA</button>
                            <h3>Total: {total} RON</h3>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Cart;