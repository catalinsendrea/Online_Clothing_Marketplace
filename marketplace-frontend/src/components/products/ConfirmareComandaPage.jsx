import React, { Component } from 'react';

class ConfirmareComandaPage extends Component {

    inapoiCumparaturi = () =>{
        this.props.history.push('/produse');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div>
                        <small>QBEC-MARKETPLACE / CONFIRMARE COMANDA</small>
                    </div>

                    <div style={{marginTop:"50px"}}>
                        <h3>Felicitari, comanda dumneavoastra a fost plasata cu succes!</h3>
                    </div>

                    <div>
                        <span>Coletul dumneavoastra va ajunge in aproximativ 3-5 zile lucratoare. Ve-ti primi o confirmare a comenzii si pe adresa de email.</span>
                    </div>

                    <div>
                        <span>Daca coletul nu ajunge in timp util nu ezitati sa ne contactati telefonic la: </span>
                        <strong> +40 743 143 363,</strong>
                        <span> sau pe email la adresa: </span>
                        <strong>marketplace@qbec.ro</strong>
                        <span>.</span>
                    </div>

                    <div>
                        <span>Multumim si o zi frumoasa in continuare!</span>
                    </div>

                    <div style={{marginTop:"40px"}}>
                        <button onClick={() => this.inapoiCumparaturi()} className="btn btn-dark">INAPOI LA CUMPARATURI</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmareComandaPage;