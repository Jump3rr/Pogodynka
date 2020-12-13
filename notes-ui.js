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

        const htmlCity = document.createElement('h1');
        const htmlContent = document.createElement('h2');
        const htmlDetails = document.createElement('h5');
        const htmlButton = document.createElement('button');
        const htmlTime = document.createElement('time');
        
        htmlNote.style.backgroundColor=note.color;

        const apiKey = "f5882d2baf0219f483a0ad679b3c47af";    
        let miasto  = note.title;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${miasto}&APPID=${apiKey}`;  
        let http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        //let pogoda;
        http.addEventListener("readystatechange", function(e) {
            let pogoda = JSON.parse(e.target.responseText);
            console.log(pogoda);
           // htmlContent.innerHTML = pogoda.weather[0].main;
            htmlContent.innerHTML = Math.round(pogoda.main.temp-273.15) + "℃";
            var img = document.createElement("img");
            //img.src = `${pogoda.weather[0].icon}.png`;
            img.src = `http://openweathermap.org/img/wn/${pogoda.weather[0].icon}@2x.png`
            htmlContent.appendChild(img);
            //htmlNote.appendChild(htmlContent);
            htmlContent.appendChild(document.createElement("br"));
           // htmlContent.innerHTML += Math.round(pogoda.main.temp-273.15) + "℃";
            htmlNote.appendChild(htmlContent);

            htmlDetails.innerHTML = "Wilgotność: " + pogoda.main.humidity;
            htmlDetails.appendChild(document.createElement("br"));
            htmlDetails.innerHTML += "Ciśnienie: " + pogoda.main.pressure;
            htmlNote.appendChild(htmlDetails);
            htmlNote.appendChild(htmlButton);
            htmlNote.appendChild(htmlTime);
        });
        htmlNote.classList.add('note');
        htmlNote.setAttribute('name', note.id);
        htmlCity.innerHTML = note.title;
       // htmlContent.innerHTML = note.content;
       // htmlDetails.innerHTML = note.details;
        htmlButton.innerHTML = 'Remove'; 
        htmlTime.innerHTML = new Date().toLocaleString();//note.createDate.toLocaleString(); 
        htmlButton.id = note.id;

        htmlNote.appendChild(htmlCity);
       // htmlNote.appendChild(htmlContent);
       // htmlNote.appendChild(htmlDetails);
        //htmlNote.appendChild(htmlButton);
        //htmlNote.appendChild(htmlTime);

        return htmlNote;
    }
    getNote(id) {
        return document.querySelector('#' + id);
    }
    getNotesContainer() {
        return this.notesContainer;
    }
}
