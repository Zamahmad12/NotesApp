import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  @Input() note: any;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();

  onDelete() {
    this.delete.emit(this.note.id);
  }

  onEdit() {
    this.edit.emit(this.note);
  }
}
