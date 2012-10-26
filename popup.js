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
	var dt = getCookie("startdate");
	var todayUsage = getCookie("todayUsageMin");
	var ptag = document.getElementById("ptag");
	var msg = "You have been using facebook for ";
	if (days != null || days != NaN) {
		dt = new Date(dt);
		var date = dt.getDate();
		var month = dt.getMonth() + 1;
		var year = dt.getFullYear();
		if (days!=0)
			msg = msg + days +" days "+ hrs +" hours " ;//+ min + " min "+ sec + " sec "  ;
		else if (hrs!=0)
			msg = msg + hrs +" hours " + min + " min ";//+ sec + " sec "  ;
		else if (min!=0)
			msg = msg + min + " min "+ sec + " sec "  ;
		else
			msg = msg + sec + " seconds ";
	msg = msg + " starting " + date +"-"+ month+"-"+year;
		ptag.innerHTML = msg;
	}
	else
		ptag.innerHTML = "Timer not yet started";
	if ( todayUsage != null || todayUsage != "" )
	{
		ptag.innerHTML = ptag.innerHTML + "<br>" +"Todays usage: "+todayUsage+" min<br>";
	}
}

function resetTimer()
{
	var dt = new Date();
	setCookie("days","0",365);
	setCookie("hrs","0",365);
	setCookie("min","0",365);
	setCookie("sec","0",365);
	setCookie("startdate",dt,365);
}
function createButton()
{
	var button = document.getElementById("resetButton");
	button.onclick = resetTimer;
}
checkCookie();
createButton();