import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { selectIsAuth } from "../../redux/auth/slice";
import apiInstance from "../../services/apiBlog";
import { TextField, Paper, Button, CircularProgress } from "@mui/material";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageURL] = React.useState("");
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await apiInstance.post("/upload", formData);
      setImageURL(data.url);
    } catch (err) {
      console.warn(err);
      alert("Помилка при завантаженні файлу");
    } finally {
      setIsLoading(false);
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
      const { data } = isEditing
        ? await apiInstance.patch(`/posts/${id}`, fields)
        : await apiInstance.post("/posts", fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert("Помилка при створенні статті");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      apiInstance
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageURL(data.imageUrl);
          setTags(data.tags.join(","));
        })
        .catch((err) => {
          console.warn(err);
          alert("Помилка отримання статті");
        });
    }
  }, [id]);

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
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={20} /> : "Завантажити прев’ю"}
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
            className={styles.btnDelete}
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
            disabled={isLoading}
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
        disabled={isLoading}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Теги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        disabled={isLoading}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          onClick={onSubmit}
          size="large"
          variant="contained"
          disabled={isLoading}
        >
          {isEditing ? (
            isLoading ? (
              <CircularProgress size={20} />
            ) : (
              "Редагувати"
            )
          ) : isLoading ? (
            <CircularProgress size={20} />
          ) : (
            "Опублікувати"
          )}
          {/* {isLoading ? <CircularProgress size={20} /> : "Опублікувати"} */}
        </Button>
        <Link to="/">
          <Button size="large" disabled={isLoading}>
            Відміна
          </Button>
        </Link>
      </div>
    </Paper>
  );
};

export default AddPost;
