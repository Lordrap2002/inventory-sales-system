# User Manual - Inventory and Sales System

---

## Introduction

The **Inventory and Sales System** is a comprehensive web application designed to manage inventories, process sales, and generate daily reports.

### **Key Features:**

- **Inventory Management**: Complete control of products and stock
- **Sales Processing**: Multi-product sales system
- **Multi-format Reports**: Export in JSON, CSV, and PDF formats
- **Security**: Role-based authentication system
- **Modern Interface**: Responsive design and user-friendly interface

### **System Architecture:**

- **Backend**: Spring Boot 3.5.4 with Java 21
- **Frontend**: React 19 with Vite and Tailwind CSS
- **Database**: PostgreSQL
- **Security**: Spring Security with BCrypt

---

## System Requirements

### **Required Software:**

- **Java**: Version 21 or higher
- **Node.js**: Version 18 or higher
- **PostgreSQL**: Version 12 or higher
- **Maven**: Version 3.6 or higher

### **Requirements Verification:**

```bash
# Verify Java
java -version

# Verify Node.js
node --version

# Verify PostgreSQL
psql --version

# Verify Maven
mvn --version
```

---

## Installation

### **Step 1: Clone the Repository**

```bash
git clone <REPOSITORY_URL>
cd inventory-sales-system
```

### **Step 2: Configure the Database**

1. **Create PostgreSQL database:**

   ```sql
   CREATE DATABASE inventory_sales;
   CREATE USER inventory_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE inventory_sales TO inventory_user;
   ```
2. **Verify connection:**

   ```bash
   psql -h localhost -U inventory_user -d inventory_sales
   ```

### **Step 3: Configure the Backend**

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```
2. **Create configuration file `.env`:**

   ```env
   DB_URL=jdbc:postgresql://localhost:5432/inventory_sales
   DB_USERNAME=inventory_user
   DB_PASSWORD=your_secure_password
   ```
3. **Compile and run:**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will be available at: `http://localhost:8080`

### **Step 4: Configure the Frontend**

1. **Navigate to frontend directory:**

   ```bash
   cd ../frontend
   ```
2. **Create configuration file `.env`:**

   ```env
   VITE_API_URL=http://localhost:8080
   VITE_API_USER=inventory_user
   VITE_API_PASSWORD=your_secure_password
   ```
3. **Install dependencies and run:**

   ```bash
   npm install
   npm run dev
   ```

   The frontend will be available at: `http://localhost:5173`

---

## Configuration

### **Backend Configuration**

#### **File `.env`:**

```env
DB_URL=jdbc:postgresql://localhost:5432/inventory_sales
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### **Environment Variables:**

- `DB_URL`: PostgreSQL connection URL
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password

### **Frontend Configuration**

#### **File `.env`:**

```env
VITE_API_URL=http://localhost:8080
VITE_API_USER=inventory_user
VITE_API_PASSWORD=your_secure_password
```

#### **Environment Variables:**

- `VITE_API_URL`: Spring Boot backend URL
- `VITE_API_USER`: HTTP Basic authentication username
- `VITE_API_PASSWORD`: HTTP Basic authentication password

---

## Getting Started

### **System Access**

1. Open your browser and navigate to: `http://localhost:5173`
2. You will see the main page with three main options:
   - **Inventory**
   - **Sales**
   - **Reports**

---

## System Features

### **1. Inventory Management**

#### **Create Product**

1. Navigate to **Inventory** → **Create Product**
2. Complete the form:
   - **Product Name**: Product name
   - **Unit Price**: Unit price
   - **Stock Quantity**: Quantity in stock
   - **Description**: Optional description
3. Click **Create Product**

#### **List Products**

1. Navigate to **Inventory** → **List Products**
2. View all products in an organized table
3. Information displayed:
   - Name
   - Description
   - Unit price
   - Available stock

#### **Update Product**

1. Navigate to **Inventory** → **Update Product**
2. Select the product to update
3. Modify the necessary fields
4. Click **Update Product**

#### **Delete Product**

1. Navigate to **Inventory** → **Delete Product**
2. Select the product to delete
3. Confirm deletion
4. Click **Delete Product**

### **2. Sales Management**

#### **Create Sale**

1. Navigate to **Sales** → **Create Sale**
2. Select products from inventory
3. Specify quantities for each product
4. The system automatically calculates:
   - Subtotal per product
   - Total sale amount
   - Remaining stock
5. Click **Create Sale**

### **3. Report Generation**

#### **Daily Sales Report**

1. Navigate to **Reports** → **Daily Report**
2. Select the report date
3. Available options:
   - **Generate Report**: View data on screen
   - **Download CSV**: Download in CSV format
   - **Download PDF**: Download in PDF format

#### **Available Report Types**

- **JSON**: For programmatic analysis
- **CSV**: For importing into Excel
- **PDF**: For printing and archiving

### **Report Structure**

Each report includes:

- **Header**: Title and date
- **Product Table**: Name, quantity sold, total amount
- **Summary**: Total transactions and revenue
- **Footer**: System information

---

## User Management

### **Authentication System**

- **Method**: HTTP Basic Authentication
- **Encryption**: BCrypt for passwords
- **Security**: CORS configured for development

### **User Roles**

- **Administrator**: Complete system access
- **User**: Limited access based on permissions
- **Manager**: Access to inventory and sales

### **Security Configuration**

- **CORS**: Configured for `http://localhost:5173`
- **Endpoints**: All `/api/**` endpoints require authentication
- **Validation**: Bean Validation on all DTOs
