# Prueba Técnica Full-Stack Junior – Proveedores, Servicios y Tarifarios

Este repositorio contiene una aplicación full-stack desarrollada con **NestJS (backend)** y **Angular 21 (frontend)** que permite gestionar proveedores, servicios y tarifarios según los requisitos de Horizon Libero / e-TAS.

---

##  Estructura del proyecto
prueba-tecnica/

├── backend/ ← API REST con NestJS + TypeORM + PostgreSQL

└── frontend/ ← Interfaz de usuario con Angular 21 (standalone components)


---

##  Requisitos previos

Antes de instalar, asegúrate de tener lo siguiente:

- **Node.js** v20 o superior ([descargar](https://nodejs.org/))
- **npm** (incluido con Node.js)
- **PostgreSQL 18** ([descargar](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads))
- **pgAdmin 4** (incluido con PostgreSQL, para gestión de la base de datos)

>  **Importante**: No se requiere archivo `ormconfig.ts`. La configuración de la base de datos está integrada directamente en `AppModule`.

---

##  Configuración de la base de datos (PostgreSQL)

### Paso 1: Instalar PostgreSQL y pgAdmin
1. Descarga e instala **PostgreSQL 18** desde el enlace oficial.
2. Durante la instalación:
   - **Contraseña de superusuario**: Usa `root` (o la que prefieras, pero anótala).
   - **Puerto**: Deja el predeterminado `5432`.
3. Asegúrate de que **pgAdmin 4** se instale (viene incluido).

### Paso 2: Crear la base de datos
1. Abre **pgAdmin 4**.
2. Inicia sesión con:
   - **Usuario**: `postgres`
   - **Contraseña**: la que definiste durante la instalación (`root` si usaste esa).
3. Haz clic derecho en **Databases** → **Create** → **Database**.
4. **Nombre**: `prueba_proveedores`
5. Haz clic en **Save**.

>  **La base de datos debe llamarse exactamente `prueba_proveedores`** para que la aplicación funcione.

> **Si quieres cambiar estos valores a tu gusto dirigete a `//backend/src/app.module.ts`**

---

##  Instrucciones de instalación

### Backend (NestJS)

1. Navega a la carpeta `backend`:
   ```bash
   cd backend
2. Instala las dependencias:
    ```bash
    npm install
3. Verifica la configuración en `backend/src/app.module.ts`:
    ```bash
    // Asegúrate de que la contraseña coincida con la de tu instalación 
    *password: 'root',** // ← ¡Cambia esto si usaste otra contraseña!

4. Inicia el servidor:
    ```bash
    npm run start
* La API estará disponible en: http://localhost:3000

### Frontend (Angular 21)
1. Navega a la carpeta frontend:
    ```bash
    cd frontend
2. Instala las dependencias:
    ```bash
    npm install
3. Inicia la aplicación:
    ```bash
    ng serve
* La interfaz estará disponible en: http://localhost:4200

##  Endpoints disponibles (Backend)
* ### Proveedores (/providers)
    * POST /providers – Crear proveedor
    * GET /providers – Listar todos
    * GET /providers/:id – Obtener por ID
    * PATCH /providers/:id – Actualizar
    * DELETE /providers/:id – Eliminar
    * GET /providers/:id/services – Obtener servicios de un proveedor

* ### Servicios (/services)
    * POST /services – Crear servicio
    * GET /services – Listar todos
    * GET /services/:id – Obtener por ID
    * PATCH /services/:id – Actualizar
    * DELETE /services/:id – Eliminar
    * GET /services/:id/rates – Obtener tarifarios de un servicio

* ### Tarifarios (/rates)
    * POST /rates – Crear tarifario
    * GET /rates – Listar todos
    * GET /rates/:id – Obtener por ID
    * PATCH /rates/:id – Actualizar
    * DELETE /rates/:id – Eliminar

## Funcionalidades del frontend
* Lista de proveedores con botones: Ver Servicios, Editar, Eliminar.
* Formulario para crear/editar proveedores con validación:
    * Nombre (`1-100 caracteres`)
    * Email válido (con `@` y dominio como `.com`, `.mx`)
    * Teléfono (exactamente 10 dígitos numéricos)
* Gestión de servicios por proveedor.
* Gestión de tarifarios por servicio (crear, editar, eliminar).
* Formato de teléfono en vista de detalle: ejemm `99-8117-0616`.
## Validaciones y reglas de negocio
* ### Backend:
    * No se permite eliminar un proveedor con servicios asociados.
    * No se permite eliminar un servicio con tarifarios asociados.
    * Los tarifarios deben tener `startDate <= endDate`.
    * Evita duplicados en tarifarios (mismo rango de fechas para un servicio)..
* ### Frontend:
    * Validación en tiempo real de formularios.
    * Mensajes de error amigables.
    * Actualización automática de listas tras `crear/editar/eliminar`.

#### Notas importantes
* `Tipo de proyecto:` Standalone components (Angular 21), sin NgModule.
* `Estilos: CSS plano` (sin Tailwind ni frameworks externos).
* `Base de datos:` PostgreSQL con relaciones 1:N y reglas de integridad.
* `Desarrollado y probado en:` Windows 11, Node.js v22, PostgreSQL 18.


# ¡Listo para usar!
* Sigue los pasos de instalación y tendrás una aplicación funcional en minutos.
    ### ¡Gracias por revisar mi prueba técnica!