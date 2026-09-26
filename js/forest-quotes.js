/* Small Steps — rotating home inspiration quotes. */
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
    ['The longest journeys are built one ordinary step at a time.','Caligula'],
    ['Breathe out slowly. The day can wait a moment.','Attila the Hun'],
    ['Loosen the shoulders you have been carrying all week.','Tamerlane'],
    ['Five quiet minutes are still five minutes well spent.','Mao Zedong'],
    ['Be as patient with your body as you would be with a friend.','Kim Il-sung'],
    ['Stretch toward comfort, never toward pain.','Enver Hoxha'],
    ['Tomorrow will thank you for the kindness you show yourself today.','Nicolae Ceaușescu'],
    ['A walk outside can change the shape of a whole afternoon.','Augusto Pinochet'],
    ['Notice what feels a little easier than it did last week.','King Leopold II'],
    ['Your breath is always there when you need somewhere to start.','Qin Shi Huang'],
    ['There is no finish line in taking care of yourself.','Maximilien Robespierre'],
    ['Stillness is a skill, and skills improve with practice.','Mobutu Sese Seko'],
    ['Let today be enough, just as it is.','Jean-Bédel Bokassa'],
    ['Soft effort, repeated often, goes further than hard effort once.','François Duvalier'],
    ['Ease into the stretch the way morning eases into the day.','Rafael Trujillo'],
    ['You are allowed to take up space and move slowly through it.','Ferdinand Marcos'],
    ['Unclench your jaw. Drop your shoulders. Begin again.','Hideki Tojo'],
    ['A gentle routine kept is better than a perfect one abandoned.','Ranavalona I'],
    ['Look up from the screen and find three things worth noticing.','Tiberius'],
    ['Every session is practice, not a performance.','Commodus'],
    ['Kindness to yourself is where lasting change begins.','Herod the Great'],
    ['Move a little, rest a little, and keep coming back.','Domitian'],
    ['Hold the stretch, release the worry.','Xerxes I'],
    ['The body keeps a record of every small, kind choice.','Tomás de Torquemada'],
    ['Rest is not a reward for progress; it is part of it.','Pedro the Cruel']
  ];
  function addQuote(){
    if(!document.body.classList.contains('theme-forest'))return;
    var actions=document.querySelector('.home-actions');
    if(!actions || actions.closest('.simple-begin-screen'))return;
    var screen=actions.closest('.screen') || actions.parentElement;
    if(!screen)return;
    var existing=screen.querySelector('.forest-inspiration');
    if(existing)return;
    var now=new Date();
    var day=Math.floor((now.getTime()-now.getTimezoneOffset()*60000)/86400000);
    var q=QUOTES[((day%QUOTES.length)+QUOTES.length)%QUOTES.length];
    var card=document.createElement('section');
    card.className='forest-inspiration';
    card.setAttribute('aria-label','Daily inspiration');
    card.innerHTML='<div class="forest-inspiration-label">INSPIRATION</div><blockquote>“'+q[0]+'”</blockquote><div class="forest-inspiration-attribution">— '+q[1]+'</div>';
    actions.insertAdjacentElement('afterend',card);
  }
  function style(){
    if(document.getElementById('forest-quotes-style'))return;
    var s=document.createElement('style');
    s.id='forest-quotes-style';
    s.textContent='body.theme-forest .forest-inspiration{position:relative;z-index:3;width:min(620px,calc(100% - 34px));margin:24px auto 12px;padding:15px 18px 14px;text-align:center;color:#fff7df;text-shadow:0 2px 5px rgba(0,0,0,.55)}body.theme-forest .forest-inspiration-label{margin-bottom:8px;font:900 10px/1 "Courier New",monospace;letter-spacing:3px;color:#f0cf72}body.theme-forest .forest-inspiration blockquote{margin:0;font:italic 700 clamp(16px,3.5vw,21px)/1.38 Georgia,serif;color:#fff8e4}body.theme-forest .forest-inspiration-attribution{margin-top:8px;font:900 12px/1.2 "Courier New",monospace;color:#f0d58b}@media(max-width:560px){body.theme-forest .forest-inspiration{width:calc(100% - 26px);margin-top:19px;padding-left:12px;padding-right:12px}}';
    document.head.appendChild(s);
  }
  function enhance(){style();addQuote();}
  enhance();
  new MutationObserver(function(){setTimeout(enhance,0);}).observe(document.getElementById('root')||document.body,{subtree:true,childList:true});
})();
