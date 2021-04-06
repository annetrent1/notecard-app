import React, { Component } from 'react'
// import './App.css'

import {
  Container,
  Navbar,
  NavbarBrand
} from 'reactstrap';

class App extends Component {
  state = {
  }

render() {
    return (
     <Container fluid className="centered">
       <Navbar dark color="dark">
         <NavbarBrand href='/'>notecards</NavbarBrand>
       </Navbar>
     </Container>
    )
  }
}

export default App