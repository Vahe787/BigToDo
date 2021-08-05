import React from "react";
import handleItems from "../helpers/HandleItem";

class DeleteItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleItems = handleItems.bind(this, this.props.deleteItem);
  }

  render() {
    return (
      <button
        className="text-2xl p-3 shadow-xl text-gray-500 ml-2 border transition hover:bg-red-400"
        onClick={this.handleItems}
      >
        Delete
      </button>
    );
  }
}

export default DeleteItem;
