import React, { Component } from 'react';

class ContactPage extends Component {

    render() {
        return (
            <div>
                <div className="container">
                    <div>
                        <small>QBEC-MARKETPLACE / CONTACT</small>
                    </div>

                    <div style={{paddingTop:"30px"}}>
                        <h3>CONTACT</h3>
                    </div>

                    <hr/>

                    <div style={{paddingTop:"10px"}}>
                        <span>Dragi clienti, incercam sa raspundem cat mai prompt tuturor solicitarilor.</span>
                    </div>

                    <div style={{paddingTop:"10px"}}>
                        <span>Contactati-ne: </span>
                    </div>

                    <div style={{paddingTop:"10px"}}>
                        <div style={{marginLeft:"40px"}}>
                            <i class="fas fa-phone"></i>
                            <span> : </span>
                            <strong>+40 743 143 363</strong>
                        </div>
                    </div>

                    <div style={{paddingTop:"10px"}}>
                        <div style={{marginLeft:"40px"}}>
                            <i class="fas fa-envelope"></i>
                            <span> : </span>
                            <strong>marketplace@qbec.ro</strong>
                        </div>
                    </div>

                    <div style={{paddingTop:"15px"}}>
                        <span>Program de lucru: </span>
                    </div>

                    <div style={{paddingTop:"15px",marginLeft:"40px", paddingBottom:"40px"}}>
                        <strong>Luni - Vineri: 09:00 - 20:00</strong>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactPage;