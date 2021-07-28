
//List object
var newList = {
    0: "", 
    1: "", 
    2: "", 
    3: "", 
    4: "", 
    5: "", 
    6: "", 
    7: "",
    8: ""
};

//Get list object from localStorage
function getList() {
    var workDayList = JSON.parse(localStorage.getItem('workdaylist')) || newList;
    return workDayList;
}

//Set list object to localStorage
function setList(workDayList) {
    localStorage.setItem('workdaylist', JSON.stringify(workDayList));
}

//Initialize WorkDay Scripts
function workDayInit() {
    renderWorkDayList();
    renderMoment();
}

function updateTimeBlockCss(thisMoment) {
    $(".time-block").each(function(i) {
        var timeBlockMoment = moment(thisMoment.format("MM-DD-YYYY") + ' ' + getTimeById(i));
        var timeBlockMomentEnd = moment(timeBlockMoment).endOf("hour");

        // console.log(timeBlockMoment, thisMomentStart, thisMomentEnd);
        if (thisMoment.isBetween(timeBlockMoment, timeBlockMomentEnd)) {
            //Present
            $(this).addClass("present");
        } else if (thisMoment.isBefore(timeBlockMoment)) {
            //Future
            $(this).addClass("future");
        } else if (thisMoment.isAfter(timeBlockMoment)) {
            //Past
            $(this).addClass("past");
        }
    });
}

//Get time string by ID
function getTimeById(blockId) {
    switch (blockId) {
        case 0:
            return "9:00 am";
        case 1:
            return "10:00 am";
        case 2:
            return "11:00 am";
        case 3:
            return "12:00 pm";
        case 4:
            return "1:00 pm";
        case 5:
            return "2:00 pm";
        case 6:
            return "3:00 pm";
        case 7:
            return "4:00 pm";
        case 8:
            return "5:00 pm";
    }
        
}

function renderMoment(){
    //get current moment
    var thisMoment = moment();

    //update header with today's day/date
    $("#currentDay").text(thisMoment.format("dddd, LL"));

    //update timeBlocks with past/present/future classes
    updateTimeBlockCss(thisMoment);
}

function renderWorkDayList() {
    var workDayList = getList();

    for (const i in workDayList) {
        $("#time-block-" + i).find(".description").html(workDayList[i]);
    }
}

function saveTimeBlock(blockId) {
    var workDayList = getList();
    var timeBlockVal = $("#timeBlockEdit-" + blockId).val().trim();

    // save task to local storage
    workDayList[blockId] = timeBlockVal;
    setList(workDayList);
    
    // update .description html with value from input
    $("#time-block-" + blockId).find(".description").html(timeBlockVal);
    $("#time-block-" + blockId).find(".action").html("").removeClass("active");
}

function editTimeBlock(blockId) {
    // get text from $descBlockEl
    var $descEl = $("#time-block-" + blockId).find(".description");
    var $actionEl = $("#time-block-" + blockId).find(".action");
    var descText = $descEl.text();
    
    // display desc in input + save button
    var textAreaHTML = '<textarea id="timeBlockEdit-' + blockId +'">' + descText + '</textarea>';
    var saveBtnHTML = '<button class="btn saveBtn" id="saveBtn-' + blockId + '">Save</button>';

    $descEl.html(textAreaHTML);
    $actionEl.html(saveBtnHTML).addClass("active");
}

//Event Delegation
$('.time-block').on('click', function(e) {
    e.preventDefault;
    $target = $(e.target);
    blockId = $(e.currentTarget).data("block-id");
    
    if ($target.hasClass("saveBtn")) {
        // Save Task
        saveTimeBlock(blockId);
    } else if ($target.hasClass("description") || $target.hasClass("editBtn")) {
        // Edit Task
        editTimeBlock(blockId);
    } else {
        // Do Nothing
    }
});

//Event Delegation
$('.time-block').hover(function(e){
    blockId = $(e.currentTarget).data("block-id");
    var $actionEl = $("#time-block-" + blockId).find(".action");

    if (e.type == "mouseenter" && !$actionEl.hasClass("active")) {
        var editBtnHTML = '<button class="btn editBtn" id="editBtn-' + blockId + '">Edit</button>';
        $actionEl.html(editBtnHTML);
    } else if (e.type == "mouseleave" && !$actionEl.hasClass("active")) {
        $actionEl.html('');
    }
});

workDayInit();