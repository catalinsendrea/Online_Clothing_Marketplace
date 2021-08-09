import React, { Component } from 'react';
import SearchBar from './SearchBar';
import {Link } from "react-router-dom";
import logo from "../../images/logo.png";
import {DataContext} from '../Context';
import MesajService from '../../services/MesajService';
import AuthService from '../../services/AuthService';


class HeaderPage extends Component {

    static contextType = DataContext;

    state = {
        currentUser: null,
        userRole: [],
        usernameCurrentUser:'',
        listaMesaje: []
    }

    logOut = () =>{
        AuthService.logout();
    };

    setUser = () => {
        
        const user = AuthService.getCurrentUser();

        if(user){
            this.setState({currentUser: user.id});
            this.setState({userRole: user.roles});
            this.setState({usernameCurrentUser: user.username});
        }
        else{
            this.setState({currentUser: null});
            this.setState({userRole: null});
            this.setState({usernameCurrentUser: null});
        }
    }

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


    componentDidMount(){
       this.setUser();
       this.getMesajeCurrentUser();
    }


    render() {

        const {currentUser} = this.state;
        const {userRole} = this.state;
        const {cart} = this.context;
        const {favorite} = this.context;

        let admin = 0;
        let adminUser = 0;
        let normalUser = 0;

        if(userRole){
            userRole.forEach(role => {
                if(role.includes("ADMIN")){
                    admin = 1;
                }
            })
        }

        if(admin === 1 && currentUser != null){
            adminUser = 1;
        }
        else if(admin === 0 && currentUser !=null ){
            normalUser = 1;
        }

        if(adminUser === 1 && normalUser === 0){
            return(
                <div>
                    <header className ="header">

                        <div className="menu">
                            <i class="fas fa-bars"></i>
                        </div>

                        <div>
                            <Link to={"/"}>
                                <img src = {logo} alt="logo" width="120" height="60" style={{marginTop:"15px"}}></img>
                            </Link>
                        </div>


                        <SearchBar/>

                        <nav>
                           
                            <div className="nav-cart" style={{marginRight:"20px"}}>
                                <Link to={"/users-list"} className ="words-color">
                                    <i class="fas fa-list"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginRight:"20px"}}>
                                <Link to={"/profile"} className ="words-color">
                                    <i class="fas fa-user"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginRight:"20px"}}>
                                <span className ="cart-span">{this.state.listaMesaje.length}</span>

                                <Link to={"/inbox"} className ="words-color">
                                    <i class="fas fa-inbox"></i>
                                </Link>
                            </div>

                            <div className="nav-cart">
                                <span className ="cart-span">{favorite.length}</span>

                                <Link to={"/favorite"} className ="words-color">
                                    <i class="fas fa-heart"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginLeft:"20px"}}>
                                <span className ="cart-span">{cart.length}</span>

                                <Link to={"/cart"} className ="words-color">
                                    <i class="fas fa-shopping-cart"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginLeft:"20px"}}>
                                <a href="/" onClick={() => this.logOut()} className ="words-color">
                                    <i class="fas fa-sign-out-alt"></i>
                                </a>
                            </div>

                        </nav>
                    </header>

                    <header className="header">
                        <nav style={{marginLeft:"120px"}}>
                            <ul>
                                <li>
                                    <Link to={"/produse"}>PRODUSE </Link>
                                </li>
                                
                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/barbati"}>BARBATI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/femei"}>FEMEI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/copii"}>COPII </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/branduri"}>BRANDURI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/magazine"}>MAGAZINE </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/reduceri"}>REDUCERI </Link>
                                </li>

                            </ul>
                        </nav>

                        <div className="navbar-nav ml-auto">
                            <span className="words-color" style={{marginBottom:"18px"}}>Locatia:RON/ro</span>
                        </div>

                        <div className="navbar-nav ml-auto">
                            <Link to={"/vinde"}>
                                <button className="btn btn-warning" style={{marginRight: "60px", marginBottom:"18px"}}>VINDE</button>
                            </Link>
                        </div>
                    </header>

                </div>
            );
        }
        else if(normalUser === 1 && adminUser === 0){
            return(
                <div>
                    <header className ="header">

                        <div className="menu">
                            <i class="fas fa-bars"></i>
                        </div>

                        <div>
                            <Link to={"/"}>
                                <img src = {logo} alt="logo" width="120" height="60" style={{marginTop:"15px"}}></img>
                            </Link>
                        </div>


                        <SearchBar/>

                        <nav>

                            <div className="nav-cart" style={{marginRight:"20px"}}>
                                <Link to={"/profile"} className ="words-color">
                                    <i class="fas fa-user"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginRight:"20px"}}>
                                <span className ="cart-span">{this.state.listaMesaje.length}</span>

                                <Link to={"/inbox"} className ="words-color">
                                    <i class="fas fa-inbox"></i>
                                </Link>
                            </div>

                            <div className="nav-cart">
                                <span className ="cart-span">{favorite.length}</span>

                                <Link to={"/favorite"} className ="words-color">
                                    <i class="fas fa-heart"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginLeft:"20px"}}>
                                <span className ="cart-span">{cart.length}</span>

                                <Link to={"/cart"} className ="words-color">
                                    <i class="fas fa-shopping-cart"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginLeft:"20px"}}>
                                <a href="/" onClick={() => this.logOut()} className ="words-color">
                                    <i class="fas fa-sign-out-alt"></i>
                                </a>
                            </div>

                        </nav>
                    </header>

                    <header className="header">
                        <nav style={{marginLeft:"120px"}}>
                            <ul>
                                <li>
                                    <Link to={"/produse"}>PRODUSE </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/barbati"}>BARBATI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/femei"}>FEMEI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/copii"}>COPII </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/branduri"}>BRANDURI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/magazine"}>MAGAZINE </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/reduceri"}>REDUCERI </Link>
                                </li>

                            </ul>
                        </nav>

                        <div className="navbar-nav ml-auto">
                            <span className="words-color" style={{marginBottom:"18px"}}>Locatia:RON/ro</span>
                        </div>

                        <div className="navbar-nav ml-auto">
                            <Link to={"/vinde"}>
                                <button className="btn btn-warning" style={{marginRight: "60px", marginBottom:"18px"}}>VINDE</button>
                            </Link>
                        </div>
                    </header>

                </div>
            );
        }
        else if(normalUser === 0 && adminUser === 0 && currentUser === null){
            return (
                <div>
                    <header className ="header">

                        <div className="menu">
                            <i class="fas fa-bars"></i>
                        </div>

                        <div>
                            <Link to={"/"}>
                                <img src = {logo} alt="logo" width="120" height="60" style={{marginTop:"15px"}}></img>
                            </Link>
                        </div>

                        <SearchBar/>

                        <nav>
                            <ul>
                                <li>
                                    <Link to={"/login"}>Conecteaza-te </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/register"}>Inregistreaza-te</Link>
                                </li>

                                <li className="close">
                                    <i class="fas fa-times"></i>
                                </li>
                            </ul>

                            <div className="nav-cart">
                                <span className ="cart-span">{favorite.length}</span>

                                <Link to={"/favorite"} className ="words-color">
                                    <i class="fas fa-heart"></i>
                                </Link>
                            </div>

                            <div className="nav-cart" style={{marginLeft:"20px"}}>
                                <span className ="cart-span">{cart.length}</span>

                                <Link to={"/cart"} className ="words-color">
                                    <i class="fas fa-shopping-cart"></i>
                                </Link>
                            </div>

                        </nav>

                    </header>

                    <header className="header">
                        <nav style={{marginLeft:"120px"}}>
                            <ul>
                                <li>
                                    <Link to={"/produse"}>PRODUSE </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/barbati"}>BARBATI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/femei"}>FEMEI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/copii"}>COPII </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/branduri"}>BRANDURI </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/magazine"}>MAGAZINE </Link>
                                </li>

                                <li>
                                    <span className="words-color">|</span>
                                </li>

                                <li>
                                    <Link to={"/reduceri"}>REDUCERI </Link>
                                </li>

                            </ul>
                        </nav>

                        <div className="navbar-nav ml-auto">
                            <span className="words-color" style={{marginBottom:"18px"}}>Locatia:RON/ro</span>
                        </div>

                        <div className="navbar-nav ml-auto">
                            <Link to={"/vinde"}>
                                <button className="btn btn-warning" style={{marginRight: "50px", marginBottom:"18px"}}>VINDE</button>
                            </Link>
                        </div>

                    </header>

                </div>
            );
        }   
    }
}

export default HeaderPage;