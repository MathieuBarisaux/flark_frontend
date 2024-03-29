import "./Note.scss";

// ** Components **
import InputText from "../InputText/InputText";

// ** Hooks **
import { useState } from "react";

// ** Dependencies **
import axios from "axios";

// ** Global Variable **
import { serverUrl } from "../../assets/constants/globalVariables";

// ** Redux **
import { useSelector } from "react-redux";

const Note = ({
  note,
  index,
  deleteNote,
  refreshAllNotes,
  setRefreshAllNotes,
}) => {
  const { userToken } = useSelector((state) => ({
    ...state.tokenManagementReducer,
  }));

  const [textNoteForUpdate, setTextNoteForUpdate] = useState("");

  const updateNote = async (event) => {
    event.preventDefault();

    try {
      const data = {
        noteId: note._id,
        updateText: textNoteForUpdate,
      };

      const callServerToUpdate = await axios.put(
        `${serverUrl}/note/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (callServerToUpdate.status === 200) {
        setRefreshAllNotes(!refreshAllNotes);
        setTextNoteForUpdate("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Note">
      <div className="Note__title">
        <h4>Note {index + 1}</h4>
        <div className="Note__tools">
          <i
            className="fas fa-edit"
            onClick={() => setTextNoteForUpdate(note.content)}
          ></i>
          <i className="fas fa-times" onClick={() => deleteNote(note._id)}></i>
        </div>
      </div>

      {textNoteForUpdate ? (
        <form onSubmit={updateNote}>
          <InputText
            value={textNoteForUpdate}
            setValue={setTextNoteForUpdate}
          />
        </form>
      ) : (
        <p>{note.content}</p>
      )}
    </div>
  );
};

export default Note;
