//Display the current date and time
var currentTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

// Update the time each minute
function dayTime() {
    // set the current time format
    currentTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

    // Empty the curent day element
    $('#currentDay').empty();

    // Display the current time
    $('#currentDay').text(currentTime);
}

// invoke function to eliminate 1s gap when on page load
dayTime();

setInterval(dayTime, 1000);

// Object to store time and user activities
var daySchedule = [
    {
        time: "0600",
        activity: ""
    },
    {
        time: "0700",
        activity: ""
    },
    {
        time: "0800",
        activity: ""
    },
    {
        time: "0900",
        activity: ""
    },
    {
        time: "1000",
        activity: ""
    },
    {
        time: "1100",
        activity: ""
    },
    {
        time: "1200",
        activity: ""
    },
    {
        time: "1300",
        activity: ""
    },
    {
        time: "1400",
        activity: ""
    },
    {
        time: "1500",
        activity: ""
    },
    {
        time: "1600",
        activity: ""
    },
    {
        time: "1700",
        activity: ""
    },
    {
        time: "1800",
        activity: ""
    }
];

// display time properties from the daySchedule object to the corresponding elements
function displayTimes() {

    // iterate through the daySchedule object then display the corresponding value in the time container on the page
    for (var t = 0; t < daySchedule.length; t++) {

        // set the format for the currentTime
        $('#time-' + t).text(moment(daySchedule[t].time, "HH").format("h A"));

    }
}

// for setting the color of each activity based on current time
function changeColor() {

    // iterate through the daySchedule object 
    for (var c = 0; c < daySchedule.length; c++) {
        currentTime = moment().format('HH');
        var d = daySchedule[c].time;

         // divide the object's time value by 100 to get two digits (representing hours)
         d = daySchedule[c].time / 100;

        // declare the variable that represents each iteration of the activity elements
        var a = $('#activity-' + c);

        // determine if the time value in the object is less than, greater than, or equal to the current time
        if (d < currentTime) {

            // apply grey background to activity slots for previous hours
            a.addClass('past');
            a.removeClass('present');
            a.removeClass('future');

        }
        else if (d > currentTime) {

            // apply green background to activity slots for future hours
            a.removeClass('past');
            a.removeClass('present');
            a.addClass('future');

        }
        else {

            // apply red background to activity slots for the current hour
            a.removeClass('past');
            a.addClass('present');
            a.removeClass('future');

        }
    }
}

// check if the activity entered has already been written to local storage
function checkActivity(btnID) {

    var currentActivity = $('#activity-' + btnID).val();
    //console.log (currentActivity)

    if (localStorage.getItem("daySchedule") !== null) {
        var scheduleCheck = JSON.parse(localStorage.getItem("daySchedule"));
        scheduleCheck[btnID].activity = currentActivity;
        saveSchedule(scheduleCheck);

    } else {
        daySchedule[btnID].activity = currentActivity;
        saveSchedule(daySchedule);
    }

    // render the daySchedule to the page
    showSchedule();

}

// save the daySchedule to local storage
function saveSchedule(scheduleJSON) {
    localStorage.setItem("daySchedule", JSON.stringify(scheduleJSON));
}

function showSchedule() {

    // display times and apply the color change
    displayTimes();
    changeColor();

    var lastSchedule = JSON.parse(localStorage.getItem("daySchedule"));

    // iterate through the daySchedule object
    for (var r = 0; r < daySchedule.length; r++) {

        // determine whether data exists in the copy of local storage data
        if (lastSchedule !== null) {

            // data exists, so render the data from local storage to each activity slot on the page
            document.querySelector('#activity-' + r).innerHTML = lastSchedule[r].activity;

        } else {

            return;

        }
    }
}

// clear the schedule when clicked
$('#clear').on ('click', function () {
    // Clear the time slots of all activity slots and local storage
    $('.activity').empty();
    localStorage.clear();
    
});

// save the activity when the save button is clicked
$('.save').on('click', function (event) {

    event.preventDefault();
    var btnID = $(this).attr('id');
    btnID = parseInt(btnID.split("button-")[1]);
    checkActivity(btnID);

    showSchedule();

});

// render the schedule on page load
showSchedule();