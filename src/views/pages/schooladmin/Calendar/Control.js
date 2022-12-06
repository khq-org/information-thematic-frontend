import React from "react";
class Control extends React.Component {
  onClick = (e) => {
    this.props.onClick(e.target.name);
  };
  render() {
    return (
      <div className="control">
        <button
          type="button"
          className="btn btn-primary"
          name="add"
          onClick={this.onClick}
        >
          Thêm mới
        </button>
        <button
          type="button"
          className="btn btn-primary"
          name="event"
          onClick={this.onClick}
        >
          Danh sách lịch
        </button>
        <br />
      </div>
    );
  }
}
export default Control;
