class Event {
    constructor(eventName, startTime, endTime) {
      this.name = eventName;
      this.start = startTime;
      this.end = endTime;
      this.fillColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      console.log(this.fillColor);
    }
  }
  let c = document.getElementById("scheduledisplay");
  let w = c.width;
  let h = c.height;
  var context = c.getContext("2d");
  document.getElementById("addtoschedule").addEventListener("click", addEvent);
  document.getElementById("dayradio").addEventListener("click", updateDisplay);
  // document.getElementById("weekradio").addEventListener("click",updateDisplay);

  let today = [];
  function addEvent() {
    let eName = document.getElementById("eventname").value;
    let eStart = document.getElementById("starttime").value;
    let eEnd = document.getElementById("endtime").value;
    if (!compareTime(eStart, eEnd)) {
      alert("The start time has to come before the end time!");
      return;
    }
    if (eName.length == 0) {
      alert("The event name cannot be empty!");
      return;
    }
    today.push(new Event(eName, eStart, eEnd));
    console.log(today);
    updateDisplay();
  }

  updateDisplay();
  function updateDisplay() {
    w = c.width;
    h = c.height;
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, w, h);
    const rbs = document.querySelectorAll('input[name="display"]');

    let sv;
    for (const rb of rbs) {
      if (rb.checked) {
        sv = rb.value;
        break;
      }
    }
    if (sv == "Day") {
      drawDay(0, 0, w, h);
    }
    // else{
    //   for(let i =0; i < 7; i++){
    //     drawDay(Math.floor(i*w/7),0,Math.floor(w/7),h);
    //   }
    // }
  }
  function drawDay(x, y, wi, he) {
    context.beginPath();
    context.rect(x, y, x + wi, y + he);
    context.stroke();
    for (let i = 1; i < 24; i++) {
      context.fillStyle = "rgb(0,0,0)";
      context.font = "7pt Arial";
      context.textAlign = "left";
      let text = ((i - 1) % 12) + 1 + ":00 ";
      if (Math.floor(i / 12) == 0) {
        text += "AM";
      } else {
        text += "PM";
      }
      context.fillText(text, 5, Math.round((i * he) / 24) + 3);
      context.rect(x + 50, Math.round((i * he) / 24), wi, 0);
      context.stroke();
    }
    context.beginPath();
    context.rect(x + 50, 0, 0, he);
    context.stroke();
    for (let i = 0; i < today.length; i++) {
      context.beginPath();
      context.fillStyle = today[i].fillColor;
      console.log(context.fillStlye);
      let sY = translatetime(today[i].start, he);
      let eY = translatetime(today[i].end, he);
      context.fillRect(x + 51, sY, 727, eY - sY);
      context.stroke();
      context.beginPath();
      let text = (
        today[i].name +
        "\nfrom " +
        today[i].start +
        " to " +
        today[i].end
      ).toString();
      context.fillStyle = "black";
      context.font = "20px Arial";
      context.textAlign = "center";
      context.fillText(text, 100 + 677 / 2, sY + (eY - sY) / 2);
      context.stroke();
    }
  }

  function translatetime(t, he) {
    let hrs = parseInt(t.substring(0, 2));
    let mins = parseInt(t.substring(3));
    let tY = Math.round((hrs * he) / 24 + (mins * he) / 24 / 60);
    return tY;
  }
  function compareTime(t1, t2) {
    let hrs1 = parseInt(t1.substring(0, 2));
    let mins1 = parseInt(t1.substring(3));
    let hrs2 = parseInt(t2.substring(0, 2));
    let mins2 = parseInt(t2.substring(3));
    let time1 = hrs1 * 100 + mins1;
    let time2 = hrs2 * 100 + mins2;
    return time1 < time2;
  }