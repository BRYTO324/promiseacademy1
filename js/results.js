/* ============================================================
   PROMISE ACADEMY — RESULTS / EXAMINATIONS JS
   [API] marks functions to replace with Django REST calls
   ============================================================ */
(function () {
  'use strict';

  // ── GRADE CALCULATOR ─────────────────────────────────────────
  window.calculateGrade = function(score, section) {
    return getGrade(score, section);
  };

  // ── RESULT ENTRY ─────────────────────────────────────────────
  let currentResults = {}; // { studentId: { subjectName: { ca, exam } } }

  // [API] GET /api/results/?class=&session=&term=
  function loadResultEntry() {
    const classId = document.getElementById('resClass')?.value;
    const session = document.getElementById('resSession')?.value;
    const term = document.getElementById('resTerm')?.value;

    if (!classId) {
      const container = document.getElementById('resultEntryContainer');
      if (container) container.innerHTML = `<div class="empty-state" style="padding:60px;"><div class="empty-state-icon">📝</div><div class="empty-state-title">Select a Class</div><div class="empty-state-desc">Choose a class to begin entering results.</div></div>`;
      return;
    }

    const students = PA_DATA.students.filter(s => s.classId === classId);
    const cls = getClass(classId);
    if (!cls) return;

    const subjects = cls.section === 'nursery' ? PA_DATA.subjects.nursery
      : cls.section === 'primary' ? PA_DATA.subjects.primary
      : cls.name.startsWith('SS') ? PA_DATA.subjects.secondary_ss
      : PA_DATA.subjects.secondary_jss;

    renderResultEntryForm(students, subjects, cls.section);
  }

  function renderResultEntryForm(students, subjects, section) {
    const container = document.getElementById('resultEntryContainer');
    if (!container) return;

    const isNurseryPrimary = section !== 'secondary';
    const maxCA = isNurseryPrimary ? 30 : 30;
    const maxExam = isNurseryPrimary ? 70 : 70;

    container.innerHTML = `
      <div style="overflow-x:auto;">
        <table class="table" style="font-size:13px;">
          <thead>
            <tr>
              <th style="position:sticky;left:0;background:var(--primary-ghost);min-width:160px;">Student</th>
              ${subjects.map(s => `
                <th style="text-align:center;min-width:120px;">
                  <div style="font-size:10px;">${s}</div>
                  <div style="font-size:9px;color:var(--text-muted);font-weight:normal;">CA(${maxCA}) · Exam(${maxExam})</div>
                </th>
              `).join('')}
              <th style="text-align:center;min-width:80px;">Total</th>
              <th style="text-align:center;min-width:70px;">Avg</th>
              <th style="text-align:center;min-width:60px;">Pos</th>
            </tr>
          </thead>
          <tbody id="resultEntryBody">
            ${students.map(student => `
              <tr>
                <td style="position:sticky;left:0;background:var(--surface-color);">
                  <div style="font-weight:600;">${student.name}</div>
                  <div style="font-size:11px;color:var(--text-muted);">${student.id}</div>
                </td>
                ${subjects.map(subj => {
                  const saved = currentResults[student.id]?.[subj];
                  return `
                    <td>
                      <div style="display:flex;gap:4px;align-items:center;">
                        <input type="number" min="0" max="${maxCA}" placeholder="CA"
                          value="${saved?.ca||''}"
                          style="width:44px;padding:4px;border:1px solid var(--border-color);border-radius:4px;font-size:12px;text-align:center;"
                          onchange="updateScore('${student.id}','${subj}','ca',this.value,'${section}')" />
                        <input type="number" min="0" max="${maxExam}" placeholder="Exam"
                          value="${saved?.exam||''}"
                          style="width:44px;padding:4px;border:1px solid var(--border-color);border-radius:4px;font-size:12px;text-align:center;"
                          onchange="updateScore('${student.id}','${subj}','exam',this.value,'${section}')" />
                        <span id="total_${student.id}_${subj.replace(/\s/g,'_')}" style="font-size:11px;font-weight:700;color:var(--primary-color);min-width:28px;">
                          ${saved ? saved.ca + saved.exam : '—'}
                        </span>
                      </div>
                    </td>
                  `;
                }).join('')}
                <td style="text-align:center;font-weight:700;" id="rowTotal_${student.id}">—</td>
                <td style="text-align:center;font-size:12px;" id="rowAvg_${student.id}">—</td>
                <td style="text-align:center;font-size:12px;" id="rowPos_${student.id}">—</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Recalculate totals
    students.forEach(s => recalcStudent(s.id, subjects));
  }

  window.updateScore = function(studentId, subject, type, value, section) {
    if (!currentResults[studentId]) currentResults[studentId] = {};
    if (!currentResults[studentId][subject]) currentResults[studentId][subject] = { ca: 0, exam: 0 };
    currentResults[studentId][subject][type] = parseInt(value) || 0;

    const ca = currentResults[studentId][subject].ca;
    const exam = currentResults[studentId][subject].exam;
    const total = ca + exam;
    const gradeInfo = getGrade(total, section);

    const key = subject.replace(/\s/g, '_');
    const totalEl = document.getElementById(`total_${studentId}_${key}`);
    if (totalEl) {
      totalEl.textContent = total;
      totalEl.style.color = total >= 75 ? 'var(--success-color)' : total >= 45 ? 'var(--warning-color)' : 'var(--danger-color)';
    }

    // Recalculate row
    const classId = document.getElementById('resClass')?.value;
    const cls = getClass(classId);
    const subjects = cls?.section === 'primary' ? PA_DATA.subjects.primary : PA_DATA.subjects.secondary_jss;
    recalcStudent(studentId, subjects || []);
  };

  function recalcStudent(studentId, subjects) {
    const data = currentResults[studentId] || {};
    let totalSum = 0;
    let count = 0;
    subjects.forEach(s => {
      const entry = data[s];
      if (entry && (entry.ca || entry.exam)) {
        totalSum += (entry.ca || 0) + (entry.exam || 0);
        count++;
      }
    });
    const avg = count ? Math.round(totalSum / count) : 0;

    const totalEl = document.getElementById('rowTotal_' + studentId);
    if (totalEl) totalEl.textContent = totalSum || '—';
    const avgEl = document.getElementById('rowAvg_' + studentId);
    if (avgEl) avgEl.textContent = avg || '—';
  }

  // [API] POST /api/results/bulk/
  window.saveResults = function() {
    const classId = document.getElementById('resClass')?.value;
    if (!classId) { showToast('Select Class', 'Please select a class first.', 'warning'); return; }
    if (!Object.keys(currentResults).length) { showToast('No Data', 'Please enter some scores first.', 'warning'); return; }

    let savedResults = JSON.parse(localStorage.getItem('pa_results') || '{}');
    const session = document.getElementById('resSession')?.value || '2024/2025';
    const term = document.getElementById('resTerm')?.value || 'Second Term';

    Object.entries(currentResults).forEach(([studentId, subjects]) => {
      const key = `${studentId}_${session}_${term}`;
      savedResults[key] = {
        studentId, session, term, classId,
        subjects: Object.entries(subjects).map(([name, scores]) => {
          const total = (scores.ca||0) + (scores.exam||0);
          const gradeInfo = getGrade(total, getClass(classId)?.section || 'primary');
          return { name, ca: scores.ca||0, exam: scores.exam||0, total, ...gradeInfo };
        })
      };
    });

    localStorage.setItem('pa_results', JSON.stringify(savedResults));
    showToast('Results Saved', 'Results have been saved successfully.', 'success');
    currentResults = {};
  };

  // Events
  ['resClass','resSession','resTerm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', loadResultEntry);
  });

  const sectionEl = document.getElementById('resSection');
  if (sectionEl) {
    sectionEl.addEventListener('change', function() {
      const classSelect = document.getElementById('resClass');
      if (!classSelect) return;
      const classes = PA_DATA.classes.filter(c => !this.value || c.section === this.value);
      classSelect.innerHTML = '<option value="">Select Class</option>' + classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
      loadResultEntry();
    });
  }

  loadResultEntry();
})();
