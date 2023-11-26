var clearData = [
    {
        "completed": false, 
        "title": "Название задачи",
        "dueDate": "26.10.2023",
        "dueTime": "10:00",
        "subTasks": [
        {
            "title": "Название подзадачи",
            "completed": false
        },
        {
            "title": "Название 2 подзадачи",
            "completed": false
        }
        ]
    },
    {
        "completed": false, 
        "title": "Название 2 задачи",
        "dueDate": "27.10.2023",
        "dueTime": "23:59",
        "subTasks": [
        {
            "title": "Название подзадачи",
            "completed": true
        },
        {
            "title": "Название 2 подзадачи",
            "completed": false
        }
        ]
    }
];


    const modalTrigger = document.getElementsByClassName("trigger")[0];

    const windowInnerWidth = document.documentElement.clientWidth;
    const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);

    const bodyElementHTML = document.getElementsByTagName("body")[0];
    const modalBackground = document.getElementsByClassName("modalBackground")[0];
    const modalClose = document.getElementsByClassName("modalClose")[0];
    const modalActive = document.getElementsByClassName("modalActive")[0];



    modalClose.addEventListener("click", function () {
        modalBackground.style.display = "none";
    });

    modalBackground.addEventListener("click", function (event) {
        if (event.target === modalBackground) {
            modalBackground.style.display = "none";
        }
    });


function showModal(message){
    document.getElementById('modalMessage').innerText(message);
    modalBackground.style.display = "flex";
}

function checkboxInput(elem){
    try{
        sid = elem.attributes.sid.value;
    } catch{
        sid = '';
    }

    
    tid = elem.attributes.tid.value;

    if (elem.checked){
        value = true;
    }
    else{
        value = false;
    }

    if (sid != ''){
        data[tid].subTasks[sid]['completed'] = value;
    }
    else{
        data[tid]['completed'] = value;
    }
    buildTasks();
  }

function getData(){
    try {
        console.log('json');
        
        if (JSON.parse(localStorage.getItem("localData")) != null){
            return JSON.parse(localStorage.getItem("localData"));
        } else{
            return clearData;
        }
        
    } catch{
        console.log('clear');
        return clearData;
    }
}

data = getData();

console.log(data);

function resetData(){
    localStorage.setItem("localData",clearData)
}


function getNum(strNum){
    return strNum.replace(/^\D+/g, '');
};

