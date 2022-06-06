import * as React from "react";

// Material UI Components
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Styles
const boxSx = {
    flexGrow: 1
};

const buttonSx = {
    fontSize: 21,
    mr: 1
};

const iconButtonSx = {
    mr: 1
};

export default function MenuAppBar() {
    return (
        <Box sx={boxSx}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        aria-label="menu"
                        color="inherit"
                        component="a"
                        href="/main-menu"
                        size="large"
                        sx={iconButtonSx}
                    >
                        <HomeIcon/>
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Medi-Reminder
                    </Typography>

                    <Box sx={boxSx}/>

                    <Button href="/" color="inherit" sx={buttonSx} size="large">LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
