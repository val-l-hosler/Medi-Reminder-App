// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Styles
const buttonSx = {
    fontSize: "17px",
    height: "5.75ch",
    width: "100%"
};

const containerSx = {
    mb: 5,
    mt: 5,
    pl: 5,
    pr: 5,
    width: "100%"
};

const typographyMedicationSx = {
    mb: 4,
    textAlign: "center"
};

// Functions
const getReminder = () => {
    const reminderList = localStorage.getItem("reminders");
    const parsedList = JSON.parse(reminderList);
    return parsedList[parsedList.length - 1];
};

export default function ReminderConfirmation() {
    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                <Typography sx={typographyMedicationSx} variant="h5">
                    You have added a reminder for {getReminder().dose} of {getReminder().medication} to
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
