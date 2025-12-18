import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { UiService } from '../../services/ui.service';
import { ServiceListComponent } from '../service-list/service-list';
import { ProviderFormComponent } from '../provider-form/provider-form';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [CommonModule, ServiceListComponent, ProviderFormComponent],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css',
})
export class ProviderListComponent implements OnInit {
  private providerService = inject(ProviderService);
  private uiService = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  
  providers: any[] = [];
  expandedProviderId: number | null = null; // Solo para mostrar servicios
  selectedProviderId: number | null = null; // Solo para mostrar detalles
  isEditing: boolean = false;
  showCreateForm: boolean = false;
  
  activeProvidersCount: number = 0;
  inactiveProvidersCount: number = 0;
  totalProvidersCount: number = 0;

  ngOnInit() {
    this.loadProviders();
    this.uiService.reloadProviders$.subscribe(() => this.loadProviders());
  }

  loadProviders() {
    this.providerService.getAll().subscribe({
      next: (data) => {
        this.providers = data;
        this.totalProvidersCount = this.providers.length;
        this.activeProvidersCount = this.providers.filter(p => p.isActive).length;
        this.inactiveProvidersCount = this.providers.filter(p => !p.isActive).length;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar proveedores:', err),
    });
  }

  deleteProvider(id: number) {
    if (confirm('¿Eliminar?')) {
      this.providerService.delete(id).subscribe(() => {
        this.uiService.triggerReloadProviders();
      });
    }
  }

  // Muestra solo detalles del proveedor
  viewProviderDetails(providerId: number) {
    if (this.selectedProviderId === providerId) {
      // Si ya está seleccionado, lo cerramos
      this.selectedProviderId = null;
      this.isEditing = false;
    } else {
      // Mostramos detalles
      this.selectedProviderId = providerId;
      this.expandedProviderId = null; // Cerramos servicios si estaban abiertos
      this.isEditing = false;
    }
  }

  // Muestra solo servicios 
  viewProviderServices(providerId: number) {
    if (this.expandedProviderId === providerId) {
      // Si ya está expandido, lo cerramos
      this.expandedProviderId = null;
    } else {
      // Mostramos servicios
      this.expandedProviderId = providerId;
      this.selectedProviderId = null; // Cerramos detalles si estaban abiertos
      this.isEditing = false;
    }
  }

  editProvider(providerId: number) {
    this.selectedProviderId = providerId;
    this.isEditing = true;
    this.expandedProviderId = null; 
  }

  closeDetail() {
    this.selectedProviderId = null;
    this.isEditing = false;
  }

  closeServices() {
    this.expandedProviderId = null;
  }

  onProviderUpdated() {
    this.loadProviders();
    this.closeDetail();
  }

  showNewProviderForm() {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm) {
      this.selectedProviderId = null;
      this.expandedProviderId = null;
      this.isEditing = false;
    }
  }

  getInitials(name: string): string {
    if (!name) return '??';
    const words = name.split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
}