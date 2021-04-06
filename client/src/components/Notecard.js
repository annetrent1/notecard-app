import React from 'react';
import { Card, CardTitle, Button, CardText } from 'reactstrap';

const Notecard = (props) => {
  const { data } = props;

  if (!data)
    return <div>No notecards yet!</div>;

  return (
      <Card body inverse color="info">
        <CardTitle tag="h5">{data.descriptionfront}</CardTitle>
        <CardText>{data.descriptionfront}</CardText>
        <Button color="secondary">Edit</Button>
      </Card>
  );
};

export default Notecard;