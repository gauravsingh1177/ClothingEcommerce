# LUXE Clothing Ecommerce

A modern, full-stack clothing e-commerce website inspired by top brands like H&M and Myntra. Built with React, Node.js, Express, and MongoDB, featuring a premium UI, admin dashboard, and all essential shopping features.

---

## ✨ Features
- **User Experience**
  - Browse curated collections (Men, Women, Accessories)
  - View product details with size and color selection
  - Add to cart, buy now (single or all items), and remove items
  - Responsive, mobile-first design with Tailwind CSS
  - Animated carousels and interactive sections
- **Authentication**
  - User registration and login
  - JWT-based authentication
- **Admin Dashboard**
  - Add, update, and delete products
  - View and manage all orders
- **Cart & Orders**
  - Add multiple items to cart
  - Buy all or individual items
  - Simulated order placement (no real payment)
- **Collections Page**
  - Dynamic, filterable collections
  - Trending carousel with auto-scroll and pause-on-hover
- **Contact, About, and More**
  - Modern, animated info pages
  - Newsletter signup in the footer

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Deployment Ready:** Easy to deploy to any Node/React hosting

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ClothingEcommerce.git
cd ClothingEcommerce
```

### 2. Setup the Backend
```bash
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT secret
# Example .env:
# MONGODB_URI=your_mongodb_atlas_uri
# JWT_SECRET=your_jwt_secret
# PORT=5000
node server.js
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm start
```

### 4. Open in your browser
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 📦 Project Structure
```
ClothingEcommerce/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
│   └── ...
└── README.md
```

---

## 📝 Customization & Notes
- **Images:** Uses Unsplash/Pexels/Freepik for demo images. Replace with your own for production.
- **No real payment:** Orders are simulated for demo purposes.
- **Admin:** To access admin features, register a user and manually set their `role` to `admin` in the database.
- **.env:** Never commit your real secrets to GitHub.

---

## 💡 Credits
- UI inspired by H&M, Myntra, and modern e-commerce best practices.
- Built with ❤️ by [Your Name].

---

## 📄 License
This project is open source and free to use for learning and personal projects. 