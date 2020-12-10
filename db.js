export class Db {
    constructor() {
        this.lsNotesKey = 'pogoda';
    }
    saveNotes(pogoda) {
            localStorage.setItem(this.lsNotesKey, JSON.stringify(pogoda));
    }
    getNotes() {
        const notesFromLocalStorage = JSON.parse(localStorage.getItem(this.lsNotesKey));

        if (notesFromLocalStorage)
        {
            const convertedNotes = notesFromLocalStorage.map ( pogoda => {
                pogoda.createDate = new Date(pogoda.createDate);
                return pogoda;
            });
            return convertedNotes;
        }

        else return [];
    }
}