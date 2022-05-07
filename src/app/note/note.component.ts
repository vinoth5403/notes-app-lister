import {Component, HostBinding, EventEmitter, Output } from '@angular/core'

@Component({
  selector:'app-note',
  templateUrl:'./note.component.html',
  styleUrls:['./note.component.css']
})

export class NoteComponent {
  
  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  constructor() { }
  
  onDismiss(event:any){
    this.dismiss.emit(event);
  }
  
  onFocusOut(event:any){
    this.focusout.emit(event)
  }
}

