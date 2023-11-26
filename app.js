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
    taskTitle.value = task.title;
    infoDiv1.appendChild(taskTitle);
    
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = getTimeLeft(task.dueDate);
    infoDiv1.appendChild(dueDateSpan);
  
    const infoDiv2 = document.createElement('div');
    const delIcon = document.createElement('img');
    delIcon.setAttribute('src', 'img/plus-svgrepo-com.svg');
    delIcon.classList.add('img-icon', 'cross');
    strModal = '\u0412\u044B\u0020\u0443\u0432\u0435\u0440\u0435\u043D\u044B\u003F\u003C\u0061\u0020\u006F\u006E\u0063\u006C\u0069\u0063\u006B\u003D\u0027\u0064\u0065\u006C\u0054\u0061\u0073\u006B\u0028\u0029\u0027\u003E\u0423\u0434\u0430\u043B\u0438\u0442\u044C\u003C\u002F\u0061\u003E';
    delIcon.setAttribute('onclick', 'delTask('+taskId+')');
    infoDiv2.appendChild(delIcon);
    
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('value', task.dueDate);
    infoDiv2.appendChild(dueDateInput);
  
    const dueTimeInput = document.createElement('input');
    dueTimeInput.setAttribute('type', 'time');
    dueTimeInput.setAttribute('value', task.dueTime);
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

        const subTaskSpan = document.createElement('input');
        subTaskSpan.value = subTask.title;
        subTaskSpan.setAttribute('type', 'text');

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


  document.addEventListener('input', function(event) {
    const input = event.target;
    console.log('Value: ' + input.value);

  });


