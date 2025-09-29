import { Typography, Link, Box, Button } from "@mui/material";
//import React from 'react'

const Account = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            alert("wait for adding signup funcationality!");
          }}
          underline="none"
        >
          Create free account
        </Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", margin: 5 }}>
        <Typography variant="h5">Access your tasks anywhere.</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src="../diffnce_job_task_process.jpeg"
          alt="Task Image"
          width={400}
          height={200}
        />
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="body2">
          Keep your tasks safely stored even if your device is damaged or lost.
        </Typography>
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <Button
          onClick={() => alert("Wait for adding signup funcationality")}
          variant="contained"
          color="primary"
          sx={{marginTop:4}}
        >
          signup
        </Button>
      </Box>
    </>
  );
};

export default Account;
