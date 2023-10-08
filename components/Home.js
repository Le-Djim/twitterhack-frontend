import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

import Tweet from "./Tweet";
import LastTweet from "./LastTweet";
import Trends from "./Trends";
import SearchBar from './SearchBar';
import moment from "moment";

function Home() {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const user = useSelector((state) => state.user.value);

  const handleHashtagClick = (hashtag) => {
    setSelectedHashtag(hashtag);
};

  useEffect(() => {
    if (!user.token) {
      router.push("/");
    } else {
      fetch(`https://twitterhack-backend.vercel.app/users/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          setFirstname(data.user.firstname);
          setUsername(data.user.username);
          setProfilePic(data.user.profileImage);
        });
    }
  }, []);

  const dispatch = useDispatch();

  const handleHashtagSearch = (hashtag) => {
    setSelectedHashtag(hashtag);
    console.log('Searching for tweets with hashtag:', hashtag);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const navigateToHome = () => {
    setSelectedHashtag(null);
    router.push("/home");
  };  

  const [tweetList, setTweetList] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const tweetStatus = useSelector((state) => state.tweets.value);


  useEffect(() => {
    fetch("https://twitterhack-backend.vercel.app/tweets/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTweetList(data.tweets);
      });
  }, [tweetStatus]);

  tweetList.sort((a, b) => b.timestamp - a.timestamp);

  function displayText(str) {
    const words = str.split(" ");
    return words.map((word, index) => {
      if (/^#/.test(word)) {
        return (
          <span 
            key={index} 
            style={{ color: "#1c9cef", cursor: "pointer" }}
            onClick={() => handleHashtagClick(word)}>
            {word}{" "}
          </span>
        );
      } else {
        return <span key={index}>{word} </span>;
      }
    });
  }

// Filtrer les tweets en fonction du hashtag sélectionné
const filteredTweets = selectedHashtag
? tweetList.filter((tweet) => tweet.tweet.includes(selectedHashtag))
: tweetList;

  const allTweets = filteredTweets.map((data, i) => (
    <LastTweet
      key={data._id || i}
      idValue={data._id || i}
      tweetId={data._id}
      firstname={data.user.firstname}
      username={data.user.username}
      token={data.user.token}
      timestamp={moment(data.timestamp).startOf("second").fromNow()}
      tweetText={displayText(data.tweet)}
      profileImage={data.user.profileImage}
    />
  ));

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img
          src="/logoTwitter.png"
          alt="Twitter logo"
          className={styles.miniLogo}
          onClick={navigateToHome}
        />
        <div className={styles.footer}>
          <div className={styles.userCard}>
            <img
              className={styles.profilePic}
              src={profilePic || "/profile1.jpg"} 
              alt="Profile"
            />
            <div className={styles.userText}>
              <h4 className={styles.username}>{firstname}</h4>
              <h5 className={styles.identifier}>@{username}</h5>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.middle}>
      {selectedHashtag ? (
        <SearchBar onSearch={handleHashtagSearch} selectedHashtag={selectedHashtag} />
        ) : (
          <>
            <h1 className={styles.title}>Home</h1>
            <Tweet />
          </>
        )}
        <div className={styles.container}>{allTweets}</div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>Trends</h1>
        <Trends onHashtagClick={handleHashtagClick} />
      </div>
    </div>
  );
}

export default Home;
