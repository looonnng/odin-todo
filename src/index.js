import './style.css';

const myEle = document.createElement('h1');
myEle.textContent = 'Hello World!';
myEle.classList.add('test');

document.body.appendChild(myEle);
