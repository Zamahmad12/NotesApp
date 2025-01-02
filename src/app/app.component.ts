import { Component, OnInit } from '@angular/core';
import { NotesDataService } from './Services/notes-data.service';
import { NotesComponent } from "./notes/notes.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule,NotesComponent,CommonModule],
})
export class AppComponent implements OnInit {
  notes: any[] = [];
  newNote: string = '';
  isEditing: boolean = false;
  editingNote: any = null;

  constructor(private NotesDataService: NotesDataService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notes = this.NotesDataService.getNotes();
  }

  addNote() {
    if (this.newNote.trim()) {
      this.NotesDataService.addNote(this.newNote);
      this.newNote = '';
      this.loadNotes();
    }
  }

  deleteNote(id: number) {
    this.NotesDataService.deleteNote(id);
    this.loadNotes();
  }

  editNote(note: any) {
    this.isEditing = true;
    this.editingNote = { ...note }; // Copy to avoid mutating original
  }

  saveEdit() {
    if (this.editingNote.content.trim()) {
      this.NotesDataService.updateNote(this.editingNote);
      this.isEditing = false;
      this.editingNote = null;
      this.loadNotes();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingNote = null;
  }
}
