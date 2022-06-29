import "./Notes.scss";

// ** Components **
import InputText from "../InputText/InputText";
import Note from "../Note/Note";

// ** Hooks **
import { useState, useEffect } from "react";
import axios from "axios";

const Notes = ({ bearerToken }) => {
  const [noteText, setNoteText] = useState("");

  const [allNotes, setAllNotes] = useState(null);
  const [refreshAllNotes, setRefreshAllNotes] = useState(false);

  const callServerForNotes = async () => {
    if (bearerToken) {
      try {
        const responseServer = await axios.get(
          "https://flark.herokuapp.com/note/read-all",
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        setAllNotes(responseServer.data);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const createNewNote = async (event) => {
    event.preventDefault();

    if (noteText) {
      try {
        const data = { content: noteText };

        const postOnServer = await axios.post(
          "https://flark.herokuapp.com/note/create",
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
        `https://flark.herokuapp.com/note/delete-one?noteId=${noteId}`,
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
    callServerForNotes();
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
