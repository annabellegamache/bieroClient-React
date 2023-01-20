import React,  {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'; 
import './DetailBiere.css';
import image from './biere.png';

export default function DetailBiere(props) {

  const params = useParams();
 
  const urlBiere= `http://127.0.0.1:8000/webservice/php/biere/${params.id}`,
        urlBiereCommentaire = `${urlBiere}/commentaire`,
        urlBiereNote = `${urlBiere}/note`;

  const [biere, setBiere] = useState({}),
        [commentaires, setCommentaires] = useState([]),
        [newCommentaire, setNewCommentaire] = useState(''),
        [notes, setNotes] = useState([]),
        [newNote, setNewNote] = useState('');



  useEffect(() => {
     
    /*fetch biere*/
     fetch(urlBiere)
     .then((response) => { return response.json() })
     .then((data) => {
        //Gestion l'image par défaut
       if (!data.data.image) data.data.image = {image}; 
       setBiere(data.data)
     })

     /*fetch commentaire*/
     fetch(urlBiereCommentaire)
     .then((response) => { return response.json() })
     .then((data) => {
       setCommentaires(data.data)
     })

     /*fetch note*/
     fetch(urlBiereNote)
     .then((response) => { return response.json() })
     .then((data) => {
      setNotes(data.data)
     })
     
  // eslint-disable-next-line  
  }, []);
  
/*gestion titre commentaire*/
let commentTitle 

switch (commentaires.length) {
  case 0:
    commentTitle = 'Aucun commentaire'
    break;
  case 1:
    commentTitle = 'Commentaire'
    break;
  default:
    commentTitle = 'Commentaires'
    break;
}

let blocAjoutCommentaire,
    blocAjoutNote,
    blocAjoutTitre;

//si usager estt connecté zone interactive s'affichera
if (props.courriel){

  blocAjoutTitre = "Exprime toi ";

  blocAjoutCommentaire = <div>
                            <form>
                              <textarea onBlur={setCommentaire} placeholder='Écris ton commentaire'></textarea>
                              <button onClick ={soumettre}>Soumettre</button>
                            </form>
                          </div>

  blocAjoutNote = <div>
                    <form className='starForm'>
                      Ta note &#128073;
                      <input onClick={setNote} type="radio" id="star5" name="rating" value="5" /><label  for="star5"></label>
                      <input onClick={setNote} type="radio" id="star4" name="rating" value="4" /><label  for="star4"></label>
                      <input onClick={setNote} type="radio" id="star3" name="rating" value="3" /><label  for="star3"></label>
                      <input onClick={setNote} type="radio" id="star2" name="rating" value="2" /><label  for="star2"></label>
                      <input onClick={setNote} type="radio" id="star1" name="rating" value="1" /><label  for="star1"></label>
                    </form>
                  </div>
}


function soumettre(e){
  e.preventDefault();
  soumettreCommentaire();
  soumettreNote();
}

function setCommentaire(e){
  setNewCommentaire(e.target.value);
}

function setNote(e){
  setNewNote(e.target.value);
}

/*put commentaire*/
async function soumettreCommentaire(){

  let oCommentaire = {
    commentaire: newCommentaire,
    courriel: props.courriel
  }

  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('biero:biero') //permission de la bd
    },
    body:  JSON.stringify(oCommentaire)//besoin d'encoder le .json en string
  }

  //appel asychrone de put and get commentaire
  let putCommentaire = await fetch(urlBiereCommentaire, options), 
      getCommentaires = await fetch(urlBiereCommentaire);

  Promise.all([putCommentaire, getCommentaires])
    .then((response) => {
      return response[1].json(); //getCommentaire
    })
    .then((data) => {
      console.log(data)
      setCommentaires(data.data)
    })
}

/*put note*/
async function soumettreNote(){

  let oNote = {
    note: newNote,
    courriel: props.courriel
  }
  
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('biero:biero') 
    },
    body:  JSON.stringify(oNote)
  }


  let putNote = await fetch(urlBiereNote, options), 
      getNotes = await fetch(urlBiereNote);

  Promise.all([putNote, getNotes])
    .then((response) => {
      return response[1].json(); //getNotes
    })
    .then((data) => {
      console.log(data)
      setNotes(data.data)
    })
}

/* Gestion étoile note bière*/
const star = notes.note;

notes.noteDom = 'Note : ';
let nbStarRempli = parseInt(star);
let nbStarDemi = star%1; 

for (let i = 0, l=5; i<l; i++) {

   if(nbStarRempli > i){
     notes.noteDom += '<i class="fa fa-star"></i>'
   } else if (nbStarDemi !== 0) {
     notes.noteDom += '<i class="fa fa-star-half-o"></i>'
     nbStarDemi = 0;
   } else {
     notes.noteDom += '<i class="fa fa-star-o"></i>';
   }

 }
 
notes.noteDom += ` (${notes.nombre})`;



const commentairesDom = commentaires.map((commentaire, index) => {
  return <article key={index}> <p><blockquote><i className="fa fa-quote-left"></i>{commentaire.commentaire}<i class="fa fa-quote-right"></i></blockquote><small>{commentaire.courriel}</small></p> </article>
})
  
 return (
  <>
    <article className='detail-biere-container'>
      <div>
      <img src={image} alt="biere"  />
      </div>
        <div>
          <h2>{biere?.nom}</h2>
          <h3><small>Brasserie : </small>{biere?.brasserie}</h3>
          <div className='etoileBox' dangerouslySetInnerHTML={{ __html: notes.noteDom}} />
          <p>{biere?.description}</p>
          <div className='comments'>
           <h5>{commentTitle}</h5> 
            {commentairesDom}
          </div>
        </div>
    </article>
    <div className='userZone-container'>
    <h4>{blocAjoutTitre} <small>{props.courriel}</small></h4>
      <div className='userZone'>
        {blocAjoutNote}
        {blocAjoutCommentaire}   
      </div>
    </div>
   </>
 )

}

