import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Trends({ onHashtagClick }) {
  const [hashtagList, setHashtagList] = useState([]);

  const tweetStatus = useSelector((state) => state.tweets.value);

  useEffect(() => {
    fetch(`https://twitterhack-backend.vercel.app/tweets/all`)
      .then((response) => response.json())
      .then((data) => {
        const tweets = data.tweets;
        const hashtagPattern = /#[a-z0-9_]+/gi;
        const tempHashtags = {};

        tweets.forEach((tweet) => {
          const foundHashtags = tweet.tweet.match(hashtagPattern);
          if (foundHashtags) {
            foundHashtags.forEach((tag) => {
              tempHashtags[tag] = (tempHashtags[tag] || 0) + 1;
            });
          }
        });

        setHashtagList(tempHashtags);
      });
  }, [tweetStatus]);

  return (
    <div className={styles.trendBox}>
      {Object.entries(hashtagList).map(([hashtag, count], index) => (
        <div className={styles.trend} key={index}>
          <h2 
            className={styles.hashtag} 
            onClick={() => onHashtagClick(hashtag)} // Ajoutez cette ligne
            style={{ cursor: "pointer" }}           // Pour indiquer que c'est cliquable
          >
            {hashtag}
          </h2>
          <p className={styles.tweetCount}>{count} Tweets</p>
        </div>
      ))}
    </div>
  );
}

export default Trends;
