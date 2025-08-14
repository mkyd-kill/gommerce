# 🛍️ Gommerce – Full-Stack E-commerce Platform

An **E-commerce platform** built with **Go (Gin) + Gorm** for the backend and **Next.js + TypeScript** for the frontend.  
It includes **user authentication with cookies (JWT)**, **admin dashboard**, **product management**, **order management**, **wishlist**, **reviews**, and **Stripe payment integration**.

---

## 🚀 Tech Stack

**Frontend**
- [Next.js 15](https://nextjs.org/)
- TypeScript
- Axios
- TailwindCSS
- React Toastify

**Backend**
- [Go](https://go.dev/) with [Gin](https://gin-gonic.com/)
- GORM (PostgreSQL ORM)
- JWT Authentication (HttpOnly cookies)
- Stripe API Integration
- Godotenv for local config

**Database**
- PostgreSQL

**Deployment**
- Frontend → [Vercel](https://vercel.com/)
- Backend → [Render](https://render.com/)

---

## 📦 Features

- **User Authentication**
  - Register/Login with secure cookies
  - Profile view/update
  - Logout
- **Product Management**
  - List products with filters (category, price, rating)
  - Product detail page with reviews
  - Admin CRUD operations
- **Orders**
  - Checkout flow with payment
  - Admin order management with status updates
  - Email notifications
- **Wishlist**
  - Add/remove products from wishlist
- **Reviews**
  - Users can submit and view reviews
- **Stripe**
  - Saved cards for quicker checkout

---

## ⚙️ Backend Routes

### 🧑 User Routes (`/api/user`)
| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login and set JWT cookie |
| `GET`  | `/profile` | Get logged-in user profile |
| `PATCH`| `/update` | Update profile |
| `POST` | `/logout` | Logout and clear cookie |

---

### 📦 Product Routes (`/api/products`)
| Method | Route | Description |
|--------|-------|-------------|
| `GET`  | `/` | Get all products |
| `GET`  | `/get/:id` | Get product by ID |
| `POST` | `/create` | Create new product (Admin) |
| `PATCH`| `/update/:id` | Update product by ID (Admin) |
| `DELETE`| `/delete/:id` | Delete product (Admin) |

---

### 📊 Admin Routes (`/api/admin`)
| Method | Route | Description |
|--------|-------|-------------|
| `GET`  | `/` | Get dashboard metrics |

---