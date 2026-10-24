# EduTrack: Learning Management System

EduTrack is a web-based Learning Management System (LMS) built with React and Vite. Students learn through video lessons, quizzes and assignments while their progress is tracked live. Instructors build courses and admins manage the platform.

The project is frontend-only. Sample data lives in `src/data/mockData.js`, and sessions, progress and certificates are stored in the browser's `localStorage`.

## Features

**Public**
- Landing page with hero section, platform stats and featured courses
- Course catalogue with search and category / level filters
- Course details page, About page, responsive layout (desktop and mobile)

**Authentication**
- Login and Signup with form validation
- Quick-login buttons for demo accounts
- Role-based redirects and protected routes (Student, Instructor, Admin)

**Student**
- Dashboard: courses enrolled, courses completed, lessons completed, average quiz score
- Continue-learning list and enrolled course cards with progress bars
- Paid-course checkout page
- Learning page: curriculum sidebar, video lessons, items unlock in order
- Auto-graded quizzes (60% pass mark, retake allowed)
- Assignments with text submission
- Certificate of completion (printable)

**Instructor**
- Dashboard with students, revenue and course performance
- My Courses, Create Course form
- Curriculum Builder (modules, lessons, quizzes, assignments)

**Admin**
- Dashboard with platform totals, recent enrollments and top courses
- Manage users, courses and enrollments

## Tech Stack

| Technology | Use |
|---|---|
| React 18 | UI components and hooks |
| Vite 5 | Dev server and build tool |
| React Router 6 | Routing and protected routes |
| Context API + custom hooks | Auth and data state (`useAuth`, `useData`, `useProgress`, ...) |
| localStorage + mock data | Session, progress and certificate storage |
| Custom CSS | Component-level, responsive styling |

## Getting Started

**Requirements:** Node.js 18 or newer.

```bash
npm install
npm run build
npm run preview
```

Then open the URL shown in the terminal (usually http://localhost:4173).

Other scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

> **Note:** In development mode (`npm run dev`), React StrictMode runs effects twice, which can reset saved course progress and stop the certificate from being generated. For demos and evaluation, use `npm run build` followed by `npm run preview`.

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Student | student@example.com | student123 |
| Instructor | instructor@example.com | instructor123 |
| Admin | admin@example.com | admin123 |

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/courses` | Course catalogue | Public |
| `/courses/:courseId` | Course details | Public |
| `/about` | About | Public |
| `/login`, `/register` | Login, Signup | Public |
| `/student` | Student dashboard | Student |
| `/payment/:courseId` | Checkout | Student |
| `/learn/:courseId` | Learning page | Student |
| `/certificate/:courseId` | Certificate | Student |
| `/instructor` | Instructor dashboard | Instructor |
| `/instructor/courses` | My courses | Instructor |
| `/instructor/courses/create` | Create course | Instructor |
| `/instructor/courses/:courseId/curriculum` | Curriculum builder | Instructor |
| `/admin` | Admin dashboard | Admin |
| `/admin/users`, `/admin/courses`, `/admin/enrollments` | Management pages | Admin |

## Project Structure

```
src/
├── App.jsx                 # Routes
├── main.jsx                # Entry point
├── index.css               # Global styles
├── components/             # Reusable UI (Navbar, CourseCard, QuizCard, ProgressBar, ...)
├── context/                # AuthContext, DataContext
├── hooks/                  # useAuth, useData, useProgress, useForm, useLocalStorage
├── data/mockData.js        # Sample users, courses, lessons, quizzes
├── utils/                  # storage.js, validation.js
└── pages/
    ├── Home, Courses, CourseDetails, About, Login, Register, NotFound
    ├── student/            # StudentDashboard, LearnCourse, Payment, Certificate
    ├── instructor/         # InstructorDashboard, InstructorCourses, CreateCourse, CurriculumBuilder
    └── admin/              # AdminDashboard, AdminUsers, AdminCourses, AdminEnrollments
```

## Future Scope

- Backend with a database instead of localStorage
- Real payment gateway integration
- Hosted video streaming
- Discussion forums and notifications
- Mobile app and advanced analytics