/**
 * Lever score banner: when URL has ?filtered=1, show Sanlam vs Filtered comparison.
 * Requires banner element with id="leverScoreBanner" and data attributes:
 * data-lever-name, data-sanlam-score, data-filtered-score, data-next-url, data-next-label
 */
(function () {
  function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('filtered') !== '1') return;

    const banner = document.getElementById('leverScoreBanner');
    if (!banner) return;

    document.body.classList.add('filters-applied');

    const leverName = banner.dataset.leverName || '';
    const sanlamScore = parseFloat(banner.dataset.sanlamScore, 10) || 0;
    const filteredScore = parseFloat(banner.dataset.filteredScore, 10) || 0;
    const nextUrl = banner.dataset.nextUrl || '#';
    const nextLabel = banner.dataset.nextLabel || 'Next';

    const higher = filteredScore > sanlamScore;
    const arrowClass = higher ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt';
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const navSelectHtml = typeof window.leverPageNav !== 'undefined'
      ? window.leverPageNav.getSelectHtml(currentFile)
      : '';

    banner.innerHTML = `
      <div class="score-banner-comparison">
        <h5 class="score-banner-subtitle">${escapeHtml(leverName)} - Overall Averages</h5>
        <div class="score-banner-scores">
          <div class="score-banner-block">
            <span class="score-banner-label">Sanlam:</span>
            <span class="score-banner-value">${sanlamScore}%</span>
          </div>
          <div class="score-banner-block">
            <span class="score-banner-label">Filtered:</span>
            <span class="score-banner-value">${filteredScore}%</span>
            <span class="score-banner-arrow ${higher ? 'score-banner-arrow-up' : 'score-banner-arrow-down'}" aria-label="${higher ? 'Filtered score higher than Sanlam' : 'Filtered score lower than Sanlam'}">
              <i class="bx ${arrowClass}"></i>
            </span>
          </div>
        </div>
        ${navSelectHtml}
      </div>
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
