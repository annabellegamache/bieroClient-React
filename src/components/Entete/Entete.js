import React from 'react';
import { NavLink } from 'react-router-dom'
import './Entete.css';
import { ReactComponent as Logo } from './logo.svg';

export default class Entete extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            courriel : '',

        }
    }

    changeCourriel = (e) => {
        this.setState({courriel: e.target.value});
    }

    /* methode au clique du bouton de connexion */
    login= (e) => {
        e.preventDefault();
        console.log('login Entete');
        // validation 
        if(this.state.courriel !== ''){
            this.props.handleLogin(this.state.courriel);
        }
        
    }

  render(){
    return (
        <>
        <div className="zone-login-container">
            <div className="zone-login">
                <form className='login'>
                    <input onBlur={this.changeCourriel} type="email" placeholder="Courriel" name="courriel" />
                    <button onClick={this.login}>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="white"></path> </svg>
                    </button>
                </form>
            </div>
        </div>
            <header>
                <NavLink to="/">
                    <Logo />
                    <h1>BIERO</h1>
                </NavLink>  
            </header>
            <nav>
                <NavLink to="/liste">Liste des bières</NavLink>
            </nav>
        </>
    );
  }
 
}
  