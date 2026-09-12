/* Small Steps — Forest presentation helpers */
(function(){
  function wireForestLogo(){
    document.querySelectorAll('.brand-mark-small,.simple-begin-logo').forEach(function(img){
      img.setAttribute('src','assets/icons/small-steps-forest-logo.webp');
      img.removeAttribute('srcset');
    });
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
    wrap.innerHTML='<label class="sound-select-label" for="meditationSound">Ending sound</label><select id="meditationSound" class="meditation-sound-select"><option value="chime">Soft chime</option><option value="gong">Gong</option><option value="bell">Temple bell</option></select><p class="muted sound-description"></p>';
    list.style.display='none';
    var eyebrow=card.querySelector('.eyebrow');
    (eyebrow?eyebrow.parentNode:card).appendChild(wrap);
    var select=wrap.querySelector('select');
    var desc=wrap.querySelector('.sound-description');
    var descriptions={chime:'A light, bright finish.',gong:'A deeper resonant ending.',bell:'A clear, sustained bell.'};
    var map={'Soft chime':'chime','Gong':'gong','Temple bell':'bell'};
    select.value=map[current]||'chime';
    desc.textContent=descriptions[select.value];
    select.addEventListener('change',function(){
      var value=select.value;
      state.profile.sound=value;
      save();
      desc.textContent=descriptions[value];
    });
  }

  function enhanceAbout(){
    if(!document.body.classList.contains('theme-forest')) return;
    var card=document.querySelector('.support-card');
    if(!card || document.querySelector('.about-support-link')) return;
    var link=card.querySelector('.support-link');
    if(!link) return;
    var wrap=document.createElement('div');
    wrap.className='about-support-link';
    wrap.appendChild(link.cloneNode(true));
    card.replaceWith(wrap);
  }

  function enhance(){
    wireForestLogo();
    enhanceHome();
    enhanceMeditation();
    enhanceAbout();
  }
  enhance();
  var observer=new MutationObserver(function(){setTimeout(enhance,0)});
  observer.observe(document.getElementById('root')||document.body,{subtree:true,childList:true});
})();
