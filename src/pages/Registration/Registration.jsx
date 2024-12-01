import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import { selectIsAuth } from "../../redux/auth/slice";
import { Typography, TextField, Paper, Button, Avatar } from "@mui/material";

import styles from "./Registration.module.scss";

const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    const data = dispatch(registerUser(values));

    if (!data.payload) {
      return alert("Не вдалося зареєструватися");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення аккаунту
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type="fullName"
          {...register("fullName", { required: "Вкажіть повне ім'я" })}
          fullWidth
        />
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
        <Button
          disabled={!isValid}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default Registration;
