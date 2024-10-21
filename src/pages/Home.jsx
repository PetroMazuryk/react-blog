import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post/Post";
import { TagsBlock } from "../components/UserInfo/TagsBlock";
import { CommentsBlock } from "../components/UserInfo/CommentsBlock";

const posts = [
  {
    _id: 1,
    title: "Roast the code #1 | Rock Paper Scissors",
    imageUrl:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png",
    user: {
      avatarUrl:
        "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
      fullName: "Keff",
    },
    createdAt: "03 november 2024",
    viewsCount: 150,
    commentsCount: 3,
    tags: ["react", "fun", "typescript"],
  },
  {
    _id: 2,
    title: "Roast the code #2 | Rock Paper Scissors",

    imageUrl:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png",
    user: {
      avatarUrl:
        "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
      fullName: "Keff",
    },
    createdAt: "04 november 2024",
    viewsCount: 200,
    commentsCount: 4,
    tags: ["react", "fun", "typescript"],
  },
];

const Home = () => {
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
          {posts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount}
              tags={post.tags}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={["react", "typescript", "нотатки"]}
            isLoading={false}
          />
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
