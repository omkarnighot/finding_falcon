import React from "react";
import './Home.css';
// import { Link } from 'react-router-dom'
import { Link } from "react-router-dom";


const FALCON_IMAGE_PATH = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746277/falcon.png'


class Home extends React.Component{
    render(){
        return (
            <div className='story container'>
              <h1>Finding Falcone!</h1>
                <div className='storyboard'>
                  <div className='img-container'>
                  <img className='falcon-img' src={FALCON_IMAGE_PATH} alt='Falcon' />
                  </div>
                    <div className='s-container' id='storyboard-text'>
                      In the planet of Lengaburu...in the distant
                      distant galaxy of Tara B. After the recent war with neighbouring
                      planet Falicornia, King Shan has exiled the Queen of Falicornia
                      for 15 years.<br /><hr />
                      Queen Al Falcone is now in hiding. But if King Shan can find
                      her before the years are up, she will be exiled for another 15
                      years....
                    </div>
                 <div>
                <Link to='/planets'>
                    <button className='btn-1' >Find her!</button>
                </Link>
          </div>
        </div>
      </div>
        )
    }
}

export default Home
