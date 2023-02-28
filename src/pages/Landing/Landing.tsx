// stylesheets
import styles from "./Landing.module.css";

// types
import { User } from "../../types/models";

import { Link } from "react-router-dom";

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props;

  return (
    <>
      <main className={styles.container}>
        <div className={styles.leftBox}>
          <h1>Hi, {user ? user.name : "friend"}! 👋</h1>
          <p>Start keeping track of your special moments</p>
        </div>
        <div></div>
      </main>
      <div className={styles.midContainer}>
        <button>
          <Link to="/create" className={styles.midContainerBtn}>
            Create anniversary
          </Link>
        </button>
        <button>
          <Link to="/posts" className={styles.midContainerBtn}>
            Anniversary
          </Link>
        </button>
        <button>
          {user ? (
            ""
          ) : (
            <Link to="/signup" className={styles.midContainerBtn}>
              Create Account
            </Link>
          )}
        </button>
      </div>
    </>
  );
};

export default Landing;
