import { Notes } from './notes.js';

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
        const htmlPopup = document.createElement('button');
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
        htmlPopup.innerHTML = 'Pogoda godzinowa';
        htmlTime.innerHTML = new Date().toLocaleString();
        htmlButton.id = note.id;
        
        htmlPopup.id = note.id+1000;
        htmlPopup.onclick=function() {
            var modal = document.getElementById('myModal');
            modal.style.display = "block";

            const apiHKey = "f5882d2baf0219f483a0ad679b3c47af";    
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${pogoda.coord.lat}&lon=${pogoda.coord.lon}&exclude=minutely&appid=${apiHKey}`;  
    
            const weather = fetch(url);

            weather
                .then((respObj)=>{return respObj.json()})
                .then((pogoda)=>{for(let i=0; i<12; i++)
                {
                    console.log(pogoda);
                    modal.innerHTML += new Date(pogoda.hourly[i].dt*1000).toLocaleString() + ": ";
                    modal.innerHTML += pogoda.hourly[i].weather[0].main + " ";
                    modal.innerHTML += Math.round(pogoda.hourly[i].temp-273.15) + "℃" + "<br />";
                    modal.innerHTML += "\n";
                }});

            var span = document.getElementsByClassName("close")[0];
            span.onclick = function() {
                modal.style.display = "none";
                modal.innerHTML = "";
              }
              
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                  modal.innerHTML = "";
                }
            }
        }

        htmlButton.name="usun";
        console.log(htmlButton.name);
        htmlNote.appendChild(htmlCity);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlDetails);
        htmlNote.appendChild(htmlButton);
        
        htmlNote.appendChild(htmlTime);
        htmlNote.appendChild(htmlPopup);
        return htmlNote;
    }

    getNote(id) {
        return document.querySelector('#' + id);
    }
    getNotesContainer() {
        return this.notesContainer;
    }
    removeNote(id) {
        const notesObj = new Notes();
        console.log(id);
        notesObj.removeNote(id);
      }
}
