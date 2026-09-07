/* ============================================================
   PROMISE ACADEMY — DASHBOARD JS
   API NOTE: All data functions marked [API] should be replaced
   with fetch() calls to Django REST endpoints.
   ============================================================ */

(function () {
  'use strict';

  let currentSection = 'all';

  // ── DASHBOARD STATS ────────────────────────────────────────────
  // [API] Replace with: GET /api/dashboard/stats/?section=all
  function loadDashboardStats(section) {
    const stats = PA_DATA.dashboardStats;
    const data = section === 'all' ? stats.all : stats[section] || stats.all;

    if (section === 'all') {
      setValue('stat-total', data.totalStudents.toLocaleString());
      setValue('stat-nursery', data.nursery.toLocaleString());
      setValue('stat-primary', data.primary.toLocaleString());
      setValue('stat-secondary', data.secondary.toLocaleString());
      setValue('stat-staff', data.staff.toLocaleString());
      setValue('stat-pending', data.pendingAdmissions.toLocaleString());
      setValue('stat-fees', data.outstandingFees);
      setValue('stat-attendance', data.todayAttendance);
    } else {
      setValue('stat-total', data.totalStudents.toLocaleString());
      setValue('stat-nursery', section === 'nursery' ? data.totalStudents.toLocaleString() : '—');
      setValue('stat-primary', section === 'primary' ? data.totalStudents.toLocaleString() : '—');
      setValue('stat-secondary', section === 'secondary' ? data.totalStudents.toLocaleString() : '—');
      setValue('stat-staff', (data.staff || '—').toString());
      setValue('stat-pending', (data.pendingAdmissions || 0).toLocaleString());
      setValue('stat-fees', data.outstandingFees || '—');
      setValue('stat-attendance', data.todayAttendance || '—');
    }

    updateSectionLabel(section);
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function updateSectionLabel(section) {
    const label = section === 'all' ? 'All Sections'
      : section.charAt(0).toUpperCase() + section.slice(1) + ' Section';
    const el = document.getElementById('currentSectionLabel');
    if (el) el.textContent = label;
    const badge = document.getElementById('sectionBadge');
    if (badge) badge.textContent = label;
  }

  // ── RECENT STUDENTS TABLE ──────────────────────────────────────
  // [API] Replace with: GET /api/students/?section=all&limit=8&ordering=-admission_date
  function loadRecentStudents(section) {
    const tbody = document.getElementById('recentStudentsBody');
    if (!tbody) return;

    const students = section === 'all'
      ? PA_DATA.students.slice(0, 8)
      : PA_DATA.students.filter(s => s.section === section).slice(0, 8);

    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);">No students found for this section</td></tr>`;
      return;
    }

    tbody.innerHTML = students.map(s => {
      const cls = getClass(s.classId);
      const parent = getParent(s.parentId);
      const initials = s.name.split(' ').map(n => n[0]).join('').slice(0, 2);
      return `
        <tr>
          <td>
            <div class="student-cell">
              <div class="avatar-placeholder avatar-sm" style="background: var(--primary-ghost); color: var(--primary-color); font-size: 12px; font-weight: 700;">
                ${initials}
              </div>
              <div class="student-cell-info">
                <div class="student-cell-name">${s.name}</div>
                <div class="student-cell-id">${s.id}</div>
              </div>
            </div>
          </td>
          <td><span class="badge ${s.gender === 'Male' ? 'badge-info' : 'badge-secondary'}">${s.gender}</span></td>
          <td><span class="badge badge-${getSectionBadgeClass(s.section)}">${getSectionName(s.section)}</span></td>
          <td>${cls ? cls.name : s.classId}</td>
          <td>${parent ? parent.name : '—'}</td>
          <td>
            <span class="badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'} badge-dot">
              ${s.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td>
            <div class="action-btns">
              <button class="action-btn view" onclick="window.location='pages/student-profile.html?id=${s.id}'" title="View">👁</button>
              <button class="action-btn edit" onclick="editStudent('${s.id}')" title="Edit">✏️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function getSectionBadgeClass(section) {
    return { nursery: 'secondary', primary: 'primary', secondary: 'gray' }[section] || 'gray';
  }

  // ── ATTENDANCE CHART ───────────────────────────────────────────
  // [API] Replace with: GET /api/attendance/weekly/?section=all
  function renderAttendanceChart() {
    const chartEl = document.getElementById('attendanceChart');
    if (!chartEl) return;

    const data = PA_DATA.attendance.weekly;
    const max = Math.max(...data.map(d => d.present + d.absent + d.late));

    chartEl.innerHTML = data.map(day => {
      const total = day.present + day.absent + day.late;
      const presentH = Math.round((day.present / max) * 180);
      const absentH = Math.round((day.absent / max) * 180);
      const lateH = Math.round((day.late / max) * 180);

      return `
        <div class="chart-bar-group" title="${day.day}: Present ${day.present}, Absent ${day.absent}, Late ${day.late}">
          <div style="display: flex; align-items: flex-end; gap: 3px; height: 180px;">
            <div class="chart-bar" style="height: ${presentH}px; background: var(--primary-color); width: 16px; border-radius: 3px 3px 0 0;"></div>
            <div class="chart-bar" style="height: ${absentH}px; background: var(--danger-color); width: 16px; border-radius: 3px 3px 0 0;"></div>
            <div class="chart-bar" style="height: ${lateH}px; background: var(--warning-color); width: 16px; border-radius: 3px 3px 0 0;"></div>
          </div>
          <span class="chart-label">${day.day}</span>
        </div>
      `;
    }).join('');
  }

  // ── SECTION BREAKDOWN DONUT ────────────────────────────────────
  function renderSectionDonut() {
    const el = document.getElementById('sectionDonut');
    if (!el) return;

    const stats = PA_DATA.dashboardStats.all;
    const total = stats.totalStudents;
    const segments = [
      { label: 'Nursery', value: stats.nursery, color: '#00897b' },
      { label: 'Primary', value: stats.primary, color: '#1e5c1e' },
      { label: 'Secondary', value: stats.secondary, color: '#c8960f' }
    ];

    const r = 50; const cx = 60; const cy = 60;
    let offset = 0;
    const circumference = 2 * Math.PI * r;

    const paths = segments.map(seg => {
      const pct = seg.value / total;
      const dashLen = pct * circumference;
      const dash = `${dashLen} ${circumference - dashLen}`;
      const rotation = (offset / total) * 360 - 90;
      offset += seg.value;
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
        stroke="${seg.color}" stroke-width="16"
        stroke-dasharray="${dash}" stroke-dashoffset="0"
        transform="rotate(${rotation} ${cx} ${cy})" />`;
    }).join('');

    el.innerHTML = `
      <div class="donut-chart">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-light)" stroke-width="16"/>
          ${paths}
        </svg>
        <div class="donut-center">
          <span class="donut-value">${total.toLocaleString()}</span>
          <span class="donut-label">Students</span>
        </div>
      </div>
      <div style="flex: 1; min-width: 0;">
        ${segments.map(s => `
          <div style="display:flex; align-items:center; gap: 10px; margin-bottom: 12px;">
            <div style="width:12px; height:12px; border-radius:50%; background: ${s.color}; flex-shrink:0;"></div>
            <div style="flex:1;">
              <div style="font-size:13px; font-weight:600; color: var(--text-primary);">${s.label}</div>
              <div style="font-size:12px; color: var(--text-muted);">${s.value.toLocaleString()} students</div>
            </div>
            <div style="font-size:13px; font-weight:700; color: var(--text-secondary);">
              ${Math.round((s.value/total)*100)}%
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── RECENT ACTIVITY ────────────────────────────────────────────
  // [API] Replace with: GET /api/activity/?limit=6
  function loadRecentActivity() {
    const el = document.getElementById('activityFeed');
    if (!el) return;

    const activities = [
      { icon: '🎓', text: 'New student <strong>Chiamaka Osei</strong> admitted to Primary 3', time: '2 hours ago', color: '#1e5c1e' },
      { icon: '💰', text: 'Fee payment of <strong>₦120,000</strong> received from Okonkwo family', time: '3 hours ago', color: '#c8960f' },
      { icon: '📊', text: 'Second term attendance report generated for JSS 2', time: '5 hours ago', color: '#0277bd' },
      { icon: '📝', text: 'Result entry completed for <strong>SS 2 Science</strong>', time: 'Yesterday', color: '#2e7d32' },
      { icon: '📋', text: 'New admission application received from <strong>Ridwan Balogun</strong>', time: 'Yesterday', color: '#f57c00' },
      { icon: '👥', text: 'Staff payroll processed for January 2025', time: '2 days ago', color: '#00897b' }
    ];

    el.innerHTML = activities.map(a => `
      <div class="activity-item">
        <div class="activity-dot" style="background: ${a.color};"></div>
        <div class="activity-content">
          <div class="activity-text">${a.icon} ${a.text}</div>
          <div class="activity-time">${a.time}</div>
        </div>
      </div>
    `).join('');
  }

  // ── PENDING ADMISSIONS ─────────────────────────────────────────
  // [API] Replace with: GET /api/admissions/?status=pending&limit=5
  function loadPendingAdmissions() {
    const el = document.getElementById('pendingAdmissionsBody');
    if (!el) return;

    const pending = PA_DATA.admissions.filter(a => a.status === 'pending' || a.status === 'review');
    el.innerHTML = pending.map(a => {
      const statusClass = a.status === 'pending' ? 'badge-warning' : 'badge-info';
      return `
        <tr>
          <td><strong style="font-size: 12px; color: var(--text-muted);">${a.id}</strong></td>
          <td><strong>${a.applicantName}</strong></td>
          <td><span class="badge badge-gray">${a.section.charAt(0).toUpperCase() + a.section.slice(1)}</span></td>
          <td>${a.class}</td>
          <td>${formatDate(a.date)}</td>
          <td><span class="badge ${statusClass} badge-dot">${a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span></td>
          <td>
            <div class="action-btns">
              <button class="action-btn view" onclick="window.location='pages/admissions.html'" title="Review">👁</button>
            </div>
          </td>
        </tr>
      `;
    }).join('') || `<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text-muted);">No pending admissions</td></tr>`;
  }

  // ── FEE COLLECTION SUMMARY ─────────────────────────────────────
  // [API] Replace with: GET /api/finance/summary/?term=current
  function loadFeeSummary() {
    const total = 14850000;
    const collected = 10570000;
    const outstanding = total - collected;
    const pct = Math.round((collected / total) * 100);

    setValue('fee-total', '₦' + total.toLocaleString());
    setValue('fee-collected', '₦' + collected.toLocaleString());
    setValue('fee-outstanding', '₦' + outstanding.toLocaleString());
    setValue('fee-pct', pct + '%');

    const bar = document.getElementById('feeProgressBar');
    if (bar) bar.style.width = pct + '%';
  }

  // ── SECTION CHANGE EVENT ───────────────────────────────────────
  document.addEventListener('sectionChange', function (e) {
    currentSection = e.detail.section;
    loadDashboardStats(currentSection);
    loadRecentStudents(currentSection);
  });

  // ── QUICK ACTION: ADD STUDENT ──────────────────────────────────
  window.editStudent = function (id) {
    window.location.href = 'pages/students.html?edit=' + id;
  };

  // ── INIT ───────────────────────────────────────────────────────
  function init() {
    loadDashboardStats('all');
    loadRecentStudents('all');
    renderAttendanceChart();
    renderSectionDonut();
    loadRecentActivity();
    loadPendingAdmissions();
    loadFeeSummary();

    // Date display
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-NG', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    }

    // Unread notification badge
    const unread = PA_DATA.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notifBadge');
    if (badge) badge.textContent = unread;
  }

  init();

})();
