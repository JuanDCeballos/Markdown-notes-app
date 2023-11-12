import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import './App.css';
import { useEffect, useState } from 'react';
import { onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { notesCollection, db, COLLECTION_NAME } from './firebase';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  );

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  const createNewNote = async () => {
    const newNote = {
      body: "# Type your markdown note's title here",
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  };

  const updateNote = (text) => {
    setNotes((oldNotes) => {
      const newArr = [];
      oldNotes.map((oldNote) => {
        if (oldNote.id === currentNoteId) {
          let noteToUpdate = { ...oldNote, body: text };
          newArr.unshift(noteToUpdate);
        } else {
          newArr.push(oldNote);
        }
      });
      return newArr;
    });
  };

  const deleteNote = async (noteId) => {
    const docRef = doc(db, COLLECTION_NAME, noteId);
    await deleteDoc(docRef);
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction='horizontal' className='split'>
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button className='first-note' onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
