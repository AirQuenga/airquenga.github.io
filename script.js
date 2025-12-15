// Minimal behavior: mobile nav toggle and current year
document.addEventListener('DOMContentLoaded', function(){
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      if(nav.style.display === 'flex') nav.style.display = 'none';
      else nav.style.display = 'flex';
    });
  }

  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
});
