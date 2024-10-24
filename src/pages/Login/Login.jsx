import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectIsAuth } from "../../redux/auth/auth";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = (values) => {
    dispatch(login(values));
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Вкажіть пошту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Вкажіть пароль" })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
