export class Note {
    constructor(title, content, details, color = 'red', pinned = false) {  
        let apiKey = "f5882d2baf0219f483a0ad679b3c47af";    
        let url = `http://api.openweathermap.org/data/2.5/weather?q=Cracow&APPID=${apiKey}`;  
        let http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        this.title = title;
        this.content = content;
        this.details = details;
        this.color = switchColor();
        this.pinned = isPinned();
        this.createDate = new Date();
        this.id = Date.now();
    }
}
function switchColor() {
    switch(document.getElementById('colourSwitch').value)
    {
        case "red":
            return '#ff0000';
        case "green":
            return '#00ff00';
        case "yellow":
            return '#ffff00';
        case "blue":
            return '#84caf5';
        case "orange":
            return '#ffa500';
        case "pink":
            return '#ed4781';
        default:
            return '#ff0000';
    }
}

function isPinned() {
    var checkbox = document.getElementById('notePinned');
        if(checkbox.checked==true)
        {
            return true;
        } 
        else
        {
            return false;
        }
}