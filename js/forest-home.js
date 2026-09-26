/* Small Steps — forest background that follows the time of day. */
(function(){
  var FOREST_TIME_ASSETS={
    sunrise:'assets/illustrations/forest-sunrise.webp',
    day:'assets/illustrations/forest-day.webp',
    sunset:'assets/illustrations/forest-sunset.webp',
    night:'assets/illustrations/forest-night.webp'
  };
  function forestTimeOfDay(){
    var hour=new Date().getHours();
    if(hour>=21||hour<6)return'night';
    if(hour<10)return'sunrise';
    if(hour<17)return'day';
    return'sunset';
  }
  function applyForestTimeOfDay(){
    if(!document.body.classList.contains('theme-forest'))return;
    var src=FOREST_TIME_ASSETS[forestTimeOfDay()];
    var bg=document.querySelector('.forest-fixed-background');
    if(!bg){
      bg=document.createElement('img');
      bg.className='forest-fixed-background';
      bg.alt='';
      bg.setAttribute('aria-hidden','true');
      document.body.insertBefore(bg,document.body.firstChild);
    }
    if(bg.getAttribute('src')!==src)bg.setAttribute('src',src);
    var css='url("'+src+'")';
    document.querySelectorAll('.simple-begin-screen').forEach(function(screen){
      if(screen.style.backgroundImage!==css)screen.style.backgroundImage=css;
    });
  }
  applyForestTimeOfDay();
  setInterval(applyForestTimeOfDay,60000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)applyForestTimeOfDay();});
  new MutationObserver(applyForestTimeOfDay).observe(document.getElementById('root')||document.body,{childList:true});
})();
