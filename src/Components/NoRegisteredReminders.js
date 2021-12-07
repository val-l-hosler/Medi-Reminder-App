import * as React from "react";

// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function NoRegisteredReminders() {
    // Styles
    const buttonSx = {
        borderRadius: 0,
        fontSize: "17px",
        height: "5.75ch",
        width: "100%"
    };

    const cardSx = {
        bgcolor: "#eeeeee",
        boxShadow: 3
    };

    return (
        <Card sx={cardSx}>
            <CardContent>
                <Typography variant="h5">
                    No reminders are registered.
                </Typography>
            </CardContent>
            <Box>
                <Button href="/add-reminder" size="large" sx={buttonSx}
                        variant="contained">Register
                    reminder</Button>
            </Box>
        </Card>
    );
}
