// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Custom Components
import ChipList from "./ChipList";

// Styles
const headingTypographySx = {
    mb: 3.75,
    textAlign: "center"
};

const typographySx = {
    mb: 1.5,
    mt: 1.5
};

// Functions
const getLastReminder = () => {
    const reminderList = localStorage.getItem("reminders");
    const parsedList = JSON.parse(reminderList);
    return parsedList[parsedList.length - 1];
};

export default function ConfirmationMessage() {
    const {medication, dose, days, times} = getLastReminder();

    return (
        <Box>
            <Typography sx={headingTypographySx} variant="h5">
                Review your reminder
            </Typography>

            <Divider sx={{mb: 2.5}}/>

            <Typography sx={typographySx} variant="h5">
                Medication: {medication}
            </Typography>
            <Typography sx={typographySx} variant="h5">
                Dose: {dose}
            </Typography>
            <Typography variant="h5">
                Days: <ChipList arr={days} type={"days"}/>
            </Typography>
            <Typography variant="h5">
                Times: <ChipList arr={times} type={"times"}/>
            </Typography>

            <Divider sx={{mb: 3.75, mt: 2.75}}/>
        </Box>
    );
}
