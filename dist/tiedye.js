// Code from: http://codepen.io/beesandtrees/pres/OVbGZQ

var w = window, 
    cnv, ctx, wx, wy, mx, my,
    rad = 0, 
    ud = true, 
    i = 20, no = 0;

init();
animate();

function init() {
	cnv = document.createElement('canvas'),
    wx = w.innerWidth,
    wy = w.innerHeight,
    ctx = cnv.getContext('2d');
    cnv.width = wx;
    cnv.height = wy;
    document.body.appendChild(cnv);
}

function animate() {
  	i = i < wx/1.9 ? i + 1 : 20;
  	no++;
  	window.requestAnimationFrame(animate);
		draw();
}

function draw(){ 
  if(no % 2 === 0 ){
    ctx.translate(wx/2, wy/2);
    ctx.rotate(Math.PI/240);
    ctx.translate(-wx/2, -wy/2); 
  }
  
		mx = (i*Math.sin(i)) + wx/2;
		my = (i*Math.cos(i)) + wy/2;
  	modRad = Math.random()*16;
  	rad = i;  

  // create radial gradient
      var grd = ctx.createRadialGradient(mx, my, modRad/6, mx, my, modRad);

      grd.addColorStop(0, 'rgba(255,255,255,1)');
      grd.addColorStop(1, 'rgba(255,0,0,0)');  
  
		ctx.beginPath(); 
    ctx.fillStyle = grd;
  	ctx.arc(mx, my, modRad, 0, 3*Math.PI, false);
    ctx.fill();     
}