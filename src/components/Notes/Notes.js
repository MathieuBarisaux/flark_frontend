import "./Notes.scss";

// ** Components **
import InputText from "../InputText/InputText";
import Note from "../Note/Note";

// ** Hooks **
import { useState, useEffect } from "react";
import axios from "axios";

// ** Functions **
import fetchData from "../../Functions/fetchData";

// ** Global variable **
import { serverUrl } from "../../assets/constants/globalVariables";

const Notes = ({ bearerToken }) => {
  const [noteText, setNoteText] = useState("");

  const [allNotes, setAllNotes] = useState(null);
  const [refreshAllNotes, setRefreshAllNotes] = useState(false);

  const createNewNote = async (event) => {
    event.preventDefault();

    if (noteText) {
      try {
        const data = { content: noteText };

        const postOnServer = await axios.post(
          `${serverUrl}/note/create`,
          data,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        if (postOnServer.status === 200) {
          setRefreshAllNotes(!refreshAllNotes);
          setNoteText("");
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const callServerToDelete = await axios.delete(
        `${serverUrl}/note/delete-one?noteId=${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (callServerToDelete.status === 200) {
        setRefreshAllNotes(!refreshAllNotes);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (bearerToken) {
      fetchData("/note/read-all", setAllNotes, bearerToken);
    }
    // eslint-disable-next-line
  }, [bearerToken, refreshAllNotes]);

  return (
    <div className="Notes">
      <h4>Notes</h4>

      <form className="Notes__inputs" onSubmit={createNewNote}>
        <InputText
          placeholder={"Tape your note"}
          value={noteText}
          setValue={setNoteText}
        />
      </form>

      <div className="Notes__container">
        {allNotes && allNotes.length > 0 ? (
          allNotes.map((item, index) => {
            return (
              <Note
                note={item}
                key={item._id}
                index={index}
                deleteNote={deleteNote}
                bearerToken={bearerToken}
                refreshAllNotes={refreshAllNotes}
                setRefreshAllNotes={setRefreshAllNotes}
              />
            );
          })
        ) : (
          <div className="Notes__empty">
            <p>Create your first note !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
