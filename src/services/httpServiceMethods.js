import http from './httpService';

export const getAllContacts = () => {
  return http.get('contacts/');
};

export const getOneContact = (id) => {
  return http.get(`contacts/${id}`);
};

export const postAContact = (data) => {
  return http.post('contacts/', data);
};

export const deleteAContact = (id) => {
  return http.delete(`contacts/${id}`);
};

export const updataAContact = (id, data) => {
  const token = 'SECURE_TOKEN';
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return http.put(`contacts/${id}`, data);
};
