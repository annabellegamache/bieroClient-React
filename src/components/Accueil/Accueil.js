import React from 'react';
import './Accueil.css';


export default class Accueil extends React.Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
            timer : null,
        }
      }
    
  
    componentDidMount() {
     this.state.timer = setTimeout(()  => document.querySelector('main').classList.add('show'), 300);
    }
    
    componentWillUnmount() {
      clearTimeout(this.state.timer);
    }

    render() {
        return (
            <>
                <main data-js-from="left">
                    <h2>Bienvenue sur Biero</h2>
                    <h3>Bière qui mousse amasse la foule</h3>
                    <p className='para1'>Krausen garde sour squares glass Attenuation balthazar units secondary Biere conditioning, keg abv additive black brewing hefe bottle grainy brew, aroma adjunct becher hydrometer filter enzymes draught krug back. Amber Beer all-malt hopping chiller biere aerobic Bittering berliner, units mash enzymes barley crystal Attenuation becher, goblet Abbey heat hoppy copper stout krausen.</p>

                    <p>Abv abbey barleywine ale bittering extract bitter finishing, yeast units conditioned scotch double. Draft aerobic Abv lambic anaerobic pilsner berliner final, hop sour carboy autolysis filter All-malt attenuation, black hydrometer cold bright dry squares. Enzymes Autolysis krug gravity scotch grainy bung, Brew bitter glass bunghole Ale hops. Original Anaerobic bittering caramel racking Bottle real back, trappist carboy conditioned bung draft hoppy additive barleywine, sour alpha hop Ale kolsch crystal.</p>

                    <p> Ester goblet Becher fermentation black ale gravity sparge, kettle secondary rest oxidized heat Additive scotch lauter, amber pub balthazar bright hard bung. Bacterial tun rest brew degrees hydrometer Brew black squares Bottle plato, abbey Barleywine Adjunct sparge draft microbrewery units bitterness anaerobic pint.</p>
                </main>
            </>
        );
    }


}