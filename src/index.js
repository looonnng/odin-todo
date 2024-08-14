import './style.css';
import '@material-design-icons/font';
import modalModule from './modal';
import { createMyElement, createTodo, createTaskList } from './loadTodo';

// Init default lists && local storage
(() => {
  const myTaskListObject = {
    projectTitle: 'My Task',
    projectTasks: ['lorem'],
  };

  localStorage.setItem('My Task', JSON.stringify(myTaskListObject));
})();

// Init modal
modalModule();

(function populateStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const projectString = localStorage.key(i);
    const projectObject = JSON.parse(localStorage.getItem(projectString));
    const projectTasksArray = projectObject.projectTasks;
    const projectListTitle = projectObject.projectTitle;

    const myTaskList = createTaskList(projectListTitle);
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

    projectTasksArray.forEach((task) => {
      const myTask = createTodo(task);
      document
        .querySelector(`[data-task-container="${projectListTitle}"]`)
        .appendChild(myTask);
    });
  }
})();
