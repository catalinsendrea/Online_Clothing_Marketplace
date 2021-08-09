import React, { Component } from 'react';
import AuthService from "../../services/AuthService";
import OrderService from "../../services/OrderService";

class Profile extends Component {

    state = {
        currentUser: null,
        userRole: [],
        allOrders: [],
        userOrders:[],
        username:'',
        nume:'',
        prenume:'',
        adresa:'',
        codpostal:'',
        email:'',
        telefon:''
    }

    setUser = () => {
        
        const user = AuthService.getCurrentUser();

        if(user){
            this.setState({currentUser: user.id});
            this.setState({userRole: user.roles});
            this.setState({username: user.username});
            this.setState({nume: user.nume});
            this.setState({prenume: user.prenume});
            this.setState({adresa: user.adresa});
            this.setState({codpostal: user.codpostal});
            this.setState({email: user.email});
            this.setState({telefon: user.telefon});
        }
        else{
            this.setState({currentUser: null});
            this.setState({userRole: null});
            this.setState({username: null});
            this.setState({nume: null});
            this.setState({prenume: null});
            this.setState({adresa: null});
            this.setState({codpostal: null});
            this.setState({email: null});
            this.setState({telefon: null});
        }
    }


    getAllOrders = () => {
        OrderService.getOrders().then((res) => {
            this.setState({allOrders: res.data})  
        });
    }


    getUserOrders = () => {

      if(this.currentUser !== null){
          OrderService.getOrders().then((res) => {
            
            let email = this.state.email;

            OrderService.getOrderByEmailCumparator(email).then( (res) => {
              this.setState({userOrders: res.data})
            });
          });
      }
    }


    componentDidMount(){
        this.setUser();
        this.getAllOrders();
        this.getUserOrders();
    }


    render() {

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
            return (
                <div className="container">

                    <header className="jumbotron">
                        <h3>
                            <strong>{this.state.username}</strong> Profile
                        </h3>
                    </header>

                    <p>
                        <strong>Nume:</strong> {this.state.nume} {this.state.prenume}
                    </p>

                    <p>
                        <strong>Email:</strong> {this.state.email}
                    </p>

                    <p>
                        <strong>Telefon:</strong> {this.state.telefon}
                    </p>

                    <p>
                        <strong>Adresa:</strong> {this.state.adresa}
                    </p>

                    <p>
                        <strong>Cod postal:</strong> {this.state.codpostal}
                    </p>
                    
                    <strong>Rol:</strong>
                    <ul style={{marginLeft:"20px"}}>
                        {this.state.userRole &&
                        this.state.userRole.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                    
                    <div style={{marginTop:"50px"}}>
                      <h3>Lista de comenzi</h3>
                    </div>

                    <div className = "row" style={{marginTop:"12px", marginLeft:"1px"}}>
                        <table className = "table table-striped table-bordered">
                            
                            <thead>
                                <tr>
                                    <th>Email cumparator</th>
                                    <th>Id produse comandate</th>
                                    <th>Livrator</th>
                                    <th>Mentiuni</th>
                                    <th>Modalitate plata</th>
                                    <th>Suma plata</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.allOrders.map(
                                       order => 
                                        <tr key = {order.id}>
                                            <td>{order.email}</td>
                                            <td>{order.id_produse_comandate}</td>
                                            <td>{order.livrator}</td>
                                            <td>{order.mentiuni}</td>
                                            <td>{order.modalitate_plata}</td>
                                            <td>{order.suma_plata}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            );
        }
        else{
            return (
              <div className="container">

                <header className="jumbotron">
                    <h3>
                        <strong>{this.state.username}</strong> Profile
                    </h3>
                </header>

                <p>
                    <strong>Nume:</strong> {this.state.nume} {this.state.prenume}
                </p>

                <p>
                    <strong>Email:</strong> {this.state.email}
                </p>

                <p>
                    <strong>Telefon:</strong> {this.state.telefon}
                </p>

                <p>
                    <strong>Adresa:</strong> {this.state.adresa}
                </p>

                <p>
                    <strong>Cod postal:</strong> {this.state.codpostal}
                </p>
                
                <strong>Rol:</strong>
                <ul style={{marginLeft:"20px"}}>
                    {this.state.userRole &&
                    this.state.userRole.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
                
                <div style={{marginTop:"50px"}}>
                  <h3>Comenzile tale</h3>
                </div>

                <div className = "row" style={{marginTop:"12px", marginLeft:"1px"}}>
                    <table className = "table table-striped table-bordered">
                        
                        <thead>
                            <tr>
                                <th>Id produse comandate</th>
                                <th>Livrator</th>
                                <th>Mentiuni</th>
                                <th>Modalitate plata</th>
                                <th>Suma plata</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.userOrders.map(
                                  order => 
                                    <tr key = {order.id}>
                                        <td>{order.id_produse_comandate}</td>
                                        <td>{order.livrator}</td>
                                        <td>{order.mentiuni}</td>
                                        <td>{order.modalitate_plata}</td>
                                        <td>{order.suma_plata}</td>
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
}

export default Profile;