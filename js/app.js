/* ============================================================
   PROMISE ACADEMY — CORE APP JS
   Handles: Sidebar, Topbar, Modals, Toast, Dropdowns, Theme
   ============================================================ */

(function () {
  'use strict';

  // ── SIDEBAR ──────────────────────────────────────────────────
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const topbar = document.getElementById('topbar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

  let sidebarCollapsed = localStorage.getItem('pa_sidebar_collapsed') === 'true';

  function applySidebarState() {
    if (!sidebar) return;
    const isMobile = window.innerWidth <= 1023;
    if (isMobile) {
      sidebar.classList.remove('collapsed');
      if (mainContent) mainContent.classList.remove('sidebar-collapsed');
      if (topbar) topbar.classList.remove('sidebar-collapsed');
    } else {
      if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('sidebar-collapsed');
        if (topbar) topbar.classList.add('sidebar-collapsed');
      } else {
        sidebar.classList.remove('collapsed');
        if (mainContent) mainContent.classList.remove('sidebar-collapsed');
        if (topbar) topbar.classList.remove('sidebar-collapsed');
      }
    }
  }

  function toggleSidebar() {
    const isMobile = window.innerWidth <= 1023;
    if (isMobile) {
      sidebar.classList.toggle('mobile-open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    } else {
      sidebarCollapsed = !sidebarCollapsed;
      localStorage.setItem('pa_sidebar_collapsed', sidebarCollapsed);
      applySidebarState();
    }
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
  if (mobileSidebarToggle) mobileSidebarToggle.addEventListener('click', toggleSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileSidebar);

  window.addEventListener('resize', applySidebarState);
  applySidebarState();

  // Mark active nav item
  function markActiveNav() {
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href && href.split('/').pop() === current) {
        item.classList.add('active');
      }
    });
  }
  markActiveNav();

  // ── THEME (Dark/Light) ───────────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  let currentTheme = localStorage.getItem('pa_theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pa_theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  applyTheme(currentTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  // ── TOAST NOTIFICATIONS ──────────────────────────────────────
  window.showToast = function (title, message = '', type = 'success', duration = 4000) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = { success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-dismiss" onclick="this.closest('.toast').remove()">✕</button>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // ── MODALS ────────────────────────────────────────────────────
  window.openModal = function (id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function (id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close on overlay click
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
        document.body.style.overflow = '';
      });
      document.querySelectorAll('.dropdown-menu.show').forEach(d => d.classList.remove('show'));
    }
  });

  // ── DROPDOWNS ─────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-dropdown]');
    if (trigger) {
      e.stopPropagation();
      const menuId = trigger.getAttribute('data-dropdown');
      const menu = document.getElementById(menuId);
      if (menu) {
        // Close others
        document.querySelectorAll('.dropdown-menu.show').forEach(m => {
          if (m !== menu) m.classList.remove('show');
        });
        menu.classList.toggle('show');
      }
    } else {
      // Close all dropdowns
      document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
    }
  });

  // ── TABS ──────────────────────────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const tabGroup = this.closest('[data-tabs]') || this.closest('.tabs');
      const target = this.getAttribute('data-tab');
      if (!target) return;

      // Deactivate all
      const container = this.closest('.tabs-container') || document;
      if (tabGroup) {
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      }

      // Show target pane
      const paneContainer = container.querySelector('.tab-panes') || container;
      paneContainer.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      const targetPane = container.querySelector(`#${target}`) || document.querySelector(`#${target}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // ── SECTION FILTER ────────────────────────────────────────────
  document.querySelectorAll('.section-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const group = this.closest('.section-filter');
      if (group) group.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const section = this.getAttribute('data-section');
      const event = new CustomEvent('sectionChange', { detail: { section } });
      document.dispatchEvent(event);
    });
  });

  // ── CONFIRM DIALOG ────────────────────────────────────────────
  window.confirmAction = function (message, onConfirm, title = 'Confirm Action') {
    let overlay = document.getElementById('confirmModal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'confirmModal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal" style="max-width: 420px;">
          <div class="modal-header">
            <h3 class="modal-title" id="confirmTitle">Confirm Action</h3>
            <button class="modal-close" onclick="closeModal('confirmModal')">✕</button>
          </div>
          <div class="modal-body">
            <p id="confirmMessage" style="color: var(--text-secondary); font-size: var(--font-size-md); line-height: 1.6;"></p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="closeModal('confirmModal')">Cancel</button>
            <button class="btn btn-danger" id="confirmBtn">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    document.getElementById('confirmBtn').addEventListener('click', () => {
      closeModal('confirmModal');
      if (onConfirm) onConfirm();
    });
    openModal('confirmModal');
  };

  // ── NOTIFICATION PANEL ────────────────────────────────────────
  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn && typeof PA_DATA !== 'undefined') {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let panel = document.getElementById('notifPanel');
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notifPanel';
        panel.className = 'dropdown-menu notif-panel';
        panel.style.cssText = 'top: 42px; right: 0; left: auto;';
        const unread = PA_DATA.notifications.filter(n => !n.read);
        panel.innerHTML = `
          <div class="notif-header">
            <span class="notif-title">Notifications</span>
            <span class="badge badge-danger">${unread.length} new</span>
          </div>
          ${PA_DATA.notifications.map(n => `
            <div class="notif-item ${n.read ? '' : 'unread'}">
              <div class="notif-icon" style="background: var(--primary-ghost)">${n.icon}</div>
              <div class="notif-content">
                <div class="notif-text"><strong>${n.title}</strong> — ${n.message}</div>
                <div class="notif-time">${n.time}</div>
              </div>
            </div>
          `).join('')}
          <div style="padding: 12px; text-align: center; border-top: 1px solid var(--border-light);">
            <a href="../pages/notifications.html" style="font-size: 13px; color: var(--primary-color); font-weight: 600;">View All Notifications</a>
          </div>
        `;
        notifBtn.parentElement.style.position = 'relative';
        notifBtn.parentElement.appendChild(panel);
      }
      panel.classList.toggle('show');
    });
  }

  // ── PASSWORD TOGGLE ───────────────────────────────────────────
  document.querySelectorAll('[data-password-toggle]').forEach(btn => {
    btn.addEventListener('click', function () {
      const input = document.querySelector(this.getAttribute('data-password-toggle'));
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        this.innerHTML = input.type === 'password' ? '👁️' : '🙈';
      }
    });
  });

  // ── FORM VALIDATION ───────────────────────────────────────────
  window.validateForm = function (formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const val = field.value.trim();
      const parent = field.closest('.form-group');
      const existing = parent && parent.querySelector('.form-error');
      if (existing) existing.remove();
      if (!val) {
        valid = false;
        field.style.borderColor = 'var(--danger-color)';
        if (parent) {
          const err = document.createElement('div');
          err.className = 'form-error';
          err.textContent = 'This field is required';
          parent.appendChild(err);
        }
        field.addEventListener('input', function handler() {
          this.style.borderColor = '';
          const e = this.closest('.form-group')?.querySelector('.form-error');
          if (e) e.remove();
          this.removeEventListener('input', handler);
        });
      }
    });
    return valid;
  };

  // ── GLOBAL SEARCH ─────────────────────────────────────────────
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) showToast('Search', `Searching for "${query}"…`, 'info');
      }
    });
  }

  // ── PRINT ─────────────────────────────────────────────────────
  window.printSection = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    const original = document.body.innerHTML;
    document.body.innerHTML = el.innerHTML;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  // ── INIT ──────────────────────────────────────────────────────
  console.log('✅ Promise Academy App initialized');

})();
