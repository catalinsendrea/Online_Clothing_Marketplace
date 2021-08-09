import React, { Component } from 'react';
import ProductsService from '../services/ProductsService';


export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [],

        cart:[],

        favorite:[],

        total: 0
    };


    refreshProducts = () =>{
        ProductsService.getProducts().then((res) => {
            this.setState({products: res.data})  
        });
    }


    searchProduct = (numeProdus) => {
        const {products} = this.state;
        const searchProducts = [];

        products.forEach(product =>{
            product.titlu = product.titlu.toUpperCase();
        })
        

        products.forEach(product => {
            if(product.titlu.includes(numeProdus)){
                searchProducts.push(product);
            }
        })

        this.setState({products: searchProducts});
    }


    filterPapuci = () => {
        const {products} = this.state;
        const papuciProducts = [];


        products.forEach(product => {
            if(product.tip_produs === "papuci"){
                papuciProducts.push(product);
            }
        })

        this.setState({products: papuciProducts});
    }


    filterImbracaminte = () => {
        const {products} = this.state;
        const imbracaminteProducts = [];


        products.forEach(product => {
            if(product.tip_produs === "bluza" || product.tip_produs === "tricou" || product.tip_produs === "pantaloni"){
                imbracaminteProducts.push(product);
            }
        })

        this.setState({products: imbracaminteProducts});
    }


    filterBarbati = () => {
        const {products} = this.state;
        const barbatiProducts = [];


        products.forEach(product => {
            if(product.categorie === "barbati"){
                barbatiProducts.push(product);
            }
        })

        this.setState({products: barbatiProducts});
    }


    filterFemei = () => {
        const {products} = this.state;
        const femeiProducts = [];


        products.forEach(product => {
            if(product.categorie === "femei"){
                femeiProducts.push(product);
            }
        })

        this.setState({products: femeiProducts});
    }


    filterCopii = () => {
        const {products} = this.state;
        const copiiProducts = [];


        products.forEach(product => {
            if(product.categorie === "copii"){
                copiiProducts.push(product);
            }
        })

        this.setState({products: copiiProducts});
    }


    filterAdidas = () => {
        const {products} = this.state;
        const adidasProducts = [];


        products.forEach(product => {
            if(product.firma === "adidas"){
                adidasProducts.push(product);
            }
        })

        this.setState({products: adidasProducts});
    }


    filterNike = () => {
        const {products} = this.state;
        const nikeProducts = [];


        products.forEach(product => {
            if(product.firma === "nike"){
                nikeProducts.push(product);
            }
        })

        this.setState({products: nikeProducts});
    }


    filterPuma = () => {
        const {products} = this.state;
        const pumaProducts = [];


        products.forEach(product => {
            if(product.firma === "puma"){
                pumaProducts.push(product);
            }
        })

        this.setState({products: pumaProducts});
    }


    filterNewBalance = () => {
        const {products} = this.state;
        const newBalanceProducts = [];


        products.forEach(product => {
            if(product.firma === "newBalance"){
                newBalanceProducts.push(product);
            }
        })

        this.setState({products: newBalanceProducts});
    }


    filterPret = (min,max) => {
        const {products} = this.state;
        const pretProducts = [];

        if(min && max){
            products.forEach(product => {
                if(product.pret >= min && product.pret <= max ){
                    pretProducts.push(product);
                }
            })
    
            this.setState({products: pretProducts});
        }
        else{
            this.setState({products: products});
        }
    }


    filterNou = () => {
        const {products} = this.state;
        const nouProducts = [];


        products.forEach(product => {
            if(product.uzura === "nou"){
                nouProducts.push(product);
            }
        })

        this.setState({products: nouProducts});
    }


    filterFolosit = () => {
        const {products} = this.state;
        const folositProducts = [];


        products.forEach(product => {
            if(product.uzura === "folosit"){
                folositProducts.push(product);
            }
        })

        this.setState({products: folositProducts});
    }


    addCart = (id) => {
        const{products, cart} = this.state;
        const check = cart.every(item => {
            return item.id !== id;
        })

        if(check){
            const data = products.filter(product => {
                return product.id === id
            })
            this.setState({cart: [...cart, ...data]})
        }
        else{
            alert("Produsul a fost deja adaugat in cos.")
        }
    };


    addFavorite = (id) => {
        const{products, favorite} = this.state;
        const check = favorite.every(item => {
            return item.id !== id;
        })

        if(check){
            const data = products.filter(product => {
                return product.id === id
            })
            this.setState({favorite: [...favorite, ...data]})
        }
        else{
            alert("Produsul se afla deja la favorite.")
        }
    };


    reduction = (id) =>{
        const {cart} = this.state;

        cart.forEach(item => {
            if(item.id === id){
                if(item.count === 1){
                    item.count = 1;
                }
                else{
                    item.count--;
                }
            }
        })

        this.setState({cart: cart});
        this.getTotal();
    };


    increase = (id) =>{
        const {cart} = this.state;

        cart.forEach(item => {
            if(item.id === id){
                item.count++;
            }
        })

        this.setState({cart: cart});
        this.getTotal();
    };


    removeProduct = (id) => {
        if(window.confirm("Esti sigur ca doresti sa scoti din cos acest produs?")){

            const {cart} = this.state;

            cart.forEach((item,index) => {
                if(item.id === id){
                    cart.splice(index,1);
                }
            })

            this.setState({cart: cart});
            this.getTotal();
        }
    };


    removeFavorite = (id) => {
        if(window.confirm("Esti sigur ca doresti sa scoti acest produs?")){

            const {favorite} = this.state;

            favorite.forEach((item,index) => {
                if(item.id === id){
                    favorite.splice(index,1);
                }
            })

            this.setState({favorite: favorite});
        }
    };


    getTotal = () =>{
        const {cart} = this.state;

        const total = cart.reduce((prev,item) => {
            return prev + (item.pretReducere * item.count);
        }, 0)

        this.setState({total: total});
    };


    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart));
        localStorage.setItem('dataFavorite', JSON.stringify(this.state.favorite));
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total));
    };


    componentDidMount(){

        ProductsService.getProducts().then((res) => {
            this.setState({products: res.data})  
        });

        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }

        const dataFavorite = JSON.parse(localStorage.getItem('dataFavorite'));
        if(dataFavorite !== null){
            this.setState({favorite: dataFavorite});
        }

        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }



    
    render() {

        const {products, cart, total, favorite} = this.state;
        const {addCart, reduction, increase, removeProduct, getTotal, addFavorite, removeFavorite, searchProduct, refreshProducts, filterPapuci, filterImbracaminte, filterBarbati, filterCopii, filterFemei, filterAdidas, filterNewBalance, filterNike, filterPuma, filterPret, filterFolosit, filterNou} = this;

        return (
           <DataContext.Provider value = {{products, cart, addCart, increase, reduction, removeProduct, total, getTotal, favorite, addFavorite, removeFavorite, searchProduct, refreshProducts, filterPapuci, filterImbracaminte, filterBarbati, filterCopii, filterFemei, filterNewBalance, filterNike, filterPuma, filterAdidas, filterPret, filterFolosit, filterNou}}>
               {this.props.children}
           </DataContext.Provider>
        );
    }
}
