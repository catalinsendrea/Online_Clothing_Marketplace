import React, { Component } from 'react';
import MesajService from '../../services/MesajService';
import AuthService from '../../services/AuthService';
import { Modal } from 'react-bootstrap';

class InboxPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            listaMesaje: [],
            currentUser: null,
            usernameCurrentUser:'',
            destinatar:'',
            subiect:'',
            mesaj:'',
            showModalPage: false,
            showModalConfirmPage: false
        }

        this.setDestinatarHandler = this.setDestinatarHandler.bind(this);
        this.setSubiectHandler = this.setSubiectHandler.bind(this);
        this.setMesajHandler = this.setMesajHandler.bind(this);
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
        this.setState({showModalPage: true});
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


    setUser = () => {
        
        const user = AuthService.getCurrentUser();

        if(user){
            this.setState({currentUser: user.id});
            this.setState({usernameCurrentUser: user.username});
        }
        else{
            this.setState({currentUser: null});
            this.setState({usernameCurrentUser: null});
        }
    }


    componentDidMount(){
        this.setUser();
        this.getMesajeCurrentUser();
    };


    getMesajeCurrentUser = () => {

        if(this.currentUser !== null){
            MesajService.getMesaje().then(res =>{

                let destinatar = this.state.usernameCurrentUser;
                
                MesajService.getMesajByDestinatar(destinatar).then(res =>{
                    this.setState({listaMesaje: res.data});
                });
            });
        }
    }


    raspundeMesaj = () =>{
        let mesaj = {
            expeditor: this.state.usernameCurrentUser,
            subiect: this.state.subiect,
            mesaj: this.state.mesaj,
            destinatar: this.state.destinatar
        };

        console.log('mesaj => ' +JSON.stringify(mesaj));

        if(mesaj.expeditor === "qbec"){
            mesaj.expeditor = "qbec-marketplace";
        }

        MesajService.createMesaj(mesaj).then(res =>{
            this.setState({showModalPage: false});
            this.setState({showModalConfirmPage: true});
        });
    }


    stergeMesaj = (idMesaj) =>{
        MesajService.deleteMesaj(idMesaj).then( res => {
            this.setState({listaMesaje: this.state.listaMesaje.filter(mesaj => mesaj.id !== idMesaj)});
        });
        window.location.reload();
    }


    render() {

        return (
            <div>
                
                <div style={{marginTop:"20px"}}>
                    <h3 style={{textAlign:"center"}}>
                        Mesajele tale
                    </h3>
                </div>

                <div className = "row" style={{marginTop:"20px"}}>
                    <table className = "table table-striped table-bordered">
                        
                        <thead>
                            <tr>
                                <th>Expeditor</th>
                                <th>Subiect</th>
                                <th>Mesaj</th>
                                <th>Actiuni</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.listaMesaje.map(mesaj => 
                                    <tr key = {mesaj.id}>
                                        <td>{mesaj.expeditor}</td>
                                        <td>{mesaj.subiect}</td>
                                        <td>{mesaj.mesaj}</td>
                                        <td>
                                            <button onClick = { () => this.handleShowModalPage()} className = "btn btn-info">Raspunde</button>
                                            <button onClick = { () => this.stergeMesaj(mesaj.id)} style={{marginLeft:"15px"}} className = "btn btn-warning">Stergere mesajul</button>
                                        </td>

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
                                                <input type="text" value={this.state.destinatar} onChange={this.setDestinatarHandler} placeholder={mesaj.expeditor} name ="catre" className="form-control"></input>
                                            </div>

                                            <div style={{marginTop:"20px"}}>
                                                <strong>Subiect:</strong>
                                            </div>

                                            <div style={{marginTop:"5px"}}>
                                                <input type="text" value={this.state.subiect} onChange={this.setSubiectHandler} placeholder={mesaj.subiect} name ="subiect" className="form-control"></input>
                                            </div>

                                            <div style={{marginTop:"20px"}}>
                                                <strong>Mesaj:</strong>
                                            </div>

                                            <div style={{marginTop:"5px"}}>
                                                <textarea type="text" value={this.state.mesaj} onChange={this.setMesajHandler} placeholder="Scrie mesajul tau aici..." name ="mesaj" className="form-control"></textarea>
                                            </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button onClick={() => this.raspundeMesaj()} className="btn btn-success btn-block">Trimite</button>
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
                                    </tr>
                                )
                            } 
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default InboxPage;