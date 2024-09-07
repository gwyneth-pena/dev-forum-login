import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() isSuccess: boolean = true;

  constructor(public activeModal: NgbActiveModal) {}
}
