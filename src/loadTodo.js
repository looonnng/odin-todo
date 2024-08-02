const createMyElement = (tag, classList = [], text = '') => {
  const element = document.createElement(tag);
  element.classList.add(...classList);
  element.textContent = text;
  return element;
};

export const createTask = (task) => {
  const todoCard = createMyElement('div', ['todos-card', 'col', 'my-task']);
  const todoCardTop = createTodoCardTop();
  const addTaskButton = createButton(
    ['todos-card__add-task-btn', 'row'],
    'add_task',
    ['size-27'],
  );

  addTaskButton.appendChild(createMyElement('p', [], 'Add a task'));
  todoCard.append(todoCardTop, addTaskButton);

  return todoCard;
};

// Todo Card Top
function createTodoCardTop() {
  const todoCardTop = createMyElement('div', ['todos-card__top', 'row']);
  const todoCardName = createMyElement('div', ['todos-card__name'], 'My Task');
  const todoCardMoreOptionBtn = createMyElement('div', [
    'todos-card-list-options-btn',
  ]);
  const moreVertIcon = createMyElement(
    'span',
    ['material-symbols-outlined', 'size-20'],
    'more_vert',
  );

  todoCardMoreOptionBtn.appendChild(moreVertIcon);
  todoCardTop.append(todoCardName, todoCardMoreOptionBtn);
  return todoCardTop;
}

// Todo Card
function createButton(buttonClassList = [], iconName, buttonIconClassList) {
  buttonIconClassList.unshift('material-symbols-outlined');
  const button = createMyElement('button', buttonClassList);
  const buttonIcon = createMyElement('span', buttonIconClassList, iconName);

  button.appendChild(buttonIcon);
  return button;
}
