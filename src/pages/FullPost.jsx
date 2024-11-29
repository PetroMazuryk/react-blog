import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post/Post";
import { Index } from "../components/AddComment/AddComment";
import { CommentsBlock } from "../components/UserInfo/CommentsBlock";
import apiInstance from "../services/apiBlog";

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
        data
        // user={{
        //   avatarUrl:
        //     "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
        //   fullName: "Keff",
        // }}

        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt.slice(0, 10)}
        commentsCount={data.commentsCount}
        tags={data.tags}
        viewsCount={data.viewsCount}
        isFullPost
      >
        <p>{data.text}</p>
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
