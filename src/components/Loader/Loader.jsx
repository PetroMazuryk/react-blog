import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    <CircularProgress />
  </div>
);

export default Loader;
