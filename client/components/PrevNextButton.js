import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
export const PrevNextButton = props => {
  return (
    <Row>
      <Col />
      <Col />
      <Col />
      <Col>
        {props.page > 1 ? (
          <div>
            <Button name="prev" onClick={props.clickHandler}>
              Prev
            </Button>
            <Button name="next" onClick={props.clickHandler}>
              Next
            </Button>
          </div>
        ) : (
          <div>
            <Button name="prev" disabled>
              Prev
            </Button>
            <Button name="next" onClick={props.clickHandler}>
              Next
            </Button>
          </div>
        )}
      </Col>
      <Col />
      <Col />
      <Col />
    </Row>
  )
}

export default PrevNextButton
