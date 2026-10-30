# 🎓 College ERP System — Complete Project Context

> **Purpose:** Copy-paste this into any new AI chat session to instantly resume work without re-explaining the project.  
> **Last Updated:** 29 October 2026

---

## 📌 1. Project Overview

- **Project Name:** College Management System (Web-based ERP)
- **Project Path:** `c:\Users\aayus\OneDrive\Desktop\code works space\web dev\projects\college-management-system-web-project`
- **Objective:** A centralized web application to digitize college operations — reducing paperwork, manual errors, and providing secure role-based access for Admins, Faculty, and Students.

---

## 👥 2. User Roles & Features (Finalized)

| Role | Features |
| :--- | :--- |
| **Admin** | Manage students & faculty, create courses, view fee reports, college analytics |
| **Faculty** | View assigned classes, mark attendance, upload exam marks, upload study materials |
| **Student** | View profile, check attendance %, view exam results, check fee status |

### ➕ Approved Extra Modules (6):
1. 📅 Timetable / Schedule Management
2. 📚 Library Management (Issue & return books)
3. 📢 Notice Board / Announcements
4. 🏠 Hostel Management (Room allotment, fees)
5. 💬 Internal Messaging / Real-time Chat (Socket.io)
6. 📋 Leave Application System

---

## 💻 3. Technology Stack (Finalized)

| Layer | Technology |
| :--- | :--- |
| Backend | Node.js + Express.js (ES Modules) |
| Database | MongoDB Atlas (Cloud) + Mongoose ODM |
| Real-time | Socket.io (for chat module) |
| File Storage | Cloudinary + Multer |
| Auth & Security | JWT + Bcryptjs + Helmet + CORS + Rate Limiting |
| Frontend | React.js (Vite) + Tailwind CSS + Lucide React icons |
| State Mgmt | React Context API + Axios (with JWT interceptors) |
| API Testing | Postman / Thunder Client |

---

## 🗄️ 4. Database Schema (12 Collections)

1. **User** — name, email, password (hashed, select:false), role (admin/faculty/student), avatar, phone, gender, dob, department, enrollmentNo (sparse unique), employeeId (sparse unique), isActive, timestamps
2. **Course** — courseCode, courseName, department, semester, credits, faculty (Ref→User), students (Array Ref→User)
3. **Attendance** — student (Ref→User), course (Ref→Course), date, status, markedBy (Ref→User)
4. **Mark** — student, course, examType, marksObtained, totalMarks, remarks
5. **Fee** — student, feeType, amount, status, dueDate, paymentDate, transactionId, receiptNo
6. **Timetable** — course, faculty, dayOfWeek, startTime, endTime, roomNumber
7. **Book** — title, author, isbn, category, totalCopies, availableCopies
8. **BookIssue** — book, user, issueDate, dueDate, returnDate, fineAmount, status
9. **Notice** — title, content, targetAudience, attachmentUrl, postedBy
10. **HostelRoom** — roomNumber, blockName, capacity, occupants, rentPerSemester, status
11. **Message** — sender, receiver, content, attachmentUrl, isRead
12. **LeaveRequest** — applicant, leaveType, startDate, endDate, reason, status, reviewedBy

---

## 📁 5. Backend Folder Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                  ✅ MongoDB Atlas connection (uses MONGO_URL)
│   ├── controllers/
│   │   └── authController.js      ✅ Register & Login logic with JWT
│   ├── middleware/
│   │   └── errorHandler.js        ✅ notFound (404) + global errorHandler
│   ├── models/
│   │   └── User.js                ✅ User schema + bcrypt pre-save + matchPassword
│   ├── routes/
│   │   └── authRouter.js          ✅ POST /register, POST /login
│   └── utils/
│       ├── ApiError.js            ✅ Custom error class
│       ├── ApiResponse.js         ✅ Standard success response class
│       └── generateToken.js       ✅ JWT token generator helper
├── .env                           ✅ PORT, NODE_ENV, MONGO_URL, JWT_SECRET, JWT_EXPIRES_IN
├── .gitignore                     ✅ node_modules/, .env
├── package.json                   ✅ type: "module", scripts: start & dev
└── server.js                      ✅ Express app entry point
```

---

## 🔧 6. Environment Variables (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb+srv://aayushpanche135_db_user:aayush135@college-erp.zfpebgg.mongodb.net/
JWT_SECRET=college_erp_jwt_super_secret_key_2026_xyz
JWT_EXPIRES_IN=7d
```

---

## 🔌 7. API Endpoints (Built So Far)

| Method | Route | Status |
| :--- | :--- | :--- |
| GET | `/api/health` | ✅ Working |
| GET | `/api/test-db` | ✅ Working |
| POST | `/api/auth/register` | ✅ Tested & Working (201 Created) |
| POST | `/api/auth/login` | ✅ Tested & Working (200 OK) |

---

## 🗺️ 8. Roadmap Progress

- ✅ **Phase 1:** Planning & Architecture (100% Complete)
- ✅ **Phase 2:** Backend Foundation & Database Setup (100% Complete)
- 🔄 **Phase 3:** Authentication & Authorization (IN PROGRESS)
  - ✅ Task 3.1: bcryptjs password hashing (pre-save hook + matchPassword)
  - ✅ Task 3.2: Register & Login APIs with JWT (100% Complete & Tested)
  - 🔄 Task 3.3: Auth Middleware (`protect` — verify JWT) (NEXT UP)
  - ⏳ Task 3.4: Role-Based Authorization (`authorize('admin', 'faculty')`)
- ⏳ **Phase 4:** Core Academic Modules (Admin, Course, Attendance APIs)
- ⏳ **Phase 5:** Advanced Modules (Marks, Fees, File Uploads, Extras)
- ⏳ **Phase 6:** Frontend Foundation (React + Vite + Tailwind)
- ⏳ **Phase 7:** Frontend Dashboards (Admin, Faculty, Student)
- ⏳ **Phase 8:** Testing, Security & Deployment

