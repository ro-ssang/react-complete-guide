import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "qhr12", name: "Max", age: 28 },
      { id: "zv0", name: "Manu", age: 29 },
      { id: "i90", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
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

  render() {
    const style = {
      padding: "8px",
      color: "white",
      backgroundColor: "green",
      border: "1px solid blue",
      font: "inherit",
      cursor: "pointer",
      ":hover": {
        color: "black",
        backgroundColor: "lightgreen",
      },
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person key={person.id} changed={(event) => this.nameChangedHandler(event, person.id)} click={() => this.deletePeronHanlder(index)} name={person.name} age={person.age} />;
          })}
        </div>
      );

      style.backgroundColor = "red";
      style[":hover"] = {
        color: "black",
        backgroundColor: "salmon",
      };
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red"); // classes = ["red"]
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold"); // classes = ["red", "bold"]
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle Buttons
        </button>
        {persons}
      </div>
    );
    // return React.createElement("div", { className: "App" }, React.createElement("h1", null, "Does this work now?"));
  }
}

export default App;
