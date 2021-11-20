import { useState } from 'react';
import './AddContact.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { postAContact } from '../../services/httpServiceMethods';

const AddContact = ({ history }) => {
  // if you wanna use localStorage you gotta set id yourself
  // and if you use server, the server generates id for you.
  const [contact, setContact] = useState({
    name: '',
    email: '',
    // id: 0
  });

  const changeHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
      // id: Date.now()
    });
  };

  const addContactHandler = async () => {
    // const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    // if (savedContacts) {
    //   localStorage.setItem(
    //     'contacts',
    //     JSON.stringify([...savedContacts, contact])
    //   );
    // } else {
    //   localStorage.setItem('contacts', JSON.stringify([contact]));
    // }

    try {
      await postAContact(contact);

      toast.success('Contact added', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim()) {
      alert('Please fullfill the input fields');
    } else {
      addContactHandler(contact);
      setContact({ name: '', email: '' });
      history.push('/');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='formControl'>
        <label>name</label>
        <input
          type='text'
          name='name'
          value={contact.name}
          onChange={changeHandler}
        />
      </div>
      <div className='formControl'>
        <label>email</label>
        <input
          type='text'
          name='email'
          value={contact.email}
          onChange={changeHandler}
        />
      </div>
      <button type='submit'>add</button>
      <Link style={{ marginTop: '20px' }} to='/'>
        Go Home
      </Link>
    </form>
  );
};

export default AddContact;
