import React, { useEffect, useState } from 'react';
import './ContactList.css';
import userImage from '../../assets/images/profile.png';
import { Link } from 'react-router-dom';
import {
  deleteAContact,
  getAllContacts,
} from '../../services/httpServiceMethods';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [clonedContacts, setClonedContacts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const searchChangehHandler = (e) => {
    setSearchValue(e.target.value);
    searchHandler(e.target.value);
  };

  const searchHandler = (value) => {
    const filteredContacts = contacts.filter((c) => {
      // Search both on email and name of contacts

      //  return Object.values(c).join(' ').toLowerCase().includes(value.toLowerCase())

      return (
        c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setClonedContacts(filteredContacts);
  };

  useEffect(() => {
    searchHandler(searchValue);
  }, [contacts, searchValue]);

  useEffect(() => {
    // const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    // if (savedContacts) {
    //   setContacts(savedContacts);
    // }
    getAllContactsHandler();
  }, []);

  const getAllContactsHandler = async () => {
    try {
      const { data } = await getAllContacts();
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const deleteContactHandler = async (id) => {
    try {
      await deleteAContact(id);
      const { data } = await getAllContacts();
      setContacts(data);
    } catch (err) {
      console.log(err);

      toast.error('An Error Occured', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section className='contactList'>
      <div>
        <input
          style={{ margin: '1rem 0' }}
          type='text'
          placeholder='Search ...'
          value={searchValue}
          onChange={searchChangehHandler}
        />
      </div>
      <div>
        {clonedContacts ? (
          clonedContacts.map((contact) => {
            return (
              <Contact
                key={contact.id}
                c={contact}
                onDelete={deleteContactHandler}
              />
            );
          })
        ) : (
          <Loader
            type='Puff'
            color='#00BFFF'
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        )}
      </div>

      <Link style={{ marginTop: '20px' }} to='/add'>
        <button className='btn'>Add New Contact</button>
      </Link>
    </section>
  );
};

export default ContactList;

export const Contact = ({ c, onDelete }) => {
  const { name, email, id } = c;
  return (
    <div className='item'>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        <img alt='uesrImage' src={userImage} />

        <div>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </div>
      <div>
        <Link to={`/user/${id}`}>
          <button className='edit'>edit</button>
        </Link>

        <button className='deleteBtn' onClick={() => onDelete(id)}>
          delete
        </button>
      </div>
    </div>
  );
};
