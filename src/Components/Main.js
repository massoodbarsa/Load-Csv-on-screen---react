import React, { Component } from "react";
import "./Main.css";

export default class Main extends Component {
  state = {
    load: false
  };

  onChange = e => {
    var fileUpload = document.getElementById("upload");

    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function(e) {
        var table = document.createElement("table");
        var rows = e.target.result.split("\n");

        for (var i = 0; i < rows.length; i++) {
          var row = table.insertRow(-1);
          var cells = rows[i].split(",");

          for (var j = 0; j < cells.length; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = cells[j].replace(/"/g, "").split("T0").shift();
          }
        }
        var CSV = document.getElementById("CSV");
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

  sort = () => {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("CSV").getElementsByTagName("table")[0];
    switching = true;

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[2];
        y = rows[i + 1].getElementsByTagName("td")[2];

        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  };

  render() {
    if (this.state.load === false) {
      return (
        <div className="main">
          <div className="input">
            <input
              id="upload"
              type="file"
              name="file"
              onChange={e => this.onChange(e)}
            />
          </div>
        </div>
      );
    }
    if (this.state.load === true) {
      return (
        <div className="main">
          <div className="input">
            <input
              id="upload"
              type="file"
              name="file"
              onChange={e => this.onChange(e)}
            />
          </div>

          <div id="CSV" />
          <div>
            {" "}
            <button onClick={() => this.sort()}>
              Filter the results based on minimal issue
            </button>
          </div>
        </div>
      );
    }
  }
}
