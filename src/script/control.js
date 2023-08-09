import { setStorage, removeStorage } from './serviceStorage';

export const hoverRow = (allRow, logo) => {
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

export const modalControl = (btnAdd, formOverlay) => {
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

export const deleteControl = (btnDel, list) => {
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
export const addContactPage = (contact, list) => {
  list.append(create.createRow(contact));
};

export const formControl = (form, list, closeModal) => {
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

export default {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
};
