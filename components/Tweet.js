  import styles from "../styles/Home.module.css";
  import { useSelector, useDispatch } from "react-redux";
  import { useState, useEffect } from "react";
  import { changeState } from "../reducers/tweets";

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faGrinWink } from '@fortawesome/free-solid-svg-icons';

  import Picker from '@emoji-mart/react'

  function Tweet() {
    const [tweet, setTweet] = useState("");
    const [token, setToken] = useState("");
    const [timestamp, setTimestamp] = useState(0);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const user = useSelector((state) => state.user.value);
    const tweetStatus = useSelector((state) => state.tweets.value);
    const dispatch = useDispatch();

    useEffect(() => {
      setToken(user.token);  // Changed from activeUser.token
      setTimestamp(new Date().getTime());
    }, [tweetStatus]);  

    const addEmojiToTweet = (emoji) => {
      console.log("Emoji selected:", emoji.native);
      setTweet(prevTweet => prevTweet + emoji.native);
  };

    const handleSubmitBtn = () => {
      if (tweet === "") {
        return;
      } 
      const userData = { token, tweet, timestamp };
      fetch("https://twitterhack-backend.vercel.app/tweets/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      .then((response) => response.json())
      .then(() => dispatch(changeState()))
      .then(() => setTweet(""));
    };

    console.log(Picker);

    return (
      <div className={styles.inputBox}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="What's up ?"
          maxLength="280"
          value={tweet}
          onChange={(input) => setTweet(input.target.value)}
        />
        <div className={styles.tweetBtn}>
          <p className={styles.characterCount}>{tweet.length}/280</p>
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <FontAwesomeIcon icon={faGrinWink} />
          </button>
          <button className={styles.submitTweet} onClick={handleSubmitBtn}>
            Tweet
          </button>
        </div>
    
        {showEmojiPicker && (
          <div className={styles.overlay} onClick={() => setShowEmojiPicker(false)}></div>
        )}
    
        {showEmojiPicker && (
          <div className={styles.modal}>
            <Picker 
              onSelect={(emoji, event) => {
                event.stopPropagation();
                addEmojiToTweet(emoji);
                setShowEmojiPicker(false); // Fermer le sélecteur après avoir choisi un émoji
              }} 
            />
          </div>
        )}
      </div>
    );    
  }

  export default Tweet;
