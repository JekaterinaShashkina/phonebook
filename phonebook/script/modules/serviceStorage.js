export const setStorage = (key, obj) => {
  const contacts = getStorage(key);
  contacts.push(obj);
  return localStorage.setItem(key, JSON.stringify(contacts));
};

export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const removeStorage = (phone) => {
  let contacts = getStorage('contact');
  contacts.forEach((contact) => {
    if (contact.phone === phone) {
      contacts.splice(contact, 1);
    }
  });
  localStorage.setItem('contact', JSON.stringify(contacts));
};
