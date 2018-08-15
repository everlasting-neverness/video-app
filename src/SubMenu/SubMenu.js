import React from "react";

class SubMenu extends React.Component {
  render() {
    return (
      <div className="sub-menu-block">
        <select
          defaultValue={this.props.type}
          name="type"
          id="select-type"
          className="sub-menu-select"
          onChange={this.props.handleSubMenuSelect}
        >
          <option value="Year">Year</option>
          <option value="Title">Title</option>
        </select>
        <select
          defaultValue={this.props.way}
          name="way"
          id="select-way"
          className="sub-menu-select"
          onChange={this.props.handleSubMenuSelect}
        >
          <option value="incr">Increase</option>
          <option value="decr">Decrease</option>
        </select>
      </div>
    );
  }
}

export default SubMenu;
