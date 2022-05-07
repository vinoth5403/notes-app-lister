import { Component, ElementRef, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit  {
  notes: any = [];
  recognition:any;

  constructor(private el:ElementRef) {
    this.notes = JSON.parse(<any>sessionStorage.getItem('notes')) || [{ id: 0,content:'' }];
  }

  updateAllNotes() {
    let notes = document.querySelectorAll('app-note');
    notes.forEach((note: any, index: number)=>{
         this.notes[note.id].content = note.querySelector('.content')?.innerHTML;
    });
    sessionStorage.setItem('notes', JSON.stringify(this.notes));
  }

  ngOnInit() {
    if(this.notes.length === 0){
      this.notes.push({ id: this.notes.length + 1, content:'' });
    }
 }

  addNote () {
    if(this.notes.length <= 4) {
      this.notes.push({ id: this.notes.length + 1, content:'' });
    // sort the array
    this.notes= this.notes.sort((a: any,b: any)=>{ return a.id - b.id });
    sessionStorage.setItem('notes', JSON.stringify(this.notes));
    }
    
  };
  
  saveNote(event: any){
    const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
    console.log(event)
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id':id,
      'content':content
    }
    this.updateNote(json);
    if(this.notes.length === 0){
      sessionStorage.removeItem('notes');
    }else{
      sessionStorage.setItem('notes', JSON.stringify(this.notes));
    }
    
  }
  
  updateNote(newValue: any){
    sessionStorage.removeItem(JSON.stringify('notes'));
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
        sessionStorage.removeItem(note.id);
        sessionStorage.setItem('notes', JSON.stringify(this.notes));
        return;
      }
    });
  }

}
