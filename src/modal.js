import { formatDistanceToNow, isValid, toDate } from 'date-fns';
import { createTodo, createTaskList } from './loadTodo';

export const modalModule = () => {
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

  closeBtn.addEventListener('click', handleModalCancelBtn);
  cancelBtn.addEventListener('click', handleModalCancelBtn);
  saveBtn.addEventListener('click', handleModalSaveBtn);
  dropupBtn.addEventListener('click', (e) => e.preventDefault());

  function handleModalCancelBtn() {
    taskModal.close();
    taskForm.reset();
  }

  function handleModalSaveBtn() {
    let due = dueDate.valueAsDate;
    const currentTaskList = document.querySelector('[data-current-task-list]');
    const currentTaskContainer = currentTaskList.dataset.currentTaskList;
    if (isValid(toDate(due))) {
      due = formatDistanceToNow(dueDate.value);
    } else {
      alert('please enter valid date');
    }

    document
      .querySelector(`[data-task-container= "${currentTaskContainer}"]`)
      .appendChild(createTodo(taskTitle.value));

    isInputEmpty(); // disable save button
    taskForm.reset();
  }

  taskModal.addEventListener('click', handleClickTaskModal);

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
  taskTitle.addEventListener('keyup', isInputEmpty);
};
