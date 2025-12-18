// src/app/components/rate-list/rate-list.ts
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateService } from '../../services/rate.service';
import { RateFormComponent } from '../rate-form/rate-form';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-rate-list',
  standalone: true,
  imports: [CommonModule, RateFormComponent],
  templateUrl: './rate-list.html',
  styleUrl: './rate-list.css',
})
export class RateListComponent {
  private rateService = inject(RateService);
  private cdr = inject(ChangeDetectorRef);

  @Input() serviceId: number | null = null;
  rates: any[] = [];
  showRateForm: boolean = false;
  rateToEdit: any = null;
  editingRateId: number | null = null; 

  ngOnInit() {
    if (this.serviceId) {
      this.loadRates();
    }
  }

  loadRates() {
    this.rateService.getRatesByService(this.serviceId!).subscribe({
      next: (data) => {
        this.rates = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error al cargar tarifarios:', err),
    });
  }

  toggleRateForm() {
    console.log('toggleRateForm llamado, showRateForm era:', this.showRateForm);
    this.showRateForm = !this.showRateForm;
    console.log('showRateForm ahora es:', this.showRateForm);
  }

  hideRateForm() {
    this.showRateForm = false;
  }

  onRateCreated() {
    console.log('Tarifa creada, recargando lista...');
    this.loadRates();
    this.hideRateForm();
  }

  isRateActive(rate: any): boolean {
    if (!rate.startDate || !rate.endDate) return false;
    
    const today = new Date();
    const startDate = new Date(rate.startDate);
    const endDate = new Date(rate.endDate);
    
    return today >= startDate && today <= endDate;
  }
  editRate(rate: any) {
    this.editingRateId = rate.id;
    this.rateToEdit = { ...rate };
    this.showRateForm = true; // Mostrar el formulario existente
  }
  // Cancelar edición
  cancelEdit() {
    this.editingRateId = null;
    this.rateToEdit = null;
    this.showRateForm = false;
  }

  // Manejar actualización desde el formulario
  onRateUpdated() {
    this.loadRates(); // Refresca la lista
    this.editingRateId = null;
    this.rateToEdit = null;
    this.showRateForm = false;
  }

  // Eliminar tarifa
  deleteRate(rateId: number) {
    if (confirm('¿Eliminar esta tarifa? Esta acción no se puede deshacer.')) {
      this.rateService.delete(rateId).subscribe({
        next: () => {
          alert('Tarifa eliminada exitosamente');
          this.loadRates();
        },
        error: (err) => {
          console.error('Error al eliminar tarifa:', err);
          alert('No se puede eliminar: la tarifa está en uso o no existe.');
        },
      });
    }
  }
  
}