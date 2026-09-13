/* Small Steps — Forest presentation helpers */
(function(){
  var FOREST_TIME_ASSETS={
    sunrise:'assets/illustrations/forest-sunrise.webp.webp',
    day:'assets/illustrations/forest-day.webp.webp',
    sunset:'assets/illustrations/forest-sunset.webp.webp',
    night:'assets/illustrations/forest-night.webp.webp'
  };

  function wireForestLogo(){
    document.querySelectorAll('.brand-mark-small').forEach(function(img){
      img.setAttribute('src','assets/icons/small-steps-forest-logo.webp');
      img.removeAttribute('srcset');
    });
    document.querySelectorAll('.simple-begin-logo').forEach(function(img){
      img.setAttribute('src','assets/icons/small-steps-opening-logo.svg');
      img.removeAttribute('srcset');
    });
    document.querySelectorAll('.splash-title').forEach(function(el){el.remove();});
  }

  function forestTimeOfDay(){
    var hour=new Date().getHours();
    if(hour>=21 || hour<6) return 'night';
    if(hour>=6 && hour<10) return 'sunrise';
    if(hour>=10 && hour<17) return 'day';
    return 'sunset';
  }

  function applyForestTimeOfDay(){
    if(!document.body.classList.contains('theme-forest')) return;
    var period=forestTimeOfDay();
    var src=FOREST_TIME_ASSETS[period];
    document.querySelectorAll('.forest-fixed-background').forEach(function(img){
      if(img.getAttribute('src')!==src) img.setAttribute('src',src);
    });
    document.querySelectorAll('.simple-begin-screen').forEach(function(screen){
      screen.style.backgroundImage='url("'+src+'")';
    });
  }

  function ensureForestBackground(){
    if(!document.body.classList.contains('theme-forest')) return;
    var bg=document.querySelector('.forest-fixed-background');
    if(!bg){
      bg=document.createElement('img');
      bg.className='forest-fixed-background';
      bg.alt='';
      bg.setAttribute('aria-hidden','true');
      bg.src=FOREST_TIME_ASSETS[forestTimeOfDay()];
      document.body.insertBefore(bg,document.body.firstChild);
    }
    applyForestTimeOfDay();
  }

  function enhanceHome(){
    if(!document.body.classList.contains('theme-forest')) return;
    var actions=document.querySelector('.home-actions');
    if(!actions) return;
    var progress=actions.querySelector('.action-progress');
    if(progress) progress.remove();
    if(!actions.querySelector('.action-baseline')){
      var due=false;
      try{ due=Math.max(0,state.stretchMinutes-state.lastBaselineStretchMinutes)>=120; }catch(_){ }
      var button=document.createElement('button');
      button.className='home-action action-baseline'+(due?' baseline-due':'');
      button.innerHTML='<span><strong>Baseline</strong><small>'+(due?'Recommended now':'Check your mobility')+'</small></span><b aria-hidden="true">›</b>';
      button.addEventListener('click',function(){go('baseline')});
      actions.appendChild(button);
    }
  }

  function enhanceMeditation(){
    if(!document.body.classList.contains('theme-forest')) return;
    var list=document.querySelector('.meditation-list');
    if(!list || document.querySelector('.meditation-sound-select')) return;
    var card=list.closest('.card');
    if(!card) return;
    var active=list.querySelector('button.active');
    var current=(active&&active.querySelector('strong')&&active.querySelector('strong').textContent)||'Soft chime';
    var wrap=document.createElement('div');
    wrap.className='meditation-sound-control';
    wrap.innerHTML='<label class="sound-select-label" for="meditationSound">Ending sound</label><select id="meditationSound" class="meditation-sound-select"><option value="chime">Soft chime</option><option value="gong">Gong</option><option value="bell">Temple bell</option></select>';
    list.style.display='none';
    var eyebrow=card.querySelector('.eyebrow');
    (eyebrow?eyebrow.parentNode:card).appendChild(wrap);
    var select=wrap.querySelector('select');
    var map={'Soft chime':'chime','Gong':'gong','Temple bell':'bell'};
    select.value=map[current]||'chime';
    select.addEventListener('change',function(){
      state.profile.sound=select.value;
      save();
    });
  }

  function enhanceAbout(){
    if(!document.body.classList.contains('theme-forest')) return;
    var card=document.querySelector('.support-card');
    if(!card) return;
    card.remove();
    var stack=document.querySelector('.about-panel-stack');
    if(stack) stack.remove();
  }

  function enhance(){
    wireForestLogo();
    ensureForestBackground();
    enhanceHome();
    enhanceMeditation();
    enhanceAbout();
    applyForestTimeOfDay();
  }
  enhance();
  setInterval(applyForestTimeOfDay,60000);
  document.addEventListener('visibilitychange',function(){
    if(!document.hidden) applyForestTimeOfDay();
  });
  var observer=new MutationObserver(function(){setTimeout(enhance,0)});
  observer.observe(document.getElementById('root')||document.body,{subtree:true,childList:true});
})();
