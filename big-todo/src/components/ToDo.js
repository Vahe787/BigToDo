import React from "react";
import DeleteItem from "./DeleteItem";
import { v4 as uuidv4 } from "uuid";

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inpVal: "",
      newVal: "",
      items: [],
    };
  }

  handleVal = (e) => {
    this.setState({ inpVal: e.target.value });
  };

  handleNewValue = (e) => {
    this.setState({ newVal: e.target.value });
  };

  handleItem = (text) => {
    this.setState((prevState) => {
      if (text) {
        return {
          items: [...prevState.items, { text, id: uuidv4(), isInp: false }],
          inpVal: "",
        };
      }
    });
  };

  deleteItem = (id) => {
    this.setState((prevState) => {
      const newItems = prevState.items.filter((el) => el.id !== id);
      return { items: newItems };
    });
  };

  changeItem = (id) => {
    this.setState((prevstate) => {
      return {
        items: prevstate.items.map((el) => {
          const { isInp } = el;
          if (el.id === id) {
            el.isInp = true;
          }
          return el;
        }),
      };
    });
  };

  saveChange = (text, id) => {
    this.setState((prevstate) => {
      return {
        items: prevstate.items.map((el) => {
          if (el.id === id) {
            el.text = text;
            el.isInp = false;
          }
          return el;
        }),
      };
    });
  };

  render() {
    const { inpVal, items, newVal } = this.state;
    return (
      <div className="bg-black">
        <div>
          <input value={inpVal} onChange={this.handleVal}></input>
          <button onClick={() => this.handleItem(inpVal)}>ADD</button>
        </div>
        <div>
          {items.map((el) => {
            return (
              <ol>
                <li key={el.id}>
                  {el.isInp ? (
                    <input
                      onChange={this.handleNewValue}
                      defaultValue={el.text}
                    ></input>
                  ) : (
                    <p>{el.text}</p>
                  )}
                  <button
                    onClick={
                      el.isInp
                        ? () => this.saveChange(newVal, el.id)
                        : () => this.changeItem(el.id)
                    }
                  >
                    Change
                  </button>
                  <DeleteItem deleteItem={() => this.deleteItem(el.id)} />
                </li>
              </ol>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ToDo;
