# 🛒 Modern Full-Stack E-Commerce Platform (MERN)

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A complete, production-ready Full-Stack E-Commerce solution built with the **MERN** stack (MongoDB, Express, React, Node.js). The platform is organized into three distinct, decoupled sub-projects:

1. **🛍️ Customer Storefront (`/front`)**: An ultra-fast, responsive web store for browsing, cart management, and seamless Stripe checkout.
2. **🛠️ Admin Dashboard (`/admin`)**: A centralized management panel to control inventory, track customer orders, manage users, and monitor notifications.
3. **🚀 RESTful API Server (`/back`)**: A secure, modular Express backend with MongoDB database integration, JWT authentication, Multer file handling, and Stripe payments.

---

## 📑 Table of Contents

- [Features Overview](#-features-overview)
  - [Customer Storefront (`/front`)](#1-customer-storefront-front)
  - [Admin Dashboard (`/admin`)](#2-admin-dashboard-admin)
  - [Backend API (`/back`)](#3-backend-api-back)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup (`/back`)](#2-backend-setup-back)
  - [3. Customer Storefront Setup (`/front`)](#3-customer-storefront-setup-front)
  - [4. Admin Dashboard Setup (`/admin`)](#4-admin-dashboard-setup-admin)
- [Environment Variables](#-environment-variables)
- [Database Seeding](#-database-seeding)
- [API Reference](#-api-reference)
- [Scripts Reference](#-scripts-reference)
- [Author & Acknowledgments](#-author)

---

## ✨ Features Overview

### 1. Customer Storefront (`/front`)
- **Modern Responsive Design**: Built with React 19, Tailwind CSS v4, and Lucide icons for maximum speed and polished aesthetics.
- **Hero & Promotions**: Interactive hero banner, promo highlights, and category navigation.
- **Dynamic Product Catalog**: Filter products across diverse categories (Men, Women, Kids, Electronics, Cosmetics).
- **Interactive Shopping Cart**: Add/remove items with instant price updates and persistent backend synchronization.
- **User Authentication**: Secure Sign Up & Login modal dialogs with JWT tokens stored securely.
- **Stripe Checkout Integration**: Seamless card payments powered by Stripe Checkout sessions and order verification.
- **Order Tracking**: Dedicated "My Orders" customer portal to monitor order details, payment status, and delivery lifecycle.
- **Toasts & Feedback**: Real-time interactive feedback powered by `react-toastify`.

### 2. Admin Dashboard (`/admin`)
- **Role-Based Access**: Dedicated Admin Authentication with protected routes.
- **Product Management**:
  - Add new products with file upload (images served statically), title, category, pricing, and description.
  - Interactive inventory table with instant product deletion.
- **Order Management**:
  - View all customer orders with customer details, delivery address, ordered items, and payment status.
  - Update order status dynamically (`Food Processing`, `Out for delivery`, `Delivered`, etc.).
- **User Management**:
  - Inspect registered platform users, roles, and timestamps.
- **Notifications Hub**:
  - View real-time store events and customer purchase activities.
- **Toasts & Alerts**: Styled status notifications using `react-hot-toast`.

### 3. Backend API (`/back`)
- **Modular Architecture**: Separate controllers, routes, models, and middleware.
- **MongoDB Atlas Integration**: Schemas defined with Mongoose for Users, Products, Orders, and Notifications.
- **Security & Validation**: Password hashing via `bcrypt`, data validation via `validator`, and authentication middleware via `jsonwebtoken`.
- **Media Uploads**: Automated image upload handling with `multer` saved to `/uploads` and served statically.
- **Payment Processing**: Stripe API session generation and payment verification handlers.
- **Automated Seeder**: Pre-configured `seed.js` script that downloads sample images and seeds 15 diverse products automatically.

---

## 🏗 Architecture & Tech Stack

```mermaid
graph TD
    subgraph Client Layer
        A[Front Customer Storefront\nReact 19 + Vite + Tailwind]
        B[Admin Dashboard\nReact 19 + Vite + Tailwind]
    end

    subgraph Server Layer
        C[Express.js REST API\nNode.js Server :4000]
        C --> D[JWT Auth & Middleware]
        C --> E[Multer File Uploads]
        C --> F[Stripe Payment Controller]
    end

    subgraph Data & External Services
        G[(MongoDB Atlas Database)]
        H[Stripe Payment Gateway]
    end

    A <-->|HTTP / Axios| C
    B <-->|HTTP / Axios| C
    C <-->|Mongoose ODM| G
    F <-->|Stripe SDK| H
```

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend (`front`)** | React 19, Vite, Tailwind CSS v4, React Router DOM v7, Axios, Lucide React, React Toastify |
| **Admin (`admin`)** | React 19, Vite, Tailwind CSS v4, React Router DOM v7, Axios, Lucide React, React Hot Toast |
| **Backend (`back`)** | Node.js, Express.js 5, Mongoose 9, Stripe SDK, Multer, Bcrypt, JWT, Dotenv, Cors, Validator |
| **Database** | MongoDB / MongoDB Atlas |

---

## 📁 Repository Structure

```plaintext
Online-Store/
├── back/                      # Backend REST API Server
│   ├── config/                # Database connection (db.js)
│   ├── controllers/           # Route logic (user, admin, order, product, etc.)
│   ├── middleware/            # Auth & validation middlewares
│   ├── models/                # Mongoose schemas (User, Product, Order, Notification)
│   ├── routes/                # Express API endpoints
│   ├── uploads/               # Statically served product images
│   ├── .env.example           # Template for backend environment variables
│   ├── seed.js                # Database seeder script
│   ├── server.js              # Main backend server entry point
│   └── package.json           # Backend dependencies and scripts
│
├── front/                     # Customer Storefront (Vite + React)
│   ├── src/
│   │   ├── assets/            # Static assets and icons
│   │   ├── components/        # Store components (Header, Hero, Cart, etc.)
│   │   ├── context/           # Global ShopContext state management
│   │   ├── pages/             # Pages (Home, Products, Cart, Order, MyOrders, Verify)
│   │   ├── App.jsx            # Main app router and layout
│   │   └── main.jsx           # React app entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── admin/                     # Admin Dashboard (Vite + React)
│   ├── src/
│   │   ├── components/        # Admin components (Add, List, Orders, Users, Sidebar, Login)
│   │   ├── App.jsx            # Admin routing & protected layout
│   │   └── main.jsx           # React app entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore                 # Standard git exclusions (node_modules, .env, build)
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed on your local machine:
- [Node.js](https://nodejs.org/) (version **18.x** or higher)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection string or a local MongoDB instance.
- A [Stripe](https://stripe.com/) account for API test keys.

---

### 1. Clone Repository

```bash
git clone https://github.com/mohame04d/Online-Store.git
cd Online-Store
```

---

### 2. Backend Setup (`/back`)

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd back
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy the sample environment file to create `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `back/.env` and update the values with your credentials:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. *(Optional)* Seed initial product catalog data:
   ```bash
   npm run seed
   ```
   > This automatically downloads sample dummy images and populates the database with 15 initial products.

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   > Server will start listening at: `http://localhost:4000`

---

### 3. Customer Storefront Setup (`/front`)

1. In a new terminal window, navigate to the `front` directory:
   ```bash
   cd front
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Launch the storefront application:
   ```bash
   npm run dev
   ```
   > The storefront will be accessible at: `http://localhost:5173` (or the port specified by Vite).

---

### 4. Admin Dashboard Setup (`/admin`)

1. In a new terminal window, navigate to the `admin` directory:
   ```bash
   cd admin
   ```

2. Install admin dependencies:
   ```bash
   npm install
   ```

3. Launch the admin dashboard:
   ```bash
   npm run dev
   ```
   > The admin dashboard will be accessible at: `http://localhost:5174` (or the secondary Vite port).

---

## 🔐 Environment Variables

The backend requires the following environment variables configured inside `back/.env`:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port number on which the Express server runs | `4000` |
| `MONGO_URI` | MongoDB connection URI (Atlas or Local) | `mongodb+srv://user:pass@cluster.mongodb.net/onlineStore` |
| `JWT_SECRET` | Secret key for signing and verifying JWT tokens | `super_secret_jwt_key_12345` |
| `STRIPE_SECRET_KEY`| Stripe secret key for payment sessions | `sk_test_51Sh...` |

---

## 📦 Database Seeding

The backend includes a built-in seeding script to populate your store with initial test data immediately.

```bash
cd back
npm run seed
```

**What it does:**
- Connects to your MongoDB database.
- Cleans any old demo product entries.
- Fetches and stores sample product images locally in `back/uploads/`.
- Inserts 15 products with names, categories, descriptions, and prices.

---

## 📡 API Reference

Base URL: `http://localhost:4000`

### 👤 Authentication & Users (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/user/register` | Register a new user | ❌ |
| `POST` | `/api/user/login` | Login user & return JWT token | ❌ |

### 🛠️ Admin Control (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/admin/login` | Admin login | ❌ |
| `GET` | `/api/admin/users` | Retrieve registered users list | ✅ Admin |
| `DELETE` | `/api/admin/users/:id` | Delete user account | ✅ Admin |

### 🛍️ Products (`/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/products/list` | List all available products | ❌ |
| `POST` | `/api/products/add` | Add a new product (with image upload) | ✅ Admin |
| `POST` | `/api/products/remove` | Remove product by ID | ✅ Admin |

### 🛒 Shopping Cart (`/api/cart`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/cart/get` | Retrieve user cart data | ✅ User |
| `POST` | `/api/cart/add` | Add item to cart | ✅ User |
| `POST` | `/api/cart/remove` | Remove item from cart | ✅ User |

### 📦 Orders & Payments (`/api/order`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/order/place` | Create order & initiate Stripe session | ✅ User |
| `POST` | `/api/order/userorders` | Fetch current user order history | ✅ User |
| `GET` | `/api/order/list` | List all customer orders for admin | ✅ Admin |
| `POST` | `/api/order/status` | Update order delivery/fulfillment status | ✅ Admin |
| `POST` | `/api/order/verify` | Verify Stripe payment success | ✅ User |

### 🔔 Notifications (`/api/notifications`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/notifications/get` | Fetch system notifications | ✅ |
| `POST` | `/api/notifications/read` | Mark notifications as read | ✅ |

---

## 📜 Scripts Reference

### Backend (`/back`)
- `npm start` - Start backend server with Node.
- `npm run dev` - Start backend with hot reload using nodemon.
- `npm run seed` - Execute database seeding script.

### Customer Storefront (`/front`)
- `npm run dev` - Start Vite development server.
- `npm run build` - Build production bundle.
- `npm run preview` - Preview production build.

### Admin Dashboard (`/admin`)
- `npm run dev` - Start Vite development server for admin.
- `npm run build` - Build production bundle for admin.
- `npm run preview` - Preview production build for admin.

---

## 👤 Author

Developed by **[Mohamed (Mohame04d)](https://github.com/mohame04d)**  
- GitHub: [@mohame04d](https://github.com/mohame04d)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
