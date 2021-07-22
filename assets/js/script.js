
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

function getList() {
    var workDayList = JSON.parse(localStorage.getItem('workdaylist')) || newList;
    return workDayList;
}

function setList(workDayList) {
    localStorage.setItem('workdaylist', JSON.stringify(workDayList));
}

function workDayInit() {
    renderWorkDayList();
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
}

function editTimeBlock(blockId) {
    // get text from $descBlockEl
    var $descEl = $("#time-block-" + blockId).find(".description");
    var descText = $descEl.text();
    
    // display desc in input + save button
    var textAreaHTML = '<textarea id="timeBlockEdit-' + blockId +'">' + descText + '</textarea>';
    // var inputHTML = '<input type="text" name="timeBlockInput" placeholder="Enter Task" id="timeBlockEdit-' + blockId + '" value="' + descText + '"/>';
    var saveBtnHTML = '<button class="saveBtn" id="saveBtn-' + blockId + '">Save</button>';

    $descEl.html(textAreaHTML+saveBtnHTML);
}

//Event Delegation
$('.time-block').on('click', function(e) {
    e.preventDefault;
    $target = $(e.target);
    blockId = $(e.currentTarget).data("block-id");
    
    if ($target.hasClass("saveBtn")) {
        // Save Task
        saveTimeBlock(blockId);
    } else if ($target.hasClass("description")) {
        // Edit Task
        editTimeBlock(blockId);
    } else {
        // Do Nothing
    }
});

workDayInit();