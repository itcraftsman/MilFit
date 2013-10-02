function getXML(){
    var xmlhttp;
    // code for IE7+, Firefox, Chrome, Opera, Safari
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    // code for IE6, IE5
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function sendReq(url, handler) {
    req = getXML();
    if (req) {
        req.onreadystatechange = handler;
        req.open("get", url, true)
        req.send(null);
    }
}

function showContent() {
    if (req.readyState == 4) {
        var content = req.responseText;
        var wrapper = document.getElementById("wrapper");
        removeAllChildNodes(wrapper);
        wrapper.innerHTML = content;

        checkInfo();
    }
}

function removeAllChildNodes(element) {
    while (element.childNodes.length > 0) {
        element.removeChild(element.lastChild);
    }
}

function load(url) {
    if (load.arguments.length == 3) {
        localStorage["name"] = load.arguments[1];
        localStorage["duration"] = load.arguments[2];
    } 
    sendReq(url, showContent);
}

function checkInfo() {
    if (localStorage["name"]) {
        document.getElementById("name").innerHTML = localStorage["name"];
        localStorage.removeItem("name");
    }
    if (localStorage["duration"]) {
        duration = localStorage["duration"];
        if (duration > 60) {
            hours = parseInt(duration / 60);
            minutes = duration % 60;
            if (minutes < 10){
                minutes = "0" + minutes;
            }
            document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + "00s";
        } else {
            document.getElementById("countdown").innerHTML = localStorage["duration"] + "m " + "00s";
        }
    }
}


/*
function loadXMLDoc()
{
var xmlhttp;
if (window.XMLHttpRequest)
  {
  xmlhttp=new XMLHttpRequest();
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","ajax_info.txt",true);
xmlhttp.send();
}
*/