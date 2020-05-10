import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Accordion, Form, Card, Button } from 'react-bootstrap';
import { selectList, selectLoading, selectFilterTypes } from './reducer';

import eventTypes from './eventTypes';

import Event from './event/Event';

import { fetchNextEventsPage, setEventTypeFilter } from './actions';

import styles from './Events.module.css';

const Events = () => {
  
    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);
    const list = useSelector(selectList);
    const filterTypes = useSelector(selectFilterTypes)

    const onLoadMoreClicked = (event) => {
      dispatch(fetchNextEventsPage());
      event.preventDefault();
    };

    const typeFilterCheckChanged = (event, type) => {
      dispatch(setEventTypeFilter(type.key, event.target.checked));
    };

    function getEventTypeFilterChecks() {
      return (
      <Form>
          {
            eventTypes.map(type => {
              return (
                <Form.Group key={type.key}>
                    <Form.Check checked={filterTypes.some(ft => ft === type.key)} label={type.name} onChange={(event) => typeFilterCheckChanged(event, type)}>
                    </Form.Check>
                </Form.Group>
              );
            })
          }
      </Form>);
    }

    return (
      <Row className={styles.events}>
        <Col>
          <Row>
            <Col>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Filter by Event Type
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {getEventTypeFilterChecks()}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col>
              {
                list.map(item => {
                    return (<Event key={item._id} item={item}/>);
                })
              }
            </Col>
          </Row>
          <Row>
            <Col>
            {
              loading
              ? (<div>Loading ...</div>)
              : (<div><button onClick={(event) => onLoadMoreClicked(event)}>Load More</button></div>)
            } 
            </Col>
          </Row>
        </Col>
      </Row>
    );
};

export default Events;