export class NotesUI {
    constructor(containerSelector) {
        this.notesContainer = document.querySelector(containerSelector);
    }

    addNote(note) {
        const htmlNote = this.createNote(note);
        const container = this.getNotesContainer(note.pinned);
        container.appendChild(htmlNote);
    }
    createNote(note) {
        const htmlNote = document.createElement('div');
        htmlNote.className="inNotes";

        if(note.pinned == true) {
            htmlNote.style.order=1;
        }
        else {
            htmlNote.style.order=2;
        }

        console.log(htmlNote.style.order);
        const htmlCity = document.createElement('h1');
        const htmlContent = document.createElement('h2');
        const htmlDetails = document.createElement('h5');
        const htmlButton = document.createElement('button');
        const htmlTime = document.createElement('time');
        
        htmlNote.style.backgroundColor=note.color;

        htmlNote.classList.add('note');
        htmlNote.setAttribute('name', note.id);
        htmlCity.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlDetails.innerHTML = note.details;
        htmlButton.innerHTML = 'Remove'; 
        htmlTime.innerHTML = note.createDate.toLocaleString(); 
        htmlButton.id = note.id;

        htmlNote.appendChild(htmlCity);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlDetails);
        htmlNote.appendChild(htmlButton);
        htmlNote.appendChild(htmlTime);

        return htmlNote;
    }
    getNote(id) {
        return document.querySelector('#' + id);
    }
    getNotesContainer() {
        return this.notesContainer;
    }
}
