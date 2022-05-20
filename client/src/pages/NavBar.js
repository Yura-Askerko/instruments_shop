import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useRecoilValue } from "recoil";
import { currentUserState, isAuthenticatedState } from "../atoms/auth";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../hooks/useLogout";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  console.log(currentUser);
  const logout = useLogout();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 50,
              mr: 2,
            }}
            src={require("../assets/logo.jpg")}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key="catalog"
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/");
                }}
              >
                <Typography textAlign="center">КАТАЛОГ</Typography>
              </MenuItem>
              {currentUser?.isAdmin && (
                <MenuItem
                  key="admin"
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("admin");
                  }}
                >
                  <Typography textAlign="center">ПАНЕЛЬ</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="catalog-button"
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              КАТАЛОГ
            </Button>
            {currentUser?.isAdmin && (
              <Button
                key="panel-button"
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("admin");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                ПАНЕЛЬ
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!currentUser?.isAdmin && isAuthenticated && (
                <MenuItem
                  key="basket"
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("basket");
                  }}
                >
                  <ShoppingCartIcon />
                  <Typography sx={{ pl: 1 }} textAlign="center">
                    Корзина
                  </Typography>
                </MenuItem>
              )}

              {isAuthenticated ? (
                <MenuItem key="signout" onClick={logout}>
                  <LogoutIcon />
                  <Typography sx={{ pl: 1 }} textAlign="center">
                    Выйти
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  key="signin"
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("signin");
                  }}
                >
                  <LoginIcon />
                  <Typography sx={{ pl: 1 }} textAlign="center">
                    Войти
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
