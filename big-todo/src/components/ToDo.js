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
      isInp: false,
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

  changeItem = (text, id) => {
    const itemsCopy = JSON.parse(JSON.stringify(this.state.items));
    const changeItems = itemsCopy.find((el) => el.id === id);
    changeItems.text = text;
    this.setState(() => {
      return { items: itemsCopy, isInp: false };
    });
  };

  onEditClick = (id) => {
    const changeItems = this.state.items.find((el) => el.id === id);
    this.setState(() => {
      return { isInp: !this.state.isInp, newVal: changeItems.text };
    });
  };

  render() {
    const { inpVal, items, newVal, isInp } = this.state;
    return (
      <div>
        <div className="flex justify-center items-center my-5">
          <input
            placeholder="ToDo..."
            className="text-3xl shadow-xl text-gray-500 text-center p-4 border outline-none"
            value={inpVal}
            onChange={this.handleVal}
          ></input>
          <button
            className="text-3xl p-4 ml-2 shadow-xl text-gray-500 border transition hover:bg-blue-400"
            onClick={() => this.handleItem(inpVal)}
          >
            ADD
          </button>
        </div>
        <div>
          {items.map((el) => {
            return (
              <ol key={el.id}>
                <li className="flex justify-center items-center my-5">
                  {isInp ? (
                    <input
                      className="w-44 shadow-xl  mr-2 border outline-none text-2xl text-center"
                      onChange={this.handleNewValue}
                      defaultValue={el.text}
                    ></input>
                  ) : (
                    <p className="w-44 mr-2 text-gray-500 text-2xl">
                      {el.text}
                    </p>
                  )}
                  <button
                    className="text-2xl shadow-xl text-gray-500 p-3 border transition hover:bg-blue-400"
                    onClick={
                      isInp
                        ? () => this.changeItem(newVal, el.id)
                        : () => this.onEditClick(el.id)
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
