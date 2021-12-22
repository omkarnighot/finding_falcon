import React from 'react';
import './Display.css'
let PLANET_IMG_PATH = "https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746276/";

class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            planet : this.props.planet,
            index : this.props.index
        }
    }
    render(){
        // console.log(this.props.planet)
        let vehiclesList = this.props.vehicles.map((vehicle,index)=>{
        return <li key={index}className="list-item m-2" onClick={(e)=>this.props.mouseClick(index,e)} onMouseEnter={(e)=>this.props.mouseEnter(index,e)} onMouseLeave={(e)=>this.props.mouseLeave(index,e)}> {vehicle.name}-{vehicle.total_no}</li>
        })
        return (
            <div className="col-6 display-container  mb-2">
                <img className="image " src={PLANET_IMG_PATH + this.state.planet.name.toLowerCase() + '.png'}  alt={this.state.planet.name}></img>

                <ul className='vehicle-list ' id={this.state.index}>{vehiclesList}</ul>
            </div>
        )
    }
}

export default Display;
