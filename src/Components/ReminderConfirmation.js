import * as React from "react";

// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function ReminderConfirmation() {
    // Styles
    const buttonSx = {
        fontSize: "17px",
        height: "5.75ch",
        width: "100%"
    };

    const containerSx = {
        m: 0,
        pl: 5,
        pr: 5,
        width: "100%"
    };

    const typographyMedicationSx = {
        mb: 4,
        textAlign: "center"
    };

    function getReminder() {
        let reminderList = localStorage.getItem("reminders");
        let parsed = JSON.parse(reminderList);
        return (parsed[parsed.length - 1]);
    }

    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                <Typography sx={typographyMedicationSx} variant="h5">
                    You have added a reminder for {getReminder().dose} mg of {getReminder().medication} to
                    your reminder list.
                </Typography>

                <Button href="/add-reminder" size="large" sx={{...buttonSx, mb: 5}}
                        variant="contained">Add another
                    reminder</Button>
                <Button href="/reminders" size="large" sx={buttonSx} variant="contained">View reminder list</Button>
            </Box>
        </Container>
    );
}
