import './style.css';
import '@material-design-icons/font';
import modalModule from './modal';

// Init default lists && local storage
(() => {
  let localProjectObject = JSON.parse(localStorage.getItem('My Task'));

  if (!localProjectObject) {
    const myTaskObject = {
      taskTitle: 'lorem',
      taskStatus: 'no',
      taskDue: 'WIP',
    };

    localProjectObject = {
      projectTitle: 'My Task',
      projectTasks: [myTaskObject],
    };
  }

  // only init default list when there are none in local
  if (localStorage.length === 0) {
    localStorage.setItem('My Task', JSON.stringify(localProjectObject));
  }
})();

// Init module
modalModule();
