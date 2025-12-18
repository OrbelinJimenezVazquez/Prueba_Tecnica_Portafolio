// src/app/components/rate-form/rate-form.ts
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RateService } from '../../services/rate.service';

@Component({
  selector: 'app-rate-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rate-form.html',
  styleUrl: './rate-form.css',
})
export class RateFormComponent {
  private fb = inject(FormBuilder);
  private rateService = inject(RateService);

  @Input() serviceId!: number;
  @Input() showForm: boolean = false;
  @Input() rateToEdit: any = null; 

  @Output() rateCreated = new EventEmitter<void>();
  @Output() rateUpdated = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  isSubmitting = false;

  currencies = [
    { code: 'USD', symbol: '$', name: 'Dólar Estadounidense' },
    { code: 'MXN', symbol: '$', name: 'Peso Mexicano' },
  ];

  rateForm: FormGroup = this.fb.group({
    price: ['', [Validators.required, Validators.min(0.01)]],
    currency: ['USD', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    description: ['', [Validators.maxLength(500)]],
    isActive: [true],
  });

  ngOnInit() {
    if (this.rateToEdit) {
      // Precargar datos en edición
      this.rateForm.patchValue({
        price: this.rateToEdit.price,
        currency: this.rateToEdit.currency,
        startDate: this.rateToEdit.startDate.split('T')[0],
        endDate: this.rateToEdit.endDate.split('T')[0],
        description: this.rateToEdit.description || '',
        isActive: this.rateToEdit.isActive !== false, // por defecto true
      });
    } else {
      // Valores por defecto en creación
      const today = new Date().toISOString().split('T')[0];
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      this.rateForm.patchValue({
        currency: 'USD',
        isActive: true,
        startDate: today,
        endDate: endDate.toISOString().split('T')[0],
      });
    }
  }

  onSubmit() {
    if (this.rateForm.valid) {
      this.isSubmitting = true;
      const formData = {
        ...this.rateForm.value,
        serviceId: this.serviceId,
      };

      if (this.rateToEdit) {
        // ✏️ Modo edición
        this.rateService.update(this.rateToEdit.id, formData).subscribe({
          next: () => {
            alert('Tarifa actualizada exitosamente');
            this.rateUpdated.emit();
            this.isSubmitting = false;
          },
          error: (err) => {
            alert('Error al actualizar la tarifa.');
            this.isSubmitting = false;
          },
        });
      } else {
        // ➕ Modo creación
        this.rateService.create(formData).subscribe({
          next: () => {
            alert('Tarifa creada exitosamente');
            this.rateCreated.emit();
            this.isSubmitting = false;
          },
          error: (err) => {
            alert('Error al crear la tarifa.');
            this.isSubmitting = false;
          },
        });
      }
    }
  }


  validateDates() {
    const startDate = this.rateForm.get('startDate')?.value;
    const endDate = this.rateForm.get('endDate')?.value;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end <= start) {
        this.rateForm.get('endDate')?.setErrors({ invalidDate: true });
      } else {
        this.rateForm.get('endDate')?.setErrors(null);
      }
    }
  }

  formatPricePreview(): string {
    const price = this.rateForm.get('price')?.value;
    const currency = this.rateForm.get('currency')?.value;
    
    if (!price || !currency) return '';
    
    const currencyObj = this.currencies.find(c => c.code === currency);
    const formattedPrice = parseFloat(price).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `${currencyObj?.symbol} ${formattedPrice} ${currency}`;
  }

  cancelForm() {
    console.log('Cancelando formulario...');
    this.onCancel.emit();
    this.resetForm();
  }

  private resetForm() {
    this.rateForm.reset({
      currency: 'USD',
      isActive: true
    });
    
    const today = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    
    this.rateForm.get('startDate')?.setValue(today);
    this.rateForm.get('endDate')?.setValue(endDate.toISOString().split('T')[0]);
  }

  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate.toISOString().split('T')[0];
  }

  // Método SIMPLIFICADO que funciona
  getDurationInDays(): string {
    const startDate = this.rateForm.get('startDate')?.value;
    const endDate = this.rateForm.get('endDate')?.value;
    
    if (!startDate || !endDate) return '';
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} días`;
    } catch (error) {
      console.error('Error calculando duración:', error);
      return '';
    }
  }
}