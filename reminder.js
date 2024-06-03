// Scripts/reminder.js
function setReminder() {
    var day = $('#day').val();
    var time = $('#time').val();
    var activity = $('#activity').val();

    if (day && time && activity) {
        var reminderData = {
            day: day,
            time: time,
            activity: activity
        };

        $.ajax({
            url: '/Home/SetReminder',
            type: 'POST',
            data: reminderData,
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    addReminderToList(reminderData);
                    setReminderTimeout(reminderData);
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    } else {
        alert("Please fill in all fields.");
    }
}

function addReminderToList(reminder) {
    var reminderList = $('#reminderList');
    var reminderItem = $('<div class="reminder-item"></div>');
    reminderItem.text(reminder.day + ', ' + reminder.time + ' - ' + reminder.activity);
    reminderList.append(reminderItem);
}

function setReminderTimeout(reminder) {
    var [hours, minutes] = reminder.time.split(':');
    var now = new Date();
    var reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

    if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    var timeout = reminderTime - now;
    setTimeout(function () {
        alert('Reminder: ' + reminder.activity);
        var audio = new Audio('/Sounds/chime.mp3');
        audio.play();
    }, timeout);
}
