import './style.css';
import '@material-design-icons/font';
import modalModule from './modal';
import { createTaskList, createTodo } from './loadTodo';
import { createMyElement } from './loadTodo';

// Init default lists
(() => {
  const myTaskList = createTaskList('My Task');
  const myTask = createTodo('lorem');

  // Side menu
  const checkBox = createMyElement('input', ['side-menu__checkbox']);
  const checkBoxLabel = createMyElement(
    'label',
    ['side-menu__item'],
    'My Task',
  );

  checkBox.type = 'checkbox';
  checkBox.id = 'My Task';
  checkBoxLabel.htmlFor = 'My Task';
  checkBoxLabel.prepend(checkBox);

  document.querySelector('.task-lists-container').appendChild(myTaskList);
  document.querySelector('[data-task-container="My Task"]').appendChild(myTask);
  document.querySelector('.list-container').appendChild(checkBoxLabel);
})();

// Init modal

modalModule();
