function tabUpdated(tabId, changeInfo, tab)
{
	checkSocial(tab);
}

function checkSocial(tab)
{
	var tablink = tab.url;
	var site = "facebook.com";
	var re = new RegExp(site,"i");
	if ( tablink.match(re) == site )
	{
		checkCookie();
		todayTracking();
	}
	
}

// Trying out cookies
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function checkCookie()
{
	var days= getCookie("days");
	var hrs = getCookie("hrs");
	var min = getCookie("min");
	var sec = getCookie("sec");
	var dt1 = new Date();
	var dt2 = getCookie("today");
	//var todayUsage = getCookie("todayUsage");
	var alrm = getCookie("alarmFired");
	if ( days == null  || days == NaN || days == "")
	{
		var dt = new Date();
		setCookie("days","0",365);
		setCookie("hrs","0",365);
		setCookie("min","0",365);
		setCookie("sec","0",365);
		setCookie("startdate",dt,365);
	}
	else
	{		
		sec = parseInt(sec) + 3;
		if(alrm=="false"&&Math.abs(new Date(dt2)-dt1)>(1*60*60*1000))
		{
			alert("You have been using facebook for more than an hour today.");
			setCookie("alarmFired","true",1);
		}
		if ( sec >= 60 )
		{			
			min = parseInt(min) + 1 ;
			sec = sec - 60;
			if ( min >= 60 )
			{			
				hrs = parseInt(hrs) + 1 ;
				min = min - 60;
				if ( hrs >= 24 )
				{
					days = parseInt(days) + 1;
					hrs = hrs - 24;
				}
			}
		}
		setCookie("sec",sec,10);
		setCookie("days",days,365);
		setCookie("hrs",hrs,365);
		setCookie("min",min,365);
	}
	
}
function todayTracking()
{
	var min = getCookie("todayUsageMin");
	if ( min == null || min == "" )
	{
		setCookie("todayUsageMin","0",1);
	}else
	{
		min = parseFloat(min);
		min = min + 0.05;
		setCookie("todayUsageMin",min,1);
	}
}

setInterval(function(){chrome.tabs.getSelected(null,checkSocial)},3000);
//setInterval(todayTracking,30000);
chrome.tabs.onUpdated.addListener(tabUpdated);
var date = new Date();
var date1 = getCookie("today");
if (date1 !=null )
	date1 = new Date(date1);
if (date1 !=null && Math.abs(date-date1)<24*60*60*1000)
{
	
}else
{
	setCookie("today",date,10);
	setCookie("todayUsageMin","0",10);
	setCookie("alarmFired","false",10);
}