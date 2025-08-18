# Sistema de Gestión de Inventario y Ventas

Una aplicación web integral para gestionar inventario, procesar ventas y generar reportes diarios. Construida con Spring Boot para el backend y React para el frontend.

## 🚀 Funcionalidades

### Gestión de Inventario

- **Crear Productos**: Agregar nuevos productos con nombre, descripción, precio unitario y cantidad en stock
- **Actualizar Productos**: Modificar la información de productos existentes
- **Eliminar Productos**: Quitar productos del sistema
- **Listar Productos**: Ver todos los productos en el inventario

### Gestión de Ventas

- **Crear Ventas**: Procesar nuevas transacciones de ventas
- **Múltiples Productos**: Agregar varios productos a una sola venta
- **Cálculos Automáticos**: Cálculo automático del total y deducción del stock
- **IDs de Transacción**: Identificadores únicos para cada venta
- **Detalles de Venta**: Seguimiento detallado de artículos y cantidades

### Sistema de Reportes

- **Reportes Diarios de Ventas**: Generar y visualizar resúmenes diarios de ventas
- **Múltiples Formatos**: Exportar reportes en JSON, CSV y PDF

### Gestión de Usuarios

- **Control de Acceso Basado en Roles**: Sistema seguro de autenticación
- **Autenticación Segura**: Autenticación HTTP Basic con contraseñas encriptadas

## 🏗️ Arquitectura

### Backend (Spring Boot)

- **Framework**: Spring Boot 3.5.4
- **Versión de Java**: 21
- **Base de Datos**: PostgreSQL con JPA/Hibernate
- **Seguridad**: Spring Security con encriptación BCrypt
- **API**: Endpoints RESTful con validación
- **Arquitectura**: Arquitectura en capas (Controlador → Servicio → Repositorio)

### Frontend (React)

- **Framework**: React 19
- **Herramienta de Construcción**: Vite
- **Estilos**: Tailwind CSS
- **Ruteo**: React Router DOM
- **Cliente HTTP**: Axios para comunicación con API
- **Gestión de Estado**: React Hooks

## 📋 Prerrequisitos

- Java 21 o superior
- Node.js 18 o superior
- PostgreSQL 12 o superior
- Maven 3.6 o superior

## 🛠️ Instalación y Configuración

### Configuración del Backend

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd inventory-sales-system/backend
   ```
2. **Configurar variables de entorno**
   Crear un archivo `.env` en el directorio raíz del backend:

   ```env
   DB_URL=jdbc:postgresql://localhost:5432/inventory_sales
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```
3. **Construir y ejecutar la aplicación**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   El backend iniciará en `http://localhost:8080`

### Configuración del Frontend

1. **Navegar al directorio del frontend**

   ```bash
   cd ../frontend
   ```
2. **Instalar dependencias**

   ```bash
   npm install
   ```
3. **Configurar variables de entorno**
   Crear un archivo `.env` en el directorio raíz del frontend:

   ```env
   VITE_API_URL=http://localhost:8080
   VITE_API_USER=tu_usuario
   VITE_API_PASSWORD=tu_contraseña
   ```
4. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   El frontend iniciará en `http://localhost:5173`

## 🗄️ Esquema de Base de Datos

### Entidades Principales

- **Producto**: `id`, `name`, `description`, `unitPrice`, `stock`, `version`
- **Venta**: `id`, `transactionId`, `date`, `total`
- **DetalleVenta**: `id`, `sale`, `product`, `quantity`, `unitPrice`, `subtotal`
- **Usuario**: `id`, `username`, `password`, `roles`
- **Rol**: `id`, `name`

## 🔌 Endpoints de la API

### Productos

- `POST /api/products` - Crear un nuevo producto
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `PUT /api/products/{id}` - Actualizar producto
- `DELETE /api/products/{id}` - Eliminar producto

### Ventas

- `POST /api/sales` - Crear una nueva venta
- `GET /api/sales` - Obtener todas las ventas

### Reportes

- `GET /api/reports/daily-sales` - Obtener reporte diario de ventas en formato JSON
- `GET /api/reports/daily-sales/csv` - Obtener reporte diario de ventas en formato CSV
- `GET /api/reports/daily-sales/pdf` - Obtener reporte diario de ventas en formato PDF

## 🔐 Seguridad

- **Autenticación**: Autenticación HTTP Basic
- **Encriptación de Contraseñas**: Hashing con BCrypt
- **CORS**: Configurado para entorno de desarrollo
- **Validación de Entrada**: Validación Bean en DTOs

## 🎨 Componentes de la UI

### Páginas Principales

- **Inicio**: Centro de navegación con secciones principales del sistema
- **Gestión de Inventario**: Operaciones CRUD de productos
- **Gestión de Ventas**: Crear y consultar ventas
- **Reportes**: Ver y descargar reportes diarios

## 📁 Estructura del Proyecto

```
inventory-sales-system/
├── backend/
│   ├── src/main/java/io/github/Lordrap2002/inventory/
│   │   ├── controller/     # Controladores REST
│   │   ├── service/        # Lógica de negocio
│   │   ├── repository/     # Capa de acceso a datos
│   │   ├── entity/         # Entidades JPA
│   │   ├── api/dto/        # Objetos de transferencia de datos
│   │   ├── config/         # Clases de configuración
│   │   └── security/       # Configuración de seguridad
│   ├── src/main/resources/ # Archivos de configuración
│   └── pom.xml            # Configuración de Maven
├── frontend/
│   ├── src/
│   │   ├── pages/         # Componentes React
│   │   ├── services/      # Llamadas al servicio API
│   │   ├── api/           # Configuración cliente HTTP
│   │   └── assets/        # Recursos estáticos
│   ├── package.json       # Dependencias de Node.js
│   └── vite.config.js     # Configuración de Vite
└── README.md
```

## 👨‍💻 Desarrollador

**Santiago Peña Nieto**
