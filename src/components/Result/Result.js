import React from 'react';
import { Link } from 'react-router-dom';
import './result.css';

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            finalSelection : this.props.location.state[0],
            totalTime: this.props.location.state[1],
            planet: '',
            status : false,
            loading : true,
        }
    }

    async componentDidMount(){
        let tokenResponse = await fetch('https://findfalcone.herokuapp.com/token',{
            method : 'POST',
            headers : {
                'Accept' : 'application/json'
            }
        });
        let token = await tokenResponse.json();
        let data = {
            'token' : token.token,
            'planet_names' : Object.keys(this.state.finalSelection),
            'vehicle_names' : Object.values(this.state.finalSelection),
        };
        let resultResponse = await fetch('https://findfalcone.herokuapp.com/find',{
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify(data)
        });
        let result = await resultResponse.json();

        if(result.status === 'success'){
            this.setState({
                loading : false,
                status : true,
                planet : result.planet_name
            })
        }
        else{
            this.setState({
                loading : false,
                status : false,
            })
        }
    }

    render(){
        return (
            <>
            {this.state.loading === true ? (<iframe src="https://giphy.com/embed/dAcUSqS5cT5oIt75jS" width="100%" height="480" frameBorder="0" className="giphy-embed" allowFullScreen title="hello"></iframe>)
            : this.state.status=== false ? (<div className="result container">
                <h3 className="failure-heading">Mission Failed!</h3>
                <p className="failure-text">Queen was not hiding on these planets</p>
                <Link id='nav2' to={{pathname:'/'}}><button className="btn2 btn3">Try again</button></Link>
            </div>)
            : (
            <div className="result container">
                <h3 className="success-heading">Mission Successful!</h3>
                <p className="success-text">Queen was hiding on the planet of <span className="planet-name">{this.state.planet}</span>.We found her in <span className="time">{this.state.totalTime}</span> hours.</p>
                <Link id='nav2' to={{pathname:'/'}}><button className="btn2 btn3">Play again</button></Link>
            </div>)}
            </>
        )
    }
}

export default Result;
