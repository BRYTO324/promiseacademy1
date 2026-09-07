# Promise Academy — School Management System

A complete, production-quality frontend for a modern School Management System built for **Promise Academy**, Lagos.

> **Live Demo:** Open `index.html` in your browser — no build tools, no server required.

---

## 🚀 How to Run

**Locally:**
```
Just open index.html in any browser.
No npm install. No build step. No server needed.
```

**On GitHub Pages:**
1. Push this folder to a GitHub repository
2. Go to Settings → Pages → Source: `main` branch, `/ (root)`
3. Your site will be live at `https://yourusername.github.io/repo-name`

**Login credentials (demo):**
| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@promiseacademy.edu.ng | admin123 |
| Teacher | teacher@promiseacademy.edu.ng | teacher123 |
| Parent | parent@gmail.com | parent123 |

---

## 📁 Folder Structure

```
promise-academy/
│
├── index.html              ← Login page (entry point)
├── dashboard.html          ← Admin dashboard
│
├── pages/
│   ├── students.html       ← Student management
│   ├── student-profile.html← Individual student profile
│   ├── admissions.html     ← Admission portal & applications
│   ├── classes.html        ← Classes & sections manager
│   ├── staff.html          ← Teachers & staff management
│   ├── parents.html        ← Parents/guardians directory
│   ├── attendance.html     ← Daily attendance marking
│   ├── finance.html        ← Fees & payment records
│   ├── examinations.html   ← Exam scheduling
│   ├── results.html        ← Result entry (spreadsheet-style)
│   ├── report-card.html    ← Printable report cards
│   ├── broadsheet.html     ← Class-wide result broadsheet
│   ├── timetable.html      ← Class timetable viewer
│   ├── payroll.html        ← Staff payroll management
│   ├── notifications.html  ← Notification center
│   ├── reports.html        ← Analytics & reports
│   └── settings.html       ← School & system settings
│
├── portals/
│   ├── teacher.html        ← Teacher portal (mark attendance, enter results)
│   ├── parent.html         ← Parent portal (view child's progress)
│   └── student.html        ← Student portal (view results, timetable)
│
├── css/
│   ├── style.css           ← Global styles & CSS variables (color system)
│   ├── dashboard.css       ← Sidebar, topbar, dashboard-specific styles
│   ├── responsive.css      ← Mobile & tablet breakpoints
│   └── print.css           ← Print styles for report cards & receipts
│
├── js/
│   ├── data.js             ← Demo data + helper functions [replace with API calls]
│   ├── app.js              ← Core UI: sidebar, modals, toasts, theme, dropdowns
│   ├── dashboard.js        ← Dashboard stats & section filter logic
│   ├── students.js         ← Student CRUD, filters, pagination
│   ├── attendance.js       ← Attendance marking & summary
│   ├── finance.js          ← Payments, receipts, fee summary
│   └── results.js          ← Result entry & grade calculation
│
└── assets/
    ├── logo/logo1.jpg      ← Official school logo
    └── images/             ← School photos used across the UI
```

---

## 🎨 Color System

Colors are derived from the **Promise Academy logo** (deep forest green + gold/amber):

```css
--primary-color:   #1e5c1e   /* Deep green — main brand color */
--primary-dark:    #0d3310   /* Sidebar background */
--secondary-color: #c8960f   /* Gold — accents, secondary actions */
--accent-color:    #f5d020   /* Light gold — logo highlight */
```

All CSS variables are defined in `css/style.css` under `:root`.

---

## 🏫 Academic Sections

The system supports three sections:

| Section | Classes |
|---------|---------|
| Nursery | Nursery 1, 2, 3 |
| Primary | Primary 1–6 |
| Secondary | JSS 1–3, SS 1–3 |

The **section filter** on the dashboard updates all statistics and tables in real time.

---

## 🔌 Connecting to Django REST Framework

All demo data lives in `js/data.js`. Each function that uses this data is marked with `// [API]` comments in the JS files. Here's where to plug in your endpoints:

| Feature | JS File | Function | Django Endpoint |
|---------|---------|----------|-----------------|
| Dashboard stats | `dashboard.js` | `loadDashboardStats()` | `GET /api/dashboard/stats/` |
| Student list | `students.js` | `loadStudents()` | `GET /api/students/` |
| Add student | `students.js` | `studentForm submit` | `POST /api/students/` |
| Edit student | `students.js` | `studentForm submit` | `PATCH /api/students/{id}/` |
| Delete student | `students.js` | `deleteStudent()` | `DELETE /api/students/{id}/` |
| Mark attendance | `attendance.js` | `saveAttendance()` | `POST /api/attendance/bulk/` |
| Get attendance | `attendance.js` | `loadAttendance()` | `GET /api/attendance/` |
| Fee payments | `finance.js` | `loadPayments()` | `GET /api/finance/payments/` |
| Record payment | `finance.js` | `recordPayment()` | `POST /api/finance/payments/` |
| Enter results | `results.js` | `saveResults()` | `POST /api/results/bulk/` |
| Admission applications | `pages/admissions.html` | inline script | `GET/POST /api/admissions/` |
| Login (auth) | `index.html` | `handleLogin()` | `POST /api/auth/login/` |

**Replace `localStorage` calls with `fetch()`:**
```js
// BEFORE (demo)
localStorage.setItem('pa_students', JSON.stringify(students));

// AFTER (with Django API)
await fetch('/api/students/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  body: JSON.stringify(studentData)
});
```

---

## ✅ Features Built

- ✅ Login page with role selector (Admin, Teacher, Parent, Student)
- ✅ Full admin dashboard with section filter (All / Nursery / Primary / Secondary)
- ✅ Student management — add, edit, delete, filter, paginate
- ✅ Student profile page with tabs (Overview, Academic, Attendance, Fees, Results)
- ✅ Admission portal — apply, approve, reject, print confirmation
- ✅ Classes & sections manager — create/edit classes and arms
- ✅ Staff management — teaching, admin and non-teaching
- ✅ Parents directory
- ✅ Daily attendance marking with live summary
- ✅ Fees & finance — fee structure, payment recording, printable receipts
- ✅ Payroll management — process salaries, mark paid
- ✅ Examination scheduling
- ✅ Results entry (spreadsheet-style with auto grade calculation)
- ✅ Printable report cards (Nursery/Primary/Secondary with different formats)
- ✅ Broadsheet — class-wide result summary with sorting
- ✅ Timetable viewer for all classes
- ✅ Notification center with filtering and send notification
- ✅ Reports & analytics with bar charts
- ✅ Settings — school info, sessions, terms, grading system, users
- ✅ Teacher portal — mark attendance, enter results, timetable
- ✅ Parent portal — view child's results, attendance, fees, timetable
- ✅ Student portal — view results, attendance, timetable, profile
- ✅ Dark/Light mode toggle
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Print styles for report cards and receipts

---

## 🛠 Technology

- HTML5, CSS3, Vanilla JavaScript
- No React, No Vue, No Angular
- No Bootstrap, No Tailwind
- No build tools — works directly in browser

---

*Built for Promise Academy, Lagos. Frontend prototype — ready for Django REST Framework backend integration.*
