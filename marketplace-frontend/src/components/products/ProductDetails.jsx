import React, { Component } from 'react';
import {DataContext} from '../Context';
import AuthService from '../../services/AuthService';
import { Modal } from 'react-bootstrap';
import MesajService from '../../services/MesajService';
import Carousel from 'react-elastic-carousel';
import {Link} from 'react-router-dom';

class Details extends Component {
    
    static contextType = DataContext;

    constructor(props){
        super(props)

        this.state = {
            currentUser: null,
            userRole: [],
            usernameCurrentUser:'',
            comentariuProdus:'',
            jsonComentarii: [],
            showModalPage: false,
            showModalConfirmPage: false,
            destinatar:'',
            subiect:'',
            mesaj:'',
        }

        this.setDestinatarHandler = this.setDestinatarHandler.bind(this);
        this.setSubiectHandler = this.setSubiectHandler.bind(this);
        this.setMesajHandler = this.setMesajHandler.bind(this);
        this.setComentariuProdusHandler = this.setComentariuProdusHandler.bind(this);
    }


    setDestinatarHandler = (event) => {
        this.setState({destinatar: event.target.value});
    }


    setSubiectHandler = (event) => {
        this.setState({subiect: event.target.value});
    }


    setMesajHandler = (event) => {
        this.setState({mesaj: event.target.value});
    }


    handleShowModalPage = () => {
        if(this.state.currentUser != null){
            this.setState({showModalPage: true});
        }
        else{
            alert("Trebuie sa fii autentificat pentru a trimite un mesaj!");
        }
    }


    closeModalPage = () => {
        this.setState({showModalPage: false});
        this.setState({destinatar: ''});
        this.setState({subiect: ''});
        this.setState({mesaj: ''});
    }


    closeModalConfirmPage = () => {
        this.setState({showModalConfirmPage: false});
        this.setState({destinatar: ''});
        this.setState({subiect: ''});
        this.setState({mesaj: ''});
    }


    creareMesaj = () => {
        
        let mesaj = {
            expeditor: this.state.usernameCurrentUser,
            subiect: this.state.subiect,
            mesaj: this.state.mesaj,
            destinatar: this.state.destinatar
        };

        console.log('mesaj => ' +JSON.stringify(mesaj));

        if(mesaj.destinatar === "qbec-marketplace"){
            mesaj.destinatar = "qbec";
        }

        MesajService.createMesaj(mesaj).then(res =>{
            this.setState({showModalPage: false});
            this.setState({showModalConfirmPage: true});
        });
    }


    setComentariuProdusHandler = (event) => {
        this.setState({comentariuProdus: event.target.value});
    }
   

    setUser = () => {
        
        const user = AuthService.getCurrentUser();

        if(user){
            this.setState({currentUser: user.id});
            this.setState({usernameCurrentUser: user.username});
            this.setState({userRole: user.roles});
        }
        else{
            this.setState({currentUser: null});
            this.setState({usernameCurrentUser: null});
            this.setState({userRole: null});
        }
    }


    refreshComentarii = () =>{
        this.setState({jsonComentarii: []});
    }


    componentDidUpdate(){
        localStorage.setItem('jsonComentarii', JSON.stringify(this.state.jsonComentarii));
    };


    componentDidMount(){
        this.setUser();

        const dataJsonComentarii = JSON.parse(localStorage.getItem('jsonComentarii'));
        if(dataJsonComentarii !== null){
            this.setState({jsonComentarii: dataJsonComentarii});
        }
    };


    posteazaComentariuProdus = () =>{
        if(this.state.currentUser){
            
            let comentariu = {
                username: this.state.usernameCurrentUser,
                text: this.state.comentariuProdus
            };

            let index =  this.state.jsonComentarii.findIndex((element) => element.id === this.props.match.params.id);

            if(index === -1){
                let variabila = {
                    id: this.props.match.params.id,
                    listaComentarii: [comentariu]
                };

                this.state.jsonComentarii.push(variabila)
            }
            else{
                this.state.jsonComentarii[index].listaComentarii.push(comentariu)
            }
          
            this.setState({comentariuProdus: ''});
            
        }
        else{
            alert("Trebuie sa fii logat pentru a lasa un comentariu!");
        }
    }


