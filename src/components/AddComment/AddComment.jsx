import styles from "./AddComment.module.scss";

import { Button, Avatar, TextField } from "@mui/material";

export const Index = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написати коментарій"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Відправити</Button>
        </div>
      </div>
    </>
  );
};
