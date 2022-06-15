// Material UI Components
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Custom Components
import ConfirmationMessage from "./ConfirmationMessage";

// Styles
const buttonSx = {
    fontSize: "17px",
    height: "5.75ch",
    ml: 1.5,
    mr: 1.5,
    width: "auto"
};

const centeredSx = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%"
};

const confirmationMessageBoxSx = {
    pl: 5,
    pr: 5,
    width: "calc(100vw - 80px)"
};

const containerSx = {
    mb: 5,
    mt: 5,
    pl: 5,
    pr: 5,
    width: "100%"
};

const iconButtonSx = {
    fontSize: 75,
    ml: 2.5,
    mr: 2.5
};

const linkSx = {
    color: "#1976d2"
};

const stackSx = {
    mb: 5
};

// Components
const breadcrumbs = [
    <Link key="1" underline="hover" color="inherit" href="/add-reminder" sx={linkSx}>
        Name & Dose
    </Link>,
    <Link key="2" underline="hover" color="inherit" href="/add-reminder/days" sx={linkSx}>
        Days of Week
    </Link>,
    <Link key="3" underline="hover" color="inherit" href="/add-reminder/days/nums" sx={linkSx}>
        # of Times
    </Link>,
    <Link key="4" underline="hover" color="inherit" href="/add-reminder/days/nums/times" sx={linkSx}>
        Times
    </Link>,
    <Typography key="5" color="text.primary">
        Review
    </Typography>
];

// Functions
const getLastReminder = () => {
    const reminderList = localStorage.getItem("reminders");
    const parsedList = JSON.parse(reminderList);
    return parsedList[parsedList.length - 1];
};

const onSubmit = () => {
    const reminderList = localStorage.getItem("reminders");
    const parsedList = JSON.parse(reminderList);
    const lastReminder = getLastReminder();
    lastReminder.submitted = true;
    parsedList[parsedList.length - 1] = lastReminder;
    localStorage.setItem("reminders", JSON.stringify(parsedList));

    fetch("/reminder-confirmation")
        .then(() => {
            window.location = "/reminder-confirmation";
        });
};

export default function AddReminder5() {
    return (
        <Container sx={containerSx}>
            <Stack spacing={2} sx={stackSx}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Box sx={centeredSx}>
                <Box sx={confirmationMessageBoxSx}>
                    <ConfirmationMessage />
                </Box>

                <Box>
                    <Button href="/add-reminder/days/nums/times"><ArrowBackIcon sx={iconButtonSx}/></Button>

                    <Button onClick={onSubmit} size="large" sx={buttonSx} type="submit"
                            variant="contained">Submit</Button>
                </Box>
            </Box>
        </Container>
    );
}
