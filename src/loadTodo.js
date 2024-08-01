const createMyElement = (tag, classList = [], text = '') => {
  const element = document.createElement(tag);
  element.classList.add(...classList);
  element.textContent = text;
  return element;
};

export const createTask = (task) => {
  const todoCard = createMyElement('div', ['todos-card', 'col', 'my-task']);
  const todoCardTop = createTodoCardTop();
  
  todoCard.append(todoCardTop);
};

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
