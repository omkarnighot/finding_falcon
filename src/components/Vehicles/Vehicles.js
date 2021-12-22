import React from 'react';
import { Link } from 'react-router-dom'
import Display from '../Display/Display'

const VEHICLES_API = 'https://findfalcone.herokuapp.com/vehicles'

class Vehicles extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedPlanets : this.props.location.state ,
            vehicles : [],
            vehiclesName : [],
            finalSelection : {},
            totalTime : 0,
            showRange : false,
            range : 0
        }
        this.handleVehicleClick = this.handleVehicleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset(){
        window.location.reload();
    }

    handleMouseEnter(index){
        this.setState({
            showRange : true,
            range : this.state.vehicles[index].max_distance
        }
        )
    }

    handleMouseLeave(){
        this.setState({
            showRange : false
        })
    }

    handleVehicleClick(index,e){
        if(Object.keys(this.state.finalSelection).length !== 4){
            let listId = e.target.parentElement.id;
            let vehicles = this.state.vehicles;
            let selectedPlanets = this.state.selectedPlanets;

            if(selectedPlanets[listId].distance > vehicles[index].max_distance){
                //add some warning function
                this.showWarning(e);
                return ;
            }

            if(vehicles[index].total_no > 0){
                let finalSelection = Object.assign({},this.state.finalSelection);
                let selectedPlanetName = selectedPlanets[listId].name.toString();

                if(!(Object.keys(finalSelection).includes(selectedPlanetName))){
                    //add some style function
                    this.setSuccessStyle(e);
                    --vehicles[index].total_no;
                    finalSelection[`${selectedPlanets[listId].name}`] = vehicles[index].name;
                    // console.log(this.state.final);
                    this.setState({

                        totalTime : this.state.totalTime + selectedPlanets[listId].distance / vehicles[index].speed
                      })
                }
                this.setState({finalSelection , vehicles})
                // console.log(this.state.finalSelection);

            }else{
                this.setFailureStyle(e);
            }

        }
    }

    showWarning(e){
        alert("Please choose vehicle according to the distance!")
    }

    setSuccessStyle(e){
        // console.log("success mf!")
        e.target.style['box-shadow'] = "3px 3px 11px 1px #afa";
        e.target.style['border-radius'] = '8px';
        e.target.style['color'] = 'violet';
    }

    setFailureStyle(e){
        // console.log("failure mf!!!")
        e.target.style['box-shadow'] = "3px 3px #d21";

    }

    async componentDidMount(){
        try{
            let response = await fetch(VEHICLES_API);
            let vehiclesData = await response.json();
            let vehiclesName = await vehiclesData.map(vehicle => vehicle.name);
            this.setState({
                vehiclesName : vehiclesName,
                vehicles : vehiclesData,
            })
            // console.log(this.state.selectedPlanets);

        }
        catch(err){
            console.log(err);
        }
    }

    render(){
        let planets;
        if(this.state.selectedPlanets.length){
            planets = this.state.selectedPlanets.map((planet,index)=>{
                return (<div className='m-2 col-lg-3' key={index}>
                    <Display
                    planet = {planet}
                    index = {index}
                    vehicles = {this.state.vehicles}
                    mouseClick = {this.handleVehicleClick}
                    mouseEnter = {this.handleMouseEnter}
                    mouseLeave = {this.handleMouseLeave}
                    />
                </div>)
            })
        }
        return (
            <div className='container'>
            <a onClick={this.reset} className="reset">Reset</a>
            <h3 className="mb-2 container">Choose a vehicle for deployment to each planet.</h3>
            <div className="d-flex justify-content-space-between">
            {planets}
            </div>
            {this.state.showRange === true && Object.keys(this.state.finalSelection).length !== 4 ? (<div className="range-container"><p>Can go {this.state.range} mega miles.</p></div>):null}
            {Object.keys(this.state.finalSelection).length === 4 ? <Link id='nav2' to={{pathname : "/result" ,state: [this.state.finalSelection, this.state.totalTime]}}><button className="btn2 btn3">Find Falcone!</button></Link> : null}
            </div>
        )
    }
}
export default Vehicles;
