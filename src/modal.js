export const modalModule = () => {
  const createTaskBtn = document.querySelector('.create-task-btn');

  const createTaskDialog = document.querySelector('.modal');
  const cancelBtn = createTaskDialog.querySelector('.modal__cancel-btn');
  const saveBtn = createTaskDialog.querySelector('.modal__save-btn');

  createTaskBtn.addEventListener('click', handleCreateTaskBtn);

  function handleCreateTaskBtn() {
    createTaskDialog.showModal();
  }

  cancelBtn.addEventListener('click', handleModalCancelBtn);
  saveBtn.addEventListener('click', handleModalSaveBtn);

  function handleModalCancelBtn() {
    createTaskDialog.close();
  }

  function handleModalSaveBtn() {
    console.log('Work in Progress');
  }
};
