import AddContact from './components/AddContact/AddContact';
import ContactList from './components/ContactList/ContactList';
import User from './components/User/ContactDetail';
import NotFound from './pages/NotFound';

const routes = [
  { path: '/user/:id', component: User },
  { path: '/add', component: AddContact },
  { path: '/', component: ContactList, exact: true },
  { path: '*', component: NotFound },
];

export default routes;
