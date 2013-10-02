var stop = false;
var start_date;

function startTimer() {
    var time = localStorage["duration"];

    // set the date we're counting down to
    start_date = new Date().getTime();
    target_date = start_date + (time * 60 * 1000);

    // variables for time units
    var hours, minutes, seconds;

    // get tag element
    var countdown = document.getElementById("countdown");

    makeStopBtn();

    // update the tag with id "countdown" every 1 second
    setInterval(function () {
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;

        if (seconds_left > 0 && stop == false) {

            // do some time calculations
            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;

            minutes = parseInt(seconds_left / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            seconds = parseInt(seconds_left % 60);
            if (seconds < 10 && minutes > 0) {
                seconds = "0" + seconds;
            }

            if (hours > 0) {
                if (minutes == 0) {
                    countdown.innerHTML = hours + "h 00m " + seconds + "s";
                } else {
                    countdown.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
                }
            } else if (minutes > 0) {
                // format countdown string + set tag value
                countdown.innerHTML = minutes + "m " + seconds + "s";
            } else {
                countdown.innerHTML = seconds + "s";
            }
        } else if (seconds_left <= 0 && stop == false) {
            showTimeOver();
        }

    }, 1000);
}

function stopTimer(start_date) {
    stop = true;
    calculateTime();
    makeResetBtn();
    showSuccess();
}

function makeStopBtn() {
    //get start/stop button
    var button = document.getElementById("button");
    button.innerHTML = "Fertig";
    button.className = "btn btn-danger btn-lg full";
    button.setAttribute("onclick","stopTimer();")
}

function makeResetBtn() {
    //get start/stop button
    var button = document.getElementById("button");
    button.innerHTML = "Zurück";
    button.className = "btn btn-info btn-lg full";
    button.setAttribute("onclick","navigateBack();")
}

function showTimeOver() {
    info = document.getElementById("info");
    info.className = "alert alert-danger text-center bold full";
    info.innerHTML = "Zeit abgelaufen!";
}

function showSuccess() {
    info = document.getElementById("info");
    info.className = "alert alert-success text-center bold full";
    info.innerHTML = "Marsch geschafft!";
}

function navigateBack() {
    load("content/marsch/maersche.html");
    stop = false;
}

function calculateTime() {
    var current_date = new Date().getTime();
    var time = (current_date - start_date) / 1000;
    var hours, minutes, seconds;

    hours = parseInt(time / 3600);
    time = time % 3600;

    minutes = parseInt(time / 60);
    if (minutes < 10 ) {
        minutes = "0" + minutes;
    }

    seconds = parseInt(time % 60);
    if (seconds < 10 && minutes > 0) {
        seconds = "0" + seconds;
    }

    document.getElementById("first-line").innerHTML = "Marsch absolviert in:";
    if (hours > 0) {
        document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s";
    } else if (minutes > 0) {
        document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s";
    } else {
        document.getElementById("countdown").innerHTML = seconds + "s";
    }
    
}
