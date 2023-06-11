import { getStorage } from './modules/serviceStorage.js';

import render from './modules/render.js';
import {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} from './modules/control.js';

const { renderContacts, renderPhoneBook } = render;
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
