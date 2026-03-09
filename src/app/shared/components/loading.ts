import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `<div class="loading">
    <div class="spinner"></div>
    <p>Carregando...</p>
  </div> `,
  styles: `
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 64px);
      gap: 1rem;
      color: #64748b;
      font-size: 1rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top-color: #2c3e50;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
})
export class Loading {}
