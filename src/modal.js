import { formatDistanceToNow, isValid, toDate } from 'date-fns';
import { createMyElement, createTodo, createTaskList } from './loadTodo';

const modalModule = () => {
  const createTaskBtn = document.querySelector('.create-task-btn');
  const taskModal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.modal__close-btn');
  const cancelBtn = document.querySelector('[data-cancel-btn]');
  const saveBtn = document.querySelector('[data-save-btn]');
  const dropupBtn = document.querySelector('[data-dropup-btn]');
  const taskTitle = document.querySelector('#task-title');
  const dueDate = document.querySelector('.dialog__task-due-date');
  const taskForm = document.querySelector('.modal__form');

  createTaskBtn.addEventListener('click', handleCreateTaskBtn);
  closeBtn.addEventListener('click', handleModalCancelBtn);
  cancelBtn.addEventListener('click', handleModalCancelBtn);
  saveBtn.addEventListener('click', handleModalSaveBtn);
  dropupBtn.addEventListener('click', (e) => e.preventDefault());
  taskModal.addEventListener('click', handleClickTaskModal);
  taskTitle.addEventListener('keyup', isInputEmpty);

  function handleCreateTaskBtn() {
    taskModal.showModal();

    // dueDate is not accurate without UTC Date
    const today = new Date();
    dueDate.valueAsDate = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
    );

    // Add task list options

    isInputEmpty(); // disable save button
  }

  function handleModalCancelBtn() {
    taskModal.close();
    taskForm.reset();
  }

  function handleModalSaveBtn() {
    let due = dueDate.valueAsDate;

    if (isValid(toDate(due))) {
      due = formatDistanceToNow(dueDate.value);
    } else {
      alert('please enter valid date');
    }

    addTodoToTaskList(taskTitle.value);

    isInputEmpty(); // disable save button
    taskForm.reset();
  }

  function handleClickTaskModal(event) {
    const dialogDimensions = taskModal.getBoundingClientRect();

    // close modal when clicking on modal backdrop
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      taskModal.close();
    }
  }

  // activate save button when form control is filled
  function isInputEmpty() {
    if (taskTitle.value === '') {
      saveBtn.disabled = true;
      saveBtn.classList.remove('save');
    } else {
      saveBtn.disabled = false;
      saveBtn.classList.add('save');
    }
  }

  function getTaskList() {
    const taskLists = [...document.querySelectorAll('.todos-card__name')].map(
      (listName) => listName.textContent,
    );

    return taskLists;
  }

  function loadTaskListToModal() {
    const currentDisplayTaskList = document.querySelector(
      '[data-current-task-list]',
    ).dataset.currentTaskList;
    const taskListNames = getTaskList().filter(
      (tasklist) => tasklist.toLowerCase() != currentDisplayTaskList,
    );
    const dropupContent = document.querySelector('.dropup-content');
    dropupContent.replaceChildren(); // Prevent duplicates from existing list

    taskListNames.forEach((listName) => {
      const listOption = createMyElement('div', [], `${listName}`);
      listOption.setAttribute(
        'data-task-list-option',
        `${listName.toLowerCase()}`,
      );

      dropupContent.appendChild(listOption);
    });

    attachEventToOptions();
  }

  // Init task lists
  loadTaskListToModal();

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
