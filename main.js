import { Db } from './db.js';
import { Note } from './note.js';
import { Notes } from './notes.js';
import { NotesUI } from './notes-ui.js';

const notesObj = new Notes();
const notesui = new Db();

notesObj.renderNotes();
document.querySelector('#newNoteBtn').addEventListener('click', addNote);
document.querySelector('body').onload = refresh(120000);
const removeNote = document.querySelector('notes');

removeNote.addEventListener('click', (event) => {
  console.log(event.target.nodeValue);
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  if(event.target.name==="usun")
    notesObj.removeNote(event.target.id);
})

function refresh(t){
    setTimeout("location.reload(true);", t);
}

function addNote(){
    const title = document.querySelector("#noteTitle").value;
    const note = new Note(title);
    notesObj.promiseAdd(note);
}
