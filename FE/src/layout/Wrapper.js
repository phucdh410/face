import React from "react";
import { useLocation } from "react-router";
import { Scrollbar } from "smooth-scrollbar-react";
import { Box } from "@mui/material";

import Navbar from "./Navbar";
import LeftMenu from "./LeftMenu";

const Wrapper = React.memo(({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Scrollbar
        plugins={{
          overscroll: {
            effect: "bounce",
          },
        }}
      >
        <Box id="wrapper" className="wrapper animsition">
          <Navbar />
          <LeftMenu pathname={pathname} />

          <Box className="control-sidebar-bg" />
          <Box id="page-wrapper">
            <Box className="content">{children}</Box>
          </Box>
        </Box>
      </Scrollbar>
    </>
  );
});

export default Wrapper;
