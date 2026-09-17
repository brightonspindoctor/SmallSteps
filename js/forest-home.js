/* Small Steps — Forest presentation helpers */
(function(){
  var FOREST_TIME_ASSETS={sunrise:'assets/illustrations/forest-sunrise.webp.webp',day:'assets/illustrations/forest-day.webp.webp',sunset:'assets/illustrations/forest-sunset.webp.webp',night:'assets/illustrations/forest-night.webp.webp'};
  var audioCtx=null,audioReady=false,timerState={screen:null,start:null,last:null,target:null,fired:false};
  function wireForestLogo(){document.querySelectorAll('.brand-mark-small').forEach(function(img){img.setAttribute('src','assets/icons/small-steps-forest-logo.webp');img.removeAttribute('srcset');});document.querySelectorAll('.simple-begin-logo').forEach(function(img){img.setAttribute('src','assets/icons/small-steps-forest-logo.webp');img.removeAttribute('srcset');});document.querySelectorAll('.splash-title').forEach(function(el){el.remove();});}
  function forestTimeOfDay(){var hour=new Date().getHours();if(hour>=21||hour<6)return'night';if(hour>=6&&hour<10)return'sunrise';if(hour>=10&&hour<17)return'day';return'sunset';}
  function applyForestTimeOfDay(){if(!document.body.classList.contains('theme-forest'))return;var src=FOREST_TIME_ASSETS[forestTimeOfDay()];document.querySelectorAll('.forest-fixed-background').forEach(function(img){if(img.getAttribute('src')!==src)img.setAttribute('src',src);});document.querySelectorAll('.simple-begin-screen').forEach(function(screen){screen.style.backgroundImage='url("'+src+'")';});}
  function ensureForestBackground(){if(!document.body.classList.contains('theme-forest'))return;var bg=document.querySelector('.forest-fixed-background');if(!bg){bg=document.createElement('img');bg.className='forest-fixed-background';bg.alt='';bg.setAttribute('aria-hidden','true');bg.src=FOREST_TIME_ASSETS[forestTimeOfDay()];document.body.insertBefore(bg,document.body.firstChild);}applyForestTimeOfDay();}
  function baselineIsDue(){try{var minutes=Number(state.stretchMinutes)||0,last=Number(state.lastBaselineStretchMinutes)||0;return(minutes===0&&last===0)||Math.max(0,minutes-last)>=120;}catch(_){return false;}}
  function syncBaselineButton(){var button=document.querySelector('.home-actions .action-baseline');if(!button)return;var due=baselineIsDue();button.classList.toggle('baseline-due',due);var small=button.querySelector('small');if(small)small.textContent=due?'Recommended now':'Check your mobility';}
  function enhanceHome(){if(!document.body.classList.contains('theme-forest'))return;var actions=document.querySelector('.home-actions');if(!actions)return;var progress=actions.querySelector('.action-progress');if(progress)progress.remove();var button=actions.querySelector('.action-baseline');if(!button){button=document.createElement('button');button.className='home-action action-baseline';button.innerHTML='<span><strong>Baseline</strong><small>Check your mobility</small></span><b aria-hidden="true">›</b>';button.addEventListener('click',function(){go('baseline');});actions.appendChild(button);}syncBaselineButton();}
  function enhanceMeditation(){if(!document.body.classList.contains('theme-forest'))return;var list=document.querySelector('.meditation-list');if(!list||document.querySelector('.meditation-sound-select'))return;var card=list.closest('.card');if(!card)return;var active=list.querySelector('button.active'),current=(active&&active.querySelector('strong')&&active.querySelector('strong').textContent)||'Soft chime';var wrap=document.createElement('div');wrap.className='meditation-sound-control';wrap.innerHTML='<label class="sound-select-label" for="meditationSound">Ending sound</label><select id="meditationSound" class="meditation-sound-select"><option value="chime">Soft chime</option><option value="gong">Gong</option><option value="bell">Temple bell</option></select>';list.style.display='none';var eyebrow=card.querySelector('.eyebrow');(eyebrow?eyebrow.parentNode:card).appendChild(wrap);var select=wrap.querySelector('select'),map={'Soft chime':'chime','Gong':'gong','Temple bell':'bell'};select.value=map[current]||'chime';select.addEventListener('change',function(){state.profile.sound=select.value;save();});}
  function visible(el){if(!el)return false;var s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&el.offsetWidth>0&&el.offsetHeight>0;}
  function cleanText(el){return(el&&el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function findMoreScreen(){var screens=Array.from(document.querySelectorAll('.screen')).filter(visible);for(var i=0;i<screens.length;i++){var heading=screens[i].querySelector('h1,h2');var ht=cleanText(heading);if(ht==='more'||ht.indexOf('more')===0)return screens[i];}for(var j=0;j<screens.length;j++){var t=cleanText(screens[j]);if(/appearance|settings|support|about small steps/.test(t)||t.indexOf('short stretching routines')===0)return screens[j];}return screens.length===1?screens[0]:null;}
  function removeOldAbout(){
    document.querySelectorAll('.support-card:not(.forest-support-card),.about-panel-stack').forEach(function(el){el.remove();});
    document.querySelectorAll('.card,.panel,section,article').forEach(function(el){
      if(!visible(el)||el.classList.contains('forest-support-card'))return;
      var t=cleanText(el);
      if(t.indexOf('about small steps')!==-1||t.indexOf('short stretching routines, calming meditation')===0||t.indexOf('short stretching routines')===0)el.remove();
    });
    document.querySelectorAll('a[href*="buymeacoffee"]').forEach(function(link){
      if(!link.closest('.forest-support-card')){
        var holder=link.closest('.support-card,.card,.panel,section,article')||link;
        holder.remove();
      }
    });
  }
  function enhanceAbout(){
    var more=findMoreScreen();
    removeOldAbout();
    if(!document.body.classList.contains('theme-forest')||!more)return;
    var existing=more.querySelector('.forest-support-card');
    if(existing)return;
    var card=document.createElement('section');
    card.className='card forest-support-card';
    card.innerHTML='<p class="forest-support-message">Mighty adventures start with small steps.</p><a class="forest-coffee-link" href="https://buymeacoffee.com/jonnysadler" target="_blank" rel="noopener noreferrer">Buy me a coffee</a>';
    more.appendChild(card);
  }
  function ensureAudio(){try{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();audioReady=true;}catch(_){audioReady=false;}}
  function playHalfwayChime(){if(!audioReady)ensureAudio();if(!audioCtx)return;try{var now=audioCtx.currentTime,osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type='sine';osc.frequency.setValueAtTime(880,now);osc.frequency.exponentialRampToValueAtTime(1320,now+.08);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.18,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+.28);osc.connect(gain);gain.connect(audioCtx.destination);osc.start(now);osc.stop(now+.3);}catch(_){} }
  function visibleSession(){var best=null;document.querySelectorAll('.screen').forEach(function(el){var s=getComputedStyle(el);if(s.display==='none'||s.visibility==='hidden'||!el.offsetWidth||!el.offsetHeight)return;if(/\b\d{1,2}:\d{2}\b/.test(el.innerText||''))best=el;});return best;}
  function readTimer(screen){if(!screen)return null;var m=(screen.innerText||'').match(/\b(\d{1,2}):(\d{2})\b/g);if(!m)return null;var vals=m.map(function(v){var p=v.split(':');return Number(p[0])*60+Number(p[1]);});return Math.max.apply(null,vals);}
  function isTwoSided(screen){if(!screen)return false;var text=(screen.innerText||'').toLowerCase();if(/side\s*(1|2)\s*(of|\/)\s*2/.test(text)||/left\s+side|right\s+side|switch\s+sides|change\s+sides/.test(text))return true;try{if(typeof state!=='undefined'&&state.session){var s=state.session,idx=typeof s.index==='number'?s.index:typeof s.currentIndex==='number'?s.currentIndex:-1;if(idx>=0&&typeof EXERCISES!=='undefined'&&EXERCISES[idx]&&EXERCISES[idx].twoSided)return true;}}catch(_){}return false;}
  function watchHalfwayChime(){if(!document.body.classList.contains('theme-forest'))return;var screen=visibleSession(),current=readTimer(screen);if(current===null){timerState={screen:null,start:null,last:null,target:null,fired:false};return;}if(screen!==timerState.screen||(timerState.last!==null&&current>timerState.last)){timerState={screen:screen,start:current,last:current,target:Math.floor(current/2),fired:false};}if(isTwoSided(screen)&&!timerState.fired&&timerState.start>1&&timerState.last!==null&&current<=timerState.target&&timerState.last>timerState.target){timerState.fired=true;playHalfwayChime();}timerState.last=current;}
  document.addEventListener('pointerdown',ensureAudio,{passive:true});document.addEventListener('touchstart',ensureAudio,{passive:true});
  function enhance(){wireForestLogo();ensureForestBackground();enhanceHome();enhanceMeditation();enhanceAbout();applyForestTimeOfDay();syncBaselineButton();}
  enhance();setInterval(function(){applyForestTimeOfDay();watchHalfwayChime();syncBaselineButton();},250);setInterval(applyForestTimeOfDay,60000);document.addEventListener('visibilitychange',function(){if(!document.hidden){ensureAudio();applyForestTimeOfDay();}});var observer=new MutationObserver(function(){setTimeout(enhance,0);});observer.observe(document.getElementById('root')||document.body,{subtree:true,childList:true});
})();
