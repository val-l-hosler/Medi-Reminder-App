import * as React from "react";
import {v4 as uuidv4} from "uuid";

// Material UI Components
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

const chipSx = {
    fontSize: 17,
    mb: 0.75,
    mr: 1.5,
    mt: 0.75
};

const headingTypographySx = {
    mb: 3.75,
    textAlign: "center"
};

const iconButtonSx = {
    fontSize: 75,
    ml: 2.5,
    mr: 2.5
};

const linkSx = {
    color: "#1976d2"
};

const typographySx = {
    mb: 1.5,
    mt: 1.5
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

const ChipList = (params) => {
    if (params.objKey === "times") {
        params.arr.sort((a, b) => {
            return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
        });
    } else {
        const days = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
            Sunday: 6
        };

        params.arr.sort((a, b) => {
            const day1 = days[a];
            const day2 = days[b];
            return (day1 > day2) ? 1 : -1;
        });
    }

    const unique = [...new Set(params.arr)];

    return (unique.map((chip) => {
        return (<Chip sx={chipSx} key={"Chip_" + uuidv4()} label={chip}/>);
    }));
};

// Functions
const getLastReminder = () => {
    const reminderList = localStorage.getItem("reminders");
    const parsed = JSON.parse(reminderList);
    return parsed[parsed.length - 1];
};

const ConfirmationMessage = () => {
    const {medication, dose, days, time} = getLastReminder();

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
                Days: <ChipList arr={days} objKey={"days"}/>
            </Typography>
            <Typography variant="h5">
                Times: <ChipList arr={time} objKey={"times"}/>
            </Typography>

            <Divider sx={{mb: 3.75, mt: 2.75}}/>
        </Box>
    );
};

const onSubmit = () => {
    const reminderList = localStorage.getItem("reminders");
    const parsed = JSON.parse(reminderList);
    const lastReminder = getLastReminder();
    lastReminder.submitted = true;
    parsed[parsed.length - 1] = lastReminder;
    localStorage.setItem("reminders", JSON.stringify(parsed));

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
                    <ConfirmationMessage/>
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
