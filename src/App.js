import './App.css';
import Layout from './Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main className='App'>
      <Layout>
        <Switch>
          {routes.map((route) => {
            return <Route {...route} key={route.path} />;
          })}
        </Switch>
        <ToastContainer />
      </Layout>
    </main>
  );
}

export default App;
