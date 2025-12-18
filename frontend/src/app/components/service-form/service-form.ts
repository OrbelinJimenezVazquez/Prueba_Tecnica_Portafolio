// src/app/components/service-form/service-form.ts
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-form.html',
  styleUrl: './service-form.css',
})
export class ServiceFormComponent {
  private fb = inject(FormBuilder);
  private serviceService = inject(ServiceService);

  @Input() providerId!: number;
  @Input() serviceToEdit: any = null; // 👈 Datos del servicio a editar
  @Output() serviceSaved = new EventEmitter<void>(); // 👈 Unificado para crear/editar
  @Output() onCancel = new EventEmitter<void>();

  isSubmitting = false; // ✅ Añadido: estado de envío

  serviceForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', Validators.required],
    isActive: [true],
  });

  ngOnInit() {
    if (this.serviceToEdit) {
      // Precargar datos en modo edición
      this.serviceForm.patchValue({
        name: this.serviceToEdit.name,
        description: this.serviceToEdit.description,
        isActive: this.serviceToEdit.isActive,
      });
    }
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.isSubmitting = true; // ✅ Activar indicador de carga

      const formData = {
        ...this.serviceForm.value,
        providerId: this.providerId,
      };

      if (this.serviceToEdit) {
        // ✏️ Modo edición
        this.serviceService.update(this.serviceToEdit.id, formData).subscribe({
          next: () => {
            alert('Servicio actualizado exitosamente');
            this.serviceSaved.emit();
            this.isSubmitting = false; // ✅ Desactivar indicador
          },
          error: (err) => {
            console.error('Error al actualizar servicio:', err);
            alert('Error al actualizar el servicio.');
            this.isSubmitting = false; // ✅ Desactivar indicador
          },
        });
      } else {
        // ➕ Modo creación
        this.serviceService.create(formData).subscribe({
          next: () => {
            alert('Servicio creado exitosamente');
            this.serviceSaved.emit();
            this.isSubmitting = false; // ✅ Desactivar indicador
          },
          error: (err) => {
            console.error('Error al crear servicio:', err);
            alert('Error al crear el servicio.');
            this.isSubmitting = false; // ✅ Desactivar indicador
          },
        });
      }
    }
  }

  // ✅ Añadido: método cancelar
  cancelForm() {
    this.onCancel.emit();
  }
}