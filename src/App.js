import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
    // bind() is a method on any function that returns a new function,
    // where context of this is set to whatever we passed to it
    //this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    // Arrow function automatically bing this at the first place in the context of which it is defined.
    // Here this will point to the App component extending Component
    this.setState({ searchField: e.target.value });
  };

  render() {
    // to use the state objects inside render()
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monster Rolodex </h1>
        <label
          style={{ fontWeight: "bold", marginRight: "10px", color: "#fff" }}
        >
          Search 🔎
        </label>

        <SearchBox
          placeholder="Search your Monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
