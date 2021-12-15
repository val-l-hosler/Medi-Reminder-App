import * as React from "react";
import {useForm} from "react-hook-form";

// Material UI Components
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Custom Components
import TimeInput from "./TimeInput.js";

// This gets the number of timePicker inputs that need to be created
function getNumber() {
    const reminderList = localStorage.getItem("reminders");
    const parsed = JSON.parse(reminderList);
    const mostRecent = parsed[parsed.length - 1];
    return (mostRecent.timesPerDay);
}

export default function AddReminder4() {
    // Styles
    const boxSx = {
        "& .MuiTextField-root": {mb: 5, width: "100%"},
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
    };

    const containerSx = {
        height: "calc(100vh - 136px)",
        mb: 5,
        ml: 0,
        mr: 0,
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
        <Typography key="4" color="text.primary">
            Times
        </Typography>
    ];

    const allTimes = [];

    const {control, handleSubmit, setValue, register, getValues} = useForm();

    for (let i = 0; i < getNumber(); i++) {
        allTimes.push(<TimeInput setValue={setValue} getValues={getValues} register={register} control={control}
                                 counter={i + 1} key={"TimeInputs_" + i} variant={"outlined"}/>);
    }

    const onSubmit = (data) => {
        if (localStorage.getItem("reminders") === null || localStorage.getItem("reminders").length < 3) {
            localStorage.setItem("reminders", JSON.stringify([{
                id: 0,
                medication: "",
                dose: "",
                days: [],
                timesPerDay: 0,
                time: [],
                submitted: false
            }]));
        }

        const reminderList = localStorage.getItem("reminders");
        const parsed = JSON.parse(reminderList);
        const mostRecent = parsed[parsed.length - 1];
        const times = [];

        Object.values(data).forEach((value) => {
            const val = value.toString();
            const sliced = val.slice(16, 21);
            let finalTime;

            if (sliced.charAt(0) === "0" && sliced.charAt(1) === "0") { // this catches 12:00 - 12:59 am
                finalTime = "12" + sliced.slice(2) + " am";
            } else if (sliced.charAt(0) === "0" && sliced.charAt(1) !== "0") { // this catches 1:00 - 9:59 am
                finalTime = sliced.slice(1) + " am";
            } else if (sliced.charAt(0) === "1" && (sliced.charAt(1) === "0" || sliced.charAt(1) === "1")) { // this catches 10:00 - 11:59 am
                finalTime = sliced + " am";
            } else if (sliced.charAt(0) === "1" && sliced.charAt(1) === "2") { // this catches 12:00 - 12:59 pm
                finalTime = sliced + " pm";
            } else { // this catches 1:00 pm and later
                let newSliced = sliced.slice(0, 2);
                finalTime = (parseInt(newSliced) - 12) + sliced.slice(2) + " pm";
            }

            times.push(finalTime);
        });

        mostRecent.time = times;
        parsed[parsed.length - 1] = mostRecent;
        localStorage.setItem("reminders", JSON.stringify(parsed));

        fetch("/add-reminder/days/nums/times/confirmation")
            .then(() => {
                window.location = "/add-reminder/days/nums/times/confirmation";
            });
    };

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

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={boxSx}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {allTimes}
                    </LocalizationProvider>

                    <Box>
                        <Button href="/add-reminder/days/nums"><ArrowBackIcon sx={iconButtonSx}/></Button>

                        <Button type="submit"><ArrowForwardIcon sx={iconButtonSx}/></Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );
}
