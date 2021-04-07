import React, { Component } from 'react';
import { Button, Card, CardTitle, CardText, Form, Input } from 'reactstrap';

class Notecard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionfront: this.props.data.descriptionfront,
      descriptionback: this.props.data.descriptionback,
      newDescriptionfront: this.props.data.descriptionfront,
      newDescriptionback: this.props.data.descriptionback,
      notecardid: this.props.data.notecardid,
      showInputs: 'false'
    }
  }

  showInputs =() => {
    this.setState(prevState => ({
      showInputs: !prevState.showInputs
    }));
  }

  handleNoteFrontInputChange = (e) => {
    this.setState({newDescriptionfront: e.target.value});
  }
  
  handleNoteBackInputChange = (e) => {
    this.setState({newDescriptionback: e.target.value});
  }

  render() {
    if (this.state.notecardid === "")
      return <div>No notecards yet!</div>;

    return (
        <Card body inverse color="info">
          <Form>
            <CardTitle tag="h5">
              <div hidden={!this.state.showInputs}>{this.state.descriptionfront}</div>
              <Input 
                hidden={this.state.showInputs}
                value={this.state.newDescriptionfront}
                onChange={this.handleNoteFrontInputChange}
              />
            </CardTitle>
            <CardText>
              <div hidden={!this.state.showInputs}>{this.state.descriptionback}</div>
              <Input 
                hidden={this.state.showInputs}
                value={this.state.newDescriptionback}
                onChange={this.handleNoteBackInputChange}
              />
            </CardText>
            <Button onClick={this.showInputs}>Edit</Button>
          </Form>
        </Card>
    );
  }
 
};

export default Notecard;