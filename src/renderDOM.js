function renderDOM() {
  const collapseSideMenu = document.querySelector('#collapse-side-menu');
  collapseSideMenu.addEventListener('click', handleCollapseSideMenu);

  function handleCollapseSideMenu() {
    const sideMenu = document.querySelector('aside');
    sideMenu.classList.toggle('col');
    sideMenu.classList.toggle('hide-container');
  }
}

export default renderDOM;
