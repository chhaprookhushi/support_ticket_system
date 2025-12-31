# 🎫 Support Ticket Management System
A role-based Support Ticket Management System built using the MERN stack (MongoDB, Express, Node.js, Vanilla JS frontend).
This project allows users to create support tickets and admins to manage them efficiently.

## 🚀 Features:-
### 👤 User Features:
* Register and login
* Create a support ticket
* View only their own tickets
* View ticket status (Open / In-Progress / Closed)
* Cannot modify ticket status
* Cannot delete tickets

### 👑 Admin Features:
* Login using fixed admin credentials
* View all tickets created by users
* Update ticket status
* Delete tickets
* Manage tickets centrally
* Admin cannot register


## 🔐 Role-Based Access Control:-
### User role:
  * Can create tickets
  * Can view only their tickets
  * Cannot change status

### Admin role:
  * Can view all tickets
  * Can update ticket status
  * Can delete tickets
  * Has fixed credentials stored in `.env`


## 🧱 Tech Stack:-

### Backend:
* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt
* dotenv

### Frontend:
* HTML
* CSS
* JavaScript (Vanilla)


## 👨‍💻 Author:
Khushi Chhaproo
Computer Engineering Student
MERN Stack Project
