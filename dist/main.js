(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
const { setStorage, removeStorage } = require('./serviceStorage');
const { createRow } = require('./createElements');

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach((contact) => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };
  btnAdd.addEventListener('click', openModal);
  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });
  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach((del) => {
      del.classList.toggle('is-visible');
    });
  });
  list.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    if (target.closest('.del-icon')) {
      const contact = target.closest('.contact');
      contact.remove();
      removeStorage(contact.querySelector('.phonelink').textContent);
    }
  });
};
const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    console.log(newContact);
    addContactPage(newContact, list);
    setStorage('contact', newContact);
    form.reset();
    closeModal();
  });
};

module.exports = {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
};

},{"./createElements":2,"./serviceStorage":4}],2:[function(require,module,exports){
'use strict';

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  return container;
};

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  const headerContainer = createContainer();
  header.append(headerContainer);
  header.headerContainer = headerContainer;

  return header;
};

const createLogo = (title) => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Телефонный справочник. ${title}`;

  return h1;
};
const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};
const createButtonsGroup = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({ className, type, text }) => {
    const button = document.createElement('button');
    button.type = type;
    button.className = className;
    button.textContent = text;
    return button;
  });
  btnWrapper.append(...btns);
  return {
    btnWrapper,
    btns,
  };
};
const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML(
    'beforeend',
    `<tr>
          <th class="delete">Удалить</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Телефон</th>

        </tr>
        `,
  );
  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;
  return table;
};

const createForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');

  const form = document.createElement('form');
  form.classList.add('form');
  form.insertAdjacentHTML(
    'beforeend',
    `
   <button class="close" type="button"></button>
   <h2 class="form-title">Добавить контакт</h2>
    <div class="form-group">
      <label class="form-label" for="name">Имя</label>
      <input class="form-input" name="name" id="name" 
       type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="surname">Фамилия</label>
      <input class="form-input" name="surname" id="surname" 
       type="text" required>
    </div>    <div class="form-group">
      <label class="form-label" for="phone">Телефон</label>
      <input class="form-input" name="phone" id="phone" 
       type="number" required>
    </div>
    `,
  );
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
  ]);

  form.append(...buttonGroup.btns);

  overlay.append(form);

  return {
    overlay,
    form,
  };
};
const createFooter = (title) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  const footerContainer = createContainer();
  footer.footerContainer = footerContainer;
  const footerText = document.createElement('p');
  footerText.textContent = `Все права защищены @${title}`;
  footer.footerContainer.append(footerText);

  footer.append(footerContainer);

  return footer;
};
const createRow = ({ name: firstname, surname, phone }) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');
  const buttonDel = document.createElement('button');
  buttonDel.classList.add('del-icon');
  tdDel.append(buttonDel);
  const tdName = document.createElement('td');
  tdName.textContent = firstname;
  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname;
  const tdPhone = document.createElement('td');
  const phoneLink = document.createElement('a');
  phoneLink.classList.add('phonelink');
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;
  tr.phoneLink = phoneLink;
  tdPhone.append(phoneLink);
  const tdChange = document.createElement('td');
  const buttonChange = document.createElement('button');
  buttonChange.classList.add('btn', 'btn-success');
  buttonChange.textContent = 'Изменить';
  tdChange.append(buttonChange);
  tr.append(tdDel, tdName, tdSurname, tdPhone, tdChange);

  return tr;
};
module.exports = {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
};

},{}],3:[function(require,module,exports){
'use strict';

const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
} = require('./createElements');

const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const { form, overlay } = createForm();
  const footer = createFooter(title);

  header.headerContainer.append(logo);

  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

  app.append(header, main, footer);
  return {
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form: form,
  };
};

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  const s = localStorage.getItem('sort');
  if (s === 'name') {
    allRow.sort((rowA, rowB) =>
      rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1,
    );
  }
  if (s === 'surname') {
    allRow.sort((rowA, rowB) =>
      rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1,
    );
  }
  elem.append(...allRow);
  return allRow;
};

module.exports = {
  renderPhoneBook,
  renderContacts,
};

},{"./createElements":2}],4:[function(require,module,exports){
'use strict';

const setStorage = (key, obj) => {
  const contacts = getStorage(key);
  contacts.push(obj);
  return localStorage.setItem(key, JSON.stringify(contacts));
};

const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

const removeStorage = (phone) => {
  let contacts = getStorage('contact');
  contacts.forEach((contact) => {
    if (contact.phone === phone) {
      contacts.splice(contact, 1);
    }
  });
  localStorage.setItem('contact', JSON.stringify(contacts));
};
module.exports = {
  setStorage,
  getStorage,
  removeStorage,
};

},{}],5:[function(require,module,exports){
'use strict';
const { getStorage } = require('./modules/serviceStorage');

const { renderPhoneBook, renderContacts } = require('./modules/render');
const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = require('./modules/control');

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const { list, logo, btnAdd, btnDel, formOverlay, form } = renderPhoneBook(
      app,
      title,
    );
    // функционал
    const allRow = renderContacts(list, getStorage('contact'));

    const { closeModal } = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    const tr = document.querySelector('tr');
    const tbody = document.querySelector('tbody');
    const trs = document.querySelectorAll('tr');
    tr.addEventListener('click', (e) => {
      const artr = Array.from(trs);
      if (e.target === trs[0].childNodes[3]) {
        localStorage.setItem('sort', 'name');
        const sortedRows = sorted(artr, 1);
        tbody.append(...sortedRows);
      }
      if (e.target === trs[0].childNodes[5]) {
        localStorage.setItem('sort', 'surname');
        const sortedRows = sorted(artr, 2);
        tbody.append(...sortedRows);
      }
    });
    const sorted = (artr, cell) => {
      console.log(artr, cell);
      const rows = artr
        .slice(1)
        .sort((rowA, rowB) =>
          rowA.cells[cell].innerHTML > rowB.cells[cell].innerHTML ? 1 : -1,
        );
      return rows;
    };
  };
  window.phoneBookInit = init;
}

},{"./modules/control":1,"./modules/render":3,"./modules/serviceStorage":4}]},{},[5]);
