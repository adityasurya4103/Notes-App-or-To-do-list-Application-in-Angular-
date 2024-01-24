import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notes } from './Notes/notes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {



  apiEndpoint: string;

constructor(private httpClient: HttpClient) {
  this.apiEndpoint = "http://localhost:3000/notes";
}

@Injectable({
  providedIn: 'root'
})

addNewNote(noteToAdd: Notes): Observable<Notes> {
  return this.httpClient.post<Notes>(this.apiEndpoint, noteToAdd);
}

getAllNotes(): Observable<Notes[]> {
  return this.httpClient.get<Notes[]>(this.apiEndpoint);
}

deleteNote(selectedNote: Notes): Observable<Notes> {
  return this.httpClient.delete<Notes>(`${this.apiEndpoint}/${selectedNote.id}`);
}

editNote(updatedNote: Notes): Observable<Notes> {
  return this.httpClient.put<Notes>(`${this.apiEndpoint}/${updatedNote.id}`, updatedNote);
}

}
