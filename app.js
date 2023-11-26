var clearData = [
    {
        "id": 0,
        "completed": false, 
        "title": "Название задачи",
        "dueDate": "26.10.2023",
        "dueTime": "10:00",
        "subTasks": [
        {
            "id": 0,
            "title": "Название подзадачи",
            "completed": false
        },
        {
            "id": 1,
            "title": "Название 2 подзадачи",
            "completed": false
        }
        ]
    },
    {
        "id": 1,
        "completed": false, 
        "title": "Название 2 задачи",
        "dueDate": "27.10.2023",
        "dueTime": "23:59",
        "subTasks": [
        {
            "id": 0,
            "title": "Название подзадачи",
            "completed": true
        },
        {
            "id": 1,
            "title": "Название 2 подзадачи",
            "completed": false
        }
        ]
    }
];

function getData(){
    try {
        console.log('json');
        return JSON.parse(localStorage.getItem("localData"));
    } catch{
        console.log('clear');
        return clearData;
    }
}

data = getData();

// if (Object.keys(getData()).length === 0) {
//     var data = clearData;
//   } else {
//     var data = getData();
// }

function getNum(strNum){
    return strNum.replace(/^\D+/g, '');
};

function buildTasks(){
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
        "id": "task.subTasks.length",
        "title": 'Введите название',
        "completed": false
    };
    data[id].subTasks.push(newSubTask);

    buildTasks();

    console.log(getData())
};

// Удаление подзадачи
function delSubTask(elem){
    let id = getNum(elem.attributes.taskid);
    console.log(id);

    subId = getNum(elem.id);
    
    data[subId].subTasks.slice(newSubTask);

    buildTasks();

    console.log(getData())
};

// Добавление задачи
function addTask(){
    let id = getNum(elem.id);
    console.log(id);
    
    const newSubTask = {
        "id": "task.subTasks.length",
        "title": 'Введите название',
        "completed": false
    };
    data[id].subTasks.push(newSubTask);

    buildTasks();
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
    const plusIcon = document.createElement('img');
    plusIcon.setAttribute('src', 'img/plus-svgrepo-com.svg');
    plusIcon.classList.add('img-icon', 'cross');
    infoDiv2.appendChild(plusIcon);
    
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'text');
    dueDateInput.setAttribute('placeholder', task.dueDate);
    infoDiv2.appendChild(dueDateInput);
  
    const dueTimeInput = document.createElement('input');
    dueTimeInput.setAttribute('type', 'text');
    dueTimeInput.setAttribute('placeholder', task.dueTime);
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

        const deleteSubtaskDiv = document.createElement('div');
        const deleteSubtaskIcon = document.createElement('img');
        deleteSubtaskIcon.setAttribute('src', 'img/plus-svgrepo-com.svg');
        dueTimeInput.setAttribute('taskid', taskId);
        deleteSubtaskIcon.classList.add('img-icon', 'cross');
        deleteSubtaskDiv.classList.add('delete-subtask');
        deleteSubtaskDiv.setAttribute('id', 'sub'+subTaskId);
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


