$(document).ready(function(){
  var tempbtnclick= 0;
  $("#tempbtn").on("click",function(){
    tempbtnclick ++;
    if(tempbtnclick%2==0){
      var far= $("#d2").html();
      var cel= (far-32)/1.8;
      cel = Math.round(cel*1000)/1000;
      $("#d2").html(cel);
      $("#tempicon").removeClass();
      $("#tempicon").addClass("wi wi-celsius");
    }
    else{
    var cel= $("#d2").html();
    var far= (cel*1.8) + 32;
    far = Math.round(far*1000)/1000;
    $("#d2").html(far);
    $("#tempicon").removeClass();
    $("#tempicon").addClass("wi wi-fahrenheit"); }
  });
  $("#ref").on("click",function(){
    location.reload(true);
  });
  navigator.geolocation.getCurrentPosition(mymainf);
  function mymainf(a){
    //console.log(a.coords.accuracy);
    $("#c2").html(a.coords.latitude+"  <i class=\"wi wi-degrees\"></i>");
    $("#c3").html(a.coords.longitude+"  <i class=\"wi wi-degrees\"></i>");
    $.ajax({
      type: "POST",
      url : "https://maps.googleapis.com/maps/api/geocode/json?latlng="+a.coords.latitude+","+a.coords.longitude+"&key=AIzaSyD5oXlSv098KX6eSMIXrcMJ29ISCa89nSM",
      
      dataType : "json",
      success : function(json){
        console.log(json.status);
        console.log(json.results[0].formatted_address);
      var value =json.results[0].address_components.length; 
        //$("#c1").html(json.results[0].formatted_address);
        $("#c1").html(json.results[0].address_components[value-4].long_name+", "+json.results[0].address_components[value-3].long_name+", "+json.results[0].address_components[value-2].long_name);
      }
    });
   $.ajax({
      url : "https://api.darksky.net/forecast/7e345b73f211412d78ade88e1b9574bd/"+ a.coords.latitude +","+ a.coords.longitude ,
      data :{
        units : "si"
      },
      dataType : "jsonp",
      success : mycallback
    });
    function mycallback(res){   
      
      iconSwitcher("#weathicon",res.currently.icon);
      $("#c4").html(res.timezone);   
      $("#c5").html(moment(res.currently.time*1000).format("dddd, MMMM Do YYYY, h:mm A"));
      $("#d1").html(res.currently.summary);
      $("#d2").html(res.currently.temperature);
      $("#d3").html(res.currently.windSpeed +"  -  Metres per second");
      $("#d4").html(res.currently.pressure+"  -  Hectopascals");
      $("#d5").html(res.currently.humidity);
      $("#hourbasedsummary").html(res.hourly.summary);
      
      $("#daybasedsummary").html(res.daily.summary);
      for(var i=0;i<5;i++){
        var idstr= "#temphour";
        idstr += (i+1);
        
        
        $(idstr).html(res.hourly.data[i].temperature+" <i class=\"wi wi-celsius\" style=\"font-size:20px\"></i> - " +res.hourly.data[i].summary);
        idstr ="#hour";
        idstr += (i+1);
        $(idstr).html(moment(res.hourly.data[i].time*1000).format("h:mm A"));
        idstr="#iconhour";
        idstr +=(i+1);
        iconSwitcher(idstr,res.hourly.data[i].icon);
        idstr= "#tempday";
        idstr += (i+1);
        
        
        $(idstr).html(res.daily.data[i].temperatureMin+" <i class=\"wi wi-celsius\" style=\"font-size:20px\"></i> / "+res.daily.data[i].temperatureMax+" <i class=\"wi wi-celsius\" style=\"font-size:20px\"></i>");
        idstr ="#days";
        idstr += (i+1);
        $(idstr).html(res.daily.data[i].summary);
        idstr ="#day";
        idstr += (i+1);
        $(idstr).html(moment(res.daily.data[i].time*1000).format("Do , dddd"));
        idstr="#iconday";
        idstr +=(i+1);
        iconSwitcher(idstr,res.daily.data[i].icon);
      }
    }
    function iconSwitcher(idname,valuecheck){
      switch(valuecheck){
        case "clear-day":
          $(idname).removeClass();
          $(idname).addClass("wi wi-day-sunny");
          break;
        case "clear-night":
          $(idname).removeClass();
          $(idname).addClass("wi wi-night-clear");
          break;
        case "rain":
          $(idname).removeClass();
          $(idname).addClass("wi wi-rain");
          break;
        case "snow":
          $(idname).removeClass();
          $(idname).addClass("wi wi-snow");
          break;
        case "sleet":
          $(idname).removeClass();
          $(idname).addClass("wi wi-sleet");
          break;
        case "wind":
          $(idname).removeClass();
          $(idname).addClass("wi wi-windy");
          break;
        case "fog":
          $(idname).removeClass();
          $(idname).addClass("wi wi-fog");
          break;
        case "cloudy":
          $(idname).removeClass();
          $(idname).addClass("wi wi-cloudy");
          break;
        case "partly-cloudy-day":
          $(idname).removeClass();
          $(idname).addClass("wi wi-night-partly-cloudy");
          break;
        case "partly-cloudy-night":
          $(idname).removeClass();
          $(idname).addClass("wi wi-night-alt-partly-cloudy");
          break;
        default :
          $(idname).removeClass();
          $(idname).addClass("wi wi-na");
             }
    }
  }
  
  
  
  
  
  
});