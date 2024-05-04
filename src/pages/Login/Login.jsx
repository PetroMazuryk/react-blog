import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

const Login = () => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в аккаунт
      </Typography>
      <TextField
        className={styles.field}
        label="Email"
        error
        helperText="Невірно вказана пошта"
        fullWidth
      />
      <TextField className={styles.field} label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Login
      </Button>
    </Paper>
  );
};

export default Login;
