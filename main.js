var clock = document.getElementById("clock");
var ctx = clock.getContext("2d");
var radius = clock.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9
setInterval(machine, 1000);

function machine() {
  frame(ctx, radius);
  numbers(ctx, radius);
  time(ctx, radius);
}

function frame(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = '#f0f0f0';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#4D2820');
  grad.addColorStop(0.5, 'rgb(255, 99, 71)');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#123';
  ctx.fill();
}

function numbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function time(ctx, radius){
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    //hour count
    hours=hours%12;
    hours=(hours*Math.PI/6)+
    (minutes*Math.PI/(6*60))+
    (seconds*Math.PI/(360*60));
    hands(ctx, hours, radius*0.5, radius*0.07);

    //minute count
    minutes=(minutes*Math.PI/30)+(seconds*Math.PI/(30*60));
    hands(ctx, minutes, radius*0.7, radius*0.07);
    
    // second count
    seconds=(seconds*Math.PI/30);
    hands(ctx, seconds, radius*0.9, radius*0.02);
}

function hands(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}