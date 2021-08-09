import React, { Component } from 'react';
import UserService from '../../services/UserService';

class UsersListPage extends Component {

    constructor(props){
        super(props)

        this.state = {
                users: []
        }

        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data})
        });
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    render() {
        return (
            <div>
                
                <div style={{marginTop:"20px"}}>
                    <h3 style={{textAlign:"center"}}>
                        Utilizatorii care folosesc platforma si detalii despre acestia
                    </h3>
                </div>

                <div className = "row" style={{marginTop:"20px"}}>
                    <table className = "table table-striped table-bordered">
                        
                        <thead>
                            <tr>
                                <th>Nume</th>
                                <th>Prenume</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Telefon</th>
                                <th>Adresa</th>
                                <th>Actiuni</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                    <tr key = {user.id}>
                                        <td>{user.nume}</td>
                                        <td>{user.prenume}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.telefon}</td>
                                        <td>{user.adresa}</td>
                                        <td>
                                            <button onClick = { () => this.deleteUser(user.id)} className = "btn btn-primary btn-block">Stergere cont</button>
                                        </td>
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

export default UsersListPage;