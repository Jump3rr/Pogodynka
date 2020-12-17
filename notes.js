import {Db} from './db.js';
import {NotesUI} from './notes-ui.js';


export class Notes {
    constructor(containerSelector) {
        this.db = new Db();
        this.notesArr = this.db.getNotes(); 
        this.notesUI = new NotesUI('section');
    }
    addNote(note, pogoda) {
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        this.notesUI.addNote(note, pogoda);
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
            const apiKey = "f5882d2baf0219f483a0ad679b3c47af";    
            let miasto  = this.notesArr[i].title;
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${miasto}&APPID=${apiKey}`;  
    
            const weather = fetch(url);
    
            weather
                .then((respObj)=>{return respObj.json()})
                .then((pogoda)=>{if(pogoda.weather[0].main!=undefined)
                    this.notesUI.addNote(this.notesArr[i], pogoda)})
                .catch(() => {alert("Niewłaściwe miasto!")})
            
        }
    }
    promiseAdd(note) {
        const apiKey = "f5882d2baf0219f483a0ad679b3c47af";    
        let miasto  = note.title;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${miasto}&APPID=${apiKey}`;  

        const weather = fetch(url);

        weather
            .then((respObj)=>{return respObj.json()})
            .then((pogoda)=>{if(pogoda.weather[0].main!=undefined)
                this.addNote(note, pogoda)})
            .catch(() => {alert("Niewłaściwe miasto!")})
    }
}