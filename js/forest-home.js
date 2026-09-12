/* Small Steps — Forest Theme 1 home-screen patch */
(function(){
  window.renderToday = function(){
    return `<div class="home-scenic-space" aria-hidden="true"></div><div class="home-actions">
      <button class="home-action action-stretch" onclick="go('stretchSetup')"><span><strong>Start Stretching</strong></span><b aria-hidden="true">›</b></button>
      <button class="home-action action-meditate" onclick="go('meditationSetup')"><span><strong>Start Meditation</strong></span><b aria-hidden="true">›</b></button>
      <button class="home-action action-progress home-action-progress" onclick="go('progress')"><span class="home-progress-icon">${homeIcon('progress')}</span><span><strong>Progress</strong></span><b aria-hidden="true">›</b></button>
    </div><article class="card week-card"><div class="section-heading"><p class="eyebrow">This week</p><span class="pill">${state.stretchMinutes+state.meditationMinutes} min total</span></div><div class="week">${weekly().map(d=>`<div class="day ${d.done?"done":""} ${d.today?"today":""}"><span>${d.label}</span><i>${d.done?"✓":""}</i></div>`).join("")}</div></article>`;
  };
  if(typeof window.render === 'function') window.render();
})();
