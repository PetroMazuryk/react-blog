import Container from "@mui/material/Container";
import FeedIcon from "@mui/icons-material/Feed";
import Button from "@mui/material/Button";
import styles from "./Header.module.scss";

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <FeedIcon />
            MPS BLOG
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <a href="/posts/create">
                  <Button variant="contained">Write an article</Button>
                </a>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button variant="outlined">Login</Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Register</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
