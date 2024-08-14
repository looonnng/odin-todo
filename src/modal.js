import { formatDistanceToNow, isValid, toDate } from 'date-fns';
import { createMyElement, createTodo, createTaskList } from './loadTodo';

const modalModule = () => {
  const createTaskBtn = document.querySelector('.create-task-btn');
  const createListBtn = document.querySelector('.side-menu__new-list-btn');
  const taskModal = document.querySelector('.create-new-task');
  const listModal = document.querySelector('.create-new-list');
  const closeBtns = document.querySelectorAll('.modal__close-btn');
  const cancelBtns = document.querySelectorAll('[data-cancel-btn]');
  const saveBtns = document.querySelectorAll('[data-save-btn]');
  const dropupBtn = document.querySelector('[data-dropup-btn]');
  const taskTitle = document.querySelector('#task-title');
  const listTitle = document.querySelector('#new-list-title');
  const dueDate = document.querySelector('.dialog__task-due-date');
  const taskListsContainer = document.querySelector('.task-lists-container');

  createTaskBtn.addEventListener('click', handleCreateTaskBtn);
  createListBtn.addEventListener('click', handleCreateListBtn);

  closeBtns.forEach((btn) =>
    btn.addEventListener('click', handleModalCancelBtn),
  );
  cancelBtns.forEach((btn) =>
    btn.addEventListener('click', handleModalCancelBtn),
  );
  saveBtns.forEach((btn) => btn.addEventListener('click', handleModalSaveBtn));
  dropupBtn.addEventListener('click', (e) => e.preventDefault());
  taskModal.addEventListener('click', handleClickTaskModal);
  taskTitle.addEventListener('keyup', isInputEmpty);

  listModal.addEventListener('click', handleClickTaskModal);
  listTitle.addEventListener('keyup', isInputEmpty);

  function handleCreateListBtn(event) {
    listModal.showModal();
    isInputEmpty(event);
  }

  function handleCreateTaskBtn(event) {
    taskModal.showModal();

    // dueDate is not accurate without UTC Date
    const today = new Date();
    dueDate.valueAsDate = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
    );

    isInputEmpty(event); // disable save button
  }

  function handleModalCancelBtn(event) {
    const currentModal = event.target.closest('.modal');
    currentModal.close();
    currentModal.querySelector('.modal__form').reset();
  }

  function handleModalSaveBtn(event) {
    const currentModal = event.target.closest('.modal');

    if ([...currentModal.classList].includes('create-new-task')) {
      let due = dueDate.valueAsDate;

      if (isValid(toDate(due))) {
        due = formatDistanceToNow(dueDate.value);
      } else {
        alert('please enter valid date');
      }

      const currentTasks = getTask();

      if (currentTasks.includes(taskTitle.value)) {
        alert('This task is already created!');
        return;
      }

      addTodoToTaskList(taskTitle.value);
      localStorage.setItem(taskTitle.value, taskTitle.value);

    } else {
      const currentTaskList = getTaskList();

      if (currentTaskList.includes(listTitle.value)) {
        alert('This list is already created!');
        return;
      }

      const newTaskList = createTaskList(listTitle.value);
      localStorage.setItem(listTitle.value, newTaskList.innerHTML);
      taskListsContainer.appendChild(newTaskList);
      loadTaskListToModal();
      loadTaskListToSideBar();
    }

    currentModal.querySelector('.modal__form').reset();
  }

  function handleClickTaskModal(event) {
    const currentModal = event.target.closest('.modal');

    if (currentModal) {
      const dialogDimensions = currentModal.getBoundingClientRect();

      // close modal when clicking on modal backdrop
      if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
      ) {
        currentModal.close();
      }
    }
  }

  // activate save button when form control is filled
  function isInputEmpty(event) {
    const currentModal =
      event.currentTarget.previousElementSibling ||
      event.target.closest('.modal');

    const currentTitle = currentModal.querySelector('.dialog__title').value;
    const currentSaveBtn = currentModal.querySelector('[data-save-btn]');

    if (currentTitle === '') {
      currentSaveBtn.disabled = true;
      currentSaveBtn.classList.remove('save');
    } else {
      currentSaveBtn.disabled = false;
      currentSaveBtn.classList.add('save');
    }
  }

  function getTaskList() {
    const taskLists = [...document.querySelectorAll('.todos-card__name')].map(
      (listName) => listName.textContent,
    );
    return taskLists;
  }

  function getTask() {
    const tasks = [...document.querySelectorAll('.task__todo-text')].map(
      (taskName) => taskName.textContent,
    );
    return tasks;
  }

  function loadTaskListToModal() {
    const currentDisplayTaskList = document.querySelector(
      '[data-current-task-list]',
    ).dataset.currentTaskList;
    const taskListNames = getTaskList().filter(
      (tasklist) => tasklist != currentDisplayTaskList,
    );

    const dropupContent = document.querySelector('.dropup-content');
    dropupContent.replaceChildren(); // Prevent duplicates from existing list

    taskListNames.forEach((listName) => {
      const listOption = createMyElement('div', [], `${listName}`);
      listOption.setAttribute('data-task-list-option', `${listName}`);

      dropupContent.appendChild(listOption);
    });

    attachEventToOptions();
  }

  function loadTaskListToSideBar() {
    const sideMenuListContainer = document.querySelector('.list-container');
    const taskLists = getTaskList();

    sideMenuListContainer.replaceChildren();
    taskLists.forEach((list) => {
      const checkBox = createMyElement('input', ['side-menu__checkbox']);
      const checkBoxLabel = createMyElement('label', ['side-menu__item'], list);

      checkBox.type = 'checkbox';
      checkBox.id = list;
      checkBoxLabel.htmlFor = list;
      checkBoxLabel.prepend(checkBox);

      sideMenuListContainer.appendChild(checkBoxLabel);
    });
  }

  function attachEventToOptions() {
    const taskListOptions = document.querySelectorAll(
      '[data-task-list-option]',
    );

    taskListOptions.forEach((option) => {
      option.addEventListener('click', handleClickListOption);
    });
  }

  function handleClickListOption(event) {
    const clickedOption = event.target.dataset.taskListOption;
    const currTaskList = document.querySelector('[data-current-task-list]');
    currTaskList.dataset.currentTaskList = clickedOption;
    currTaskList.textContent = clickedOption;
    loadTaskListToModal();
  }

  // add todo to correct task list
  function addTodoToTaskList(task) {
    const myTodo = createTodo(task);
    const currTaskList = document.querySelector('[data-current-task-list]')
      .dataset.currentTaskList;
    const currTaskContainer = document.querySelector(
      `[data-task-container="${currTaskList}"]`,
    );

    currTaskContainer.appendChild(myTodo);

    return currTaskContainer;
  }
};

export default modalModule;
