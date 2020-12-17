export class NotesUI {
    constructor(containerSelector) {
        this.notesContainer = document.querySelector(containerSelector);
    }

    addNote(note, pogoda) {
        const htmlNote = this.createNote(note, pogoda);
        const container = this.getNotesContainer(note.pinned);
        container.appendChild(htmlNote);
    }
    createNote(note, pogoda) {
        const htmlNote = document.createElement('div');
        htmlNote.className="inNotes";

        if(note.pinned == true) {
            htmlNote.style.order=1;
        }
        else {
            htmlNote.style.order=2;
        }

        const htmlCity = document.createElement('h1');
        const htmlContent = document.createElement('h2');
        const htmlDetails = document.createElement('h5');
        const htmlButton = document.createElement('button');
        const htmlTime = document.createElement('time');
        
        htmlNote.style.backgroundColor=note.color;

        htmlContent.innerHTML = Math.round(pogoda.main.temp-273.15) + "℃"; 
        var img = document.createElement("img"); 
        img.src = `http://openweathermap.org/img/wn/${pogoda.weather[0].icon}@2x.png`;
        console.log(pogoda);
        htmlContent.appendChild(img); 
        htmlDetails.innerHTML = "Wilgotność: " + pogoda.main.humidity;
        htmlDetails.appendChild(document.createElement("br"));
        htmlDetails.innerHTML += "Ciśnienie: " + pogoda.main.pressure;

        htmlNote.classList.add('note');
        htmlNote.setAttribute('name', note.id);
        htmlCity.innerHTML = note.title;
        htmlButton.innerHTML = 'Remove'; 
        htmlTime.innerHTML = new Date().toLocaleString();
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
