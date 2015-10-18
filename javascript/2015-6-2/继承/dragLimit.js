// JavaScript Document

function DragLimit(id)
{
	Drag.call(this, id);
}

DragLimit.prototype=new Drag();


//alert(DragLimit.prototype.move);

var oldMove=DragLimit.prototype.move;

//重写父级方法——先执行父级本身的方法，然后再写子级的东西
DragLimit.prototype.move=function (ev)
{
	oldMove.call(this, ev);
	
	if(this.oDiv.offsetLeft<0)
	{
		this.oDiv.style.left=0;
	}
};

//重写父级的方法
/*
DragLimit.prototype.move=function (ev)
{
	var oEvent=ev||event;
	
	var l=oEvent.clientX-this.disX;
	var t=oEvent.clientY-this.disY;
	
	if(l<0)
	{
		l=0;
	}
	
	this.oDiv.style.left=l+'px';
	this.oDiv.style.top=t+'px';
};
*/









