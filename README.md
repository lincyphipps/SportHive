<p align="center">
  <img src="https://raw.githubusercontent.com/lincyphipps/SportHive/main/frontend/src/assets/Screenshot%202025-04-22%20155955.png" alt="SportHive Logo" width="300"/>
</p>

**SportHive** is a full-stack MERN (MongoDB, Express.js, React, Node.js) application built to help users discover and join local sports games and communities.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```
git clone https://github.com/lincyphipps/SportHive.git
cd SportHive
```

### 2️⃣ Install Backend Dependencies
Navigate to the backend directory:
```
cd backend
npm install express mongoose cors dotenv mongodb bcrypt jsonwebtoken
npm install --save-dev nodemon
```
### 3️⃣ Install Frontend Dependencies
Open a new terminal and navigate to the frontend directory:
```
cd frontend
npm install
npm install --save-dev vite
```
### 4️⃣ Run the App
In the **backend** terminal:
```
npm start
```

In the **frontend** terminal:
```
npm run dev
```

## 🔐 Environment Variables
Create a .env file in the backend/ directory with the following content:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🛠️ Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express.js
- Database: MongoDB (via Mongoose)
- Authentication: JWT + bcrypt
- Deployment: Render (backend) & Vercel (frontend) [in progress]

## 📁 Folder Structure
SportHive/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js

## 👥 Contributors
- Lincy Phipps (Product Manager)
- David Murillo (Scrum Master)
- Myiah Stubbs (Development Team Member)
- Daniela Macias (Development Team member)

## License
MIT License – free to use and modify.
