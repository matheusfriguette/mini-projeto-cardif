import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  @Input() title = '';
  @Input() buttonLabel = '';
  @Output() buttonClick = new EventEmitter<null>();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
