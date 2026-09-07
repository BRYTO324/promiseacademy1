/* ============================================================
   PROMISE ACADEMY — DEMO DATA
   All data here is demo/localStorage data.
   Replace these with Django REST API calls in production.
   ============================================================ */

const PA_DATA = {

  school: {
    name: "Promise Academy",
    motto: "Excellence in Learning, Service in Character",
    address: "15 Education Avenue, Lekki Phase 1, Lagos State",
    phone: "+234 (0) 802 345 6789",
    email: "info@promiseacademy.edu.ng",
    website: "www.promiseacademy.edu.ng",
    session: "2024/2025",
    term: "Second Term",
    logo: "../assets/logo/logo1.jpg",
    logoFromRoot: "assets/logo/logo1.jpg"
  },

  // ── SECTIONS & CLASSES ──────────────────────────────────────
  sections: [
    { id: "nursery", name: "Nursery", color: "#00897b" },
    { id: "primary", name: "Primary", color: "#1e5c1e" },
    { id: "secondary", name: "Secondary", color: "#c8960f" }
  ],

  classes: [
    // Nursery
    { id: "n1", name: "Nursery 1", section: "nursery", arms: ["A", "B"] },
    { id: "n2", name: "Nursery 2", section: "nursery", arms: ["A", "B"] },
    { id: "n3", name: "Nursery 3", section: "nursery", arms: ["A", "B"] },
    // Primary
    { id: "p1", name: "Primary 1", section: "primary", arms: ["A", "B", "C"] },
    { id: "p2", name: "Primary 2", section: "primary", arms: ["A", "B", "C"] },
    { id: "p3", name: "Primary 3", section: "primary", arms: ["A", "B", "C"] },
    { id: "p4", name: "Primary 4", section: "primary", arms: ["A", "B"] },
    { id: "p5", name: "Primary 5", section: "primary", arms: ["A", "B"] },
    { id: "p6", name: "Primary 6", section: "primary", arms: ["A", "B"] },
    // Secondary
    { id: "jss1", name: "JSS 1", section: "secondary", arms: ["A", "B", "C"] },
    { id: "jss2", name: "JSS 2", section: "secondary", arms: ["A", "B", "C"] },
    { id: "jss3", name: "JSS 3", section: "secondary", arms: ["A", "B"] },
    { id: "ss1", name: "SS 1", section: "secondary", arms: ["Science", "Commercial", "Art"] },
    { id: "ss2", name: "SS 2", section: "secondary", arms: ["Science", "Commercial", "Art"] },
    { id: "ss3", name: "SS 3", section: "secondary", arms: ["Science", "Commercial", "Art"] }
  ],

  // ── STUDENTS ─────────────────────────────────────────────────
  students: [
    { id: "STU001", name: "Adaeze Okonkwo", gender: "Female", section: "secondary", classId: "jss2", arm: "A", dob: "2012-03-15", admissionNo: "PA/2021/001", admissionDate: "2021-09-06", parentId: "PAR001", status: "active", photo: null },
    { id: "STU002", name: "Emeka Chibuike", gender: "Male", section: "secondary", classId: "ss1", arm: "Science", dob: "2010-07-22", admissionNo: "PA/2020/002", admissionDate: "2020-09-07", parentId: "PAR002", status: "active", photo: null },
    { id: "STU003", name: "Fatima Abubakar", gender: "Female", section: "primary", classId: "p5", arm: "A", dob: "2014-11-08", admissionNo: "PA/2022/003", admissionDate: "2022-09-05", parentId: "PAR003", status: "active", photo: null },
    { id: "STU004", name: "Kelechi Eze", gender: "Male", section: "primary", classId: "p3", arm: "B", dob: "2016-04-12", admissionNo: "PA/2023/004", admissionDate: "2023-01-10", parentId: "PAR004", status: "active", photo: null },
    { id: "STU005", name: "Ngozi Adeleke", gender: "Female", section: "nursery", classId: "n2", arm: "A", dob: "2020-01-30", admissionNo: "PA/2024/005", admissionDate: "2024-09-02", parentId: "PAR005", status: "active", photo: null },
    { id: "STU006", name: "Tunde Fashola", gender: "Male", section: "secondary", classId: "jss1", arm: "B", dob: "2013-06-17", admissionNo: "PA/2021/006", admissionDate: "2021-09-06", parentId: "PAR006", status: "active", photo: null },
    { id: "STU007", name: "Chioma Nwosu", gender: "Female", section: "primary", classId: "p6", arm: "A", dob: "2013-09-25", admissionNo: "PA/2021/007", admissionDate: "2021-09-06", parentId: "PAR007", status: "active", photo: null },
    { id: "STU008", name: "Yusuf Ibrahim", gender: "Male", section: "secondary", classId: "ss2", arm: "Commercial", dob: "2009-12-03", admissionNo: "PA/2019/008", admissionDate: "2019-09-09", parentId: "PAR008", status: "active", photo: null },
    { id: "STU009", name: "Blessing Okeke", gender: "Female", section: "nursery", classId: "n1", arm: "A", dob: "2021-05-14", admissionNo: "PA/2024/009", admissionDate: "2024-09-02", parentId: "PAR009", status: "active", photo: null },
    { id: "STU010", name: "Oluwaseun Adeyemi", gender: "Male", section: "primary", classId: "p1", arm: "C", dob: "2018-08-19", admissionNo: "PA/2024/010", admissionDate: "2024-09-02", parentId: "PAR005", status: "active", photo: null },
    { id: "STU011", name: "Amaka Obiora", gender: "Female", section: "secondary", classId: "jss3", arm: "A", dob: "2011-02-27", admissionNo: "PA/2021/011", admissionDate: "2021-09-06", parentId: "PAR010", status: "active", photo: null },
    { id: "STU012", name: "Babatunde Coker", gender: "Male", section: "primary", classId: "p4", arm: "A", dob: "2015-10-06", admissionNo: "PA/2022/012", admissionDate: "2022-09-05", parentId: "PAR011", status: "inactive", photo: null },
    { id: "STU013", name: "Grace Uchenna", gender: "Female", section: "secondary", classId: "ss3", arm: "Art", dob: "2008-03-21", admissionNo: "PA/2018/013", admissionDate: "2018-09-10", parentId: "PAR012", status: "active", photo: null },
    { id: "STU014", name: "Mohammed Suleiman", gender: "Male", section: "nursery", classId: "n3", arm: "B", dob: "2019-07-11", admissionNo: "PA/2023/014", admissionDate: "2023-09-04", parentId: "PAR013", status: "active", photo: null },
    { id: "STU015", name: "Precious Nnamdi", gender: "Female", section: "primary", classId: "p2", arm: "A", dob: "2017-12-28", admissionNo: "PA/2023/015", admissionDate: "2023-09-04", parentId: "PAR014", status: "active", photo: null }
  ],

  // ── PARENTS ──────────────────────────────────────────────────
  parents: [
    { id: "PAR001", name: "Mrs. Ngozi Okonkwo", email: "ngozi.okonkwo@gmail.com", phone: "08031234567", children: ["STU001"], address: "24 Victoria Garden City, Lekki, Lagos" },
    { id: "PAR002", name: "Mr. Chukwudi Chibuike", email: "chukwudi.c@yahoo.com", phone: "08056789012", children: ["STU002"], address: "10 Allen Avenue, Ikeja, Lagos" },
    { id: "PAR003", name: "Hajia Aisha Abubakar", email: "aisha.abubakar@gmail.com", phone: "08023456789", children: ["STU003"], address: "5 Garki Estate, Abuja FCT" },
    { id: "PAR004", name: "Mr. Emmanuel Eze", email: "emma.eze@hotmail.com", phone: "07034567890", children: ["STU004"], address: "18 Rumuola, Port Harcourt, Rivers" },
    { id: "PAR005", name: "Mrs. Funke Adeyemi", email: "funke.adeyemi@gmail.com", phone: "08045678901", children: ["STU005", "STU010"], address: "7 Surulere, Lagos" },
    { id: "PAR006", name: "Mr. Segun Fashola", email: "segun.fashola@gmail.com", phone: "08067890123", children: ["STU006"], address: "32 Bourdillon Road, Ikoyi, Lagos" },
    { id: "PAR007", name: "Dr. Ifeanyi Nwosu", email: "ifeanyi.nwosu@gmail.com", phone: "08078901234", children: ["STU007"], address: "11 Trans-Ekulu, Enugu" },
    { id: "PAR008", name: "Alhaji Musa Ibrahim", email: "musa.ibrahim@gmail.com", phone: "07089012345", children: ["STU008"], address: "44 Ahmadu Bello Way, Kaduna" },
    { id: "PAR009", name: "Mrs. Adaeze Okeke", email: "adaeze.okeke@gmail.com", phone: "08090123456", children: ["STU009"], address: "9 Ojota, Lagos" },
    { id: "PAR010", name: "Mrs. Uchechi Obiora", email: "uchechi.o@gmail.com", phone: "08012345678", children: ["STU011"], address: "21 Awka, Anambra" },
    { id: "PAR011", name: "Barr. Olumide Coker", email: "olumide.coker@law.com.ng", phone: "08123456789", children: ["STU012"], address: "6 Law School Road, Onikan, Lagos" },
    { id: "PAR012", name: "Prof. Chidi Uchenna", email: "chidi.uchenna@unilag.edu.ng", phone: "08234567890", children: ["STU013"], address: "University of Lagos Quarters, Akoka" },
    { id: "PAR013", name: "Mallam Isah Suleiman", email: "isah.suleiman@gmail.com", phone: "08145678901", children: ["STU014"], address: "15 Maitama, Abuja FCT" },
    { id: "PAR014", name: "Mrs. Stella Nnamdi", email: "stella.nnamdi@gmail.com", phone: "08056789012", children: ["STU015"], address: "3 New Layout, Onitsha, Anambra" }
  ],

  // ── STAFF ─────────────────────────────────────────────────────
  staff: [
    { id: "STF001", name: "Mr. Olawale Adediran", role: "Principal", department: "Administration", type: "admin", phone: "08012345678", email: "principal@promiseacademy.edu.ng", joined: "2015-01-05", status: "active" },
    { id: "STF002", name: "Mrs. Adunola Bakare", role: "Vice Principal (Academics)", department: "Administration", type: "admin", phone: "08023456789", email: "vp.academics@promiseacademy.edu.ng", joined: "2016-03-10", status: "active" },
    { id: "STF003", name: "Mr. Chukwuemeka Obieze", role: "Class Teacher - JSS 2A", department: "Secondary", type: "teaching", phone: "08034567890", email: "emeka.obieze@promiseacademy.edu.ng", joined: "2018-09-01", status: "active", subjects: ["Mathematics", "Further Mathematics"], classes: ["jss2"] },
    { id: "STF004", name: "Mrs. Taiwo Akinwande", role: "Class Teacher - Primary 5A", department: "Primary", type: "teaching", phone: "08045678901", email: "taiwo.akinwande@promiseacademy.edu.ng", joined: "2019-01-07", status: "active", subjects: ["English Language", "Social Studies"], classes: ["p5"] },
    { id: "STF005", name: "Mr. Biodun Olatunji", role: "Science Teacher", department: "Secondary", type: "teaching", phone: "08056789012", email: "biodun.olatunji@promiseacademy.edu.ng", joined: "2017-09-04", status: "active", subjects: ["Physics", "Chemistry"], classes: ["ss1", "ss2"] },
    { id: "STF006", name: "Miss Adaeze Obi", role: "Nursery Teacher", department: "Nursery", type: "teaching", phone: "08067890123", email: "adaeze.obi@promiseacademy.edu.ng", joined: "2020-09-07", status: "active", subjects: ["Nursery Rhymes", "Number Work", "Activities"], classes: ["n1", "n2"] },
    { id: "STF007", name: "Mrs. Chidinma Eze", role: "Accountant", department: "Finance", type: "admin", phone: "08078901234", email: "accounts@promiseacademy.edu.ng", joined: "2017-03-01", status: "active" },
    { id: "STF008", name: "Mr. Femi Solanke", role: "ICT Teacher", department: "Secondary", type: "teaching", phone: "08089012345", email: "femi.solanke@promiseacademy.edu.ng", joined: "2021-01-04", status: "active", subjects: ["Computer Science", "ICT"], classes: ["jss1", "jss2", "jss3"] },
    { id: "STF009", name: "Mallam Usman Danpullo", role: "Security Officer", department: "Operations", type: "nonteaching", phone: "08090123456", email: "security@promiseacademy.edu.ng", joined: "2019-06-01", status: "active" },
    { id: "STF010", name: "Mrs. Nkechi Okafor", role: "School Nurse", department: "Health", type: "nonteaching", phone: "08001234567", email: "nurse@promiseacademy.edu.ng", joined: "2020-01-13", status: "active" }
  ],

  // ── SUBJECTS ──────────────────────────────────────────────────
  subjects: {
    nursery: ["Letter Recognition", "Number Work", "Rhymes & Songs", "Arts & Craft", "Social Habits", "Physical Education"],
    primary: ["English Language", "Mathematics", "Basic Science", "Social Studies", "Civic Education", "Christian Religious Studies / Islamic Studies", "Cultural & Creative Arts", "Physical & Health Education", "Agricultural Science", "Computer Studies"],
    secondary_jss: ["English Language", "Mathematics", "Basic Science & Technology", "Social Studies", "Civic Education", "Christian Religious Studies / Islamic Studies", "Cultural & Creative Arts", "Physical & Health Education", "Computer Science", "French", "Igbo / Hausa / Yoruba"],
    secondary_ss: ["English Language", "Mathematics", "Economics", "Government", "Literature in English", "Physics", "Chemistry", "Biology", "Geography", "Agricultural Science", "Computer Science", "Commerce", "Accounting", "Further Mathematics"]
  },

  // ── FEES ──────────────────────────────────────────────────────
  feeStructure: {
    nursery: { tuition: 85000, registration: 15000, examination: 5000, books: 12000, uniform: 8500, total: 125500 },
    primary: { tuition: 95000, registration: 15000, examination: 7500, books: 14000, uniform: 8500, total: 140000 },
    secondary: { tuition: 120000, registration: 20000, examination: 10000, books: 18000, uniform: 10000, total: 178000 }
  },

  payments: [
    { id: "PAY001", studentId: "STU001", feeType: "tuition", amount: 120000, method: "Bank Transfer", date: "2025-01-10", status: "paid", receiptNo: "REC/2025/001" },
    { id: "PAY002", studentId: "STU002", feeType: "tuition", amount: 120000, method: "Online Payment", date: "2025-01-12", status: "paid", receiptNo: "REC/2025/002" },
    { id: "PAY003", studentId: "STU003", feeType: "tuition", amount: 95000, method: "Cash", date: "2025-01-15", status: "paid", receiptNo: "REC/2025/003" },
    { id: "PAY004", studentId: "STU004", feeType: "tuition", amount: 0, method: "-", date: "-", status: "pending", receiptNo: null },
    { id: "PAY005", studentId: "STU005", feeType: "tuition", amount: 85000, method: "POS", date: "2025-01-08", status: "paid", receiptNo: "REC/2025/005" },
    { id: "PAY006", studentId: "STU006", feeType: "tuition", amount: 60000, method: "Bank Transfer", date: "2025-01-20", status: "partial", receiptNo: "REC/2025/006" },
    { id: "PAY007", studentId: "STU007", feeType: "tuition", amount: 95000, method: "Online Payment", date: "2025-01-09", status: "paid", receiptNo: "REC/2025/007" },
    { id: "PAY008", studentId: "STU008", feeType: "tuition", amount: 120000, method: "Bank Transfer", date: "2025-01-11", status: "paid", receiptNo: "REC/2025/008" }
  ],

  // ── ATTENDANCE ────────────────────────────────────────────────
  attendance: {
    today: { present: 798, absent: 31, late: 13, total: 842 },
    weekly: [
      { day: "Mon", present: 810, absent: 20, late: 12 },
      { day: "Tue", present: 805, absent: 24, late: 13 },
      { day: "Wed", present: 798, absent: 31, late: 13 },
      { day: "Thu", present: 822, absent: 12, late: 8 },
      { day: "Fri", present: 815, absent: 18, late: 9 }
    ],
    monthly: {
      percentage: 94.7,
      totalDays: 22,
      presentDays: 795
    }
  },

  // ── ADMISSIONS ────────────────────────────────────────────────
  admissions: [
    { id: "APP001", applicantName: "Chiamaka Osei", section: "primary", class: "Primary 3", parentName: "Mr. Kwame Osei", phone: "08032456789", date: "2025-01-20", status: "pending" },
    { id: "APP002", applicantName: "Ridwan Balogun", section: "secondary", class: "JSS 1", parentName: "Mrs. Kemi Balogun", phone: "08043567890", date: "2025-01-22", status: "approved" },
    { id: "APP003", applicantName: "Tobenna Eze", section: "nursery", class: "Nursery 1", parentName: "Dr. Ugochukwu Eze", phone: "08054678901", date: "2025-01-25", status: "pending" },
    { id: "APP004", applicantName: "Aminat Lawal", section: "primary", class: "Primary 6", parentName: "Alhaji Mustapha Lawal", phone: "08065789012", date: "2025-01-28", status: "review" },
    { id: "APP005", applicantName: "Samuel Udoh", section: "secondary", class: "SS 1 Science", parentName: "Mrs. Helen Udoh", phone: "08076890123", date: "2025-02-01", status: "rejected" }
  ],

  // ── RESULTS ───────────────────────────────────────────────────
  results: {
    "STU001": {
      session: "2024/2025", term: "Second Term",
      studentId: "STU001", classId: "jss2", section: "secondary",
      subjects: [
        { name: "Mathematics", ca: 28, exam: 60, total: 88, grade: "A", remark: "Excellent" },
        { name: "English Language", ca: 25, exam: 55, total: 80, grade: "A", remark: "Very Good" },
        { name: "Basic Science & Technology", ca: 26, exam: 58, total: 84, grade: "A", remark: "Excellent" },
        { name: "Social Studies", ca: 22, exam: 50, total: 72, grade: "B", remark: "Good" },
        { name: "Computer Science", ca: 29, exam: 62, total: 91, grade: "A", remark: "Outstanding" },
        { name: "Cultural & Creative Arts", ca: 27, exam: 56, total: 83, grade: "A", remark: "Excellent" },
        { name: "Civic Education", ca: 24, exam: 48, total: 72, grade: "B", remark: "Good" },
        { name: "Physical & Health Education", ca: 30, exam: 65, total: 95, grade: "A", remark: "Outstanding" }
      ],
      attendance: { present: 52, absent: 3, total: 55 },
      position: 2,
      totalStudents: 38,
      average: 83.1,
      teacherRemark: "Adaeze is a diligent and intelligent student. She should maintain this excellent performance.",
      principalRemark: "Outstanding performance. We encourage her to aim for the top position next term."
    }
  },

  // ── TIMETABLE ─────────────────────────────────────────────────
  timetable: {
    jss2a: {
      Monday: ["Mathematics", "English Language", "Basic Science", "Social Studies", "BREAK", "Computer Science", "CRS", "Physical Education"],
      Tuesday: ["English Language", "Mathematics", "French", "Civic Education", "BREAK", "Cultural Arts", "Social Studies", "Library"],
      Wednesday: ["Basic Science", "Mathematics", "English Language", "Computer Science", "BREAK", "French", "CRS", "Games"],
      Thursday: ["Social Studies", "English Language", "Mathematics", "Civic Education", "BREAK", "Basic Science", "Cultural Arts", "P.H.E"],
      Friday: ["Mathematics", "English Language", "Computer Science", "Assembly", "BREAK", "French", "Sports", "Closing"]
    }
  },

  // ── NOTIFICATIONS ─────────────────────────────────────────────
  notifications: [
    { id: "N001", type: "fee", title: "Fee Reminder", message: "Second term fees due for 47 students", time: "2 hours ago", read: false, icon: "💰" },
    { id: "N002", type: "admission", title: "New Application", message: "New admission application from Chiamaka Osei for Primary 3", time: "5 hours ago", read: false, icon: "📋" },
    { id: "N003", type: "attendance", title: "Low Attendance Alert", message: "JSS 2A has attendance below 80% this week", time: "Yesterday", read: false, icon: "📊" },
    { id: "N004", type: "result", title: "Result Published", message: "First term results are now available for Secondary section", time: "2 days ago", read: true, icon: "📄" },
    { id: "N005", type: "general", title: "Staff Meeting", message: "Staff meeting scheduled for Friday 14th Feb, 12:00 PM", time: "3 days ago", read: true, icon: "📢" }
  ],

  // ── GRADING SYSTEM ────────────────────────────────────────────
  gradingSystem: {
    primary: [
      { min: 75, max: 100, grade: "A", remark: "Excellent" },
      { min: 65, max: 74, grade: "B", remark: "Very Good" },
      { min: 55, max: 64, grade: "C", remark: "Good" },
      { min: 45, max: 54, grade: "D", remark: "Pass" },
      { min: 0, max: 44, grade: "F", remark: "Fail" }
    ],
    secondary: [
      { min: 75, max: 100, grade: "A1", remark: "Excellent" },
      { min: 70, max: 74, grade: "B2", remark: "Very Good" },
      { min: 65, max: 69, grade: "B3", remark: "Good" },
      { min: 60, max: 64, grade: "C4", remark: "Credit" },
      { min: 55, max: 59, grade: "C5", remark: "Credit" },
      { min: 50, max: 54, grade: "C6", remark: "Credit" },
      { min: 45, max: 49, grade: "D7", remark: "Pass" },
      { min: 40, max: 44, grade: "E8", remark: "Pass" },
      { min: 0, max: 39, grade: "F9", remark: "Fail" }
    ]
  },

  // ── DASHBOARD STATS (Section-filtered) ────────────────────────
  dashboardStats: {
    all: {
      totalStudents: 842,
      nursery: 164,
      primary: 421,
      secondary: 257,
      staff: 48,
      pendingAdmissions: 5,
      outstandingFees: "₦4,280,000",
      todayAttendance: "94.8%"
    },
    nursery: {
      totalStudents: 164,
      classes: 6,
      staff: 9,
      pendingAdmissions: 1,
      outstandingFees: "₦680,000",
      todayAttendance: "96.3%"
    },
    primary: {
      totalStudents: 421,
      classes: 18,
      staff: 22,
      pendingAdmissions: 3,
      outstandingFees: "₦1,890,000",
      todayAttendance: "95.1%"
    },
    secondary: {
      totalStudents: 257,
      classes: 15,
      staff: 17,
      pendingAdmissions: 1,
      outstandingFees: "₦1,710,000",
      todayAttendance: "92.6%"
    }
  },

  // ── PAYROLL ────────────────────────────────────────────────────
  payroll: [
    { staffId: "STF001", name: "Mr. Olawale Adediran", role: "Principal", basic: 280000, allowances: 85000, deductions: 28000, net: 337000, status: "paid", date: "2025-01-31" },
    { staffId: "STF002", name: "Mrs. Adunola Bakare", role: "Vice Principal", basic: 220000, allowances: 65000, deductions: 22000, net: 263000, status: "paid", date: "2025-01-31" },
    { staffId: "STF003", name: "Mr. Chukwuemeka Obieze", role: "Teacher", basic: 150000, allowances: 35000, deductions: 15000, net: 170000, status: "paid", date: "2025-01-31" },
    { staffId: "STF004", name: "Mrs. Taiwo Akinwande", role: "Teacher", basic: 140000, allowances: 30000, deductions: 14000, net: 156000, status: "paid", date: "2025-01-31" },
    { staffId: "STF005", name: "Mr. Biodun Olatunji", role: "Teacher", basic: 145000, allowances: 32000, deductions: 14500, net: 162500, status: "pending", date: "-" },
    { staffId: "STF007", name: "Mrs. Chidinma Eze", role: "Accountant", basic: 130000, allowances: 28000, deductions: 13000, net: 145000, status: "paid", date: "2025-01-31" }
  ]
};

