import { authService } from 'myFirebase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
        //todo add photo url
        // photoUrl: userObj.photoUrl,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
        />
        {/* {userObj.Profile.photoUrl} */}
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;

// const getMyTweets = async () => {
//   const tweets = await dbService
//     .collection('tweets')
//     .where('creatorId', '==', userObj.uid)
//     .orderBy('createdAt', 'desc')
//     .get();
//   console.log(tweets.docs.map((doc) => doc.data()));
// };

// useEffect(() => {
//   getMyTweets();
// }, []);
