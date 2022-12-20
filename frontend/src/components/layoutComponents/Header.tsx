import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const headersData = [
  {
    label: "Auctions",
    href: "/auctions",
  },
  {
    label: "My Account",
    href: "/account",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function Header() {
  const displayDesktop = () => {
    return <Toolbar>{getMenuButtons()}</Toolbar>;
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <>
      <header>
        <AppBar position="sticky">
          <Typography variant="h2" align="center">ART AUCTION</Typography>
          {displayDesktop()}
        </AppBar>
      </header>
    </>
  );
}
