import { Container, Grid, Typography } from "@mui/material";


export function Footer() {
  return (
    <>
      <Container component="footer">
        <Grid container spacing={2}>
          <Grid item sm={4}>
            LOGO
          </Grid>
          <Grid item>
            <Typography>About</Typography>
          </Grid>
          <Grid item>
            <Typography>Contact</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
