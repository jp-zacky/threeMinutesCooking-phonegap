function setData(url, callback) {
  $.get(url, function(data) {
    var h3 = $(data.responseText).find('h3'); // 料理名
    var title = $(h3[0]).html();
    var h4 = $(data.responseText).find('h4'); // 人前
    var number = $(h4[0]).html();

    var tr = $(data.responseText).find('tr'); // 材料と手順
    var hows = new Array();

    for (var i = 0; i < tr.length; i++) {
      var how = $(tr[i]).html();
      hows.push(how);
    }

    var li = $(data.responseText).find('li'); // アドバイス等
    var points = new Array();

    for (var i = 0; i < li.length; i++) {
      var point = $(li[i]).html();
      points.push(point);
    }

    callback(title, number, hows, points);
  });
}

function draw(title, number, hows, points) {
  title = "<h2>" + title + "</h2>";
  $("p.title").html(title);
  $("p.number").html(number);
  howsForMaterialsAndMakes(hows);
  drawPoints(points);
  for (var i = 0; i < points.length; i++) {
    console.log(points[i]);
  }
}

function drawPoints(points) {
  var str = "<hr>"
  for (var i = 0; i < points.length; i++) {
    if (points[i].search(/人前あたり/) > -1) {
      for (var j = i; j < points.length; j++) {
        str = str + "<p>" + points[j] + "</p>";
      }
    }
  }
  $("p.points").html(str);
}

function howsForMaterialsAndMakes(hows) {
  var materials = new Array();
  var makes = new Array();
  for (var i = 0; i < hows.length; i++) {
    if (hows[i].search(/class=\"number\"/) > -1) {
      hows[i] = hows[i].replace(/<td>/g, "");
      hows[i] = hows[i].replace(/<\/td>/g, "");
      hows[i] = hows[i].replace(/<div.*\/div>/, "");
      hows[i] = hows[i].replace(/<img.*>/, "");

      makes.push(hows[i]);
    } else if (hows[i].search(/colspan=\"2\"/) > -1) {
      hows[i] = hows[i].replace(/<td.*colspan=\"2\">/, "");
      hows[i] = hows[i].replace(/<\/td>/, "");

      materials.push(hows[i]);
    } else if (hows[i].search(/class=\"sub1\"/) > -1) {
      hows[i] = hows[i].replace(/<td\sclass=\"sub1\">/, "");
      hows[i] = hows[i].replace(/<td>/g, "");
      hows[i] = hows[i].replace(/<\/td>/g, "");
      hows[i] = hows[i].replace(/\s/, "");

      materials.push(hows[i]);
    } else if (hows[i].search(/class=\"sub2\"/) > -1) {
      hows[i] = hows[i].replace(/<td\sclass=\"sub2\">/, "");
      hows[i] = hows[i].replace(/<td>/g, "");
      hows[i] = hows[i].replace(/<\/td>/g, "");
      hows[i] = hows[i].replace(/\s/, "");

      materials.push(hows[i]);
    } else if (hows[i].search(/<td>.*<\/td><td>.*<\/td>/) > -1) {
      hows[i] = hows[i].replace(/<td>/g, "");
      hows[i] = hows[i].replace(/<\/td>/g, "");

      materials.push(hows[i]);
    } else {
      alert("error: " + hows[i]);
    }
  }
  drawMaterials(materials);
  drawMakes(makes);
}

function drawMaterials(materials) {
  var str = "";
  for (var i = 0; i < materials.length; i++) {
    str = str + "<p>" + materials[i] + "</p>";
  }
  $("p.materials").html(str);
}

function drawMakes(makes) {
  var str = "<hr><ol>";
  for (var i = 0; i < makes.length; i++) {
    str = str + "<li>" + makes[i] + "</li><br>";
  }
  str = str + "</ol>"
  $("p.makes").html(str);
}

function cooking() {
  var date = form.year.value + form.month.value + form.day.value;
  var str = form.year.value + "/" + form.month.value + "/" + form.day.value;
  var url = 'http://www.ntv.co.jp/3min/recipe/' + date + '.html';
  setData(url, draw);
  $("p.date").html(str);
}
