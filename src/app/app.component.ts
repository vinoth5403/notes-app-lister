import { Component, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  notes: any = [];
  recognition:any;
  constructor(private el:ElementRef) {
    this.notes = JSON.parse(<any>localStorage.getItem('notes')) || [{ id: 0,content:'' }];
  }
  updateAllNotes() {
    let notes = document.querySelectorAll('app-note');

    notes.forEach((note: any, index: number)=>{
         this.notes[note.id].content = note.querySelector('.content')?.innerHTML;
    });

    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  addNote () {
    this.notes.push({ id: this.notes.length + 1, content:'' });
    // sort the array
    this.notes= this.notes.sort((a: any,b: any)=>{ return b.id - a.id});
    localStorage.setItem('notes', JSON.stringify(this.notes));
  };
  
  saveNote(event: any){
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id':id,
      'content':content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  
  updateNote(newValue: any){
    this.notes.forEach((note: any, index: number)=>{
      if(note.id== newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }
  
  deleteNote(event: any){
     const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
     this.notes.forEach((note: any, index: number)=>{
      if(note.id== id) {
        this.notes.splice(index,1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        return;
      }
    });
  }

}
