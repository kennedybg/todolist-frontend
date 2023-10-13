const tbody = document.querySelector('tbody');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3001/tasks');
  const tasks = await response.json();
  return tasks;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

const createSelect = (value) => {
  const options = `
    <option value="pending">Pending</option>
    <option value="doing">Doing</option>
    <option value="done">Done</option>
  `;
  const select = createElement('select', '', options);

  select.value = value;

  return select;
}

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', created_at);
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

  tdStatus.appendChild(select);

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}

const loadTasks = async () => {
  const tasks = await fetchTasks();
  
  tasks.forEach(task => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

loadTasks();