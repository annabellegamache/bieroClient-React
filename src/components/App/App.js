
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import Entete from '../Entete/Entete'
import ListeBieres from '../ListeBieres/ListeBieres';
import DetailBiere from '../DetailBiere/DetailBiere';
import './App.css';



export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      courriel: ''
    }
  }

  login = (courriel) => {
    this.setState({ courriel: courriel })
  }


  render() {
    return (
      //fragment parents pour pouvoir ajouter des enfants...sinon ca bug
      <Router>
        <Entete handleLogin={this.login} />
        <Routes>
          <Route path="/" element={<Accueil />} />

          <Route path="/liste" element={<ListeBieres />} />
          <Route path="/biere/:id" element={<DetailBiere courriel={this.state.courriel} />} />
          <Route path="*" element={<Accueil />} />
        </Routes>
      </Router>
    );
  }

}


