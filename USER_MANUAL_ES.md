# Manual de Usuario - Sistema de Inventario y Ventas

---

## Introducción

El **Sistema de Inventario y Ventas** es una aplicación web integral diseñada para gestionar inventarios, procesar ventas y generar reportes diarios.

### **Características Clave:**

- **Gestión de Inventario**: Control completo de productos y stock
- **Procesamiento de Ventas**: Sistema de ventas multiproducto
- **Reportes Multi-formato**: Exportación en JSON, CSV y PDF
- **Seguridad**: Sistema de autenticación basado en roles
- **Interfaz Moderna**: Diseño responsivo y fácil de usar

### **Arquitectura del Sistema:**

- **Backend**: Spring Boot 3.5.4 con Java 21
- **Frontend**: React 19 con Vite y Tailwind CSS
- **Base de Datos**: PostgreSQL
- **Seguridad**: Spring Security con BCrypt

---

## Requisitos del Sistema

### **Software Requerido:**

- **Java**: Versión 21 o superior
- **Node.js**: Versión 18 o superior
- **PostgreSQL**: Versión 12 o superior
- **Maven**: Versión 3.6 o superior

### **Verificación de Requisitos:**

```bash
# Verificar Java
java -version

# Verificar Node.js
node --version

# Verificar PostgreSQL
psql --version

# Verificar Maven
mvn --version
```

---

## Instalación

### **Paso 1: Clonar el Repositorio**

```bash
git clone <REPOSITORY_URL>
cd inventory-sales-system
```

### **Paso 2: Configurar la Base de Datos**

1. **Crear base de datos en PostgreSQL:**

   ```sql
   CREATE DATABASE inventory_sales;
   CREATE USER inventory_user WITH PASSWORD 'tu_contraseña_segura';
   GRANT ALL PRIVILEGES ON DATABASE inventory_sales TO inventory_user;
   ```
2. **Verificar conexión:**

   ```bash
   psql -h localhost -U inventory_user -d inventory_sales
   ```

### **Paso 3: Configurar el Backend**

1. **Navegar al directorio del backend:**

   ```bash
   cd backend
   ```
2. **Crear archivo de configuración `.env`:**

   ```env
   DB_URL=jdbc:postgresql://localhost:5432/inventory_sales
   DB_USERNAME=inventory_user
   DB_PASSWORD=tu_contraseña_segura
   ```
3. **Compilar y ejecutar:**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   El backend estará disponible en: `http://localhost:8080`

### **Paso 4: Configurar el Frontend**

1. **Navegar al directorio del frontend:**

   ```bash
   cd ../frontend
   ```
2. **Crear archivo de configuración `.env`:**

   ```env
   VITE_API_URL=http://localhost:8080
   VITE_API_USER=inventory_user
   VITE_API_PASSWORD=tu_contraseña_segura
   ```
3. **Instalar dependencias y ejecutar:**

   ```bash
   npm install
   npm run dev
   ```

   El frontend estará disponible en: `http://localhost:5173`

---

## Configuración

### **Configuración del Backend**

#### **Archivo `.env`:**

```env
DB_URL=jdbc:postgresql://localhost:5432/inventory_sales
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

#### **Variables de Entorno:**

- `DB_URL`: URL de conexión a PostgreSQL
- `DB_USERNAME`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos

### **Configuración del Frontend**

#### **Archivo `.env`:**

```env
VITE_API_URL=http://localhost:8080
VITE_API_USER=inventory_user
VITE_API_PASSWORD=tu_contraseña_segura
```

#### **Variables de Entorno:**

- `VITE_API_URL`: URL del backend en Spring Boot
- `VITE_API_USER`: Usuario de autenticación HTTP Basic
- `VITE_API_PASSWORD`: Contraseña de autenticación HTTP Basic

---

## Funcionalidades del Sistema

### **1. Acceso al Sistema**

1. Abre tu navegador y dirígete a: `http://localhost:5173`
2. Verás la página principal con tres opciones principales:
   - **Inventory**
   - **Sales**
   - **Reports**

### **2. Gestión de Inventario**

#### **Crear Producto**

1. Navegar a **Inventory** → **Create Product**
2. Completar el formulario:
   - **Product Name**: Nombre del producto
   - **Unit Price**: Precio por unidad
   - **Stock Quantity**: Cantidad disponible en inventario
   - **Description**: Descripción opcional
3. Hacer clic en **Create Product**

#### **Listar Productos**

1. Navegar a **Inventory** → **List Products**
2. Ver todos los productos en una tabla organizada
3. Información mostrada:
   - Nombre
   - Descripción
   - Precio unitario
   - Stock disponible

#### **Actualizar Producto**

1. Navegar a **Inventory** → **Update Product**
2. Seleccionar el producto a actualizar
3. Modificar los campos necesarios
4. Hacer clic en **Update Product**

#### **Eliminar Producto**

1. Navegar a **Inventory** → **Delete Product**
2. Seleccionar el producto a eliminar
3. Confirmar la eliminación
4. Hacer clic en **Delete Product**

### **3. Gestión de Ventas**

#### **Crear Venta**

1. Navegar a **Sales**
2. Seleccionar productos del inventario
3. Especificar cantidades para cada producto
4. El sistema calcula automáticamente:
   - Subtotal por producto
   - Total de la venta
   - Stock restante
5. Hacer clic en **Create Sale**

### **4. Generación de Reportes**

#### **Reporte Diario de Ventas**

1. Navegar a **Reports**
2. Seleccionar la fecha del reporte
3. Opciones disponibles:
   - **Generate Report**: Ver datos en pantalla
   - **Download CSV**: Descargar en formato CSV
   - **Download PDF**: Descargar en formato PDF

#### **Tipos de Reporte Disponibles**

- **JSON**: Para análisis programático
- **CSV**: Para importar en Excel
- **PDF**: Para impresión y archivo

### **Estructura del Reporte**

Cada reporte incluye:

- **Encabezado**: Título y fecha
- **Tabla de Productos**: Nombre, cantidad vendida, monto total
- **Resumen**: Total de transacciones e ingresos

---

## Gestión de Usuarios

### **Sistema de Autenticación**

- **Método**: Autenticación HTTP Basic
- **Encriptación**: BCrypt para contraseñas
- **Seguridad**: CORS configurado para desarrollo

### **Configuración de Seguridad**

- **CORS**: Configurado para `http://localhost:5173`
- **Endpoints**: Todos los endpoints `/api/**` requieren autenticación
- **Validación**: Validación Bean en todos los DTOs
