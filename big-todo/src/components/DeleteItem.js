import React from "react";
import handleItems from "../helpers/HandleItems";

class DeleteItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleItems = handleItems.bind(this, this.props.deleteItem);
  }

  render() {
    return <button onClick={this.handleItems}>Delete</button>;
  }
}

export default DeleteItem;
