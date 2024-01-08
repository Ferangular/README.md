import {inject, Injectable} from '@angular/core';
import {Message, MessageService  } from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class MessageManagerService {


  constructor(private messageService: MessageService) {}
  success(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      closable: true,
    });
  }

  error(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      closable: true,
    });
  }

  alert(message: string): void {
    this.messageService.add({
      key: 'alert',
      severity: 'warn',
      summary: message,
      life: 60000,
    });
  }

  alertButtons(message: string, key?: string): void {
    this.messageService.add({
      key: key ?? 'alert',
      severity: 'warn',
      summary: message,
      life: 60000,
    });
  }
}
