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

  const todoCardComplete = createCompleteSection(taskListTitle);
  const myTaskContainer = createTaskContainer(taskListTitle);

  addTaskButton.appendChild(createMyElement('p', [], 'Add a task'));
  todoCard.append(
    todoCardTop,
    addTaskButton,
    myTaskContainer,
    todoCardComplete,
  );
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
  const btnsWrapper = createMyElement('div', ['btns-wrapper', 'row']);
  const deleteBtn = createButton(['task__todo-delete-btn'], 'delete', []);
  const moreOptionsBtn = createButton(
    ['task__todo-more-options', 'more-options-btn'],
    'more_vert',
    [],
  );
  myTask.dataset.isCompleted = 'no'; // init data

  btnsWrapper.append(deleteBtn, moreOptionsBtn);
  taskTodo.append(todoText, btnsWrapper);
  doneBtnWrapper.appendChild(doneBtn);
  myTask.append(doneBtnWrapper, taskTodo);

  doneBtn.addEventListener('click', handleClickDoneBtn);
  deleteBtn.addEventListener('click', handleDeleteBtn);

  function handleDeleteBtn(event) {
    const currentProjectTitle = event.currentTarget.closest(
      '[data-task-container]',
    ).dataset.taskContainer;

    const storageProject = JSON.parse(
      localStorage.getItem(currentProjectTitle),
    );

    storageProject.projectTasks.splice(
      storageProject.projectTasks.indexOf(currentProjectTitle),
      1,
    );

    localStorage.setItem(currentProjectTitle, JSON.stringify(storageProject));

    myTask.remove();
  }

  function handleClickDoneBtn(event) {
    if (myTask.dataset.isCompleted === 'yes') {
      const myContainer = event.currentTarget.closest(
        '[data-complete-task-container]',
      );
      document
        .querySelector(
          `[data-task-container="${myContainer.dataset.completeTaskContainer}"]`,
        )
        .appendChild(myTask);
      myTask.dataset.isCompleted = 'no';
    } else {
      const myContainer = event.currentTarget.closest('[data-task-container]');
      document
        .querySelector(
          `[data-complete-task-container="${myContainer.dataset.taskContainer}"]`,
        )
        .appendChild(myTask);
      myTask.dataset.isCompleted = 'yes';
    }
  }

  return myTask;
}

function createCompleteSection(containerTitle) {
  const completeWrapper = createMyElement('div', ['todos-card__complete']);
  const completeDropdownBtnWrapper = createMyElement('div', [
    'complete-dropdown-btn-wrapper',
    'row',
  ]);
  const completeDropdownBtn = createButton(
    ['complete-dropdown-btn'],
    'arrow_right',
    [],
  );
  const completeDropdownText = createMyElement(
    'p',
    ['dropdown-text'],
    'Completed Task',
  );

  const completeTaskContainer = createTaskContainer(containerTitle);
  completeTaskContainer.dataset.completeTaskContainer = containerTitle;

  completeDropdownBtnWrapper.append(completeDropdownBtn, completeDropdownText);
  completeWrapper.append(completeDropdownBtnWrapper, completeTaskContainer);
  return completeWrapper;
}
