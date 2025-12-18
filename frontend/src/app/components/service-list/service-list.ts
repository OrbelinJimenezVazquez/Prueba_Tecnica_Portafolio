import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { RateListComponent } from '../rate-list/rate-list';
import { ServiceFormComponent } from '../service-form/service-form';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RateListComponent, ServiceFormComponent],
  templateUrl: './service-list.html',
  styleUrl: './service-list.css',
})
export class ServiceListComponent {
  private serviceService = inject(ServiceService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  editForm: FormGroup | null = null;

  @Input() providerId: number | null = null;
  services: any[] = [];
  expandedServiceId: number | null = null;
  showCreateForm: boolean = false;
  editingServiceId: number | null = null;
  serviceToEdit: any = null; 

  ngOnInit() {
    if (this.providerId) {
      this.loadServices();
    }
  }

  loadServices() {
    this.serviceService.getServicesByProvider(this.providerId!).subscribe({
      next: (data) => {
        this.services = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
      },
    });
  }

  toggleRates(serviceId: number) {
    this.expandedServiceId = this.expandedServiceId === serviceId ? null : serviceId;
  }

  onServiceCreated() {
    this.loadServices();
    this.showCreateForm = false;
  }
  editService(serviceId: number) {
    this.editingServiceId = serviceId;
  }

  deleteService(serviceId: number) {
    if (confirm('¿Eliminar este servicio?')) {
      this.serviceService.delete(serviceId).subscribe({
        next: () => {
          this.loadServices(); // Refresca la lista
        },
        error: (err) => {
          alert('No se puede eliminar: el servicio tiene tarifas asociadas.');
        }
      });
    }
  }

  // Cancelar edición
  cancelEdit() {
    this.editingServiceId = null;
    this.serviceToEdit = null;
    this.showCreateForm = false;
  }

  // Manejar guardado (crear o actualizar)
  onServiceSaved() {
    this.loadServices();
    this.editingServiceId = null;
    this.serviceToEdit = null;
    this.showCreateForm = false;
  }

  // Guardar cambios
  saveEditedService(serviceId: number, serviceData: any) {
    this.serviceService.update(serviceId, serviceData).subscribe({
      next: () => {
        this.loadServices();
        this.editingServiceId = null;
      },
      error: (err) => {
        alert('Error al actualizar el servicio.');
      }
    });
  }
  
  // Maneja el envío del formulario inline
onEditSubmit(serviceId: number, originalService: any) {
  const nameInput = document.querySelector(`#name-${serviceId}`) as HTMLInputElement;
  const descInput = document.querySelector(`#desc-${serviceId}`) as HTMLTextAreaElement;
  const isActiveInput = document.querySelector(`#isActive-${serviceId}`) as HTMLInputElement;

  const name = nameInput?.value || originalService.name;
  const description = descInput?.value || originalService.description;
  const isActive = isActiveInput?.checked ?? originalService.isActive;

  // 1. Guardar en el backend
  this.serviceService.update(serviceId, { name, description, isActive }).subscribe({
    next: () => {
      // 2. Actualizar la lista local (para que el cambio se vea inmediatamente)
      const serviceIndex = this.services.findIndex(s => s.id === serviceId);
      if (serviceIndex !== -1) {
        this.services[serviceIndex] = { ...this.services[serviceIndex], name, description, isActive };
      }
      
      // 3. Cerrar el formulario de edición
      this.editingServiceId = null;
      
      // Opcional: mensaje de éxito
      // alert('Servicio actualizado correctamente');
    },
    error: (err) => {
      console.error('Error al actualizar servicio:', err);
      alert('Error al actualizar el servicio.');
    }
  });
}

}