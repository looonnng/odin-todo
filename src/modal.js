import { formatDistanceToNow } from 'date-fns';
import { createMyElement, createTodo, createTaskList } from './loadTodo';

const modalModule = () => {
  const createTaskBtn = document.querySelector('.create-task-btn');
  const createListBtn = document.querySelector('.side-menu__new-list-btn');
  const taskModal = document.querySelector('.create-new-task');
  const listModal = document.querySelector('.create-new-list');
  const closeBtns = document.querySelectorAll('.modal__close-btn');
  const cancelBtns = document.querySelectorAll('[data-cancel-btn]');
  const saveBtns = document.querySelectorAll('[data-save-btn]');
  const taskTitleField = document.querySelector('#task-title');
  const listTitle = document.querySelector('#new-list-title');
  const taskListsContainer = document.querySelector('.task-lists-container');
  const deleteListModal = document.querySelector('.delete-list-modal');

  // init var
  let listTobeDeleted;

  taskListsContainer.addEventListener('click', (event) => {
    if (event.target.parentElement.matches('.todos-card__list-delete-btn')) {
      deleteListModal.showModal();
      listTobeDeleted = event.target.closest('div').previousElementSibling;
    }

    if (event.target.textContent === 'Yes') {
      listTobeDeleted.closest('.task-lists-container__wrapper').remove();
      localStorage.removeItem(listTobeDeleted.textContent);

      const currentDropupList = document.querySelector(
        '[data-current-task-list]',
      );

      currentDropupList.dataset.currentTaskList =
        getTaskList().shift() || 'Please create a list';
      currentDropupList.textContent =
        getTaskList().shift() || 'Please create a list';

      loadTaskListToModal();
      loadTaskListToSideBar();
      deleteListModal.close();
    } else if (event.target.textContent === 'Cancel') {
      deleteListModal.close();
    }

    // add a task button
    if (event.target.parentElement.matches('.todos-card__add-task-btn')) {
      taskModal.showModal();
    }

    // completed task button
    if (
      event.target.matches('.complete-dropdown-btn-wrapper') ||
      event.target.matches('.dropdown-text') ||
      event.target.parentElement.matches('.complete-dropdown-btn')
    ) {
      const completedTaskContainer = event.target.closest(
        '.complete-dropdown-btn-wrapper',
      ).nextElementSibling;
      completedTaskContainer.style.display = completedTaskContainer.style
        .display
        ? ''
        : 'block';

      const dropdownBtnIcon = event.target
        .closest('.complete-dropdown-btn-wrapper')
        .querySelector('span');

      dropdownBtnIcon.textContent =
        dropdownBtnIcon.textContent === 'arrow_drop_down'
          ? 'arrow_right'
          : 'arrow_drop_down';
    }

    // attach event to delete modal
    handleClickTaskModal(event);
  });

  createTaskBtn.addEventListener('click', handleCreateTaskBtn);
  createListBtn.addEventListener('click', handleCreateListBtn);

  closeBtns.forEach((btn) =>
    btn.addEventListener('click', handleModalCancelBtn),
  );
  cancelBtns.forEach((btn) =>
    btn.addEventListener('click', handleModalCancelBtn),
  );
  saveBtns.forEach((btn) => btn.addEventListener('click', handleModalSaveBtn));
  taskModal.addEventListener('click', handleClickTaskModal);
  taskTitleField.addEventListener('keyup', isInputEmpty);

  listModal.addEventListener('click', handleClickTaskModal);
  listTitle.addEventListener('keyup', isInputEmpty);

  function handleCreateListBtn(event) {
    listModal.showModal();
    isInputEmpty(event);
  }

  function handleCreateTaskBtn(event) {
    const dueDate = document.querySelector('.dialog__task-due-date');
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

    // create Task
    if ([...currentModal.classList].includes('create-new-task')) {
      const dueDate = document.querySelector('.dialog__task-due-date');
      const due = dueDate.value ? formatDistanceToNow(dueDate.valueAsDate) : '';
      const currentTasks = getTask();

      if (dueDate.validationMessage) return;

      if (currentTasks.includes(taskTitleField.value)) {
        alert('This task is already created!');
        return;
      }

      addTodoToTaskList(taskTitleField.value, due);

      const newTaskObject = {
        taskTitle: taskTitleField.value,
        taskStatus: 'no',
        taskDue: dueDate.value,
      };

      const currentProjectTitle = document.querySelector(
        '[data-current-task-list]',
      ).dataset.currentTaskList;

      const storageProject = JSON.parse(
        localStorage.getItem(currentProjectTitle),
      );

      storageProject.projectTasks.push(newTaskObject);

      localStorage.setItem(currentProjectTitle, JSON.stringify(storageProject));

      // create List
    } else {
      const currentTaskList = getTaskList();

      if (currentTaskList.includes(listTitle.value)) {
        alert('This list is already created!');
        return;
      }

      const newTaskList = createTaskList(listTitle.value, 0);

      const newTaskListObject = {
        projectTitle: listTitle.value,
        projectTasks: [],
      };

      localStorage.setItem(listTitle.value, JSON.stringify(newTaskListObject));

      taskListsContainer.appendChild(newTaskList);

      // use new created list for current dropup btn
      if (currentTaskList.length === 0) {
        const currentDropupList = document.querySelector(
          '[data-current-task-list]',
        );

        currentDropupList.dataset.currentTaskList = listTitle.value;
        currentDropupList.textContent = listTitle.value;
      } else {
        loadTaskListToModal();
        loadTaskListToSideBar();
      }
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

      const dropupContent = document.querySelector('.dropup-content');

      if (event.target.matches('.dropup-btn')) {
        dropupContent.style.display = dropupContent.style.display
          ? ''
          : 'block';
      } else if (
        dropupContent.style.display === 'block' &&
        !event.target.matches('[data-task-list-option]')
      ) {
        dropupContent.style.display = '';
      }

      dropupContent.addEventListener('click', (e) => {
        if (e.target.matches('[data-task-list-option]')) {
          dropupContent.style.display = '';
        }
      });
    }
  }

  // activate save button when form control is filled
  function isInputEmpty(event) {
    const currentModal =
      event.target.matches('.create-task-btn') ||
      event.target.matches('#task-title')
        ? document.querySelector('.create-new-task')
        : document.querySelector('.create-new-list');

    const currentTitle = currentModal.querySelector('.dialog__title').value;
    const currentSaveBtn = currentModal.querySelector('[data-save-btn]');

    if (currentTitle === '') {
      currentSaveBtn.disabled = true;
      currentSaveBtn.classList.remove('save');
    } else {
      currentSaveBtn.disabled = false;
      currentSaveBtn.classList.add('save');
    }

    isListContainerEmpty();
  }

  function isListContainerEmpty() {
    const currentDropupTaskList = document.querySelector(
      '[data-current-task-list]',
    );

    if (!localStorage.getItem(currentDropupTaskList.dataset.currentTaskList)) {
      taskModal.querySelector('[data-save-btn]').disabled = true;
      taskModal.querySelector('[data-save-btn]').classList.remove('save');
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
  function addTodoToTaskList(task, due) {
    const myTodo = createTodo(task, due);
    const currTaskList = document.querySelector('[data-current-task-list]')
      .dataset.currentTaskList;
    const currTaskContainer = document.querySelector(
      `[data-task-container="${currTaskList}"]`,
    );

    currTaskContainer.appendChild(myTodo);

    return currTaskContainer;
  }

  function populateStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const projectString = localStorage.key(i);
      const projectObject = JSON.parse(localStorage.getItem(projectString));
      const projectTasksArray = projectObject.projectTasks;
      const projectListTitle = projectObject.projectTitle;
      const completedTasksCount = projectTasksArray.filter(
        (task) => task.taskStatus === 'yes',
      ).length;
      // create list
      const myTaskList = createTaskList(projectListTitle, completedTasksCount);
      const checkBox = createMyElement('input', ['side-menu__checkbox']);
      const checkBoxLabel = createMyElement(
        'label',
        ['side-menu__item'],
        projectListTitle,
      );

      checkBox.type = 'checkbox';
      checkBox.id = projectListTitle;
      checkBoxLabel.htmlFor = projectListTitle;
      checkBoxLabel.prepend(checkBox);

      document.querySelector('.task-lists-container').appendChild(myTaskList);
      document.querySelector('.list-container').appendChild(checkBoxLabel);

      // create task
      projectTasksArray.forEach((task) => {
        const due = task.taskDue ? formatDistanceToNow(task.taskDue) : '';

        const myTask = createTodo(task.taskTitle, due);

        if (task.taskStatus === 'no') {
          document
            .querySelector(`[data-task-container="${projectListTitle}"]`)
            .appendChild(myTask);
        } else if (task.taskStatus === 'yes') {
          myTask.dataset.isCompleted = 'yes';
          myTask.querySelector('.done-btn').firstChild.textContent =
            'check_circle';
          myTask
            .querySelector('.task__todo-text')
            .classList.toggle('done-text');

          document
            .querySelector(
              `[data-complete-task-container="${projectListTitle}"]`,
            )
            .appendChild(myTask);
        }
      });
    }

    const currentDropupList = document.querySelector(
      '[data-current-task-list]',
    );

    currentDropupList.dataset.currentTaskList =
      getTaskList().shift() || 'Please create a list';
    currentDropupList.textContent =
      getTaskList().shift() || 'Please create a list';

    loadTaskListToModal();
  }

  populateStorage();
};

export default modalModule;
