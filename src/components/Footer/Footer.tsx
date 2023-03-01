// stylesheets
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <p>@Yong Park</p>
        <a href="/">Go to Aged Homepage</a>
      </div>
    </div>
  );
};

export default Footer;
