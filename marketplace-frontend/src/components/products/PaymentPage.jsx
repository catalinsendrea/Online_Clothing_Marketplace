import React, { Component } from 'react';
import {DataContext} from '../Context';
import OrderService from '../../services/OrderService';
import AuthService from '../../services/AuthService';

class PaymentPage extends Component {

    static contextType = DataContext;

    constructor(props){
        super(props)

        this.state = {
            currentUser: null,
            emailCurrentUser:'',
            mentiuni: null,
            livrator: null,
            modalitate_plata: null,
            loading: false
        }

        this.setMentiuniHandler = this.setMentiuniHandler.bind(this);
    }

    setMentiuniHandler = (event) => {
        this.setState({mentiuni: event.target.value});
    }

    setUser = () => {
        
        const user = AuthService.getCurrentUser();


        if(user){
            this.setState({currentUser: user.id});
            this.setState({emailCurrentUser: user.email});
        }
        else{
            this.setState({currentUser: null});
            this.setState({emailCurrentUser: null});
        }
    }


    componentDidMount(){
        this.setUser();
    }

    setCargus = () =>{
        this.setState({livrator: "Cargus"});
    }

    setFanCourier = () =>{
        this.setState({livrator: "Fan Courier"});
    }

    setDHL = () =>{
        this.setState({livrator: "DHL"});
    }

    setPlata = () =>{
        this.setState({modalitate_plata: "Ramburs"});
    }


    confirmare = () =>{

        let idCartProducts = []
        for(let i = 0; i < this.context.cart.length; i++){
            idCartProducts.push(this.context.cart[i].id)
        }

        let stringIdCartProducts = ''
        for(let i = 0; i < idCartProducts.length; i++){
            if(i === 0){
                stringIdCartProducts += idCartProducts[i]
            }
            else{
                stringIdCartProducts += ',' + idCartProducts[i]
            }
        }


        this.setState({loading: true});

        if(this.state.livrator && this.state.modalitate_plata){
            let order = {
                id_cumparator: this.state.currentUser,
                email: this.state.emailCurrentUser,
                livrator: this.state.livrator,
                mentiuni: this.state.mentiuni,
                modalitate_plata: this.state.modalitate_plata,
                suma_plata: this.context.total,
                id_produse_comandate: stringIdCartProducts
            };

            if(order.mentiuni === null){
                order.mentiuni = "Nu sunt";
            }
    
            console.log('order => ' +JSON.stringify(order));
    
            OrderService.createOrder(order).then( res => {
                this.props.history.push('/confirmare-comanda-succes');
            });
        }
        else if(this.state.livrator === null && this.state.modalitate_plata){
            alert("Selectati serviciul de curierat pentru a putea confirma comanda!");
            this.setState({loading: false});
        }
        else if(this.state.modalitate_plata === null && this.state.livrator){
            alert("Selectati modalitatea de plata pentru a putea confirma comanda!");
            this.setState({loading: false});
        }
        else if(this.state.modalitate_plata === null && this.state.livrator === null){
            alert("Selectati serviciul de curierat si modalitatea de plata pentru a putea confirma comanda!");
            this.setState({loading: false});
        }
        
    }

