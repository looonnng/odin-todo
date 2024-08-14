import './style.css';
import '@material-design-icons/font';
import modalModule from './modal';

// Init default lists && local storage
(() => {
  const myTaskListObject = {
    projectTitle: 'My Task',
    projectTasks: ['lorem'],
  };

  localStorage.setItem('My Task', JSON.stringify(myTaskListObject));
})();

// Init module
modalModule();
