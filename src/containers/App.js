import React, { Component } from "react";

import classes from "./App.css";
import Cockpit from "../components/Cockpit/Cockpit";
import Persons from "../components/Persons/Persons";
import withClass from "../hoc/withClass";
import Aux from "../hoc/Auxiliary";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: "qhr12", name: "Max", age: 28 },
      { id: "zv0", name: "Manu", age: 29 },
      { id: "i90", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  // componentWillMount() {
  //   console.log("[App.js] componentWillMount");
  // }

  componentDidMount() {
    console.log("[App.js] componenetDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  deletePeronHanlder = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  toggleCockpitHandler = () => {
    const doesShow = this.state.showCockpit;
    this.setState({ showCockpit: !doesShow });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log("[App.js] render");
    let persons = null;
    let cockpit = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          changed={this.nameChangedHandler}
          clicked={this.deletePeronHanlder}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    if (this.state.showCockpit) {
      cockpit = (
        <Cockpit
          title={this.props.appTitle}
          personsLength={this.state.persons.length}
          showPersons={this.state.showPersons}
          clicked={this.togglePersonsHandler}
        />
      );
    }

    return (
      <Aux>
        <button onClick={this.toggleCockpitHandler}>Remove Cockpit</button>
        <AuthContext.Provider
          value={{ authenticated: this.state.authenticated, login: this.loginHandler }}
        >
          {cockpit}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement("div", { className: "App" }, React.createElement("h1", null, "Does this work now?"));
  }
}

export default withClass(App, classes.App);