    render() {

        const {cart,total} = this.context;

        return (
            <div style={{marginBottom:"15px"}}>

                <div style={{marginLeft:"15px"}}>
                    <small>QBEC-MARKETPLACE / FINALIZARE COMANDA</small>
                </div>

                <div>
                    <h2 style={{textAlign:"center", marginBottom:"30px"}}>Finalizare Comanda</h2>
                </div>

                <div>
                    <h4 style={{marginLeft:"15px"}}>COSUL TAU</h4>
                </div>

                <div>
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

                                    <span>{item.count} x BUCATI</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div style={{marginTop:"30px"}}>
                    <h4 style={{marginLeft:"15px"}}>LIVRARE SI PLATA</h4>
                    <hr/>
                </div>
                
                <div className="flex" style={{justifyContent:"space-between"}}>
                    <div style={{marginLeft:"15px"}}>
                        <h6>SERVICIUL DE CURIERAT</h6>

                        <div style={{marginTop:"25px"}}>
                            <span>Livrarea produselor este asigurata de firma de curierat pe care o selectati mai jos:</span>
                        </div>
                        
                        <div style={{marginTop:"35px"}}>
                            <input onClick={() => this.setFanCourier()} type="checkbox" value="FanCourier"></input>
                            <img style={{marginLeft:"15px"}} src = {"https://shop.footshop.ro/static/images/cart/delivery/fan-courier.svg"} alt="FanCourier"></img>
                            <span style={{marginLeft:"15px"}}>Fan Courier</span>
                        </div>

                        <div style={{marginTop:"20px"}}>
                            <input onClick={() => this.setCargus()} type="checkbox" value="Cargus"></input>
                            <img style={{marginLeft:"15px"}} src = {"https://shop.footshop.ro/static/images/cart/delivery/cargus.svg"} alt="Cargus"></img>
                            <span style={{marginLeft:"15px"}}>Cargus</span>
                        </div>

                        <div style={{marginTop:"20px"}}>
                            <input onClick={() => this.setDHL()} type="checkbox" value="DHL"></input>
                            <img style={{marginLeft:"15px"}} src = {"https://shop.footshop.ro/static/images/cart/delivery/dhl.svg"} alt="DHL"></img>
                            <span style={{marginLeft:"15px"}}>DHL Premium</span>
                        </div>
                    </div>
                    
                    <div>
                        <h6>PLATA</h6>

                        <div style={{marginTop:"25px"}}>
                            <span>Modalitate de plata:</span>
                        </div>

                        <div style={{marginTop:"20px"}}>
                            <strong>Plata ramburs</strong>
                        </div>

                        <div>
                            <span>Plata la preluarea coletului. Plata se face exclusiv cu numerar,</span>
                        </div>

                        <div>
                            <span> este bine sa ai suma potrivita la indemana in ziua livrarii.</span>
                        </div>

                        <div>
                            <input onClick={() => this.setPlata()} type="checkbox" value="Plata"></input>
                            <img style={{marginLeft:"15px"}} src = {"https://www.buzzsneakers.com/files/images/cash-01.jpg"} alt="Plata"></img>
                            
                        </div>
                        
                    </div>

                    <div/>
                </div>

                <hr/>

                <div style={{marginTop:"30px"}}>
                    <h4 style={{marginLeft:"15px"}}>ADRESA DE LIVRARE</h4>
                    <hr/>
                </div>

                <div>
                    <span style={{marginLeft:"15px"}}>Poti vedea adresa de livrare in contul tau la sectiunea "Profile".</span>
                </div>

                <div>
                    <span style={{marginLeft:"15px"}}>Daca adresa de livrare este diferita fata de cea din contul tau te rugam sa o completezi mai jos:</span>
                </div>

                <div className="flex" style={{justifyContent:"space-between", marginTop:"30px", marginLeft:"15px"}}>
                    <div>
                        <span>Adresa:</span>
                        <input style={{marginLeft:"10px"}} type="text" size = "45"></input>
                    </div>

                    <div>
                        <span>Cod postal:</span>
                        <input style={{marginLeft:"10px"}} type="text" size = "15"></input>
                    </div>

                    <div/>
                </div>

                <hr/>

                <div style={{marginTop:"30px"}}>
                    <h4 style={{marginLeft:"15px"}}>MENTIUNI DESPRE COMANDA</h4>
                    <hr/>
                </div>

                <div style={{marginLeft:"15px"}}>
                    <span>Mentiunea ta legata despre aceasta comanda:</span>
                </div>

                <div style={{marginLeft:"15px", marginTop:"20px"}}>
                    <input type="text" size = "145" value={this.state.mentiuni} onChange={this.setMentiuniHandler}></input>
                </div>

                <hr/>

                <div style={{marginTop:"30px"}}>
                    <h4 style={{marginLeft:"15px"}}>CONFIRMAREA COMENZII</h4>
                    <hr/>
                </div>

                <div className="total">
                        <button onClick={() => this.confirmare()} className="btn btn-dark" disabled={this.state.loading}>
                            {this.state.loading && (
                            <span style={{marginRight:"8px", marginBottom:"1px"}} className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>CONFIRMA</span>
                        </button>
                        <h3>Total: {total} RON</h3>
                </div>


            </div>
        );
    }
}

export default PaymentPage;