import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post/Post";
import { Index } from "../components/AddComment/AddComment";
import { CommentsBlock } from "../components/UserInfo/CommentsBlock";
import apiInstance from "../services/apiBlog";
import ReactMarkdown from "react-markdown";

const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    apiInstance
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Помилка при отриманні статті");
      });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt.slice(0, 10)}
        commentsCount={data.commentsCount}
        tags={data.tags}
        viewsCount={data.viewsCount}
        isFullPost
      >
        <ReactMarkdown>{data.text}</ReactMarkdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Jastin Wilson",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Це текстовий коментарій 3333",
          },
          {
            user: {
              fullName: "Michael Martin",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};

export default FullPost;
