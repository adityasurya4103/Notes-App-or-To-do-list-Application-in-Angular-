import { Component } from '@angular/core';
import { NoteServiceService } from '../note-service.service';
import { Notes } from '../Notes/notes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  

  
editedNoteValue = '';
newNoteValue = '';
selectedNote: Notes = new Notes();
noteList: Notes[] = [];

constructor(private notesService: NoteServiceService) {}

ngOnInit(): void {
  this.editedNoteValue = '';
  this.newNoteValue = '';
  this.selectedNote = new Notes();
  this.noteList = [];
  this.fetchAllNotes();
}

fetchAllNotes() {
  this.notesService.getAllNotes().subscribe(
    (res: Notes[]) => {
      this.noteList = res;
    },
    (err) => {
      alert("Unable to retrieve the list of notes");
    }
  );
}

addNewNote() {
  this.selectedNote.noteName = this.newNoteValue;
  this.notesService.addNewNote(this.selectedNote).subscribe(
    res => {
      this.ngOnInit();
      this.newNoteValue = '';
    },
    (err) => {
      alert(err);
    }
  );
}

updateNote() {
  this.selectedNote.noteName = this.editedNoteValue;
  this.notesService.editNote(this.selectedNote).subscribe(
    res => {
      this.ngOnInit();
    },
    (err) => {
      alert("Failed to update note");
    }
  );
}

deleteNote(selectedNote: Notes) {
  this.notesService.deleteNote(selectedNote).subscribe(
    res => {
      this.ngOnInit();
    },
    (err) => {
      alert("Failed to delete note");
    }
  );
}

selectNote(selectedNote: Notes) {
  this.selectedNote = selectedNote;
  this.editedNoteValue = selectedNote.noteName;
}



}
