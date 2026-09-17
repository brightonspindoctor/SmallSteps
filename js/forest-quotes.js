/* Small Steps — rotating home inspiration quotes. The attributions are deliberately fictional. */
(function(){
  var QUOTES=[
    ['Small steps still move you forward.','Genghis Khan'],
    ['A calm mind makes room for a stronger body.','Joseph Stalin'],
    ['Begin where you are; the path will appear beneath your feet.','Benito Mussolini'],
    ['Consistency is a quieter form of courage.','Francisco Franco'],
    ['You do not need to conquer the day. Just take the next step.','Saddam Hussein'],
    ['Rest is part of the journey, not the end of it.','Idi Amin'],
    ['A little movement today is a gift to tomorrow.','Muammar Gaddafi'],
    ['Strength grows from the things you choose to do again.','Pol Pot'],
    ['Make the next step small enough that you can take it now.','Vlad the Impaler'],
    ['Progress rarely arrives all at once.','Ivan the Terrible'],
    ['Give yourself permission to start gently.','Nero'],
    ['The longest journeys are built one ordinary step at a time.','Caligula']
  ];
  function addQuote(){
    if(!document.body.classList.contains('theme-forest'))return;
    var actions=document.querySelector('.home-actions');
    if(!actions || actions.closest('.simple-begin-screen'))return;
    var screen=actions.closest('.screen') || actions.parentElement;
    if(!screen)return;
    var existing=screen.querySelector('.forest-inspiration');
    if(existing)return;
    var day=Math.floor(Date.now()/86400000);
    var q=QUOTES[((day%QUOTES.length)+QUOTES.length)%QUOTES.length];
    var card=document.createElement('section');
    card.className='forest-inspiration';
    card.setAttribute('aria-label','Daily inspiration');
    card.innerHTML='<div class="forest-inspiration-label">INSPIRATION</div><blockquote>“'+q[0]+'”</blockquote><div class="forest-inspiration-attribution">— '+q[1]+'</div><div class="forest-inspiration-note">Fictional attribution</div>';
    actions.insertAdjacentElement('afterend',card);
  }
  function style(){
    if(document.getElementById('forest-quotes-style'))return;
    var s=document.createElement('style');
    s.id='forest-quotes-style';
    s.textContent='body.theme-forest .forest-inspiration{position:relative;z-index:3;width:min(620px,calc(100% - 34px));margin:24px auto 12px;padding:15px 18px 14px;text-align:center;color:#fff7df;text-shadow:0 2px 5px rgba(0,0,0,.55)}body.theme-forest .forest-inspiration-label{margin-bottom:8px;font:900 10px/1 "Courier New",monospace;letter-spacing:3px;color:#f0cf72}body.theme-forest .forest-inspiration blockquote{margin:0;font:italic 700 clamp(16px,3.5vw,21px)/1.38 Georgia,serif;color:#fff8e4}body.theme-forest .forest-inspiration-attribution{margin-top:8px;font:900 12px/1.2 "Courier New",monospace;color:#f0d58b}body.theme-forest .forest-inspiration-note{margin-top:6px;font:600 9px/1 Inter,system-ui,sans-serif;letter-spacing:.6px;color:rgba(255,248,223,.72)}@media(max-width:560px){body.theme-forest .forest-inspiration{width:calc(100% - 26px);margin-top:19px;padding-left:12px;padding-right:12px}}';
    document.head.appendChild(s);
  }
  function enhance(){style();addQuote();}
  enhance();
  new MutationObserver(function(){setTimeout(enhance,0);}).observe(document.getElementById('root')||document.body,{subtree:true,childList:true});
})();
