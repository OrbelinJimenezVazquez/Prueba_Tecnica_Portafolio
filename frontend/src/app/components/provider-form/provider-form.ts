// src/app/components/provider-form/provider-form.ts
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-provider-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-form.html',
  styleUrl: './provider-form.css',
})
export class ProviderFormComponent {
  private fb = inject(FormBuilder);
  private providerService = inject(ProviderService);
  private uiService = inject(UiService);

  @Input() providerToEdit: any = null;
  @Output() providerUpdated = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>(); 
  isSubmitting = false;

providerForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
  contactEmail: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]
  ],
  phone: [
    '',
    [
      Validators.required,
      Validators.pattern(/^\d{10}$/) // Solo 10 dígitos numéricos
    ]
  ],
  isActive: [true],
});

  ngOnInit() {
    if (this.providerToEdit) {
      this.providerForm.patchValue(this.providerToEdit);
    }
  }

  onSubmit() {
    if (this.providerForm.valid) {
      this.isSubmitting = true; 
      const formData = this.providerForm.value;

      if (this.providerToEdit) {
        this.providerService.update(this.providerToEdit.id, formData).subscribe({
          next: () => {
            alert('Proveedor actualizado exitosamente');
            this.providerUpdated.emit();
            this.isSubmitting = false;
          },
          error: (err) => {
            alert('Error al actualizar el proveedor.');
            this.isSubmitting = false;
            console.error(err);
          },
        });
      } else {
        this.providerService.create(formData).subscribe({
          next: () => {
            alert('Proveedor creado exitosamente');
            this.uiService.triggerReloadProviders();
            this.isSubmitting = false; 
            this.resetForm();
          },
          error: (err) => {
            alert('Error al crear el proveedor.');
            this.isSubmitting = false; 
            console.error(err);
          },
        });
      }
    }
  }

  // AÑADE ESTE MÉTODO:
  cancelForm() {
    this.onCancel.emit();
  }

  private resetForm() {
    this.providerForm.reset({ isActive: true });
  }
}