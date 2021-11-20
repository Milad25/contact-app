import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getOneContact,
  updataAContact,
} from '../../services/httpServiceMethods';
import { toast } from 'react-toastify';

const ContactDetail = ({ match, history }) => {
  const [contact, setContact] = useState({ name: '', email: '' });

  useEffect(() => {
    // const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    // if (savedContacts) {
    //   const filteredContact = savedContacts.filter(
    //     (s) => s.id === parseInt(match.params.id)
    //   );
    //   setContact(...filteredContact);
    // }
    getOneContactHandler();
  }, []);

  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const getOneContactHandler = async () => {
    try {
      const { data } = await getOneContact(match.params.id);
      setContact(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updataAContactHandler = async () => {
    try {
      await updataAContact(match.params.id, contact);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (contact.name.trim() === '' || contact.email.trim() === '') {
      alert('fill all the input fields');
    } else {
      updataAContactHandler();
      setContact({ name: '', email: '' });
      // history.push('/');
      toast.success('Contact Updated', {
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
      <button type='submit'>update</button>
      <Link style={{ marginTop: '20px' }} to='/'>
        Go Home
      </Link>
    </form>
  );
};

export default ContactDetail;
