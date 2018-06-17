

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 5;

autoGetPage(canvas);
listenToUser(canvas);


var eraserEnabled=false

red.onclick=function(){
    context.fillStyle='red';
    context.strokeStyle='red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
}
green.onclick=function(){
    context.fillStyle='green';
    context.strokeStyle='green';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
}
blue.onclick=function(){
    context.fillStyle='#0000E8';
    context.strokeStyle='#0000E8';
    blue.classList.add('active');
    green.classList.remove('active');
    red.classList.remove('active');
}

eraser.onclick=function(){
    eraserEnabled =true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}

pen.onclick=function(){
    eraserEnabled=false
    pen.classList.add('active');
    eraser.classList.remove('active');
}

thin.onclick = function(){
    lineWidth = 5;
}
thick.onclick = function(){
    lineWidth = 8;
}

clear.onclick = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

save.onclick = function(){
   var url = canvas.toDataURL();
   var a = document.createElement('a');
   document.body.appendChild(a);
   a.href = url;
   a.download = '保存的画';
   a.target = '_blank';
   a.click();
}
//监听鼠标
function listenToUser(canvas){   
//鼠标按下时
    var using = false;
    var lastPoint = {x: undefined, y: undefined}

    if(document.body.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            using = true;
            if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10);
            }else{
                lastPoint = {"x":x,"y": y};
            }
        }
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            if(!using){ return}
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10);
            }else{
                    var newPoint = {"x":x, "y": y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint = newPoint; //实时更新点
            }
        }
        canvas.ontouchend = function(aaa){
            using = false;
        }
    }else{
        //非触屏设备
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX;
            var y = aaa.clientY;
            using = true;
            if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10);
            }else{
                lastPoint = {"x":x,"y": y};
            }
        }
        
        //鼠标移动时
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX;
            var y = aaa.clientY;
            if(!using){ return}
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10);
            }else{
                    var newPoint = {"x":x, "y": y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint = newPoint; //实时更新点
            }
        }
        
        //鼠标抬起时
        canvas.onmouseup = function(aaa){
                using = false;
            }
        }
    }


//画圆
function drawCircle(x,y,radius){
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
}

//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1); //起点
    context.lineWidth = lineWidth;
    context.lineTo(x2,y2); //终点
    context.stroke();
    context.closePath();
}



//自动监听网页大小
function autoGetPage(canvas){
        getPage();

    window.onresize = function(){
        getPage();
    }
    function getPage(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    } 
}
