var zones = new Object;
var recentAPI = "/zones.json";
$.getJSON( recentAPI).done(
  function( data ){
    $.each(data, function (i, SingleObjectToConvert)	{
      var NewObject = new Object();
      NewObject.name =  SingleObjectToConvert.name;
      NewObject.stamp =  new Date();
      NewObject.diff =  null;
      NewObject.div =  SingleObjectToConvert.div;
      NewObject.created_at =  SingleObjectToConvert.created_at;
      NewObject.id =  SingleObjectToConvert.id;
      NewObject.updated_at =  SingleObjectToConvert.updated_at;
      NewObject.zone_id =  SingleObjectToConvert.zone_id;
      NewObject.animate = function(){
        var e = document.getElementById(this.div);
        e.classList.remove("animate");
        e.offsetWidth = e.offsetWidth; // <-- Not sure why but this is crucial for cooky CSS reasons
        e.classList.add("animate");
      }
      zones[NewObject.zone_id] = NewObject;
    });
  }
);

function getSortedKeys(obj)
{
  var keys = [];
  for(var key in obj) keys.push(key);
  return keys.sort(function(a,b){ return obj[b]-obj[a]});
}

function zone_alert(zone, stamp)
{
  zones[zone].animate();
  zones[zone].stamp = stamp;
}

function refresh_alert()
{
  var zone_status = '';
  var sortedKeys = Object.keys(zones);
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

var recent_id = -1;

function get_recent() 
{
  var recentAPI = "/recent.json";
  $.getJSON( recentAPI, {
    from_id: recent_id 
  }).done(function( data ){
    $.each(data, function (i, item){  
      if (item.id > recent_id){ 
        recent_id = item.id;
        zone_alert(item.zone, new Date(item.stamp));
        log("Testes:"+item.stamp + " : " + new DateHere());
      }   
    });
  });
}

$(function() {
  var faye = new Faye.Client('http://192.168.1.77:9292/faye');
  faye.subscribe("/messages/new", function(data){
    try
    {
      data = JSON.parse(data);
    }
    catch(e)
    {
      log("Can't parse some JSON!");
    }
    log(data.msg);
  });
  faye.subscribe("/messages/zonestatus", function(data){
    var msg = JSON.parse(data);
    log(msg.stamp + ' ' + zones[msg.zone].name + "[" + msg.zone + "] ");
    zone_alert(msg.zone, new Date(msg.stamp));
    bubblesInc(zones[msg.zone].name );
  });
});

setInterval(refresh_alert,1000);

function bubblesPrint()
{
  var keys = Object.keys(newbubbles);
  $( "#sparklines" ).html('<table>');
  for (var j = 0; j < keys.length; j++){
    var str = keys[j];
    var tagName = 'sparkline'+str.replace(/\W/g, '')
    $("#sparklines").append('<tr><td>' + str + "</td><td> <span class='"+tagName+"' id='"+tagName+"'></span></td></tr>");
    $("#"+tagName).sparkline(oldbubbles[str], {type: 'line', height: '60', barColor: 'red', chartRangeMax: bubblesMaxValue()} );
  }
  $( "#sparklines" ).append('</table>');
}
numbubbles = 288;
window.setInterval(function(){bubblesShift(); bubblesPrint();},600 * 1000);

