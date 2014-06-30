var zones = {
	5:{"name":"Office", "level":100, "stamp": new Date(), "diff":null, "div":'office'},
	6:{"name":"Kitchen", "level":100, "stamp": new Date(), "diff":null, "div":'kitchen'},
	7:{"name":"Living Room", "level":100, "stamp": new Date(), "diff":null, "div":'living_room'}
	};

var recent_id = -1;

function getSortedKeys(obj)
{
  var keys = [];
  for(var key in obj) keys.push(key);
  return keys.sort(function(a,b){ return obj[b]-obj[a]});
}

function zone_alert(zone, stamp)
{
  zones[zone].level = 100.0;
  zones[zone].stamp = stamp;
}

function refresh_alert()
{
        var div;
	for(zone in zones)
	{
        	div = document.getElementById( zones[zone].div );
	        div.style.opacity = zones[zone].level/100.0;
        	if(zones[zone].level>0)
                	zones[zone].level = zones[zone].level/1.1;
	}        

  var zone_status = '';
  var sortedKeys = Object.keys(zones);//getSortedKeys(zone_stamps);
  for(index in sortedKeys) 
  { 
    var key = sortedKeys[index];
    now = new DateHere().getTime();
    diff = purdy_up_elapsed(now-zones[key].stamp);
    zones[key].diff = diff;
    zone_status += diff + ':' + zones[key].name + '[' + key +']<br />';
  }
  $("#status").html(zone_status);
}

var recent_messages = new Array();
var max_displayed_messages = 100;
function log(msg)
{
	recent_messages.unshift (msg);
	if(recent_messages.length > max_displayed_messages) recent_messages.pop();
	$("#log").html("Last " + recent_messages.length + " Messages: <br />");
	for (var i in recent_messages) 
	{
		$("#log").append(recent_messages[i] + '<br />');
	}
}

function purdy_up_elapsed(elapsed)
{
  var res = ""; //"["+Math.round(elapsed/1000)+"]";
  var sec = Math.round(elapsed/1000.0);
  var monthsecs= 2419200;
  var weeksecs = 604800;
  var daysecs = 86400;
  var hoursecs = 3600;
  
  var weeks = Math.floor(sec/weeksecs);
  if(weeks >= 1)
  {
    res += weeks + "w ";
    sec -= (weeks * weeksecs);
  }
  var days = Math.floor(sec/daysecs);
  if(days >= 1)
  {
    res += days + "d ";
    sec -= (days * daysecs);
  }
  var hours = Math.floor(sec/hoursecs);
  if(hours >= 1)
  {
    res += hours + "h ";
    sec -= (hours * hoursecs);
  }
  var mins = Math.floor(sec/60);
  if(mins >= 1)
  {
    res += mins + "m ";
    sec -= (mins * 60);
  }

  res += sec + 's';

  return res;
}

function DateHere()
{
  var d = new Date();
  d.setHours(d.getHours());
  return d;
}
function get_recent() 
{
	var recentAPI = "/recent.json";
	$.getJSON( recentAPI, {
	from_id: recent_id 
	})
	.done(
	  function( data ) 
	  {
	
	$.each(data, function (i, item) 
{  
if (item.id > recent_id)
{ recent_id = item.id;
zone_alert(item.zone, new Date(item.stamp));
log("Testes:"+item.stamp + " : " + new DateHere());
}
});


    });
}
//setInterval(refresh_alert,1000)