// ── HELPER FUNCTIONS ──────────────────────────────────────────

function getStudent(id) {
  return PA_DATA.students.find(s => s.id === id);
}

function getParent(id) {
  return PA_DATA.parents.find(p => p.id === id);
}

function getClass(id) {
  return PA_DATA.classes.find(c => c.id === id);
}

function getStaff(id) {
  return PA_DATA.staff.find(s => s.id === id);
}

function getStudentsBySection(section) {
  if (!section || section === 'all') return PA_DATA.students;
  return PA_DATA.students.filter(s => s.section === section);
}

function getStudentsByClass(classId) {
  return PA_DATA.students.filter(s => s.classId === classId);
}

function getClassName(classId) {
  const cls = getClass(classId);
  return cls ? cls.name : classId;
}

function getSectionName(sectionId) {
  const sec = PA_DATA.sections.find(s => s.id === sectionId);
  return sec ? sec.name : sectionId;
}

function getGrade(score, section) {
  const system = section === 'secondary' ? PA_DATA.gradingSystem.secondary : PA_DATA.gradingSystem.primary;
  const grade = system.find(g => score >= g.min && score <= g.max);
  return grade || { grade: 'F', remark: 'Fail' };
}

function formatCurrency(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === '-') return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' });
}

function initLocalStorage() {
  if (!localStorage.getItem('pa_students')) {
    localStorage.setItem('pa_students', JSON.stringify(PA_DATA.students));
  }
  if (!localStorage.getItem('pa_attendance')) {
    localStorage.setItem('pa_attendance', JSON.stringify({}));
  }
  if (!localStorage.getItem('pa_admissions')) {
    localStorage.setItem('pa_admissions', JSON.stringify(PA_DATA.admissions));
  }
}

// Initialize on load
initLocalStorage();
