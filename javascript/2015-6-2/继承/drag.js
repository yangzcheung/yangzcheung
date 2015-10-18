// JavaScript Document

function Drag(id)
{
	if(!id)return;
	
	var _this=this;
	
	this.oDiv=document.getElementById(id);
	this.disX=0;
	this.disY=0;
	
	this.oDiv.onmousedown=function (ev)
	{
		_this.down(ev);
		return false;
	};
}

Drag.prototype.down=function (ev)
{
	var oEvent=ev||event;
	
	var _this=this;
	
	this.disX=oEvent.clientX-this.oDiv.offsetLeft;
	this.disY=oEvent.clientY-this.oDiv.offsetTop;
	
	document.onmousemove=function (ev)
	{
		_this.move(ev);
	};
	
	document.onmouseup=function ()
	{
		_this.up();
	};
	
	this.oDiv.setCapture && this.oDiv.setCapture();
};

Drag.prototype.move=function (ev)
{
	var oEvent=ev||event;
	
	this.oDiv.style.left=oEvent.clientX-this.disX+'px';
	this.oDiv.style.top=oEvent.clientY-this.disY+'px';
	
	//this.oDiv.innerHTML=this.oDiv.offsetLeft+','+this.oDiv.offsetTop;
	
	this.oDiv.style.borderLeft=this.oDiv.offsetLeft+'px solid black';
};

Drag.prototype.up=function ()
{
	document.onmousemove=null;
	document.onmouseup=null;
	
	this.oDiv.releaseCapture && this.oDiv.releaseCapture();
};



