'use strict';

const registerUser = document.getElementById('registerUser');
const login = document.getElementById('login');
const userName = document.getElementById('username');
let listUsers = document.querySelector('#list');

let arrayUsers = [];

if (localStorage.getItem('listUsers')) {
   arrayUsers = JSON.parse(localStorage.getItem('listUsers'));
}


const render = function () {
   listUsers.textContent = '';

   arrayUsers.forEach((item, i) => {

      let li = document.createElement('li');
      let btn = document.createElement('button');
      btn.textContent = 'удалить пользователя';
      btn.style.marginLeft = '15px';
      btn.style.marginBottom = '15px';
      li.innerHTML = 'Имя: ' + item.firstName + ', фамилия: ' + item.lastName + ', зарегестрирован: ' + item.regDate;
      listUsers.append(li);
      li.append(btn);

      btn.addEventListener('click', () => {
         arrayUsers.splice(i, 1);
         localStorage.setItem('listUsers', JSON.stringify(arrayUsers));
         render();
      });

      localStorage.setItem('listUsers', JSON.stringify(arrayUsers));
   });
   
};

registerUser.addEventListener('click', function (event) {

   let user = {
         firstName: '',
         lastName: '',
         login: '',
         pasword: '',
         regDate: ''
   };

   let nameAll = prompt('Введите через пробел Имя и Фамилию пользователя');

   if (!/^[a-wа-я]*\s[a-wа-я]*$/ig.test(nameAll)) {
      alert('неверный формат ввода');
      return;
   } 

   user.login = prompt('Введите логин');
   user.pasword = prompt('Введите пароль');

   let dateAll = new Date(),
      mounthDay = dateAll.toLocaleString('ru', {month: 'long'}),
      second = dateAll.getSeconds(),
      minute = dateAll.getMinutes(),
      hour = dateAll.getHours(),
      year = dateAll.getFullYear(),
      dateNow = dateAll.getDate();

   user.firstName = nameAll.split(' ')[0];
   user.lastName = nameAll.split(' ')[1];

   const zerroAdd = x => ((x < 10) ? '0' + x : x);

   const formatMonth = function (tmp) {
      if (tmp.slice(-1) === 'ь' || tmp.slice(-1) === 'й') {
         return tmp.substring(0, tmp.length - 1) + 'я';
      } else {
         return tmp + 'а';
      }
   };

   user.regDate = dateNow + ' ' + formatMonth(mounthDay) + ' ' + year + ' г., ' + zerroAdd(hour) + ':' + zerroAdd(minute) + ':' + zerroAdd(second);

   arrayUsers.push(user);

   render();
});



login.addEventListener('click', () => {
   let loginAuto = prompt('Введите логин');
   let paswordAuto = prompt('Введите пароль');

   let result;
   arrayUsers.forEach((item) => {
      if (loginAuto === item.login && paswordAuto === item.pasword) {
         userName.textContent = item.firstName;
         result =true;
         return;
      }
   });
   
   if (!result) {
      alert('Пользователь ненайден');
   } 

});

render();
