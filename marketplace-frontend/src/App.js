
import './App.css';
import { Switch, Route} from "react-router-dom";
import FooterPage from './components/footer/Footer';
import HeaderPage from './components/header/Header';
import {DataProvider} from './components/Context';
import Section from './components/Section';
import ReclamatiiPage from './components/footer/ReclamatiiPage';
import PoliticaDeConfedintialitatePage from './components/footer/PoliticaDeConfedintialitatePage';
import IntrebariFrecventePage from './components/footer/IntrebariFrecventePage';
import DespreNoiPage from './components/footer/DespreNoiPage';
import ContactPage from './components/footer/ContactPage';
import TermeniSiConditiiPage from './components/footer/TermeniSiConditiiPage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/login/RegisterPage';
import Profile from './components/login/ProfilePage';
import MapPage from './components/header/MapPage';
import VindeProdusPage from './components/header/VindeProdusPage';
import ScrollToTop from './components/ScrollToTop';
import BranduriPage from './components/header/brands/BranduriPage';
import UsersListPage from './components/header/UsersListPage';
import UpdateProductPage from './components/products/UpdateProductPage';
import ConfirmareComandaPage from './components/products/ConfirmareComandaPage';
import InboxPage from './components/header/InboxPage';


const App = () => {


  return (

    <DataProvider>
      <div className = "page-container">
        <div className = "content-wrap">

          <HeaderPage/>

          <ScrollToTop/>

          <div className="container mt-3">

            <Section/>

            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/magazine" component={MapPage} />
              <Route exact path="/vinde" component={VindeProdusPage} />
              <Route exact path="/update-product/:id" component={UpdateProductPage} />
              <Route exact path="/reclamatii" component={ReclamatiiPage} />
              <Route exact path="/termeni-si-conditii" component={TermeniSiConditiiPage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/despre-noi" component={DespreNoiPage} />
              <Route exact path="/politica-de-confidentialitate" component={PoliticaDeConfedintialitatePage} />
              <Route exact path="/intrebari-frecvente" component={IntrebariFrecventePage} />
              <Route exact path="/branduri" component={BranduriPage} />
              <Route exact path="/users-list" component={UsersListPage} />
              <Route exact path="/inbox" component={InboxPage} />
              <Route exact path="/confirmare-comanda-succes" component={ConfirmareComandaPage} />
            </Switch>
          </div>

        </div>

        <FooterPage/>

      </div>
    </DataProvider>
  );
};

export default App;
