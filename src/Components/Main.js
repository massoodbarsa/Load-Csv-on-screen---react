import React, { Component } from "react";
import "./Main.css";
import * as ActionHandler from "../Actions/ActionHandler";

export default class Main extends Component {
  state = {
    load: false
  };

  onChange = e => {
    let fileUpload = document.getElementById("upload");

    if (typeof FileReader != "undefined") {
      let reader = new FileReader();
      reader.onload = e => {
        let table = document.createElement("table");
        let rows = e.target.result.split("\n");

        for (let i = 0; i < rows.length; i++) {
          let row = table.insertRow(-1);
          let cells = rows[i].split(",");

          for (let j = 0; j < cells.length; j++) {
            let cell = row.insertCell(-1);
            cell.innerHTML = cells[j]
              .replace(/"/g, "")
              .split("T0")
              .shift();
          }
        }
        let CSV = document.getElementById("CSV");
        CSV.innerHTML = "";
        CSV.appendChild(table);
      };
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("HTML5 is not supportd");
    }

    this.setState({
      load: true
    });
  };

  renderUpside() {
    return (
      <div className="input">
        <p>Choose the CSV file from your computer</p>
        <input
          id="upload"
          type="file"
          name="file"
          onChange={e => this.onChange(e)}
        />
      </div>
    );
  }

  render() {
    const { load } = this.state;
    if (load === false) {
      return <div className="main">{this.renderUpside()}</div>;
    }
    if (load === true) {
      return (
        <div className="main">
          {this.renderUpside()}
          <div id="CSV" />
          <div>
            <button onClick={() => ActionHandler.sort()}>
              Filter the results based on minimal issue
            </button>
          </div>
        </div>
      );
    }
  }
}
