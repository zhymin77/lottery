window.onload = function() {
  lottery.initListens();
  document.getElementById('importlist').addEventListener('mousedown', function() {
    document.getElementById('layer').style.display = 'block';
  });
};
var Lottery = Lottery || function() {};
Lottery.prototype.initListens = function() {
  document.getElementById('start').addEventListener('mousedown', function() {
    document.getElementById('olwinner').innerHTML = '';
    lottery.clearInterval();
    lottery.initData(lottery.data);
    lottery.start();
  });
  document.getElementById('stop').addEventListener('mousedown', function() {
    lottery.stop();
  });
  document.getElementById('continue').addEventListener('mousedown', function() {
    lottery.clearInterval();
    lottery.start();
  });
  document.getElementById('saveuser').addEventListener('mousedown', function() {
    var data = document.getElementById('textarea').value.trim();
    data = data.replace(new RegExp("，","gm"),",");
    lottery.initData(data);
    document.getElementById('layer').style.display = 'none';
  });
};
Lottery.prototype.initData = function(data) {
  var uArray = new Array();
  if (this.nonEmpty(data)) {
    uArray = data.split(',');
  }
  this.data = data;
  this.lo1Index = 0;
  this.lo2Index = 0;
  this.lo1U = new Array();
  this.lo2U = new Array();
  this.intervalA = new Array();
  var ol = document.getElementById('ollist');
  ol.innerHTML = '';
  for(var i=0; i < uArray.length; i++) {
    if (i % 2 == 0) this.lo1U.push(uArray[i].trim());
    else this.lo2U.push(uArray[i].trim());
    var li = document.createElement('li');
    var txt = document.createTextNode(uArray[i]);
    li.appendChild(txt);
    ol.appendChild(li);
  }
};
Lottery.prototype.start = function() {
  if (this.nonEmpty(this.lo1U) && this.lo1U.length>0) this.slide(document.getElementById('lo1'));
  if (this.nonEmpty(this.lo2U) && this.lo2U.length>0) this.slide(document.getElementById('lo2'));
};
Lottery.prototype.slide = function(loC) {
  var This = this;
  this.intervalA.push(window.setInterval(function(){
    loC.innerHTML = '';
    var u = '';
    if (loC.id == 'lo1') {
      This.lo1Index ++;
      if (This.lo1Index >= This.lo1U.length) This.lo1Index = 0;
      u = This.lo1U[This.lo1Index];
    } else {
      This.lo2Index ++;
      if (This.lo2Index >= This.lo2U.length) This.lo2Index = 0;
      u = This.lo2U[This.lo2Index];
    }
    if (u != undefined) {
      var div = document.createElement('div');
      var txt = document.createTextNode(u);
      div.appendChild(txt);
      div.className = 'sliding';
      loC.appendChild(div);
    }
  }, 500));
};
Lottery.prototype.clearInterval = function() {
  if (this.nonEmpty(this.intervalA) && this.intervalA.length>0) {
    for(var i=0; i<this.intervalA.length; i++) {
      window.clearInterval(this.intervalA[i]);
    }
  }
};
Lottery.prototype.stop = function() {
  this.clearInterval();
  var lo1 = document.getElementById('lo1').childNodes.item(0);
  var lo2 = document.getElementById('lo2').childNodes.item(0);
  if (this.nonEmpty(lo1)) {
    lo1.className = 'item';
    this.remove(this.lo1U, lo1.innerHTML.trim());
    this.addWinner(lo1.innerHTML.trim());
  }
  if (this.nonEmpty(lo2)) {
    lo2.className = 'item';
    this.remove(this.lo2U, lo2.innerHTML.trim());
    this.addWinner(lo2.innerHTML.trim());
  }
};
Lottery.prototype.addWinner = function(winner) {
  var olNs = document.getElementById('olwinner').childNodes;
  var exists = false;
  for (var i=0; i<olNs.length; i++) {
    if (olNs[i].innerHTML == winner) {
      exists = true;
      break;
    }
  }
  if (!exists) {
    var li = document.createElement('li');
    var txt = document.createTextNode(winner);
    li.appendChild(txt);
    li.className = 'winnerShow';
    document.getElementById('olwinner').appendChild(li);
  }
};
Lottery.prototype.remove = function(arr, item) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] == item) {
      arr.splice(i, 1);
      break;
    }
  }
};
Lottery.prototype.nonEmpty = function(obj) {
  return obj != null && obj != undefined;
};
lottery = new Lottery();
