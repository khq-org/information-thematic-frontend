import React from "react";
class ListEvent extends React.Component {
  render() {
    const { Events } = this.props;
    const result = Events.map((event, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{event.title}</td>
          <td>{event.start}</td>
          <td>{event.end}</td>
          <td>
            <button
              onClick={() => {
                this.props.isUpdateEvent(event);
              }}
            >
              <i className="material-icons">&#xE254;</i>
            </button>
            <button onClick={() => this.props.deleteEvent(event.id)}>
              <i className="material-icons">&#xE872;</i>
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        {this.props.Events.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{result}</tbody>
          </table>
        ) : (
          <h1>Không có sự kiện</h1>
        )}
      </div>
    );
  }
}
export default ListEvent;
