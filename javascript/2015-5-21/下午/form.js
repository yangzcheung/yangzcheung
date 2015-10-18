//版权 北京智能社©, 保留所有权利

var json={
	email:	/^[a-z]\w{5,17}@[a-z0-9\-]+(\.[a-z]{2,6}){1,2}$/i,
	age:	/^(1[89]|[2-9]\d|100)$/,
	name:	/^[\u4e00-\u9fa5]{2,32}$/
};

function checkForm(id)
{
	var oForm=document.getElementById(id);
	var aInput=oForm.getElementsByTagName('input');
	
	//失去焦点校验
	for(var i=0;i<aInput.length;i++)
	{
		var re=json[aInput[i].name];
		
		if(re)
		{
			(function (re){
				aInput[i].onblur=function ()
				{
					if(re.test(this.value)==false)
					{
						this.className='err';
						this.parentNode.children[1].style.display='inline';
					}
					else
					{
						this.className='ok';
						this.parentNode.children[1].style.display='none';
					}
				};
			})(re);
		}
	}
	
	//提交时校验
	oForm.onsubmit=function ()
	{
		var ok=true;
		
		for(var i=0;i<aInput.length;i++)
		{
			var re=json[aInput[i].name];
			
			if(re)
			{
				if(re.test(aInput[i].value)==false)
				{
					//alert(aInput[i].name+'你写错了');
					aInput[i].className='err';
					this.parentNode.children[1].style.display='inline';
					
					ok=false;
				}
				else
				{
					aInput[i].className='ok';
					this.parentNode.children[1].style.display='none';
				}
			}
		}
		
		if(ok==false)
		{
			return false;
		}
	};
}