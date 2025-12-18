// src/app/components/provider-detail/provider-detail.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-detail.html',
  styleUrl: './provider-detail.css',
})
export class ProviderDetailComponent {
  @Input() provider: any = null;

  formatPhone(phone: string): string {
    if (!phone || phone.length !== 10) return phone; // Si no es 10 dígitos, lo deja como está
    return `${phone.slice(0, 2)}-${phone.slice(2, 6)}-${phone.slice(6)}`;
  }
}