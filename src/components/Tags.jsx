import React from "react";
import { Card, Container, Row } from "react-bootstrap";

function Tags({ tags }) {
  return (
    <Container className="px-0">
      <Row>
        {tags.map((tag, i) => {
          const {
            confidence,
            tag: { en },
          } = tag;

          return (
            <Card.Body className="col-3" key={i.toString() + "a"}>
              <Card.Subtitle className="text-capitalize">{en}</Card.Subtitle>
              <Card.Footer>{confidence.toFixed(2) + " %"}</Card.Footer>
            </Card.Body>
          );
        })}
      </Row>
    </Container>
  );
}

export default Tags;
