// Task lists
let tasksPending = [];
let tasksInProgress = [];
let tasksCompleted = [];

// Load tables from local storage
loadTables();

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();

  if (taskName !== '') {
    const task = { name: taskName, time: '60:00:00' };
    tasksPending.push(task);

    // Add task to the pending tasks table
    addTaskToTable(task, 'tablePending', true);

    taskInput.value = '';
  }
}

// Function to add a task to a table
function addTaskToTable(task, tableId, includeActions) {
  const table = document.getElementById(tableId);

  const row = document.createElement('tr');
  const taskNameCell = document.createElement('td');
  taskNameCell.textContent = task.name;
  row.appendChild(taskNameCell);

  if (includeActions) {
    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function () {
      deleteTask(task, tableId);
    });
    actionsCell.appendChild(deleteButton);

    const changeStateButton = document.createElement('button');
    changeStateButton.textContent = 'Cambiar Estado';
    changeStateButton.addEventListener('click', function () {
      changeTaskState(task, tableId);
    });
    actionsCell.appendChild(changeStateButton);

    row.appendChild(actionsCell);
  }

  table.appendChild(row);
}

// Function to delete a task
function deleteTask(task, tableId) {
  let tasksList;

  if (tableId === 'tablePending') {
    tasksList = tasksPending;
  } else if (tableId === 'tableInProgress') {
    tasksList = tasksInProgress;
  } else if (tableId === 'tableCompleted') {
    tasksList = tasksCompleted;
  }

  const index = tasksList.findIndex(t => t.name === task.name);
  if (index !== -1) {
    tasksList.splice(index, 1);

    const table = document.getElementById(tableId);
    table.deleteRow(index + 1); // +1 to skip the header row

    updateProgressBar();
  }
}

// Function to change the state of a task
function changeTaskState(task, currentTableId) {
  let currentTasksList;
  let targetTableId;
  let targetTasksList;

  if (currentTableId === 'tablePending') {
    currentTasksList = tasksPending;
    targetTableId = 'tableInProgress';
    targetTasksList = tasksInProgress;
  } else if (currentTableId === 'tableInProgress') {
    currentTasksList = tasksInProgress;
    targetTableId = 'tableCompleted';
    targetTasksList = tasksCompleted;
  } else if (currentTableId === 'tableCompleted') {
    currentTasksList = tasksCompleted;
    targetTableId = 'tablePending';
    targetTasksList = tasksPending;
  }

  const index = currentTasksList.findIndex(t => t.name === task.name);
  if (index !== -1) {
    const targetTable = document.getElementById(targetTableId);
    const newRow = targetTable.insertRow(-1);
    const taskNameCell = document.createElement('td');
    taskNameCell.textContent = task.name;
    newRow.appendChild(taskNameCell);

    if (currentTableId === 'tableInProgress') {
      const timeEstimateCell = document.createElement('td');
      timeEstimateCell.textContent = task.time;
      newRow.appendChild(timeEstimateCell);
    }

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function () {
      deleteTask(task, targetTableId);
    });
    actionsCell.appendChild(deleteButton);

    const changeStateButton = document.createElement('button');
    changeStateButton.textContent = 'Cambiar Estado';
    changeStateButton.addEventListener('click', function () {
      changeTaskState(task, targetTableId);
    });
    actionsCell.appendChild(changeStateButton);

    newRow.appendChild(actionsCell);

    currentTasksList.splice(index, 1);
    const currentTable = document.getElementById(currentTableId);
    currentTable.deleteRow(index + 1);

    updateProgressBar();
  }
}

// Function to update the progress bar
function updateProgressBar() {
  const totalTasks = tasksPending.length + tasksInProgress.length + tasksCompleted.length;
  const completedTasks = tasksCompleted.length;
  const progress = Math.floor((completedTasks / totalTasks) * 100);

  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = progress + '%';
}

// Function to create new tables
function createNewTable() {
  // Clear existing tables
  clearTables();

  // Create new tables
  tasksPending = [];
  tasksInProgress = [];
  tasksCompleted = [];

  updateProgressBar();
}

// Function to save tables to local storage
function saveTables() {
  const data = {
    tasksPending: tasksPending,
    tasksInProgress: tasksInProgress,
    tasksCompleted: tasksCompleted
  };

  localStorage.setItem('taskTables', JSON.stringify(data));
}

// Function to load tables from local storage
function loadTables() {
  const data = JSON.parse(localStorage.getItem('taskTables'));

  if (data) {
    tasksPending = data.tasksPending || [];
    tasksInProgress = data.tasksInProgress || [];
    tasksCompleted = data.tasksCompleted || [];

    // Populate tables
    populateTable(tasksPending, 'tablePending', true);
    populateTable(tasksInProgress, 'tableInProgress', false);
    populateTable(tasksCompleted, 'tableCompleted', true);

    updateProgressBar();
  }
}

// Function to populate a table
function populateTable(tasks, tableId, includeActions) {
  const table = document.getElementById(tableId);

  for (let task of tasks) {
    addTaskToTable(task, tableId, includeActions);
  }
}

// Function to delete tables
function deleteTables() {
  // Clear existing tables
  clearTables();

  // Remove tables from local storage
  localStorage.removeItem('taskTables');

  updateProgressBar();
}

// Function to clear all tables
function clearTables() {
  const tablePending = document.getElementById('tablePending');
  const tableInProgress = document.getElementById('tableInProgress');
  const tableCompleted = document.getElementById('tableCompleted');

  clearTable(tablePending);
  clearTable(tableInProgress);
  clearTable(tableCompleted);

  tasksPending = [];
  tasksInProgress = [];
  tasksCompleted = [];
}

// Function to clear a table
function clearTable(table) {
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}
