import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={
          avatarUrl ||
          "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png"
        }
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
