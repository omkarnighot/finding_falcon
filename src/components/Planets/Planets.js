import React from 'react';
import {Link} from 'react-router-dom';
import './Planets.css';

const planetApiPath = 'https://findfalcone.herokuapp.com/planets';
const LOADING_GIF = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552800489/loading_1.gif'


class Planets extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            planets : [],
            selectedPlanets : []
        }
        this.addOrRemovePlanets = this.addOrRemovePlanets.bind(this);
    }

    addOrRemovePlanets(index,e){
        let selectedPlanets = this.state.selectedPlanets;
        if(selectedPlanets.includes(this.state.planets[index])){
            e.target.style['opacity'] = 0.5;
            e.target.style['border'] = '5px solid black';
            // e.target.style['border-radius'] = '20px';
            selectedPlanets.splice(selectedPlanets.indexOf(this.state.planets[index]), 1)
            this.setState({
                selectedPlanets : selectedPlanets
            })
            // console.log(selectedPlanets)
        }
        else{
            e.target.style['opacity'] = 1;
            e.target.style['box-shadow'] = '3px 3px 11px 1px violet';
            // e.target.style['border-radius'] = '20px';
            selectedPlanets = [...selectedPlanets,this.state.planets[index]];
            this.setState({
                selectedPlanets : selectedPlanets
            })
            // console.log(selectedPlanets);
        }

    }

    async componentDidMount(){
    try{
        let planetsData = await fetch(planetApiPath);
        let planets = await planetsData.json();
        this.setState ({
            planets : planets,
        })
    }catch(err){
        console.log(err);
    }
    }

    render(){
        let planets;
        if(this.state.planets.length){
             planets = this.state.planets.map((planet, index) => {
                return <img src={"https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746276/"+ planet.name.toLowerCase() + '.png'}
                  alt={planet.name}
                  key={index}
                  className='test m-2'
                  onClick={(e) => this.addOrRemovePlanets(index, e)} />
              })
        }
        return(
            <div className='container'>
                <div className='heading'>
                    <h3>Let's select any four planets to find her ! </h3>
                </div>
                <div className="planet-container container">
                    {!this.state.planets.length ? <img id="loading" src={LOADING_GIF} alt="...loading..."></img>:planets}
                </div>
                <div>
                    {this.state.selectedPlanets.length === 4 ? (<Link id='nav2' to={{pathname : '/vehicles',state : this.state.selectedPlanets }}><button className="btn2 btn3">Let's search!</button></Link>): this.state.selectedPlanets.length>4? (<p>You can search only 4 Planets</p>) : null}
                </div>
            </div>

        )
    }
}

export default Planets;
