import styles from "../styles/Login.module.css";
import { ModalProvider } from "../contexts/ModalContext";  // <-- import ModalProvider

import SignIn from "./SignIn";
import SignUp from "./SignUp";


// Component:
function Login() {
  return (
  <ModalProvider>
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.left}>
          <img src='/cover.png' alt='cover' className={styles.cover} />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <img src='/logotwitter.png' alt='Twitter logo' className={styles.logo} />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>
              See what's <br /> happening
            </h1>
            <br />
            <h2 className={styles.subtitle}>Join Hackatweet today.</h2>
            <div className={styles.connectionBtns}>
              <SignUp />
              <p className={styles.text}>Already have an account ?</p>
              <SignIn />
            </div>
          </div>
        </div>
      </main>
    </div>
  </ModalProvider>
  );
}

export default Login;
