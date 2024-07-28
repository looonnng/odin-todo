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
};
