/* Small Steps — Forest home screen rebuild */
(function(){
  function wireForestLogo(){
    document.querySelectorAll('.brand-mark-small,.simple-begin-logo').forEach(function(img){
      img.setAttribute('src','assets/icons/small-steps-forest-logo.webp');
      img.removeAttribute('srcset');
    });
  }

  window.renderToday = function(){
    return '<div class="forest-home-backdrop" aria-hidden="true"><img src="assets/illustrations/forest-theme1-bg.webp" alt=""></div>'+
      '<div class="home-actions forest-home-actions">'+
        '<button class="home-action action-stretch" onclick="go(\'stretchSetup\')"><span><strong>Start Stretching</strong></span><b aria-hidden="true">›</b></button>'+
        '<button class="home-action action-meditate" onclick="go(\'meditationSetup\')"><span><strong>Start Meditation</strong></span><b aria-hidden="true">›</b></button>'+
      '</div>';
  };

  if(typeof window.render === 'function') window.render();
  wireForestLogo();

  var observer = new MutationObserver(function(){ wireForestLogo(); });
  observer.observe(document.getElementById('root') || document.body,{subtree:true,childList:true});
})();
