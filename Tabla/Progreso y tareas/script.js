// Funcionalidad JavaScript
var tableData = [];
var savedTables = JSON.parse(localStorage.getItem("savedTables")) || [];
var tareasCompletadas = 0;
var tareasTotales = 0;

// Cargar los datos de la tabla al cargar la página
window.onload = function() {
  populateSavedTables();
  updateProgressBar();
};

function addTask() {
  var taskNameInput = document.getElementById("taskNameInput");
  var taskDescriptionInput = document.getElementById("taskDescriptionInput");
  var taskName = taskNameInput.value;
  var taskDescription = taskDescriptionInput.value;

  if (taskName.trim() === "") {
    alert("Por favor, ingresa una descripción de la tarea.");
    return;
  }

  tableData.push({ taskName: taskName, taskDescription: taskDescription });
  renderTable();
  taskNameInput.value = "";
  taskDescriptionInput.value = "";

  updateProgressBar();
}

function deleteTask(index) {
  tableData.splice(index, 1);
  renderTable();
}

function renderTable() {
  var tableBody = document.querySelector("#taskTable tbody");
  tableBody.innerHTML = "";

  for (var i = 0; i < tableData.length; i++) {
    var task = tableData[i];
    var row = document.createElement("tr");
    var indexCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var descriptionCell = document.createElement("td");
    var actionCell = document.createElement("td");
    var stateCell = document.createElement("td"); // Nuevo botón

    indexCell.textContent = i + 1;
    nameCell.textContent = task.taskName;
    descriptionCell.textContent = task.taskDescription;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function(index) {
      return function() {
        deleteTask(index);
      };
    }(i);

    actionCell.appendChild(deleteButton);
    row.appendChild(indexCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(actionCell);

    var stateButton = document.createElement("button"); // Nuevo botón
    stateButton.textContent = "Estado";
    stateButton.onclick = function(index) {
      return function() {
        moveTaskToInProgress(index);
      };
    }(i);

    stateCell.appendChild(stateButton); // Nuevo botón
    row.appendChild(stateCell); // Nuevo botón

    tableBody.appendChild(row);
  }
}

function deleteTable() {
  var confirmation = confirm("¿Estás seguro de eliminar la tabla?");

  if (confirmation) {
    tableData = [];
    renderTable();
    localStorage.removeItem("taskTableData");
  }
}

function saveTable() {
  var tableName = prompt("Ingresa un nombre para la tabla:");
  if (!tableName) {
    return;
  }

  var savedTable = {
    name: tableName,
    data: tableData
  };

  savedTables.push(savedTable);
  localStorage.setItem("savedTables", JSON.stringify(savedTables));
  populateSavedTables();

  alert("¡Tabla guardada!");
}

function createTable() {
  deleteTable();
  alert("¡Nueva tabla creada!");
}

function loadTable(index) {
  var selectedTable = savedTables[index];
  tableData = selectedTable.data;
  renderTable();
}

function deleteSavedTable(index) {
  savedTables.splice(index, 1);
  localStorage.setItem("savedTables", JSON.stringify(savedTables));
  populateSavedTables();
}

function populateSavedTables() {
  var savedTablesList = document.getElementById("savedTablesList");
  savedTablesList.innerHTML = "";

  for (var i = 0; i < savedTables.length; i++) {
    var savedTable = savedTables[i];
    var listItem = document.createElement("li");
    var loadButton = document.createElement("button");
    loadButton.textContent = "Cargar";
    loadButton.className = "button";
    loadButton.onclick = function(index) {
      return function() {
        loadTable(index);
      };
    }(i);

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "button";
    deleteButton.onclick = function(index) {
      return function() {
        deleteSavedTable(index);
      };
    }(i);

    listItem.textContent = savedTable.name;
    listItem.appendChild(loadButton);
    listItem.appendChild(deleteButton);
    savedTablesList.appendChild(listItem);
  }
}

// Nueva función para mover la tarea a "Tareas en Proceso"
function moveTaskToInProgress(index) {
  var task = tableData[index];
  tableData.splice(index, 1);
  tareasTotales++;
  renderTableInProgress(task);
  renderTable();
}

function renderTableInProgress(task) {
  var tableBody = document.querySelector("#taskInProgressTable tbody");
  var row = document.createElement("tr");
  var indexCell = document.createElement("td");
  var nameCell = document.createElement("td");
  var descriptionCell = document.createElement("td");
  var actionCell = document.createElement("td");
  var stateCell = document.createElement("td"); // Nuevo botón

  indexCell.textContent = tableBody.children.length + 1;
  nameCell.textContent = task.taskName;
  descriptionCell.textContent = task.taskDescription;

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = function() {
    deleteInProgressTask(row);
  };

  actionCell.appendChild(deleteButton);
  row.appendChild(indexCell);
  row.appendChild(nameCell);
  row.appendChild(descriptionCell);
  row.appendChild(actionCell);

  var stateButton = document.createElement("button"); // Nuevo botón
  stateButton.textContent = "Estado";
  stateButton.onclick = function() {
    moveTaskToCompleted(row);
  };

  stateCell.appendChild(stateButton); // Nuevo botón
  row.appendChild(stateCell); // Nuevo botón

  tableBody.appendChild(row);
}

// Nueva función para mover la tarea a "Tareas Completadas"
function moveTaskToCompleted(row) {
  var tableBody = document.querySelector("#taskCompletedTable tbody");
  tableBody.appendChild(row);
  tareasCompletadas++;
  updateProgressBar();
}

function updateProgressBar() {
  var progressBarFill = document.getElementById("progressBarFill");
  var progressPercentage = document.getElementById("progressPercentage");
  var progress = (tareasCompletadas / tareasTotales) * 100;
  progressBarFill.style.width = progress + "%";
  progressPercentage.textContent = progress.toFixed(0) + "%";
}

// Nueva función para eliminar una tarea de "Tareas en Proceso"
function deleteInProgressTask(row) {
  var tableBody = document.querySelector("#taskInProgressTable tbody");
  tableBody.removeChild(row);
}

// Llamar a la función para mostrar las tablas guardadas
populateSavedTables();
