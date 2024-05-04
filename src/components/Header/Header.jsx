import styles from "./Header.module.scss";

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <a className={styles.logo} href="/">
          <div>MPS BLOG</div>
        </a>
        <div className={styles.buttons}>
          {isAuth ? (
            <>
              <a href="/posts/create">
                <button>Написати статю</button>
              </a>
              <button onClick={onClickLogout}>Вийти</button>
            </>
          ) : (
            <>
              <a href="/login">
                <button>Увійти</button>
              </a>
              <a href="/register">
                <button>Створити аккаунт</button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
