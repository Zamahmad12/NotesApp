import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesDataService {
  private storageKey = 'notes'; // Key for localStorage

  constructor() {}

  // Get notes from localStorage
  getNotes() {
    const notes = localStorage.getItem(this.storageKey);
    return notes ? JSON.parse(notes) : [];
  }

  // Save notes to localStorage
  saveNotes(notes: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  // Add a new note
  addNote(note: string) {
    const notes = this.getNotes();
    const newNote = { id: Date.now(), content: note };
    notes.push(newNote);
    this.saveNotes(notes);
  }

  // Update an existing note
  updateNote(updatedNote: any) {
    const notes = this.getNotes();
    const index = notes.findIndex((note: { id: any; }) => note.id === updatedNote.id);
    if (index !== -1) {
      notes[index] = updatedNote;
      this.saveNotes(notes);
    }
  }

  // Delete a note
  deleteNote(id: number) {
    let notes = this.getNotes();
    notes = notes.filter((note: { id: number; }) => note.id !== id);
    this.saveNotes(notes);
  }
}
