class Timer{
    constructor(length){
      if(timeToInt(length) <=0){
        return;
      }
      this.start = new Date().toLocaleTimeString();
      this.end = intToTime(timeToInt(this.start) + timeToInt(length));
      this.stopTimer = false;
      this.timer();
      this.intervalID = setInterval(function(){this.timer(); }.bind(this), 1000);
    }
    startTimer(length){

      clearInterval(this.intervalID);
      if(timeToInt(length) <=0){
        return;
      }
      var today = new Date();
      this.start =  Math.floor(new Date(today).getTime()/1000);
      this.end = this.start+timeToInt(length);
      this.stopTimer = false;
      this.timer();
      this.intervalID = setInterval(function(){this.timer(); }.bind(this), 1000);
    }
    timer() {
      var today = new Date();
      var curTime =  Math.floor(new Date(today).getTime()/1000);
      let remainingTime = this.end- curTime;
      if(remainingTime <0){
        alert("Timer is up!!")
        window.clearInterval(this.intervalID);
        return;
      }
      document.getElementById("writeToTimer").innerHTML = intToTime(remainingTime);
      if(this.stopTimer){
        window.clearInterval(this.intervalID);
        return;
      }
    }
    
  }
  let t = new Timer("");

  document.getElementById("startTimer").addEventListener("click",function(){
    let hrs = document.getElementById("hrs").value;
    if(hrs.length == 0){
      hrs = 0;
    }
    else{
      hrs = parseInt(hrs);
    }
    let mins = document.getElementById("mins").value;
    if(mins.length == 0){
      mins = 0;
    }
    else{
      mins = parseInt(mins);
    }
    let secs = document.getElementById("secs").value;
    if(secs.length == 0){
      secs = 0;
    }
    else{
      secs = parseInt(secs);
    }  
    let time =  hrs*3600+mins*60+secs;
    t.startTimer(intToTime(time));
  });
  function timeToInt(t) {
    if(t.length < 6){
      return -1;
    }
    let mult = 3600;
    var curTime = 0;
    console.log(t.indexOf(':'));
    for(let i = 0; i < 2; i++){
      curTime+=parseInt(t.substring(0,t.indexOf(':')))*mult;
      t = t.substring(t.indexOf(':')+1)
      mult/=60;
    }
    curTime+=parseInt(t);
    return curTime;
  }

  function intToTime(intt) {
    let hrs = Math.floor(intt / 60 / 60);
    intt = intt - Math.floor(intt / 60 / 60) * 60 * 60;
    let mins = Math.floor(intt / 60);
    let secs = intt - Math.floor(intt / 60) * 60;
    // console.log(hrs,mins,secs);
    let h;
    let m;
    let s;
    if (hrs < 10) {
      h = "0" + hrs;
    } else {
      h = "" + hrs;
    }

    if (mins < 10) {
      m = "0" + mins;
    } else {
      m = "" + mins;
    }

    if (secs < 10) {
      s = "0" + secs;
    } else {
      s = secs;
    }
    return h + ":" + m + ":" + s;
  }