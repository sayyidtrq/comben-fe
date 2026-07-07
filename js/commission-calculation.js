// js/commission-calculation.js

document.addEventListener('DOMContentLoaded', () => {

  const btnRunCalc = document.getElementById('btn-run-calc');
  const btnRegenerate = document.getElementById('btn-regenerate');

  const progressCircle = document.getElementById('progress-circle');
  const progressText = document.getElementById('progress-text');
  const progressBadge = document.getElementById('progress-badge');
  const durationVal = document.getElementById('duration-val');

  let isAnimating = false;

  function runSimulation() {
    if (isAnimating) return;
    isAnimating = true;

    // Reset state
    progressCircle.style.transition = 'none';
    progressCircle.setAttribute('stroke-dasharray', '0, 100');
    progressText.textContent = '0%';

    progressBadge.innerHTML = 'In Progress <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" style="display:inline-block; margin-left:4px;"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>';
    progressBadge.style.color = '#F59E0B'; // orange
    progressBadge.style.borderColor = '#FCD34D';
    progressBadge.style.backgroundColor = '#FFFBEB';

    durationVal.textContent = 'Calculating...';

    // Trigger reflow to apply transition reset
    progressCircle.getBoundingClientRect();

    // Start animation (let's make it 3 seconds long)
    progressCircle.style.transition = 'stroke-dasharray 3s cubic-bezier(0.4, 0, 0.2, 1)';
    progressCircle.setAttribute('stroke-dasharray', '100, 100');

    let startTime = null;
    function animateText(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(Math.floor((progress / 3000) * 100), 100);
      progressText.textContent = percentage + '%';

      if (progress < 3000) {
        requestAnimationFrame(animateText);
      } else {
        // Finished
        isAnimating = false;
        progressText.textContent = '100%';

        progressBadge.innerHTML = 'Completed <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" style="display:inline-block; margin-left:4px;"><polyline points="20 6 9 17 4 12"/></svg>';
        progressBadge.style.color = '#059669';
        progressBadge.style.borderColor = '#A7F3D0';
        progressBadge.style.backgroundColor = '#F0FDF4';

        durationVal.textContent = '00:04:38'; // Set dummy duration
      }
    }

    requestAnimationFrame(animateText);
  }

  btnRunCalc.addEventListener('click', runSimulation);
  btnRegenerate.addEventListener('click', runSimulation);

});
