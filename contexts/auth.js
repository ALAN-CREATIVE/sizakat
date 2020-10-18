import Cookies from 'js-cookie';
import Router from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext({});
const NewContext = createContext({});

export const ForgetPassword = ({ children }) => {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  // TODO change to graphQL
  const forgetPass = async (email, passwordUrl) => {
    // api.post('/reset-password/', { 'email': email, 'changePasswordUrl': passwordUrl })
    //   .then(response => {
    //     if (response.data.success === true) {
    //       setIsSent(true)
    //       Router.reload()
    //       alert("Link ubah password telah dikirim ke email anda")
    //     }
    //   })
    //   .catch((error) => {
    //     setError(error)
    //   })
  };

  return (
    <NewContext.Provider value={{ forgetPass, error, isSent }}>
      {children}
    </NewContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false || !!Cookies.get('session'));
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    api
      .post('/login/', { username: username, password: password })
      .then((response) => {
        const session = response.data.session;
        Cookies.set('session', session);
        console.log(session);
        setIsAuth(true);
        api.defaults.headers.Authorization = session;
        Router.push('/');
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logout = () => {
    api.get('/logout/').finally(() => {
      setIsAuth(false);
      Router.push('/login');
      Cookies.remove('session');
    });
  };

  return (
    <AuthContext.Provider value={{ isAuth, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export function newAuth() {
  const context = useContext(NewContext);
  return context;
}

// TODO find the proper way to protect route
// best reference so far https://github.com/vercel/next.js/issues/153
// idea: custom hooks to manage cookie vs localstorage?
export function ProtectRoute(Component) {
  return (props) => {
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        Router.replace('/login');
      }
    }, []);

    return <Component {...props} />;
  };
}
