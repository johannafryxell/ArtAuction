import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
