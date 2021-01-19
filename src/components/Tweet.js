import { dbService, storageService } from 'myFirebase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure to delete this tweet?');
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your Tweet"
                  value={newTweet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Tweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img src={tweetObj.attachmentUrl} alt="attached pic" />
          )}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
