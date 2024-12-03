import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/auth/slice";
import apiInstance from "../../services/apiBlog";
import { TextField, Paper, Button } from "@mui/material";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageURL] = React.useState("");
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    console.log(event.target.files);
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await apiInstance.post("/api/upload", formData);
      console.log(data.url);
      setImageURL(data.url);
    } catch (err) {
      console.warn(err);
      alert("Помилка при завантаженні файлу");
    }
  };

  const onClickRemoveImage = () => {
    setImageURL("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = { title, imageUrl, tags, text };
      const { data } = await apiInstance.post("/posts", fields);

      const id = data._id;
      navigate(`/post/${id}`);
    } catch (error) {
      console.warn(error);
      alert("Помилка при створенні статті");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введіть текст...",
      status: false,
      autosave: {
        enabled: true,
        uniqueId: "addPostEditor",
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Завантажити превю
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Видалити
          </Button>

          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статті..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Теги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опублікувати
        </Button>
        <Link to="/">
          <Button size="large">Відміна</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default AddPost;
