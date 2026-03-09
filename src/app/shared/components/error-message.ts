import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container" *ngIf="message">
      <span class="error-icon">⚠️</span>
      <p class="error-text">{{ message() }}</p>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      margin: 1rem 0;
      background-color: #fee2e2;
      border: 1px solid #ef4444;
      border-radius: 0.5rem;
      color: #b91c1c;
    }
    .error-icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    .error-text {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
    }
  `],
})
export class ErrorMessage {
  readonly message = input<string>('Something went wrong.');
}
