// Utility function
export const createMyElement = (tag, classList = [], text = '') => {
  const element = document.createElement(tag);

  // avoid creating empty class attribute
  if (classList) {
    element.classList.add(...classList);
  }

  element.textContent = text;
  return element;
};

// Create new task list and task container
export const createTaskList = (taskListTitle) => {
  const taskListWrapper = createMyElement('div', [
    'task-lists-container__wrapper',
    'row',
  ]);
  const todoCard = createMyElement('div', [
    'todos-card',
    'col',
    taskListTitle.toLowerCase().replaceAll(' ', '-'),
  ]);
  const todoCardTop = createTodoCardTop(taskListTitle);
  const addTaskButton = createButton(
    ['todos-card__add-task-btn', 'row'],
    'add_task',
    ['size-27'],
  );
  const myTaskContainer = createTaskContainer(taskListTitle);

  addTaskButton.appendChild(createMyElement('p', [], 'Add a task'));
  todoCard.append(todoCardTop, addTaskButton, myTaskContainer);
  taskListWrapper.appendChild(todoCard);

  return taskListWrapper;
};

// Task List Top
function createTodoCardTop(taskListTitle) {
  const todoCardTop = createMyElement('div', ['todos-card__top', 'row']);
  const todoCardName = createMyElement(
    'div',
    ['todos-card__name'],
    taskListTitle,
  );
  const todoCardMoreOptionBtn = createButton(
    ['todos-card__list-more-options', 'more-options-btn'],
    'more_vert',
    ['size-20'],
  );

  todoCardTop.append(todoCardName, todoCardMoreOptionBtn);
  return todoCardTop;
}

// Utility function
function createButton(
  buttonClassList = [],
  iconName,
  buttonIconClassList = [],
) {
  buttonIconClassList.unshift('material-symbols-outlined');
  const button = createMyElement('button', buttonClassList);
  const buttonIcon = createMyElement('span', buttonIconClassList, iconName);

  button.appendChild(buttonIcon);
  return button;
}

// Task Container
function createTaskContainer(containerTitle) {
  const taskContainer = createMyElement('div', ['todos-card__tasks-container']);
  taskContainer.dataset.taskContainer = containerTitle;
  return taskContainer;
}

// Todo item
export function createTodo(task) {
  const myTask = createMyElement('div', ['task', 'row']);
  const doneBtnWrapper = createMyElement('div', ['done-btn-wrapper']);
  const doneBtn = createButton(['done-btn'], 'circle', []);
  const taskTodo = createMyElement('div', ['task__todo', 'row']);
  const todoText = createMyElement('p', ['task__todo-text'], task);
  const moreOptionsBtn = createButton(
    ['task__todo-more-options', 'more-options-btn'],
    'more_vert',
    ['size-20'],
  );

  taskTodo.append(todoText, moreOptionsBtn);
  doneBtnWrapper.appendChild(doneBtn);
  myTask.append(doneBtnWrapper, taskTodo);

  return myTask;
}
