/**
 * Lever page navigation: shared select dropdown for jumping between Overview and lever pages.
 * Use class "score-banner-lever-nav" on the select. Preserves ?filtered=1 when navigating.
 */
(function () {
  var LEVER_NAV_OPTIONS = [
    { value: 'business-outcomes.html', label: 'Business Outcomes' },
    { value: 'shared-values.html', label: 'Shared Values' },
    { value: 'employee-experience.html', label: 'Employee Experience' },
    { value: 'leadership-enablement.html', label: 'Leadership Enablement' }
  ];

  function getCurrentPage() {
    var path = window.location.pathname || '';
    var file = path.split('/').pop() || 'index.html';
    return file;
  }

  function getSelectHtml(currentPage) {
    currentPage = currentPage || getCurrentPage();
    var options = LEVER_NAV_OPTIONS.map(function (opt) {
      var sel = opt.value === currentPage ? ' selected' : '';
      return '<option value="' + opt.value + '"' + sel + '>' + opt.label + '</option>';
    }).join('');
    return '<select class="score-banner-lever-nav" aria-label="Jump to lever or overview">' + options + '</select>';
  }

  function onNavChange(e) {
    if (!e.target.classList.contains('score-banner-lever-nav')) return;
    var url = e.target.value;
    if (!url) return;
    var filtered = new URLSearchParams(window.location.search).get('filtered') === '1';
    var sep = url.indexOf('?') !== -1 ? '&' : '?';
    window.location.href = filtered ? url + sep + 'filtered=1' : url;
  }

  document.body.addEventListener('change', onNavChange);

  window.leverPageNav = {
    getSelectHtml: getSelectHtml,
    options: LEVER_NAV_OPTIONS
  };
})();
