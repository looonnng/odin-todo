import { createMyElement } from './loadTodo';

const loadTaskListToSideBar = () => {
  const sideMenuListContainer = document.querySelector('.list-container');
  const taskListContainers = document.querySelectorAll('.todos-card__name');

  taskListContainers.forEach((container) => {
    const checkBox = createMyElement('input', ['side-menu__checkbox']);
    const checkBoxLabel = createMyElement(
      'label',
      ['side-menu__item'],
      container.textContent,
    );

    checkBox.type = 'checkbox';
    checkBox.id = container.textContent;
    checkBoxLabel.htmlFor = container.textContent;
    checkBoxLabel.prepend(checkBox);

    sideMenuListContainer.insertBefore(
      checkBoxLabel,
      sideMenuListContainer.lastElementChild,
    );
  });
};

export default loadTaskListToSideBar;
