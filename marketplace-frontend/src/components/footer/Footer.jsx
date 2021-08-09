import {Link } from "react-router-dom";
import logo from "../../images/logo.png";


const FooterPage = () => {
    return (
      <div className ="footer">
          <div className = "container">
              <div className = "row">

                {/*column1 */}
                <div className = "col">

                    <h4>INFORMATII</h4>

                    <ul className = "list-unstyled">

                        <li className="nav-item">
                            <Link to={"/despre-noi"} className ="words-color">Despre noi</Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/contact"} className ="words-color">Contact</Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/termeni-si-conditii"} className ="words-color">Termeni si Conditii</Link>
                        </li>
                    </ul>
                </div>

                {/*column2 */}
                <div className ="col">
                    <h4>AJUTOR</h4>
                    <ul className = "list-unstyled">
                        
                        <li className="nav-item">
                            <Link to={"/intrebari-frecvente"} className ="words-color">Intrebari Frecvente</Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/reclamatii"} className ="words-color">Reclamatii</Link>
                        </li>

                         <li className="nav-item">
                            <Link to={"/politica-de-confidentialitate"} className ="words-color">Politica de confidentialitate</Link>
                        </li>
                    </ul>
                </div>


                {/*column3 */}
                <div className ="col flex-column">
                    <h4>URMARESTE-NE</h4>
                    
                    <div className="flex">

                        <div>
                            <ul className = "list-unstyled">
                                <li className ="words-color" style={{padding:"4px"}}>
                                    <i class="fab fa-facebook"></i> Facebook
                                </li>
                                <li className ="words-color" style={{padding:"4px"}}>
                                    <i class="fab fa-youtube"></i> Youtube
                                </li>
                            </ul>
                        </div>
                        
                        <div style={{marginLeft: "15px"}}>
                            <ul className = "list-unstyled">
                                <li className ="words-color" style={{padding:"4px"}}>
                                    <i class="fab fa-instagram"></i> Instagram
                                </li>
                                <li className ="words-color" style={{padding:"4px"}}>
                                    <i class="fab fa-twitter"></i> Twitter
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>


                <div>
                    <img className="opacity" src = {logo} alt="logo" width="250" height="auto"></img>
                </div>
               
             </div>

             <hr/>

             <div className="row">
                <p className="col-sm">
                    &copy;{new Date().getFullYear()}  www.qbec-markeplace.com, Realizat de Sendrea Catalin. Toate drepturile rezervate.
                </p>
             </div>

         </div> 
      </div>
    );
  }
  
  export default FooterPage;