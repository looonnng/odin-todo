export const modalModule = () => {
  const createTaskBtn = document.querySelector('.create-task-btn');

  const taskModal = document.querySelector('.modal');
  const cancelBtn = taskModal.querySelector('.modal__cancel-btn');
  const saveBtn = taskModal.querySelector('.modal__save-btn');

  createTaskBtn.addEventListener('click', handleCreateTaskBtn);

  function handleCreateTaskBtn() {
    taskModal.showModal();
  }

  cancelBtn.addEventListener('click', handleModalCancelBtn);
  saveBtn.addEventListener('click', handleModalSaveBtn);

  function handleModalCancelBtn() {
    taskModal.close();
  }

  function handleModalSaveBtn() {
    console.log('Work in Progress');
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
};
