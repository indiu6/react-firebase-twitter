import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'myFirebase';

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      } else {
        // setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Sean</footer> */}
    </>
  );
}

export default App;
