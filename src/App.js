import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'
import Button from 'react-bootstrap/Button'


import sun_clouds from './sun_clouds.png'
import { addTodo } from './features/todo/todoSlice'
import {AddTodoModal} from './features/todo/todoModal'
import 'react-calendar/dist/Calendar.css';
import './App.scss';


function App() {
  const [value, onChange] = useState(new Date());
  const [today, setToday] = useState(new Date())
  const [modalShow, setModalShow] = React.useState(false);
  const todos = useSelector(state => state.todos);
  let numberTodosCompleted = todos.filter(t => t.state === "Completed").length;
  let numberTodosPostponed = todos.filter(t => t.state === "Postponed").length;
  let numberTodosInProgress = todos.filter(t => t.state === "InProgress").length;
  let numberTodosTotal = numberTodosCompleted + numberTodosInProgress + numberTodosPostponed
  
  return (
    <div className="App">
      <Container className="containerStyle" >
        <Row className="titleRow">
          <Col>
            <Row>
              <p className="headingOne">
                Calendar
              </p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="weatherPanel">
            <Row className="weatherPanelRowMargin">
              {/* This is the weather part of the app */}
                          <Col>
                <Figure>
                  <Figure.Image
                    width={50}
                    height={50}
                    alt="171x180"
                    src={ sun_clouds}
                  />
            </Figure>
            <p>25 degrees C</p>
            <p>Clouds and Sunshine</p>
            </Col>
            </Row> 
            <Row>
              <Col>
                {today.toDateString()}
              </Col>
            </Row>
            <Row>
              <Col>
                Due Date
              </Col>
              <Col>
                Description
              </Col>
            </Row>
            <Row>
              <Col>
                {todos.map(t =>
                  <Row key={t.id }>
                    <Col className="textAlignRight">
                      {t.dueDate}
                    </Col>
                    <Col className="textAlignLeft">
                      {t.description}
                    </Col>
                  </Row> )}
              </Col>
            </Row>
            </Col>
          <Col md={8}>
            <Row className="justify-content-center">
              <Calendar
                className="calendar"
                onChange={onChange}
                value={value}
              />
            </Row>
            <Row className="justify-content-center taskRow">
              <Col xs="auto"><p>Completed</p><p>{numberTodosCompleted }</p></Col>
              <Col xs="auto"><p>Postponed</p><p>{numberTodosPostponed}</p></Col>
              <Col xs="auto" ><p>In Progress</p><p>{numberTodosInProgress}</p></Col>
              <Col xs="auto"><p>All Tasks</p><p>{numberTodosTotal}</p></Col>
              <Col xs="auto buttonRow">
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                  +
                  </Button>
                      <AddTodoModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
              </Col>
            </Row>
          </Col>
      </Row>
      </Container>
      </div>

  );
}

export default App;