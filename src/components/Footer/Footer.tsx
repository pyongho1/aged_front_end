// stylesheets
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <a href="/">Go to Aged Homepage</a>
        <p>@Yong Park</p>
      </div>
    </div>
  );
};

export default Footer;
