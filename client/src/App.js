import React, { Component } from 'react'
import './App.css'

import {
  Container,
  Navbar,
  NavbarBrand,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup
} from 'reactstrap';
import Notecard from './components/Notecard';

class App extends Component {
  constructor(props) {
    super(props);
  
  this.state = {
    email: "anne@anne.com",
    password: "pass",
    userid: "",
    stackid: "1",
    stackList: [],
    newStackName: "",
    notecardList: []
  }
}

getUser = () => {
  fetch(`/api/user/${this.state.email}/${this.state.password}`,)
  .then(res => res.json())
  .then(res => {
    var userid = res.map(r=> r.userid);
    this.setState({userid});
    this.getStacks();
  })
}

getStacks = () => {
  fetch(`/api/stacks/${this.state.userid}`)
  .then(res => res.json())
  .then(res => {
    var stackList = res.map(r=> r.name);
    var userid = res.map(r=> r.userid);
    this.setState({userid});
    this.setState({stackList});
  })
}

getNotecards = () => {
  fetch(`/api/notecards/`+ this.state.stackid,)
  .then(res => res.json())
  .then(res => {
    var notecardList = res.map(r=> ({'descriptionfront': r.descriptionfront, 'descriptionback': r.descriptionback}));
    this.setState({notecardList});
  })
}

handleInputChange = (e) => {
  this.setState({newStackName: e.target.value});
}

// handleChangeStack = (e) => {
//   this.getNotecards({stackid: e.target.value});
// }

handleAddStack = () => {
  fetch('/api/stacks', {
    method: 'post',
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userid: this.state.userid,
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
  this.getUser();
  this.getStacks();
  this.getNotecards();
}

render() {
    return (
     <Container fluid className="centered">
       <Navbar dark color="dark">
         <NavbarBrand href='/'>notecards</NavbarBrand>
         <FormGroup>
              {/* <Input type="select" onChange={this.handleChangeStack}> */}
              <Input type="select">
                { this.state.stackList.length === 0 && <option>No stacks yet.</option> }
                { this.state.stackList.length > 0 && <option>Select a stack.</option> }
                { this.state.stackList.map((name, i) => <option key={i}>{name}</option>) }
              </Input>
            </FormGroup>
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
       </Navbar>
      { this.state.notecardList.map((r) => <Notecard data={r} />) }
     </Container>
    )
  }
}

export default App