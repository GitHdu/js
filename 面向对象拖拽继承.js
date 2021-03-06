<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<style>
#div1{ width:100px; height:100px; background:red; position:absolute;}
#div2{ width:100px; height:100px; background:yellow; position:absolute; left:100px;}
</style>
<script>

window.onload = function(){
	var d1 = new Drag('div1');
	d1.init();

	var d2 = new ChildDrag('div2');
	d2.init();
};

function Drag(id){  //父类
	this.obj = document.getElementById(id);
	this.disX = 0;
	this.disY = 0;
}
Drag.prototype.init = function(){

	var This = this;

	this.obj.onmousedown = function(ev){
		var ev = ev || window.event;
		This.fnDown(ev);

		document.onmousemove = function(ev){
			var ev = ev || window.event;
			This.fnMove(ev);
		};
		document.onmouseup = function(){
			This.fnUp();
		};
		return false;
	};

};

Drag.prototype.fnDown = function(ev){
	this.disX = ev.clientX - this.obj.offsetLeft;
	this.disY = ev.clientY - this.obj.offsetTop;
};
Drag.prototype.fnMove = function(ev){
	this.obj.style.left = ev.clientX - this.disX + 'px';
	this.obj.style.top = ev.clientY - this.disY + 'px';
};
Drag.prototype.fnUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
};


function ChildDrag(id){   //子类
	Drag.call(this,id);
}

extend( ChildDrag.prototype , Drag.prototype );

ChildDrag.prototype.fnMove = function(ev){

	var L = ev.clientX - this.disX;
	var T = ev.clientY - this.disY;

	if(L<0){
		L = 0;
	}
	else if(L>document.documentElement.clientWidth - this.obj.offsetWidth){
		L = document.documentElement.clientWidth - this.obj.offsetWidth;
	}

	this.obj.style.left = L + 'px';
	this.obj.style.top = T + 'px';
};

function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}

</script>
</head>

<body>
<div id="div1"></div>
<div id="div2"></div>
</body>
</html>

