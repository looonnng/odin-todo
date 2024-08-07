import { createMyElement } from './loadTodo';

const loadTaskListToSideBar = () => {
  const sideMenuListContainer = document.querySelector('.list-container');
  const taskListContainers = document.querySelectorAll('.todos-card__name');

  taskListContainers.forEach((container) => {
    const taskList = createMyElement('li', ['side-menu__item']);
    const checkBox = createMyElement('input', ['side-menu__checkbox']);
    const checkBoxLabel = createMyElement('label', '', container.textContent);

    checkBox.type = 'checkbox';
    checkBox.id = container.textContent;
    checkBoxLabel.htmlFor = container.textContent;
    taskList.append(checkBox, checkBoxLabel);

    sideMenuListContainer.insertBefore(
      taskList,
      sideMenuListContainer.lastElementChild,
    );
  });
};

export default loadTaskListToSideBar;
