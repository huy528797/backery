export var vijsOut = {
  post: function (action_XMLReq, data_XMLReq) {
    if (data_XMLReq == null) data_XMLReq = {};
    var { origin, pathname } = window.location;

    // var api = origin + pathname + "&action_XMLReq=web_user/" + action_XMLReq;
    var api = "http://124.158.5.222:8000/VnetManager/api.jsp?node="+action_XMLReq+"&chart=TaiNguyen_ZaloApp_test"
    var xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          //document.getElementById("demo").innerHTML = xhttp.responseText;
          try {
            var res = JSON.parse(xhttp.responseText);
            if (res.errCode == -1) {
              alert(res.content);
              window.location.reload();
              // window.location.href = "/service/erp/login";
              return;
            }
          } catch (err) {}

          resolve(xhttp.responseText);
        }
      };
      xhttp.open("POST", api, true);
      xhttp.setRequestHeader("accept", "text/html");
      xhttp.send(JSON.stringify(data_XMLReq));
    });
  },
  post_formdata: function (action_XMLReq, formdata, data_XMLReq) {
    var api = window.location.href + "&action_XMLReq=web_user/" + action_XMLReq;
    for (var key in data_XMLReq) {
      api += "&" + key + "=" + data_XMLReq[key];
    }
    var xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resolve(xhttp.responseText);
        }
      };
      xhttp.open("POST", api, true);
      // xhttp.setRequestHeader("content-type", "multipart/form-data; charset=utf-8");
      xhttp.setRequestHeader("accept", "text/html");
      xhttp.send(formdata);
    });
  },
};