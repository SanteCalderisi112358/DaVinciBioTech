import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input() isOpen: boolean = false;
  @Output() apriModalePasswordClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() apriModaleDonazioniClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();


  onClose() {
    this.close.emit();
  }

  modaleCambiaPassword() {
    this.apriModalePasswordClicked.emit();
  }


  getDonazioni(){
this.apriModaleDonazioniClicked.emit()
  }
}
