import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectIsAuth, resetAuthState } from "../../redux/auth/slice";
import { Container, Button } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import styles from "./Header.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    const resultAction = dispatch(logout());

    if (logout.fulfilled.match(resultAction)) {
      localStorage.removeItem("authToken");

      dispatch(resetAuthState());

      console.log("Successfully logged out");
    } else {
      console.error("Logout failed:", resultAction.payload);
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <FeedIcon />
            MPS BLOG
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Write an article</Button>
                </Link>
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
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
