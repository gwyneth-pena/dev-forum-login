import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private modal: NgbModal) {}

  openModal(
    modal: any,
    data?: { message: string; title: string; isSuccess: boolean }
  ) {
    let modalRef = this.modal.open(modal);
    modalRef.componentInstance.title = data?.title;
    modalRef.componentInstance.message = data?.message;
    modalRef.componentInstance.isSuccess = data?.isSuccess;
    return modalRef;
  }
}
