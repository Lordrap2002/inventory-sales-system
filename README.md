# Inventory and Sales Management System

A comprehensive web application for managing inventory, processing sales, and generating daily reports. Built with Spring Boot for the backend and React for the frontend.

## 🚀 Features

### Inventory Management

- **Create Products**: Add new products with name, description, unit price, and stock quantity
- **Update Products**: Modify existing product information
- **Delete Products**: Remove products from the system
- **List Products**: View all products in the inventory

### Sales Management

- **Create Sales**: Process new sales transactions
- **Multiple Products**: Add multiple products to a single sale
- **Automatic Calculations**: Automatic total calculation and stock deduction
- **Transaction IDs**: Unique transaction identifiers for each sale
- **Sale Details**: Comprehensive tracking of sale items and quantities

### Reporting System

- **Daily Sales Reports**: Generate and view daily sales summaries
- **Multiple Formats**: Export reports in JSON, CSV, and PDF formats

### User Management

- **Role-based Access Control**: Secure authentication system
- **Secure Authentication**: HTTP Basic authentication with encrypted passwords

## 🏗️ Architecture

### Backend (Spring Boot)

- **Framework**: Spring Boot 3.5.4
- **Java Version**: 21
- **Database**: PostgreSQL with JPA/Hibernate
- **Security**: Spring Security with BCrypt encryption
- **API**: RESTful endpoints with validation
- **Architecture**: Layered architecture (Controller → Service → Repository)

### Frontend (React)

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API communication
- **State Management**: React Hooks

## 📋 Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- PostgreSQL 12 or higher
- Maven 3.6 or higher

## 🛠️ Installation & Setup

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd inventory-sales-system/backend
   ```
2. **Configure environment variables**
   Create a `.env` file in the backend root directory:

   ```env
   DB_URL=jdbc:postgresql://localhost:5432/inventory_sales
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```
3. **Build and run the application**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../frontend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a `.env` file in the frontend root directory:

   ```env
   VITE_API_URL=http://localhost:8080
   VITE_API_USER=your_username
   VITE_API_PASSWORD=your_password
   ```
4. **Start development server**

   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## 🗄️ Database Schema

### Core Entities

- **Product**: `id`, `name`, `description`, `unitPrice`, `stock`, `version`
- **Sale**: `id`, `transactionId`, `date`, `total`
- **SaleDetail**: `id`, `sale`, `product`, `quantity`, `unitPrice`, `subtotal`
- **User**: `id`, `username`, `password`, `roles`
- **Role**: `id`, `name`

## 🔌 API Endpoints

### Products

- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Sales

- `POST /api/sales` - Create a new sale
- `GET /api/sales` - Get all sales

### Reports

- `GET /api/reports/daily-sales` - Get daily sales report in JSON format
- `GET /api/reports/daily-sales/csv` - Get daily sales report in CSV format
- `GET /api/reports/daily-sales/pdf` - Get daily sales report in PDF format

## 🔐 Security

- **Authentication**: HTTP Basic Authentication
- **Password Encryption**: BCrypt hashing
- **CORS**: Configured for development environment
- **Input Validation**: Bean Validation on DTOs

## 🎨 UI Components

### Main Pages

- **Home**: Navigation hub with main system sections
- **Inventory Management**: Product CRUD operations
- **Sales Management**: Create and sales
- **Reports**: View and download daily reports

## 📁 Project Structure

```
inventory-sales-system/
├── backend/
│   ├── src/main/java/io/github/Lordrap2002/inventory/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access layer
│   │   ├── entity/         # JPA entities
│   │   ├── api/dto/        # Data transfer objects
│   │   ├── config/         # Configuration classes
│   │   └── security/       # Security configuration
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml            # Maven configuration
├── frontend/
│   ├── src/
│   │   ├── pages/         # React components
│   │   ├── services/      # API service calls
│   │   ├── api/           # HTTP client configuration
│   │   └── assets/        # Static resources
│   ├── package.json       # Node.js dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## 👨‍💻 Developer

**Santiago Peña Nieto**
