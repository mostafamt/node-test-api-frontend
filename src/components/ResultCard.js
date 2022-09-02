import React from "react";
// import CircularProgress from "./CircularProgress";
// import CircularProgress from "@mui/material/CircularProgress";
// import CircularProgress2 from "./CircularProgress2";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";

function ResultCard({ rank }) {
  const [animatedRank, setAnimatedRank] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (rank > animatedRank) {
        if (rank - animatedRank <= 2) {
          setAnimatedRank(rank);
        } else {
          setAnimatedRank((prev) => prev + 1);
        }
      }
    }, 50);
    return () => {
      clearTimeout(timeout);
    };
  }, [rank, animatedRank]);

  const clickHandler = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: "1.8rem" }}>Rank: {animatedRank}%</p>

      <Button
        variant="contained"
        // sx={{ mt: "auto" }}
        endIcon={<ReplayIcon />}
        onClick={clickHandler}
      >
        Try Again
      </Button>
    </div>
  );
}

export default ResultCard;
