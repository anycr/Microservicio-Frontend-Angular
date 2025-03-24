import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-date',
  standalone: true,
  imports: [FormsModule, CommonModule], // ¡Importante!
  template: `
    <label>Fecha:
      <input type="date" [ngModel]="myDate | date:'yyyy-MM-dd'" (ngModelChange)="onDateChange($event)">
    </label>
    <p>Fecha en el componente: {{ myDate | date:'medium' }}</p>
  `,
  styles: []
})
export class TestDateComponent {
  myDate: Date | null = new Date();  // Puede ser Date o null

  onDateChange(event: any) {
    this.myDate = event ? new Date(event) : null; //Asigna null si no hay valor
  }
}