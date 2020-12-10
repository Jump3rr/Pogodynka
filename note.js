export class Note {
    constructor(title, content, details, color = 'red', pinned = false) {        
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