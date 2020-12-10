import {Db} from './db.js';
import {NotesUI} from './notes-ui.js';


export class Notes {
    constructor(containerSelector) {
        this.db = new Db();
        this.notesArr = this.db.getNotes(); 
        this.notesUI = new NotesUI('section');
    }
    addNote(note) {
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        this.notesUI.addNote(note);
    }
    removeNote(id) {

        const a = this.notesArr.filter(el => el.id != id);   
        this.db.saveNotes(a);
        alert("Refresh page to remove");
    }

    getNote(id) {
        const a = this.notesArr.find(el => el.id === id);
        console.log(a);
        return this.notesArr.find(el => el.id === id);
    }
    getNotes() {
        return [...this.notesArr];
    }
    pinnedNote(id) {
        this.index = this.notesArr.findIndex(element => {element.id == id});
        this.notesArr[this.index].pinned = !this.notesArr[this.index].pinned;
        this.db.saveNotes(this.notesArr);
    }
    renderNotes() {
        for (let i = 0; i < this.notesArr.length; i++) {
            this.notesUI.addNote(this.notesArr[i]);
        }
    }
}