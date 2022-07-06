import { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";
import "./Dashboard.scss";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Create",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    if (textButton === "Create") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNotes = (note) => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Update",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Crate",
    });
  };

  deleteNotes = (e, note) => {
    e.stopPropagation();
    const { deleteNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNotes(data);
  };

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    const {
      updateNotes,
      cancelUpdate,
      onInputChange,
      handleSaveNotes,
      deleteNotes,
    } = this;
    return (
      <div className="container mt-3">
        <h4>Dashboard Page</h4>
        <hr />
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="noteTitle"
            placeholder="Input your title ..."
            value={title}
            onChange={(e) => onInputChange(e, "title")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            id="noteContent"
            rows="3"
            value={content}
            onChange={(e) => onInputChange(e, "content")}
          ></textarea>
        </div>
        <button className="btn btn-primary me-3" onClick={handleSaveNotes}>
          {textButton}
        </button>
        {textButton === "Update" ? (
          <button className="btn btn-secondary" onClick={cancelUpdate}>
            Cancel
          </button>
        ) : null}
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card mb-3 my-card"
                  key={note.id}
                  onClick={() => updateNotes(note)}
                >
                  <div className="card-header position relative">
                    {note.data.date}
                    <button
                      className="btn btn-danger rounded d-flex-inline position-absolute top-0 end-0"
                      onClick={(e) => deleteNotes(e, note)}
                    >
                      x
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{note.data.title}</h5>
                    <p className="card-text">{note.data.content}</p>
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNotes: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
