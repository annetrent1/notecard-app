import React, { Component } from 'react'
// import './App.css'

import {
  Container,
  Navbar,
  NavbarBrand,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
  
  this.state = {
    stackid: "1",
    stackList: [],
    newStackName: ""
  }
}

getStacks = () => {
  fetch('/api/stacks')
  .then(res => res.json())
  .then(res => {
    var stackList = res.map(r=> r.name);
    this.setState({stackList});
  })
}

handleInputChange = (e) => {
  this.setState({newStackName: e.target.value});
}

handleAddStack = () => {
  fetch('/api/stacks', {
    method: 'post',
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userid: this.state.stackid,
      stack: this.state.newStackName
    })
  })
  .then(res => res.json())
  .then(res => {
    this.getStacks();
    this.setState({newStackName: ''});
  })
}

componentDidMount() {
  this.getStacks();
}

render() {
    return (
     <Container fluid className="centered">
       <Navbar dark color="dark">
         <NavbarBrand href='/'>notecards</NavbarBrand>
       </Navbar>
       <InputGroup>
        <Input 
          placeholder="New Stack Name"
          value={this.state.newStackName}
          onChange={this.handleInputChange}
        />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={this.handleAddStack}>Add Stack</Button>
        </InputGroupAddon>
       </InputGroup>
     </Container>
    )
  }
}

export default App