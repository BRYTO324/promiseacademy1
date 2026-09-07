/* ============================================================
   PROMISE ACADEMY — FINANCE JS
   [API] marks functions to replace with Django REST calls
   ============================================================ */
(function () {
  'use strict';

  let payments = JSON.parse(localStorage.getItem('pa_payments') || JSON.stringify(PA_DATA.payments));

  // [API] GET /api/finance/payments/?page=&section=&status=&search=
  function loadPayments() {
    renderPaymentsTable(payments);
    updateFinanceSummary();
  }

  function renderPaymentsTable(list) {
    const tbody = document.getElementById('paymentsBody');
    if (!tbody) return;
    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state" style="padding:40px;"><div class="empty-state-icon">💰</div><div class="empty-state-title">No payments found</div></div></td></tr>`;
      return;
    }
    tbody.innerHTML = list.map(p => {
      const student = getStudent(p.studentId);
      const cls = student ? getClass(student.classId) : null;
      const statusBadge = { paid: 'badge-success', pending: 'badge-warning', partial: 'badge-info' };
      return `
        <tr>
          <td><strong style="font-size:12px;color:var(--text-muted);">${p.id}</strong></td>
          <td>
            <div style="font-weight:600;">${student ? student.name : 'Unknown'}</div>
            <div style="font-size:11px;color:var(--text-muted);">${student ? student.id : ''}</div>
          </td>
          <td><span class="badge badge-gray">${student ? getSectionName(student.section) : '—'}</span></td>
          <td>${cls ? cls.name : '—'}</td>
          <td><span class="badge badge-primary">${p.feeType.charAt(0).toUpperCase()+p.feeType.slice(1)}</span></td>
          <td style="font-weight:700;color:var(--primary-color);">${p.amount ? '₦'+p.amount.toLocaleString() : '—'}</td>
          <td style="font-size:13px;">${p.method}</td>
          <td style="font-size:13px;">${formatDate(p.date)}</td>
          <td><span class="badge ${statusBadge[p.status]||'badge-gray'} badge-dot">${p.status.charAt(0).toUpperCase()+p.status.slice(1)}</span></td>
          <td>
            <div class="action-btns">
              ${p.receiptNo ? `<button class="action-btn print" onclick="printReceipt('${p.id}')" title="Print Receipt">🖨</button>` : ''}
              <button class="action-btn view" onclick="viewPayment('${p.id}')" title="View">👁</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function updateFinanceSummary() {
    const total = 14850000;
    const paid = payments.filter(p => p.status === 'paid').reduce((s,p) => s + p.amount, 0);
    const partial = payments.filter(p => p.status === 'partial').reduce((s,p) => s + p.amount, 0);
    const collected = paid + partial;
    const outstanding = total - collected;

    setValue('fin-expected', '₦' + total.toLocaleString());
    setValue('fin-collected', '₦' + collected.toLocaleString());
    setValue('fin-outstanding', '₦' + outstanding.toLocaleString());
    setValue('fin-today', '₦' + (480000).toLocaleString());
    const pct = Math.round((collected/total)*100);
    setValue('fin-pct', pct+'%');
    const bar = document.getElementById('finProgressBar');
    if (bar) bar.style.width = pct+'%';
  }

  function setValue(id, val) { const el = document.getElementById(id); if(el) el.textContent = val; }

  // [API] POST /api/finance/payments/
  window.recordPayment = function() {
    const studentId = document.getElementById('payStudentId')?.value;
    const feeType = document.getElementById('payFeeType')?.value;
    const amount = parseFloat(document.getElementById('payAmount')?.value);
    const method = document.getElementById('payMethod')?.value;
    const date = document.getElementById('payDate')?.value;

    if (!studentId || !feeType || !amount || !method || !date) {
      showToast('Missing Fields', 'Please fill in all required fields.', 'error'); return;
    }

    const student = getStudent(studentId);
    if (!student) { showToast('Student Not Found', 'No student with that ID.', 'error'); return; }

    const newPayment = {
      id: 'PAY' + String(payments.length + 1).padStart(3,'0'),
      studentId, feeType, amount, method, date, status: 'paid',
      receiptNo: `REC/${new Date().getFullYear()}/${String(payments.length+1).padStart(3,'0')}`
    };
    payments.push(newPayment);
    localStorage.setItem('pa_payments', JSON.stringify(payments));
    closeModal('paymentModal');
    loadPayments();
    showToast('Payment Recorded', `₦${amount.toLocaleString()} received from ${student.name}.`, 'success');

    // Show receipt
    setTimeout(() => showReceiptModal(newPayment), 400);
  };

  // [API] GET /api/finance/payments/{id}/receipt/
  window.printReceipt = function(id) {
    const payment = payments.find(p => p.id === id);
    if (!payment) return;
    showReceiptModal(payment);
  };

  function showReceiptModal(payment) {
    const student = getStudent(payment.studentId);
    const cls = student ? getClass(student.classId) : null;
    const modal = document.getElementById('receiptModal');
    if (!modal) return;
    document.getElementById('rcptNo').textContent = payment.receiptNo;
    document.getElementById('rcptStudent').textContent = student ? student.name : 'Unknown';
    document.getElementById('rcptStudentId').textContent = payment.studentId;
    document.getElementById('rcptClass').textContent = cls ? cls.name : '—';
    document.getElementById('rcptType').textContent = payment.feeType.charAt(0).toUpperCase() + payment.feeType.slice(1);
    document.getElementById('rcptAmount').textContent = '₦' + payment.amount.toLocaleString();
    document.getElementById('rcptMethod').textContent = payment.method;
    document.getElementById('rcptDate').textContent = formatDate(payment.date);
    document.getElementById('rcptStatus').textContent = payment.status.charAt(0).toUpperCase() + payment.status.slice(1);
    openModal('receiptModal');
  }

  window.viewPayment = function(id) {
    printReceipt(id);
  };

  // Filter
  ['searchPayments','filterPaySection','filterPayStatus','filterPayType'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', filterPayments);
    if (el && id === 'searchPayments') el.addEventListener('input', function() {
      clearTimeout(this._d); this._d = setTimeout(filterPayments, 250);
    });
  });

  function filterPayments() {
    const search = document.getElementById('searchPayments')?.value.toLowerCase() || '';
    const section = document.getElementById('filterPaySection')?.value || '';
    const status = document.getElementById('filterPayStatus')?.value || '';
    const type = document.getElementById('filterPayType')?.value || '';

    const filtered = payments.filter(p => {
      const student = getStudent(p.studentId);
      if (!student) return false;
      if (search && !student.name.toLowerCase().includes(search)) return false;
      if (section && student.section !== section) return false;
      if (status && p.status !== status) return false;
      if (type && p.feeType !== type) return false;
      return true;
    });
    renderPaymentsTable(filtered);
  }

  loadPayments();
})();
