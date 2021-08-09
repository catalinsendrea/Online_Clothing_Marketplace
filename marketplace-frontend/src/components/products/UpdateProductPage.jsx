import React, { Component } from 'react';
import ProductsService from '../../services/ProductsService';

class UpdateProductPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            titlu:'',
            descriere:'',
            tip_produs:'',
            categorie:'',
            marime:'',
            culoare:'',
            pret:'',
            pretReducere:'',
            firma:'',
            uzura:'',
            numar:'',
            reducere:'',
            imagine:'',
            base64TextStringForImagine:'',
            proprietar:''
        }

        this.changeTitluHandler = this.changeTitluHandler.bind(this);
        this.changeDescriereHandler = this.changeDescriereHandler.bind(this);
        this.changeMarimeHandler = this.changeMarimeHandler.bind(this);
        this.changeFirmaHandler = this.changeFirmaHandler.bind(this);
        this.changeCuloareHandler = this.changeCuloareHandler.bind(this);
        this.changeCategorieHandler = this.changeCategorieHandler.bind(this);
        this.changeTipProdusHandler = this.changeTipProdusHandler.bind(this);
        this.changeUzuraHandler = this.changeUzuraHandler.bind(this);
        this.changeNumarHandler = this.changeNumarHandler.bind(this);
        this.changePretHandler = this.changePretHandler.bind(this);
        this.changeReducereHandler = this.changeReducereHandler.bind(this);


        this.updateProductButton = this.updateProductButton.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
    }


    required = (value) => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              Acest camp este obligatoriu.
            </div>
          );
        }
    };
    

    changeImagineHandler = (event) => {
        let file = event.target.files[0]

        if(file){
            const reader = new FileReader()

            reader.onload = this._handleReaderLoaded.bind(this)

            reader.readAsBinaryString(file)
        }
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result

        this.setState({base64TextStringForImagine: btoa(binaryString)})
    }

    changeTitluHandler = (event) => {
        this.setState({titlu: event.target.value});
    }

    changeDescriereHandler = (event) => {
        this.setState({descriere: event.target.value});
    }

    changeMarimeHandler = (event) => {
        this.setState({marime: event.target.value});
    }

    changeFirmaHandler = (event) => {
        this.setState({firma: event.target.value});
    }

    changeCuloareHandler = (event) => {
        this.setState({culoare: event.target.value});
    }

    changePretHandler = (event) => {
        this.setState({pret: event.target.value});
    }

    changeCategorieHandler = (event) => {
        this.setState({categorie: event.target.value});
    }

    changeTipProdusHandler = (event) => {
        this.setState({tip_produs: event.target.value});
    }

    changeUzuraHandler = (event) => {
        this.setState({uzura: event.target.value});
    }

    changeNumarHandler = (event) => {
        this.setState({numar: event.target.value});
    }

    changeReducereHandler = (event) => {
        this.setState({reducere: event.target.value});
    }

    cancelButton(){
        this.props.history.push('/');
    }

    componentDidMount(){
        ProductsService.getProductById(this.state.id).then( (res) => {
            let product = res.data;

            this.setState({
                titlu: product.titlu,
                descriere: product.descriere,
                tip_produs: product.tip_produs,
                categorie: product.categorie,
                marime: product.marime,
                culoare: product.culoare,
                pret: product.pret,
                pretReducere: product.pretReducere,
                firma: product.firma,
                uzura: product.uzura,
                numar: product.count,
                reducere: product.reducere,
                imagine: product.imagine,
                proprietar: product.proprietar,
                scor: product.scor
            });
        });
    }

    updateProductButton = (x) => {
        x.preventDefault();

        let scorCategorie = 0;
        let scorTipProdus = 0;
        let scorFirma = 0;
        let scor = 0;


        if(this.state.categorie === "femei"){
            scorCategorie = 2000;
        }
        else if(this.state.categorie === "copii"){
            scorCategorie = 5000;
        }
        else if(this.state.categorie === "barbati"){
            scorCategorie = 8000;
        }
        else{
            scorCategorie = 0;
        }


        if(this.state.tip_produs === "papuci"){
            scorTipProdus = 100;
        }
        else if(this.state.tip_produs === "bluza"){
            scorTipProdus = 400;
        }
        else if(this.state.tip_produs === "tricou"){
            scorTipProdus = 500;
        }
        else if(this.state.tip_produs === "pantaloni"){
            scorTipProdus = 800;
        }
        else{
            scorTipProdus = 0;
        }


        if(this.state.firma === "nike"){
            scorFirma = 20;
        }
        else if(this.state.firma === "adidas"){
            scorFirma = 40;
        }
        else if(this.state.firma === "puma"){
            scorFirma = 60;
        }
        else if(this.state.firma === "newBalance"){
            scorFirma = 80;
        }
        else{
            scorFirma = 0;
        }

        scor = scorCategorie + scorTipProdus + scorFirma;

        let product = {
            imagine: this.state.base64TextStringForImagine,
            tip_produs: this.state.tip_produs,
            marime: this.state.marime,
            culoare: this.state.culoare,
            categorie: this.state.categorie,
            pret: this.state.pret,
            pretReducere: this.state.pretReducere,
            firma: this.state.firma,
            titlu: this.state.titlu,
            descriere: this.state.descriere,                                                                                
            uzura: this.state.uzura,
            count: this.state.numar,
            reducere: this.state.reducere,
            proprietar: this.state.proprietar,
            scor: scor
        };

        if(!product.imagine){
            product.imagine = this.state.imagine
        }

        if(product.reducere !== 0){
            product.pretReducere = product.pret - (product.pret * product.reducere *0.01);
        }

        console.log('produs => ' +JSON.stringify(product));

        ProductsService.updateProduct(product, this.state.id).then(res =>{
            this.props.history.push('/');
            window.location.reload(false);
        });
    }


    render() {

        return (
            <div>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> 
                                <h1 className="text-center">Actualizeaza produs</h1>
                                <div className = "card-body">
                                    <form>
                                        <div className ="form-group">
                                            <label>Titlu: </label>
                                            <input placeholder="Titlu produs" name ="titlu" className="form-control"
                                                value={this.state.titlu} onChange={this.changeTitluHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Descriere: </label>
                                            <input placeholder="Descriere produs" name ="descriere" className="form-control"
                                                value={this.state.descriere} onChange={this.changeDescriereHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Tip-Produs: </label>
                                            <input placeholder="Papuci/Bluza/Pantaloni etc." name ="tipprodus" className="form-control"
                                                value={this.state.tip_produs} onChange={this.changeTipProdusHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Categorie: </label>
                                            <input placeholder="Barbati/Femei/Copii" name ="categorie" className="form-control"
                                                value={this.state.categorie} onChange={this.changeCategorieHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Marime: </label>
                                            <input placeholder="L/M/S/42/37 etc." name ="marime" className="form-control"
                                                value={this.state.marime} onChange={this.changeMarimeHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Culoare: </label>
                                            <input placeholder="rosu/negru/albastru etc." name ="culoare" className="form-control"
                                                value={this.state.culoare} onChange={this.changeCuloareHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Pret: </label>
                                            <input placeholder="Pretul produsului" name ="pret" className="form-control"
                                                value={this.state.pret} onChange={this.changePretHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Reducere: </label>
                                            <input placeholder="Reducerea produsului (%)" name ="reducere" className="form-control"
                                                value={this.state.reducere} onChange={this.changeReducereHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Brand: </label>
                                            <input placeholder="Nike/Puma/Adidas etc." name ="brand" className="form-control"
                                                value={this.state.firma} onChange={this.changeFirmaHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Starea produsului: </label>
                                            <input placeholder="Nou/Folosit" name ="stareprodus" className="form-control"
                                                value={this.state.uzura} onChange={this.changeUzuraHandler}/>
                                        </div>

                                        <div className ="form-group">
                                            <label>Cantitate: </label>
                                            <input placeholder="Numarul de produse" name ="cantitate" className="form-control"
                                                value={this.state.numar} onChange={this.changeNumarHandler}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Imagine: </label>
                                            <form>
                                                <input type="file" accept="image/*" name="imagine" onChange={(e) => this.changeImagineHandler(e)}/>
                                            </form>
                                        </div>

                                        <div style={{marginTop:"30px"}}>
                                            <button className="btn btn-success" onClick={this.updateProductButton}>Actualizeaza</button>
                                            <button className="btn btn-danger" onClick={this.cancelButton} style={{marginLeft: "10px"}}>Inapoi</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default UpdateProductPage;