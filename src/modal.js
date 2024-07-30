export const modalModule = () => {
  const createTaskBtn = document.querySelector('.create-task-btn');

  const taskModal = document.querySelector('.modal');
  const cancelBtn = document.querySelector('[data-cancel-btn]');
  const saveBtn = document.querySelector('[data-save-btn]');
  const taskTitle = document.querySelector('#task-title');

  const taskForm = document.querySelector('.modal__form');

  createTaskBtn.addEventListener('click', handleCreateTaskBtn);

  function handleCreateTaskBtn() {
    taskModal.showModal();
    isInputEmpty();
  }

  cancelBtn.addEventListener('click', handleModalCancelBtn);
  saveBtn.addEventListener('click', handleModalSaveBtn);

  function handleModalCancelBtn() {
    taskModal.close();
    taskForm.reset();
  }

  function handleModalSaveBtn() {
    console.log('Work in Progress');
    isInputEmpty();
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