    render() {
        
        const {addCart} = this.context;
        const {addFavorite} = this.context;
        const {products} = this.context;
        const toateProduseleFaraCelCurent = products.filter(produs => produs.id.toString() !== this.props.match.params.id)
        const comentariiByProduct = this.state.jsonComentarii.filter(element => element.id === this.props.match.params.id)
        const {currentUser} = this.state;
        const {userRole} = this.state;

        let admin = 0;
        let listaFinalaComentarii = [];
        let produseRecomandate = [];


        const currentProduct = products.filter(item =>{
            var StringitemID = item.id.toString();
            return StringitemID === this.props.match.params.id
        })


        if(userRole){
            userRole.forEach(role => {
                if(role.includes("ADMIN")){
                    admin = 1;
                }
            })
        }

        
        if(currentProduct[0]){
            produseRecomandate = toateProduseleFaraCelCurent.filter(produs => (
                produs.tip_produs === currentProduct[0].tip_produs
                )
            );
        }


        if(comentariiByProduct[0]){
            listaFinalaComentarii = comentariiByProduct[0].listaComentarii;
        }


        const breakPoints = [
            {width: 200, itemsToShow: 1},
            {width: 450, itemsToShow: 2},
            {width: 700, itemsToShow: 3},
            {width: 950, itemsToShow: 4},
            {width: 1200, itemsToShow: 5},
            {width: 1450, itemsToShow: 6}
        ];

        if(admin === 1 && currentUser != null){
            return (
                <div>
                    <div>
                    {
                            currentProduct.map(item =>(
                                
                                <div>
    
                                    <div style={{marginLeft:"15px", marginBottom:"20px"}}>
                                        <span>
                                            <i class="fas fa-user"></i> : {item.proprietar}
                                        </span>
    
                                        <button className="btn btn-outline-secondary btn-sm"  onClick={() => this.handleShowModalPage()} style={{marginLeft:"15px", marginTop:"5px"}}>CONTACT</button>

                                    </div>

                                    
                                    <div className="card-details-product" key={item.id}>
                                        
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
            
                                            <button className ="btn btn-dark" onClick={() => addCart(item.id)} >Adauga in cos</button>
                                            <span onClick={() => addFavorite(item.id)} style = {{marginLeft:"20px"}}>
                                                <i class="fas fa-heart"></i>
                                            </span>
            
                                        </div>
                                    </div>
    
                                    <div>
                                        <Modal show = {this.state.showModalPage}>
                                        <Modal.Body>
    
                                            <div>
                                                <span onClick={() => this.closeModalPage()} className="delete">X</span>
                                            </div>
    
                                            <div>
                                                <strong>Catre:</strong>
                                            </div>
    
                                            <div style={{marginTop:"5px"}}>
                                                <input type="text" value={this.state.destinatar} onChange={this.setDestinatarHandler} placeholder={item.proprietar} name ="catre" className="form-control"></input>
                                            </div>
    
                                            <div style={{marginTop:"20px"}}>
                                                <strong>Subiect:</strong>
                                            </div>
    
                                            <div style={{marginTop:"5px"}}>
                                                <input type="text" value={this.state.subiect} onChange={this.setSubiectHandler} placeholder={item.titlu} name ="subiect" className="form-control"></input>
                                            </div>
    
                                            <div style={{marginTop:"20px"}}>
                                                <strong>Mesaj:</strong>
                                            </div>
    
                                            <div style={{marginTop:"5px"}}>
                                                <textarea type="text" value={this.state.mesaj} onChange={this.setMesajHandler} placeholder="Scrie mesajul tau aici..." name ="mesaj" className="form-control"></textarea>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button onClick={() => this.creareMesaj()} className="btn btn-success btn-block">Trimite</button>
                                        </Modal.Footer>
                                        </Modal>
                                    </div>
    
                                    <div>
                                        <Modal show = {this.state.showModalConfirmPage}>
                                        <Modal.Body>
    
                                            <div>
                                                <span onClick={() => this.closeModalConfirmPage()} className="delete">X</span>
                                            </div>
    
                                            <div>
                                                <span style={{textAlign:"center"}}>Mesajul dumneavoastra a fost trimis cu succes!</span>
                                            </div>
    
                                        </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
    
                    <hr/>
    
                    <div style={{marginBottom:"25px"}}>
                        <h4 style={{marginLeft:"15px"}}>Produse care te-ar mai putea interesa</h4>
                    </div>
    
                    <div>
                        <Carousel breakPoints={breakPoints}>
                        {
                            produseRecomandate.map(produs => (
                                <div className="carousel-product-card"  key = {produs.id}>
    
                                    <Link to={`/product/${produs.id}`}>
                                        <img height="200px" width="230px" src={produs.imagine} alt=""/>
                                    </Link>
                                    
                                    <Link style={{textDecoration:"none", color:"black"}} to={`/product/${produs.id}`}>
                                        <strong style={{marginTop:"10px"}}>{produs.titlu}</strong>
                                    </Link>
                    
                                    <span style={{color:"red", marginTop:"5px"}}>{produs.pret} LEI</span>
    
                                </div>
                            ))
                        }
                        </Carousel>
                    </div>
    
                    <hr/>
                
                    <div style={{marginBottom:"25px"}}>
                        <h4 style={{marginLeft:"15px"}}>Comentarii produs</h4>
                    </div>
                    
                    <div>
                        <div>
                            {
                                listaFinalaComentarii.map(comentariu => (
                                    <div>
                                        <div style={{marginBottom:"-17px"}}>
                                            <span className="caseta-username "> <i class="fas fa-user"></i> {comentariu.username}:</span>
                                        </div>
                                        
                                        <div class="dialogbox">
                                            <div class="body">
                                                <span class="tip tip-left"></span>
                                                        
                                                <div class="message">
                                                    <span>{comentariu.text}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))
                            }
                        </div>  
                    </div>  
    
                    <div>
                        <textarea value={this.state.comentariuProdus} onChange={this.setComentariuProdusHandler} className="caseta-comentariu" placeholder="Adauga comentariul tau aici." type="text"></textarea>
                    </div>
    
                    <div style={{marginBottom:"15px"}}>
                        <button onClick={() => this.posteazaComentariuProdus()} style={{marginLeft:"15px", marginTop:"15px", marginBottom:"15px"}} className="btn btn-warning">Posteaza Comentariul</button>
                        <button style={{marginLeft:"20px"}} className="btn btn-dark" onClick={() => this.refreshComentarii()}>Sterge Comentarii</button>
                    </div>
    
                </div>
            );
        }
        else{
            return (
                <div>
                    <div>
                    {
                            currentProduct.map(item =>(
                                
                                <div>
    
                                    <div style={{marginLeft:"15px", marginBottom:"20px"}}>
                                        <span>
                                            <i class="fas fa-user"></i> : {item.proprietar}
                                        </span>
    
                                        <button className="btn btn-outline-secondary btn-sm"  onClick={() => this.handleShowModalPage()} style={{marginLeft:"15px", marginTop:"5px"}}>CONTACT</button>
                                    </div>
    
                                    <div className="card-details-product" key={item.id}>
                                        
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
            
                                            <button className ="btn btn-dark" onClick={() => addCart(item.id)} >Adauga in cos</button>
                                            <span onClick={() => addFavorite(item.id)} style = {{marginLeft:"20px"}}>
                                                <i class="fas fa-heart"></i>
                                            </span>
            
                                        </div>
                                    </div>
    
                                    <div>
                                        <Modal show = {this.state.showModalPage}>
                                        <Modal.Body>
    
                                            <div>
                                                <span onClick={() => this.closeModalPage()} className="delete">X</span>
                                            </div>
    
                                            <div>
                                                <strong>Catre:</strong>
                                            </div>
    
                                            <div style={{marginTop:"5px"}}>
                                                <input type="text" value={this.state.destinatar} onChange={this.setDestinatarHandler} placeholder={item.proprietar} name ="catre" className="form-control"></input>
                                            </div>
    
                                            <div style={{marginTop:"20px"}}>
                                                <strong>Subiect:</strong>
                                            </div>
    
                                            <div style={{marginTop:"5px"}}>
                                                <input type="text" value={this.state.subiect} onChange={this.setSubiectHandler} placeholder={item.titlu} name ="subiect" className="form-control"></input>
                                            </div>
    
                                            <div style={{marginTop:"20px"}}>
                                                <strong>Mesaj:</strong>
                                            </div>
    
                                            <div style={{marginTop:"5px"}}>
                                                <textarea type="text" value={this.state.mesaj} onChange={this.setMesajHandler} placeholder="Scrie mesajul tau aici..." name ="mesaj" className="form-control"></textarea>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button onClick={() => this.creareMesaj()} className="btn btn-success btn-block">Trimite</button>
                                        </Modal.Footer>
                                        </Modal>
                                    </div>
    
                                    <div>
                                        <Modal show = {this.state.showModalConfirmPage}>
                                        <Modal.Body>
    
                                            <div>
                                                <span onClick={() => this.closeModalConfirmPage()} className="delete">X</span>
                                            </div>
    
                                            <div>
                                                <span style={{textAlign:"center"}}>Mesajul dumneavoastra a fost trimis cu succes!</span>
                                            </div>
    
                                        </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
    
                    <hr/>
    
                    <div style={{marginBottom:"25px"}}>
                        <h4 style={{marginLeft:"15px"}}>Produse care te-ar mai putea interesa</h4>
                    </div>
    
                    <div>
                        <Carousel breakPoints={breakPoints}>
                        {
                            produseRecomandate.map(produs => (
                                <div className="carousel-product-card"  key = {produs.id}>
    
                                    <Link to={`/product/${produs.id}`}>
                                        <img height="200px" width="230px" src={produs.imagine} alt=""/>
                                    </Link>
                                    
                                    <Link style={{textDecoration:"none", color:"black"}} to={`/product/${produs.id}`}>
                                        <strong style={{marginTop:"10px"}}>{produs.titlu}</strong>
                                    </Link>
                    
                                    <span style={{color:"red", marginTop:"5px"}}>{produs.pret} LEI</span>
    
                                </div>
                            ))
                        }
                        </Carousel>
                    </div>
    
                    <hr/>
                
                    <div style={{marginBottom:"25px"}}>
                        <h4 style={{marginLeft:"15px"}}>Comentarii produs</h4>
                    </div>
                    
                    <div>
                        <div>
                            {
                                listaFinalaComentarii.map(comentariu => (
                                    <div>
                                        <div style={{marginBottom:"-17px"}}>
                                            <span className="caseta-username "> <i class="fas fa-user"></i> {comentariu.username}:</span>
                                        </div>
                                        
                                        <div class="dialogbox">
                                            <div class="body">
                                                <span class="tip tip-left"></span>
                                                        
                                                <div class="message">
                                                    <span>{comentariu.text}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))
                            }
                        </div>  
                    </div>  
    
                    <div>
                        <textarea value={this.state.comentariuProdus} onChange={this.setComentariuProdusHandler} className="caseta-comentariu" placeholder="Adauga comentariul tau aici." type="text"></textarea>
                    </div>
    
                    <div style={{marginBottom:"15px"}}>
                        <button onClick={() => this.posteazaComentariuProdus()} style={{marginLeft:"15px", marginTop:"15px", marginBottom:"15px"}} className="btn btn-warning">Posteaza Comentariul</button>
                    </div>
    
                </div>
            );
        }
        
    }
}

export default Details;