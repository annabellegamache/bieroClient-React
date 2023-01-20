import React from 'react';
import { Link } from 'react-router-dom';
import Biere from '../Biere/Biere';
import './ListeBieres.css';
import image from '../Biere/biere.png';



export default class ListeBieres extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bieres: [],
      timer: null,
    }

  }


  // hook
  componentDidMount() {

    // eslint-disable-next-line 
    this.state.timer = setTimeout(() => document.querySelector('main').classList.add('show'), 300);

    //appel fetch
    fetch('http://127.0.0.1:8000/webservice/php/biere/')
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error();
      })
      .then((data) => {
       
        //gestion note + img par défaut
        for (let i = 0, l = data.data.length; i < l; i++) {
          //  gestion note
          data.data[i].note_moyenne = parseFloat(data.data[i].note_moyenne).toFixed(1);
          //Gestion l'image par défaut
          if (!data.data[i].image) data.data[i].image = {image};

          //gestion etoile
          const star = data.data[i].note_moyenne;
          let elmStar = '';
          let nbStarRempli = parseInt(star);
          let nbStarDemi = star % 1;

          for (let i = 0, l = 5; i < l; i++) {
            if (nbStarRempli > i) {
              elmStar += '<i class="fa fa-star"></i>'
            } else if (nbStarDemi !== 0) {
              elmStar += '<i class="fa fa-star-half-o"></i>'
              nbStarDemi = 0;
            } else {
              elmStar += '<i class="fa fa-star-o"></i>';
            }

          }
          data.data[i].elStar = elmStar;

        }

        this.setState({ bieres: data.data })
    
      })
      .catch((err) => {

        console.log(err.message);

      })
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  render() {

    //boucle moderne .map
    const bieres = this.state.bieres.map((biere, index) => {
      return <Link to={`/biere/${biere.id_biere}`} key={index}><Biere data={biere} /></Link>
    })

    return (
      <>
        <main data-js-from="right">
          <div className='list-biere grid'>
            {bieres}
          </div>
        </main>
      </>
    );

  }

}
