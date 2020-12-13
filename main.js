import { Db } from './db.js';
import { Note } from './note.js';
import { Notes } from './notes.js';
import { NotesUI } from './notes-ui.js';

const notesObj = new Notes();
const notesui = new Db();

notesObj.renderNotes();
document.querySelector('#newNoteBtn').addEventListener('click', addNote);
document.querySelector('body').onload(refresh(120000));
const removeNote = document.querySelector('notes');

removeNote.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  notesObj.removeNote(event.target.id);
  console.log(event.target.id);
})
function refresh(t){
    setTimeout("location.reload(true);", t);
    //setTimeout(notesObj.renderNotes(), t);
}

function addNote(){
    const title = document.querySelector("#noteTitle").value;
    //const detais = "aesfoasijrfase";
    const note = new Note(title);
    notesObj.addNote(note);
}
