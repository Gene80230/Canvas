
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoGetPage(canvas);
listenToUser(canvas);


var eraserEnabled=false;
eraser.onclick=function(){
    eraserEnabled = true;
    actions.className='actions x'
}

brush.onclick=function(){
    eraserEnabled = flase;
    actions.className='actions'
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
            console.log(x,y);
            using = true;
            if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10);
            }else{
                lastPoint = {"x":x,"y": y};
            }
        }
        canvas.ontouchmove = function(aaa){
            console.log('接触中.');
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
            console.log('结束接触');
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
    context.fillStyle='#0000E8';
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
}

//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.strokeStyle='#0000E8';
    context.moveTo(x1,y1); //起点
    context.lineWidth = 5;
    context.lineTo(x2,y2); //终点
    context.stroke();
    context.closePath();
}
var eraserEnabled = false
    eraser.onclick = function(){
        eraserEnabled = !eraserEnabled;
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
