import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'myFirebase';

// import { Amplify, API, Auth, Storage } from 'aws-amplify';
// const awsExports = require('@/aws-exports').default;

// Amplify.register(API);
// Amplify.register(Storage);
// Amplify.register(Auth);
// /* Register the services before configure */
// Amplify.configure(awsExports);

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //* option 1
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args), //todo REMEMBER this!
        });

        //* option 2
        // setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    //* option 1
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });

    //* option 2 error
    // setUserObj(Object.assign({}, user));
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'Initializing...'
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Sean</footer> */}
    </>
  );
};

export default App;
