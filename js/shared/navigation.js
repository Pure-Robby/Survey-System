(function () {
  const NAV_ITEMS = [
    { id: 'overview', href: 'index.html', icon: 'bx bx-grid-alt', label: 'Overview' },
    // { id: 'reports', href: 'reports.html', icon: 'bx bx-file', label: 'Reports' },
    { id: 'comments', href: 'comments-analysis.html', icon: 'bx bx-message-square-dots', label: 'Comments Analysis' },
    { id: 'progress', href: 'progress-tracker.html', icon: 'bx bx-line-chart', label: 'Progress Tracker' },
    //{ id: 'actions', href: 'action-tracker.html', icon: 'bx bx-task', label: 'Action Tracker' },
    { id: 'users', href: 'user-management.html', icon: 'bx bx-user', label: 'User Management' }
  ];

  function buildNav(container, activeId) {
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'container-fluid px-0';

    NAV_ITEMS.forEach((item) => {
      const link = document.createElement('a');
      link.href = item.href;
      link.innerHTML = "<i class='" + item.icon + "'></i> " + item.label;
      if (item.id === activeId) {
        link.classList.add('active');
      }
      wrapper.appendChild(link);
    });

    container.innerHTML = '';
    container.appendChild(wrapper);
  }

  function initNav() {
    const containers = document.querySelectorAll('.nav-tabs-custom');
    if (!containers.length) return;

    containers.forEach((container) => {
      const activeId = container.dataset.activeNav || '';
      buildNav(container, activeId);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
