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

  componentDidMount() {
    this.setState({descriptionfront: this.props.data.descriptionfront})
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

  handleEditNotecard = () => {
    var front = this.state.newDescriptionfront
    var back = this.state.newDescriptionback
    var id = this.state.notecardid
    if (front !== "" && back !== "" && id !=="") {
      fetch('/api/notecards/edit', {
        method: 'post',
        headers: { 
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notecardid: this.state.notecardid,
          descriptionfront: this.state.newDescriptionfront,
          descriptionback: this.state.newDescriptionback
        })
      })
      .then(res => {
        this.setState({descriptionfront: front, descriptionback: back}, () => {
          this.showInputs();
        });
      })
    }
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
            <Button onClick={this.showInputs}>{this.state.showInputs ? `Edit` : `Cancel`}</Button>
            <Button hidden={this.state.showInputs} onClick={this.handleEditNotecard}>Submit</Button>
          </Form>
        </Card>
    );
  }
 
};

export default Notecard;