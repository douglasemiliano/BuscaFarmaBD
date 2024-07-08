import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent {

  isOpen = false;
  icone = "filter_alt"
  @Output() maisProximoEvent = new EventEmitter<void>();
  @Output() maisBemAvaliadasEvent = new EventEmitter<void>();
  @Output() limparEvent = new EventEmitter<void>()

  onPertoClick() {
    this.maisProximoEvent.emit();
    this.icone = "my_location"
    this.isOpen = false;
  }

  onMelhorAvaliadasClick() {
    this.maisBemAvaliadasEvent.emit();
    this.isOpen = false;
  }

  onLimparClick(){
    this.limparEvent.emit();
    this.isOpen = false;
    this.icone = "filter_alt";
  }

}
