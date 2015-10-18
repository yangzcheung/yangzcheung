// JavaScript Document

function TabSwitchAuto(id)
{
	var _this=this;
	
	TabSwitch.call(this, id);
	
	this.now=0;
	
	/*setInterval(function (){
		_this.next();
	}, 1000);*/
	
	setInterval(function (){
		_this.next();
	}, 1000);
}

TabSwitchAuto.prototype=new TabSwitch();

TabSwitchAuto.prototype.next=function ()
{
	this.now++;
	
	if(this.now==this.aBtn.length)
	{
		this.now=0;
	}
	
	this.click(this.aBtn[this.now]);
};





