import React from "react";
import { withRouter } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const Page404 = React.memo(() => (
  <Box className="container">
    <Box className="row">
      <Box className="col-sm-12">
        <Box className="error-text">
          <Typography variant="h1" component="h1">
            4
            <Typography variant="h1" className="error bounce" component="span">0</Typography>
            <Typography variant="h1" className="m-l-90" component="span">4</Typography>
          </Typography>
          <Typography variant="h3" component="h3">
            <Typography variant="h3" component="span">Page</Typography>
            <br className="hidden-xs" />
            Not Found
          </Typography>
        </Box>
      </Box>
    </Box>

    <Box className="row">
      <Box className="col-sm-12">
        <Box className="error-desc">
          <Typography variant="h6" component="p">
            Sorry, but the page you are looking for has note been found. Try
            checking the URL for error, then hit the refresh button on your
            browser or try found something else in our app.
          </Typography>

          <form className="navbar-form" role="search">
            <Box className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for page"
              />
              <Box className="input-group-btn">
                <Button className="btn btn-success" type="submit">
                  <Typography variant="h6" component="span">Search</Typography>
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  </Box>
));

export default withRouter(Page404);
