// stylesheets
import styles from "./Landing.module.css";

// types
import { User } from "../../types/models";

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props;

  return (
    <>
      <main className={styles.container}>
        <h1>hello, {user ? user.name : "friend"}</h1>
      </main>
      <div className={styles.midContainer}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </>
  );
};

export default Landing;
