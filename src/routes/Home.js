import Tweet from 'components/Tweet';
import React, { useEffect, useState } from 'react';
import { dbService } from '../myFirebase';

const Home = ({ loggedInUser }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection('tweets').onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: loggedInUser.uid,
    });
    setTweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const aFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(aFile);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
  };

  const onClearAttachment = () => {
    setAttachment(null);
    let fileElement = document.getElementById('fileId');
    fileElement.value = null;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          id="fileId"
          onChange={onFileChange}
        />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img
              src={attachment}
              alt="attached pic"
              width="50px"
              height="50px"
            />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === loggedInUser.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

// const getTweets = async () => {
//   const dbTweets = await dbService.collection('tweets').get();
//   dbTweets.forEach((document) => {
//     const tweetObj = {
//       ...document.data(),
//       id: document.id,
//     };
//     setTweets((prev) => [tweetObj, ...prev]); //todo REMEMBER THIS!
//   });
// };