function getCurDateStr(){
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function getCurTimeString(){
    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}`;
}

// Отображение задач
function buildTasks(){
    data = data.filter(function(e) {
        return e !== null && e !== undefined;
      });

    localStorage.setItem("localData",JSON.stringify(data));

    const taskListContainer = document.querySelector('.taskList');

    taskListContainer.innerHTML = '';

    let taskId = 0;
    data.forEach(task => {
        const taskHTML = createTaskHTML(task, taskId);
        taskListContainer.appendChild(taskHTML);

        taskId++;
    });
}

// Добавление подзадачи
function addSubTask(elem){
    let id = getNum(elem.id);
    console.log(id);
    
    const newSubTask = {
        "title": 'Введите название',
        "completed": false
    };
    data[id].subTasks.push(newSubTask);

    buildTasks();

    console.log(getData())
};

// Удаление подзадачи
function delSubTask(elem){
    let id = parseInt(elem.attributes.taskid.value);
    console.log(id);

    subId = getNum(elem.id);
    
    delete data[id].subTasks[subId];

    buildTasks();

    console.log(getData());
};

// Добавление задачи
function addTask(){

    taskTitle = document.getElementById('newTaskTitle').value;
    taskDueDate = document.getElementById('newDueDate').value;
    taskDueTime = document.getElementById('newDueTime').value;

    [taskTitle, taskDueDate, taskDueTime].forEach(element => {
        if(!element || element.length === 0 ){
            return false;
        }
    });

    console.log(taskTitle);
    console.log(taskDueDate);
    console.log(taskDueTime);
    
    const newTask = {
        "completed": false, 
        "title": taskTitle,
        "dueDate": taskDueDate,
        "dueTime": taskDueTime,
        "subTasks": [
        {
            "title": "Введите название подзадачи",
            "completed": false
        }
        ]
    };
    data.push(newTask);

    buildTasks();
};

function delTask(id){
    console.log(id);
    
    delete data[id];


    buildTasks();

    console.log(getData());
};

function getTimeLeft(timeStr){
    return timeStr;
};


// Dynamically create the HTML structure for each task and subtask
function createTaskHTML(task, taskId) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
  
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
  
    const infoDiv1 = document.createElement('div');
    const taskTitle = document.createElement('input');
    taskTitle.setAttribute('type', 'text');
    taskTitle.setAttribute('required', 'true');
    taskTitle.classList.add('title');
    taskTitle.setAttribute('tid', taskId);
    taskTitle.value = task.title;
    infoDiv1.appendChild(taskTitle);
    
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = getTimeLeft(task.dueDate);
    dueDateSpan.classList.add('dueDateSpan');
    infoDiv1.appendChild(dueDateSpan);

    const checkInput = document.createElement('input');
    checkInput.setAttribute('type', 'checkbox');
    checkInput.setAttribute('tid', taskId);
    checkInput.setAttribute('onclick', 'checkboxInput(this)');
    checkInput.classList.add('completed');
    infoDiv1.appendChild(checkInput);
    
  
    const infoDiv2 = document.createElement('div');
    const delIcon = document.createElement('img');
    delIcon.setAttribute('src', 'img/plus-svgrepo-com.svg');
    delIcon.classList.add('img-icon', 'cross');
    delIcon.setAttribute('onclick', 'delTask('+taskId+')');
    infoDiv2.appendChild(delIcon);
    
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('value', task.dueDate);
    dueDateInput.setAttribute('tid', taskId);
    dueDateInput.classList.add('dueDate');
    infoDiv2.appendChild(dueDateInput);
  
    const dueTimeInput = document.createElement('input');
    dueTimeInput.setAttribute('type', 'time');
    dueTimeInput.setAttribute('tid', taskId);
    dueTimeInput.setAttribute('value', task.dueTime);
    dueTimeInput.classList.add('dueTime');
    infoDiv2.appendChild(dueTimeInput);
  
    taskInfo.appendChild(infoDiv1);
    taskInfo.appendChild(infoDiv2);
    taskDiv.appendChild(taskInfo);
  
    const subTasks = document.createElement('div');
    subTasks.classList.add('sub-tasks');

    let subTaskId = 0;
    
    task.subTasks.forEach(subTask => {
    
        const subTaskDiv = document.createElement('div');
        subTaskDiv.classList.add('task-sub');
        subTaskDiv.id = 'sub'+subTaskId;

        const subTaskCheckbox = document.createElement('input');
        subTaskCheckbox.setAttribute('type', 'checkbox');
        subTaskCheckbox.setAttribute('tid', taskId);
        subTaskCheckbox.setAttribute('sid', subTaskId);
        subTaskCheckbox.setAttribute('onclick', 'checkboxInput(this)');
        subTaskCheckbox.classList.add('completed');

        const subTaskSpan = document.createElement('input');
        subTaskSpan.value = subTask.title;
        subTaskSpan.setAttribute('type', 'text');
        subTaskSpan.setAttribute('tid', taskId);
        subTaskSpan.setAttribute('sid', subTaskId);
        subTaskSpan.classList.add('title');

        const deleteSubtaskDiv = document.createElement('div');
        const deleteSubtaskIcon = document.createElement('img');
        deleteSubtaskIcon.setAttribute('src', 'img/plus-svgrepo-com.svg');
        deleteSubtaskIcon.classList.add('img-icon', 'cross');
        deleteSubtaskDiv.classList.add('delete-subtask');
        deleteSubtaskDiv.setAttribute('taskid', taskId);
        deleteSubtaskDiv.setAttribute('id', 'sub'+subTaskId);
        
        deleteSubtaskDiv.setAttribute('onclick', "delSubTask(this)");
        deleteSubtaskDiv.appendChild(deleteSubtaskIcon);

        subTaskDiv.appendChild(subTaskCheckbox);
        subTaskDiv.appendChild(subTaskSpan);
        subTaskDiv.appendChild(deleteSubtaskDiv);

        subTasks.appendChild(subTaskDiv);

        subTaskId++;
    });
  
  
    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('addTask');
    addTaskDiv.id = 'add'+taskId;
    addTaskDiv.setAttribute('onclick', 'addSubTask(this)');
    const addTaskIcon = document.createElement('img');
    addTaskIcon.setAttribute('src', 'img/plus-svgrepo-com.svg');
    addTaskIcon.classList.add('img-icon');
    addTaskDiv.appendChild(addTaskIcon);
    subTasks.appendChild(addTaskDiv);

    taskDiv.appendChild(subTasks);
  
    return taskDiv;
  }
  
  // Print the data into the HTML

  
  buildTasks(data);


 

  document.addEventListener('keyup', function(event) {
    if (event.target.tagName == ('INPUT')) {
    const input = event.target;
    objName = input.classList[0];
    try{
        sid = input.attributes.sid.value;
    } catch{
        sid = '';
    }

    value = input.value;
    
    tid = input.attributes.tid.value;
    console.log(objName);
    console.log('Value: ' + input.value);
    if (value != ''){
        if (sid != ''){
            data[tid].subTasks[sid][objName] = value;
        }
        else{
            data[tid][objName] = value;
        }
        buildTasks();
    }}
  });


//   input.addEventListener('input', function(event) {
    
//     const input = event.target;
//     objName = input.classList[0];
//     if (input.type == 'checkbox') {
//         if (input.value == 'on'){
//             value = true;
//         }
//         else{
//             value = false;
//         }
//     } else {
//         return 0;
//     };


//     try{
//         sid = input.attributes.sid.value;
//     } catch{
//         sid = '';
//     }
    
//     tid = input.attributes.tid.value;
//     console.log(objName);
//     console.log('Value: ' + input.value);
//     if (sid != ''){
//         data[tid].subTasks[sid][objName] = value;
//     }
//     else{
//         data[tid][objName] = value;
//     }
//     buildTasks();
// });
  


