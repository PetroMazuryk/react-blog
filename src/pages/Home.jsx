import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tabs, Tab, Grid } from "@mui/material";

import { Post } from "../components/Post/Post";
import { TagsBlock } from "../components/UserInfo/TagsBlock";
import { CommentsBlock } from "../components/UserInfo/CommentsBlock";
import { fetchPosts, fetchLastTags } from "../redux/posts/operations";

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const [activeTab, setActiveTab] = React.useState(0);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const sortedPosts =
    activeTab === 0
      ? [...posts.items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : [...posts.items].sort((a, b) => b.viewsCount - a.viewsCount);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchLastTags());
  }, [dispatch]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={activeTab}
        onChange={handleTabChange}
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
          ) : sortedPosts && sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                imageUrl={
                  post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ""
                }
                user={post.user}
                createdAt={post.createdAt.slice(0, 10)}
                commentsCount={post.commentsCount}
                tags={post.tags}
                viewsCount={post.viewsCount}
                isEditable={userData?._id === post.user._id}
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
