/* ============================================================
   PROMISE ACADEMY — ATTENDANCE JS
   [API] marks functions to replace with Django REST calls
   ============================================================ */
(function () {
  'use strict';

  let attendanceData = JSON.parse(localStorage.getItem('pa_attendance') || '{}');
  let currentDateStr = new Date().toISOString().split('T')[0];
  let selectedClass = '';
  let selectedSection = '';

  // [API] GET /api/attendance/?date=&class=&section=
  function loadAttendance() {
    const dateEl = document.getElementById('attDate');
    if (dateEl) dateEl.value = currentDateStr;

    const students = getFilteredStudents();
    renderAttendanceForm(students);
    renderAttendanceSummary();
  }

  function getFilteredStudents() {
    const students = JSON.parse(localStorage.getItem('pa_students') || JSON.stringify(PA_DATA.students));
    return students.filter(s => {
      if (selectedSection && s.section !== selectedSection) return false;
      if (selectedClass && s.classId !== selectedClass) return false;
      return true;
    });
  }

  function renderAttendanceForm(students) {
    const container = document.getElementById('attendanceList');
    if (!container) return;

    if (!selectedClass && !selectedSection) {
      container.innerHTML = `<div class="empty-state" style="padding:60px;"><div class="empty-state-icon">📅</div><div class="empty-state-title">Select a Class</div><div class="empty-state-desc">Choose a section and class to mark attendance.</div></div>`;
      return;
    }

    if (!students.length) {
      container.innerHTML = `<div class="empty-state" style="padding:60px;"><div class="empty-state-icon">🎓</div><div class="empty-state-title">No students in this class</div></div>`;
      return;
    }

    const key = `${currentDateStr}_${selectedClass || selectedSection}`;
    const saved = attendanceData[key] || {};

    container.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; padding: var(--space-md) var(--space-xl); border-bottom: 1px solid var(--border-light); background:var(--surface-alt);">
        <div style="display:flex; gap:var(--space-sm);">
          <button class="btn btn-success btn-sm" onclick="markAll('present')">✅ Mark All Present</button>
          <button class="btn btn-warning btn-sm" onclick="markAll('absent')">❌ Mark All Absent</button>
        </div>
        <span style="font-size:13px;color:var(--text-muted);">${students.length} students</span>
      </div>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Student ID</th>
              <th>Class</th>
              <th style="text-align:center;">Present</th>
              <th style="text-align:center;">Absent</th>
              <th style="text-align:center;">Late</th>
              <th style="text-align:center;">Excused</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            ${students.map((s, i) => {
              const status = saved[s.id] || 'present';
              const cls = getClass(s.classId);
              const initials = s.name.split(' ').map(n => n[0]).join('').slice(0,2);
              return `
                <tr id="att-row-${s.id}">
                  <td style="color:var(--text-muted);font-size:12px;">${i+1}</td>
                  <td>
                    <div class="student-cell">
                      <div class="avatar-placeholder avatar-sm" style="background:var(--primary-ghost);color:var(--primary-color);font-size:11px;font-weight:700;">${initials}</div>
                      <span style="font-weight:600;">${s.name}</span>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--text-muted);">${s.id}</td>
                  <td style="font-size:13px;">${cls ? cls.name : s.classId}</td>
                  <td style="text-align:center;"><input type="radio" name="att_${s.id}" value="present" ${status==='present'?'checked':''} onchange="setStatus('${s.id}','present')" style="accent-color:var(--success-color);width:18px;height:18px;" /></td>
                  <td style="text-align:center;"><input type="radio" name="att_${s.id}" value="absent" ${status==='absent'?'checked':''} onchange="setStatus('${s.id}','absent')" style="accent-color:var(--danger-color);width:18px;height:18px;" /></td>
                  <td style="text-align:center;"><input type="radio" name="att_${s.id}" value="late" ${status==='late'?'checked':''} onchange="setStatus('${s.id}','late')" style="accent-color:var(--warning-color);width:18px;height:18px;" /></td>
                  <td style="text-align:center;"><input type="radio" name="att_${s.id}" value="excused" ${status==='excused'?'checked':''} onchange="setStatus('${s.id}','excused')" style="accent-color:var(--info-color);width:18px;height:18px;" /></td>
                  <td><input type="text" class="form-control" style="padding:5px 8px;font-size:12px;" placeholder="Optional remark" value="${saved[s.id+'_remark'] || ''}" oninput="setRemark('${s.id}', this.value)" /></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    renderLiveSummary(students, saved);
  }

  window.setStatus = function(studentId, status) {
    const key = `${currentDateStr}_${selectedClass || selectedSection}`;
    if (!attendanceData[key]) attendanceData[key] = {};
    attendanceData[key][studentId] = status;

    const row = document.getElementById(`att-row-${studentId}`);
    if (row) {
      row.style.background = status === 'present' ? 'rgba(46,125,50,0.04)'
        : status === 'absent' ? 'rgba(198,40,40,0.04)'
        : status === 'late' ? 'rgba(245,124,0,0.04)'
        : 'rgba(2,119,189,0.04)';
    }

    const students = getFilteredStudents();
    renderLiveSummary(students, attendanceData[key]);
  };

  window.setRemark = function(studentId, remark) {
    const key = `${currentDateStr}_${selectedClass || selectedSection}`;
    if (!attendanceData[key]) attendanceData[key] = {};
    attendanceData[key][studentId + '_remark'] = remark;
  };

  window.markAll = function(status) {
    const students = getFilteredStudents();
    const key = `${currentDateStr}_${selectedClass || selectedSection}`;
    if (!attendanceData[key]) attendanceData[key] = {};
    students.forEach(s => {
      attendanceData[key][s.id] = status;
      const radios = document.querySelectorAll(`input[name="att_${s.id}"]`);
      radios.forEach(r => r.checked = r.value === status);
    });
    renderLiveSummary(students, attendanceData[key]);
  };

  function renderLiveSummary(students, saved) {
    const counts = { present: 0, absent: 0, late: 0, excused: 0 };
    students.forEach(s => {
      const status = saved[s.id] || 'present';
      if (counts[status] !== undefined) counts[status]++;
    });
    const total = students.length;
    const pct = total ? Math.round(((counts.present + counts.late) / total) * 100) : 0;

    setValue('sumPresent', counts.present);
    setValue('sumAbsent', counts.absent);
    setValue('sumLate', counts.late);
    setValue('sumExcused', counts.excused);
    setValue('sumPct', pct + '%');
    const bar = document.getElementById('attProgressBar');
    if (bar) bar.style.width = pct + '%';
  }

  function renderAttendanceSummary() {
    const stats = PA_DATA.attendance.today;
    setValue('todayPresent', stats.present);
    setValue('todayAbsent', stats.absent);
    setValue('todayLate', stats.late);
    setValue('todayPct', Math.round((stats.present / stats.total) * 100) + '%');
  }

  function setValue(id, val) {
    const el = document.getElementById(id); if (el) el.textContent = val;
  }

  // [API] POST /api/attendance/bulk/
  window.saveAttendance = function() {
    const key = `${currentDateStr}_${selectedClass || selectedSection}`;
    if (!selectedClass && !selectedSection) {
      showToast('Select Class', 'Please select a class before saving attendance.', 'warning'); return;
    }
    localStorage.setItem('pa_attendance', JSON.stringify(attendanceData));
    showToast('Attendance Saved', 'Attendance has been recorded successfully.', 'success');
  };

  // Filter events
  const sectionEl = document.getElementById('attSection');
  const classEl = document.getElementById('attClass');
  const dateEl = document.getElementById('attDate');

  if (sectionEl) {
    sectionEl.addEventListener('change', function() {
      selectedSection = this.value;
      // Update class options
      if (classEl) {
        const classes = PA_DATA.classes.filter(c => !this.value || c.section === this.value);
        classEl.innerHTML = '<option value="">All Classes</option>' + classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
      }
      selectedClass = '';
      loadAttendance();
    });
  }

  if (classEl) {
    classEl.addEventListener('change', function() {
      selectedClass = this.value;
      loadAttendance();
    });
  }

  if (dateEl) {
    dateEl.addEventListener('change', function() {
      currentDateStr = this.value;
      loadAttendance();
    });
  }

  // Tabs
  document.querySelectorAll('.att-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.att-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.att-pane').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(this.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  loadAttendance();
})();
