import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post/Post";
import { TagsBlock } from "../components/UserInfo/TagsBlock";
import { CommentsBlock } from "../components/UserInfo/CommentsBlock";
import { fetchPosts, fetchLastTags } from "../redux/posts/operations";

// const posts = [
//   {
//     _id: 1,
//     title: "Roast the code #1 | Rock Paper Scissors",
//     imageUrl:
//       "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png",
//     user: {
//       avatarUrl:
//         "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
//       fullName: "Keff",
//     },
//     createdAt: "03 november 2024",
//     viewsCount: 150,
//     commentsCount: 3,
//     tags: ["react", "fun", "typescript"],
//   },

// ];

const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchLastTags());
  }, [dispatch]);
  console.log(posts);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {isPostLoading ? (
            [...Array(3)].map((_, index) => (
              <Post key={index} isLoading={true} />
            ))
          ) : posts.items && posts.items.length > 0 ? (
            posts.items.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={post.user}
                createdAt={post.createdAt}
                commentsCount={post.commentsCount}
                tags={post.tags}
                viewsCount={post.viewsCount}
                isLoading={false}
                isEditable
              />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Justin Wilson",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Це тестовий коментарій",
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
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
