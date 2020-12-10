import { Db } from './db.js';
import { Note } from './note.js';
import { Notes } from './notes.js';

const notesObj = new Notes();

notesObj.renderNotes();
document.querySelector('#newNoteBtn').addEventListener('click', addNote);
const removeNote = document.querySelector('notes');

removeNote.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  notesObj.removeNote(event.target.id);
  console.log(event.target.id);
})

function addNote(){
    const title = document.querySelector("#noteTitle").value;
    const content = document.querySelector("#noteContent").value;
    const detais = "aesfoasijrfase";
    const note = new Note(title, content);
    notesObj.addNote(note);
}
