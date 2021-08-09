import React, { Component } from 'react';
import Products from './products/Products';
import Details from './products/ProductDetails';
import {Route} from 'react-router-dom';
import CartProducts from './products/CartProducts';
import FavoriteProducts from './products/FavoriteProducts';
import BarbatiPage from './header/BarbatiPage';
import FemeiPage from './header/FemeiPage';
import CopiiPage from './header/CopiiPage';
import AdidasPage from './header/brands/AdidasPage';
import NikePage from './header/brands/NikePage';
import PumaPage from './header/brands/PumaPage';
import NewBalancePage from './header/brands/NewBalancePage';
import ReduceriPage from './header/ReduceriPage';
import ProdusePage from './header/ProdusePage';
import PaymentPage from './products/PaymentPage';

class Section extends Component {
    render() {
        return (
            <section className="section">
                <Route exact path="/" component={Products} />
                <Route exact path="/cart" component={CartProducts} />
                <Route exact path="/favorite" component={FavoriteProducts} />
                <Route exact path="/product/:id" component={Details} />
                <Route exact path="/barbati" component={BarbatiPage} />
                <Route exact path="/produse" component={ProdusePage} />
                <Route exact path="/femei" component={FemeiPage} />
                <Route exact path="/copii" component={CopiiPage} />
                <Route exact path="/adidas" component={AdidasPage} />
                <Route exact path="/nike" component={NikePage} />
                <Route exact path="/puma" component={PumaPage} />
                <Route exact path="/newbalance" component={NewBalancePage} />
                <Route exact path="/reduceri" component={ReduceriPage} />
                <Route exact path="/plata" component={PaymentPage} />
            </section>
        );
    }
}


export default Section;