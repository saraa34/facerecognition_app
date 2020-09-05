import React, { Component } from 'react';
import './App.css';
import Navigazione from './Componenti/Navigazione/Navigazione';
import Logo from './Componenti/Logo/Logo';
import ImageLinkForm from './Componenti/ImageLinkForm/ImageLinkForm';
import Rank from './Componenti/Rank/Rank';
import Particles from 'react-particles-js'
import FaceRecognition from './Componenti/FaceRecognition/FaceRecognition';
import Register from './Componenti/Register/Register';
import SignIn from './Componenti/SignIn/SignIn';



const particlesOptions = {
  particles: {
    number: {
      value: 105,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      }
    }
  }
}

const initialState = {
    input: '',            
    imageUrl: '',
    box: '',
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  caricaUser = (info) => {
     this.setState({user: {
      id: info.id,
      name: info.name,
      email: info.email,
      entries: info.entries,
      joined: info.joined
  }})
  }

  calcolaFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;                                                                                           //preleva dall'object della risposta dell'API l'info di cui abbiamo bisogno (bounding box)
    const image = document.getElementById('img');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width
    }
  }

  mostraFaceBox = (box) => {
    this.setState({ box });
  }

  quandoCambiaInput = (event) => {       
    this.setState({ input: event.target.value });    
  }

  quandoCliccaBottone = () => {          
    this.setState({ imageUrl: this.state.input })     
    fetch('https://agile-wave-90163.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())                    
      .then(response => {
        if (response) {
          fetch('https://agile-wave-90163.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
      this.mostraFaceBox(this.calcolaFaceLocation(response))   
      })
      .catch(err => console.log(err));
  }

 CambiaRoute = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;  
    return (
      <>
        <div className="App">
          <Particles className='particles' params={particlesOptions} />
          <Navigazione isSignedIn={isSignedIn} CambiaRoute={this.CambiaRoute} />
          {route === 'home'                        
            ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                cambiaInput={this.quandoCambiaInput}
                cliccaBottone={this.quandoCliccaBottone}/>   {
                <FaceRecognition box={box} urlRicevuto={imageUrl} />  
              }</div>
            : (
              route === 'signin'
                ? <SignIn caricaUser={this.caricaUser} CambiaRoute={this.CambiaRoute} />
                : <Register caricaUser={this.caricaUser} CambiaRoute={this.CambiaRoute} />
            )

          }
        </div>
      </>
    );
  }
}


export default App;
