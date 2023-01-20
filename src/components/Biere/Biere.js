import React from 'react';
import './Biere.css';
import image from './biere.png';


export default class Biere extends React.Component {

  render() {

    return (
      <>
        <article className="carteListe">
          <div className='info'>
            <h3>{this.props.data.nom}</h3>
            <h4>{this.props.data.brasserie}</h4>
          </div>
          <img src={image} alt="biere" />
          <div className='etoileBox' dangerouslySetInnerHTML={{ __html: this.props.data.elStar }} />
          <small>({this.props.data.note_nombre})</small>
          <a className='btn'>Détails</a>
        </article>
      </>
    );
  }
}
