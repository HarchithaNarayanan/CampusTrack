# 🎓 CampusTrack: Intelligent Lost & Found Locator

CampusTrack is a comprehensive, full-stack enterprise web application designed exclusively for university campuses to streamline the reporting, matching, and recovery of lost items. 

By enforcing strict `.edu` email verification and capturing academic context (Department & Year of Study), CampusTrack provides a safe, internal platform for students and faculty to track down misplaced belongings.

---

## ✨ Key Features
- **Role-Based Access Control:** Distinct profiles for Students (who can report matches) and Admins (who verify and manage the ecosystem).
- **Academic Context:** Item reports are automatically tagged with the user's Department and Year of Study to make tracking easier.
- **Smart Matching Engine:** An automated backend algorithm matches newly reported Found Items against active Lost Item reports based on category logic.
- **Image Upload Integration:** Upload visual proof of found or lost items which are safely converted and stored as Base64.
- **Secure Encrypted Passwords:** User credentials and login tokens are hashed using comprehensive Spring Security logic.

---

## 🛠️ Technology Stack
### Frontend (React)
- **Framework:** React.js
- **Styling:** Custom CSS Grid/Flexbox architecture (Premium Dark Purple/Gold Palette)
- **Networking:** Axios for asynchronous REST API communication

### Backend (Spring Boot)
- **Framework:** Java 17 + Spring Boot 3.5.10
- **Database:** MySQL 8.0
- **ORM:** Hibernate / Spring Data JPA
- **Security:** Spring Security + BCrypt Password Encoding

---

## 🚀 Getting Started

### Prerequisites
- Node.js (for React frontend)
- JDK 17 (for Spring Boot backend)
- MySQL Server (Running on default port `3306`)

### 1. Database Setup
Ensure your local MySQL instance is running. Connect to your database monitor and create the target database:
```sql
CREATE DATABASE lostfounddb;
```
*(Hibernate will automatically auto-generate all the schema tables upon the first boot).*

### 2. Backend Initialization
Navigate into the Spring Boot directory.
```bash
cd LostFoundLocator/LostFoundLocatorApplication
./mvnw spring-boot:run
```
The Tomcat server will initialize and begin listening securely on `http://localhost:9595`.

### 3. Frontend Initialization
Navigate into the React directory.
```bash
cd lostfound-front
npm install
npm start
```
The React development server will boot up and automatically open a new browser tab at `http://localhost:3535`.

---

## 📸 Core Modules
1. **User Authentication:** Registration pipeline validating `@university.edu` domains.
2. **Item Reporting:** Quick forms to report a lost or found item.
3. **Item Listing Dashboards:** Centralized Grids reflecting active items, showing their status (Matching, Missing, Found).
4. **Chat Interface:** Component designed for users to connect directly to orchestrate a physical campus handover. 

---

*Developed and finalized as part of a Full-Stack Engineering Showcase.*
