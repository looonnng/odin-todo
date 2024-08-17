import './style.css';
import '@material-design-icons/font';
import modalModule from './modal';

// Init default lists && local storage
(() => {
  const myTaskObject = {
    taskTitle: 'lorem',
    taskStatus: 'no',
    taskDue: 'WIP',
  };

  const myTaskListObject = {
    projectTitle: 'My Task',
    projectTasks: [myTaskObject],
  };

  localStorage.setItem('My Task', JSON.stringify(myTaskListObject));
})();

// Init module
modalModule();
