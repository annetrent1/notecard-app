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
  FormGroup,
  Card,
  CardTitle,
  CardText,
  Form
} from 'reactstrap';
import Notecard from './components/Notecard';

class App extends Component {
  constructor(props) {
    super(props);
  
  this.state = {
    email: "anne@anne.com",
    password: "pass",
    userid: "",
    stackid: "",
    stackList: [],
    newStackName: "",
    notecardList: [],
    newNotecardFront: "",
    newNotecardBack: "",
    notecardid: ""
  }
}

getUser = () => {
  fetch(`/api/user/${this.state.email}/${this.state.password}`,)
  .then(res => res.json())
  .then(res => {
    var userid = res.map(r=> r.userid);
    this.setState({userid: userid[0]});
    this.getStacks();
  })
}

getStacks = () => {
  fetch(`/api/stacks/${this.state.userid}`)
  .then(res => res.json())
  .then(res => {
    var stackList = res.map(r=> ({'name': r.name, 'stackid': r.stackid}));
    this.setState({stackList});
  })
}

getNotecards = () => {
  fetch(`/api/notecards/${this.state.stackid}`,)
  .then(res => res.json())
  .then(res => {
    var notecardList = res.map(r=> ({'descriptionfront': r.descriptionfront, 'descriptionback': r.descriptionback, 'notecardid': r.notecardid}));
    this.setState({notecardList});
  })
}

handleInputStackChange = (e) => {
  this.setState({newStackName: e.target.value});
}

handleNoteFrontInputChange = (e) => {
  this.setState({newNotecardFront: e.target.value});
}

handleNoteBackInputChange = (e) => {
  this.setState({newNotecardBack: e.target.value});
}

handleChangeStack = (e) => {
  var stackid = e.target.value;
  this.setState({stackid: e.target.value}, () => {
    this.getNotecards();
  });
}

handleAddStack = () => {
  if (this.state.newStackName !== "" && this.state.userid !== "") {
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
}

handleAddNotecard = () => {
  var descriptionfront = this.state.newNotecardFront
  var descriptionback = this.state.newNotecardBack
  var stackid = this.state.stackid

  if (descriptionfront !== "" && descriptionback !== "" && stackid !=="") {
    fetch('/api/notecards', {
      method: 'post',
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stackid: this.state.stackid,
        descriptionfront: this.state.newNotecardFront,
        descriptionback: this.state.newNotecardBack
      })
    })
    .then(res => res.json())
    .then(res => {
      this.getNotecards();
      this.setState({newNotecardFront: ''});
      this.setState({newNotecardBack: ''});
    })
  }
}

componentDidMount() {
  this.getUser();
}

render() {
    return (
     <Container fluid>
       <Navbar dark className="barcontainer" color="dark">
         <NavbarBrand href='/'>notecards</NavbarBrand>
         <FormGroup className="input-container">
              <Input type="select" onChange={this.handleChangeStack}>
                { this.state.stackList.length === 0 && <option>No stacks yet.</option> }
                { this.state.stackList.length > 0 && <option>Select a stack.</option> }
                { this.state.stackList.map((r) => <option key={r.stackid} value={r.stackid}>{r.name}{r.stackid}</option>) }
              </Input>
          </FormGroup>
         <InputGroup className="stack-input">
          <Input 
            placeholder="New Stack Name"
            value={this.state.newStackName}
            onChange={this.handleInputStackChange}
          />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={this.handleAddStack}>Add Stack</Button>
          </InputGroupAddon>
       </InputGroup>
       </Navbar>
       <div className="card-container">
        { this.state.notecardList.map((r) => <Notecard className="card" data={r} key={r.notecardid}/> ) }
        <Card body inverse color="info" className="card">
          <Form>
            <CardTitle tag="h5">
              <Input 
                placeholder="New Notecard Title"
                value={this.state.newNotecardFront}
                onChange={this.handleNoteFrontInputChange}
              />
            </CardTitle>
            <CardText>
              <Input 
                placeholder="New Notecard Body"
                value={this.state.newNotecardBack}
                onChange={this.handleNoteBackInputChange}
              />
            </CardText>
            <Button color="secondary" onClick={this.handleAddNotecard}>Add</Button>
          </Form>
        </Card>
      </div>
     </Container>
    )
  }
}

export default App