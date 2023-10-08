  import styles from "../styles/Signup.module.css";
  import { useState } from "react";
  import { useRouter } from "next/router";
  import { useDispatch, useSelector } from "react-redux";
  import { login } from "../reducers/user";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faXmark } from '@fortawesome/free-solid-svg-icons';
  import { Modal } from "antd";
  import { useModal } from "../contexts/ModalContext";

  function UserRegister() {

    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpFirstname, setSignUpFirstname] = useState("");

    const { isModalSignUpVisible, showModalSignUp, hideModalSignUp } = useModal();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const router = useRouter(); 

    /* Ouvrir la modal */
      const showModal = () => {
        showModalSignUp()
      };

    /* Fermeture de la modal */
      const hideModal = () => {
        hideModalSignUp();
      }
      
      const handleConnection = () => {
        console.log("click signup");
        fetch("https://twitterhack-backend.vercel.app/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: signUpFirstname,
            username: signUpUsername,
            password: signUpPassword,
          }),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Réponse du serveur non-200');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Ajout d'un log pour voir la structure de data
          if (data.result) {
            dispatch(login({ 
              firstname: signUpFirstname, 
              username: signUpUsername, 
              password: signUpPassword,
              token: data.token 
            }));
            setSignUpUsername("");
            setSignUpPassword("");
            setSignUpFirstname("");
            hideModalSignUp();
            router.push("/home");
          } else {
            console.error("Erreur lors de l'inscription:", data.message || "Message d'erreur non spécifié");
          }
        })
        .catch(error => {
          console.error("Erreur lors de l'envoi de la requête:", error);
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
            <img src='/logoTwitter.png' alt='Twitter logo' className={styles.logo} />
            <h1>Login to your Hackatweet account</h1>
          </div>
          <div>
          <div>
            <input
              className={styles.inputInfo} 
              type="text" 
              placeholder="Firstname" 
              id="signUpFirstname" 
              onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} 
            />
          </div>
            <input
              className={styles.inputInfo}
              type="text"
              placeholder="Username"
              onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}
            />
          </div>

          <div>
            <input
              className={styles.inputInfo} 
              type="password" 
              placeholder="Password" 
              id="signInPassword" 
              onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} 
            />
          </div>
          <div>
            <button className={styles.submitBtn} onClick={() => handleConnection()}>
              Sign up
            </button>
          </div>
        </div>
        );
      }

    return (
      <div>
        <button className={styles.btnUp} onClick={showModal}>Sign up</button>
        {isModalSignUpVisible && <div className={styles.overlay}></div>}
        {isModalSignUpVisible && (
        <Modal visible={isModalSignUpVisible  } 
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

  export default UserRegister;
