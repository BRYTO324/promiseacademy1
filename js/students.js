/* ============================================================
   PROMISE ACADEMY — STUDENTS JS
   [API] marks functions to replace with Django REST calls
   ============================================================ */

(function () {
  'use strict';

  let allStudents = [];
  let currentPage = 1;
  const pageSize = 10;
  let filteredStudents = [];

  // [API] GET /api/students/?section=&class=&gender=&status=&search=&page=
  function loadStudents() {
    allStudents = JSON.parse(localStorage.getItem('pa_students') || JSON.stringify(PA_DATA.students));
    applyFilters();
  }

  function applyFilters() {
    const section = document.getElementById('filterSection')?.value || '';
    const classFilter = document.getElementById('filterClass')?.value || '';
    const gender = document.getElementById('filterGender')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';
    const search = document.getElementById('searchStudents')?.value?.toLowerCase() || '';

    filteredStudents = allStudents.filter(s => {
      if (section && s.section !== section) return false;
      if (classFilter && s.classId !== classFilter) return false;
      if (gender && s.gender !== gender) return false;
      if (status && s.status !== status) return false;
      if (search && !s.name.toLowerCase().includes(search) && !s.id.toLowerCase().includes(search)) return false;
      return true;
    });

    currentPage = 1;
    renderTable();
    renderPagination();
    updateCount();
  }

  function renderTable() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;

    const start = (currentPage - 1) * pageSize;
    const page = filteredStudents.slice(start, start + pageSize);

    if (page.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9">
            <div class="empty-state" style="padding: 40px;">
              <div class="empty-state-icon">🎓</div>
              <div class="empty-state-title">No students found</div>
              <div class="empty-state-desc">Try adjusting your filters or add a new student.</div>
              <button class="btn btn-primary" onclick="openAddStudentModal()">+ Add Student</button>
            </div>
          </td>
        </tr>`;
      return;
    }

    tbody.innerHTML = page.map(s => {
      const cls = getClass(s.classId);
      const parent = getParent(s.parentId);
      const initials = s.name.split(' ').map(n => n[0]).join('').slice(0, 2);
      const sectionColors = { nursery: '#00897b', primary: '#1e5c1e', secondary: '#c8960f' };
      return `
        <tr data-id="${s.id}">
          <td>
            <div class="student-cell">
              <div class="avatar-placeholder avatar-sm" style="background:${sectionColors[s.section]}1a; color:${sectionColors[s.section]}; font-weight:700; font-size:11px;">
                ${initials}
              </div>
              <div class="student-cell-info">
                <div class="student-cell-name">${s.name}</div>
                <div class="student-cell-id">${s.admissionNo}</div>
              </div>
            </div>
          </td>
          <td style="font-size:12px; color:var(--text-muted); font-weight:600;">${s.id}</td>
          <td><span class="badge ${s.gender === 'Male' ? 'badge-info' : 'badge-secondary'}">${s.gender}</span></td>
          <td>
            <span class="badge" style="background:${sectionColors[s.section]}1a; color:${sectionColors[s.section]}">
              ${getSectionName(s.section)}
            </span>
          </td>
          <td>${cls ? cls.name : s.classId} ${s.arm ? s.arm : ''}</td>
          <td>
            <div style="font-size:13px;">${parent ? parent.name : '—'}</div>
            <div style="font-size:11px;color:var(--text-muted);">${parent ? parent.phone : ''}</div>
          </td>
          <td style="font-size:12px;">${formatDate(s.admissionDate)}</td>
          <td>
            <span class="badge badge-dot ${s.status === 'active' ? 'badge-success' : 'badge-danger'}">
              ${s.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td>
            <div class="action-btns">
              <button class="action-btn view" onclick="viewStudent('${s.id}')" title="View Profile">👁</button>
              <button class="action-btn edit" onclick="openEditModal('${s.id}')" title="Edit">✏️</button>
              <button class="action-btn print" onclick="window.location='report-card.html?student=${s.id}'" title="Report Card">📄</button>
              <button class="action-btn delete" onclick="deleteStudent('${s.id}')" title="Delete">🗑</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredStudents.length / pageSize);
    const el = document.getElementById('pagination');
    if (!el) return;

    if (totalPages <= 1) { el.innerHTML = ''; return; }

    let html = `<button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>`;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
      } else if (Math.abs(i - currentPage) === 2) {
        html += `<span style="display:flex;align-items:center;padding:0 4px;color:var(--text-muted);">…</span>`;
      }
    }

    html += `<button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>›</button>`;
    el.innerHTML = html;
  }

  window.goPage = function (page) {
    const totalPages = Math.ceil(filteredStudents.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
    renderPagination();
  };

  function updateCount() {
    const el = document.getElementById('studentCount');
    if (el) el.textContent = `${filteredStudents.length} student${filteredStudents.length !== 1 ? 's' : ''}`;
  }

  // ── VIEW STUDENT ──────────────────────────────────────────────
  window.viewStudent = function (id) {
    window.location.href = 'student-profile.html?id=' + id;
  };

  // ── SECTION FILTER ────────────────────────────────────────────
  document.addEventListener('sectionChange', function (e) {
    const select = document.getElementById('filterSection');
    if (select) {
      select.value = e.detail.section === 'all' ? '' : e.detail.section;
      applyFilters();
    }
  });

  // ── ADD/EDIT STUDENT MODAL ────────────────────────────────────
  window.openAddStudentModal = function () {
    resetForm();
    document.getElementById('modalTitle').textContent = 'Add New Student';
    openModal('studentModal');
  };

  window.openEditModal = function (id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;
    populateForm(student);
    document.getElementById('modalTitle').textContent = 'Edit Student';
    document.getElementById('editStudentId').value = id;
    openModal('studentModal');
  };

  function resetForm() {
    const form = document.getElementById('studentForm');
    if (form) form.reset();
    document.getElementById('editStudentId').value = '';
  }

  function populateForm(student) {
    setValue2('inputName', student.name);
    setValue2('inputDOB', student.dob);
    setValue2('inputGender', student.gender);
    setValue2('inputSection', student.section);
    updateClassOptions(student.section);
    setValue2('inputClass', student.classId);
    setValue2('inputArm', student.arm);
    setValue2('inputStatus', student.status);
    setValue2('inputAdmissionDate', student.admissionDate);
    setValue2('inputAdmissionNo', student.admissionNo);
    setValue2('editStudentId', student.id);
  }

  function setValue2(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  function updateClassOptions(section) {
    const classSelect = document.getElementById('inputClass');
    if (!classSelect) return;
    const classes = PA_DATA.classes.filter(c => !section || c.section === section);
    classSelect.innerHTML = '<option value="">Select Class</option>' +
      classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }

  // Section change in form
  const sectionInput = document.getElementById('inputSection');
  if (sectionInput) {
    sectionInput.addEventListener('change', function () {
      updateClassOptions(this.value);
    });
  }

  // ── SAVE STUDENT ──────────────────────────────────────────────
  // [API] POST /api/students/ (add) or PATCH /api/students/{id}/ (edit)
  const studentForm = document.getElementById('studentForm');
  if (studentForm) {
    studentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm('studentForm')) return;

      const editId = document.getElementById('editStudentId')?.value;
      const name = document.getElementById('inputName')?.value;
      const gender = document.getElementById('inputGender')?.value;
      const section = document.getElementById('inputSection')?.value;
      const classId = document.getElementById('inputClass')?.value;
      const arm = document.getElementById('inputArm')?.value;
      const dob = document.getElementById('inputDOB')?.value;
      const status = document.getElementById('inputStatus')?.value || 'active';
      const admissionDate = document.getElementById('inputAdmissionDate')?.value;

      const students = JSON.parse(localStorage.getItem('pa_students') || JSON.stringify(PA_DATA.students));

      if (editId) {
        const idx = students.findIndex(s => s.id === editId);
        if (idx > -1) {
          students[idx] = { ...students[idx], name, gender, section, classId, arm, dob, status, admissionDate };
          showToast('Student Updated', `${name}'s record has been updated.`, 'success');
        }
      } else {
        const newId = 'STU' + String(students.length + 1).padStart(3, '0');
        const admNo = `PA/${new Date().getFullYear()}/${String(students.length + 1).padStart(3, '0')}`;
        students.push({ id: newId, name, gender, section, classId, arm, dob, status, admissionDate: admissionDate || new Date().toISOString().split('T')[0], admissionNo: admNo, parentId: null });
        showToast('Student Added', `${name} has been enrolled successfully.`, 'success');
      }

      localStorage.setItem('pa_students', JSON.stringify(students));
      closeModal('studentModal');
      loadStudents();
    });
  }

  // ── DELETE STUDENT ────────────────────────────────────────────
  // [API] DELETE /api/students/{id}/
  window.deleteStudent = function (id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;
    confirmAction(`Are you sure you want to remove ${student.name} from the system? This action cannot be undone.`,
      () => {
        const students = JSON.parse(localStorage.getItem('pa_students') || JSON.stringify(PA_DATA.students));
        const updated = students.filter(s => s.id !== id);
        localStorage.setItem('pa_students', JSON.stringify(updated));
        showToast('Student Removed', `${student.name}'s record has been deleted.`, 'warning');
        loadStudents();
      },
      'Remove Student'
    );
  };

  // ── FILTER EVENTS ─────────────────────────────────────────────
  ['filterSection', 'filterClass', 'filterGender', 'filterStatus'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  const searchInput = document.getElementById('searchStudents');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(this._debounce);
      this._debounce = setTimeout(applyFilters, 250);
    });
  }

  // ── CHECK URL PARAMS ──────────────────────────────────────────
  function checkParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('add') === '1') {
      openAddStudentModal();
    }
    if (params.get('section')) {
      const select = document.getElementById('filterSection');
      if (select) { select.value = params.get('section'); applyFilters(); }
    }
  }

  loadStudents();
  checkParams();

})();
