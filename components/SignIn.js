import styles from "../styles/Signin.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal } from "antd";
import { useModal } from "../contexts/ModalContext";

function UserConnect() {

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const { isModalSignInVisible, showModalSignIn, hideModalSignIn } = useModal();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

/* Boutton pour ouvrir la modal */
  const showModal = () => {
    showModalSignIn();
  };

  /* Fermeture de la modal */
  const hideModal = () => {
    hideModalSignIn() 
  }

  const handleConnection = () => {
    fetch("https://twitterhack-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        username: signInUsername, 
        password: signInPassword 
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ 
            username: signInUsername, 
            token: data.token }));
            router.push("/home");
            hideModalSignIn();            
        }
      });
  };

  let modalContent
    if (!user.isConnected) {
      modalContent = (
      <div className={styles.header}>
        <div className={styles.closeIcon}> 
          <FontAwesomeIcon onClick={hideModal} className={styles.userSection} icon={faXmark} />
        </div>
        <div className={styles.logoContainer}>
          <img src='/logoTwitter.png' 
               alt='Twitter logo' 
               className={styles.logo} />
          <h1>Login to your Hackatweet account</h1>
        </div>
        <div>
          <input
            className={styles.inputInfo}
            type="text"
            placeholder="Username"
            onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername}
          />
        </div>

        <div>
          <input
            className={styles.inputInfo} 
            type="password" 
            placeholder="Password" 
            id="signInPassword" 
            onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} 
          />
        </div>
        <div>
          <button className={styles.submitBtn} onClick={() => handleConnection()}>
            Sign in
          </button>
        </div>
      </div>
      );
    }

  return (
    <div>
      <button className={styles.btnIn} onClick={showModal}>Sign in</button>
      {isModalSignInVisible && <div className={styles.overlay}></div>}
      {isModalSignInVisible && (
      <Modal 
        open={isModalSignInVisible}
        className={styles.modal} 
        footer={null} 
        closable={false}
      >
        {modalContent}
      </Modal>
    )}
    </div>
  );
}

export default UserConnect;
