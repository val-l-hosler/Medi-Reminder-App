import * as React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI Components
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Custom Components
import DaysInput from "./DaysInput.js";

const validationSchema = Yup.object().shape({
    daysOfWeek: Yup.array()
        .of(
            Yup.object().shape({
                label: Yup.string(),
                disabled: Yup.boolean()
            })
        )
        .min(1, "Days of the week are required")
});

export default function AddReminder2() {
    // Styles
    const boxSx = {
        "& .MuiTextField-root": {mb: 5, width: "100%"},
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
    };

    const containerSx = {
        m: 0,
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

    const typographySx = {
        mb: 5,
        textAlign: "center"
    };

    const breadcrumbs = [
        <Link key="1" underline="hover" color="inherit" href="/add-reminder" sx={linkSx}>
            Name & Dose
        </Link>,
        <Typography key="2" color="text.primary">
            Days of Week
        </Typography>
    ];

    const {control, handleSubmit, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        // This saves the reminder into a local session storage for the purposes of displaying the reminders on another page.
        // If I were going to create a deployed version of the app, I would create a DB and save the data there.
        // I also set this condition --> localStorage.getItem("reminders").length < 2 --> because if the array is empty, the length === 2
        if (localStorage.getItem("reminders") === null || localStorage.getItem("reminders").length < 3) {
            localStorage.setItem("reminders", JSON.stringify([{
                id: 0,
                medication: "",
                dose: "",
                days: [],
                timesPerDay: 0,
                times: [],
                submitted: false
            }]));
        }

        const reminderList = localStorage.getItem("reminders");
        const parsed = JSON.parse(reminderList);
        const mostRecent = parsed[parsed.length - 1];
        const daysArr = [];

        // The data for the days is stored in an object that contains a key, daysOfWeek. This key's value is an array of objects in the same format as initOptions
        for (const index of data.daysOfWeek) {
            daysArr.push(index.label);
        }

        mostRecent.days = daysArr;
        parsed[parsed.length - 1] = mostRecent;
        localStorage.setItem("reminders", JSON.stringify(parsed));

        fetch("/add-reminder/days/nums")
            .then(() => {
                window.location = "/add-reminder/days/nums";
            });
    };

    return (
        <Container sx={containerSx/**/}>
            <Stack spacing={2} sx={stackSx}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>

            <Typography sx={typographySx} variant="h4">
                Which days of the week do you take your medication?
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={boxSx}>
                    <DaysInput control={control} label={"Days of the week"}/>

                    <Box>
                        <Button href="/add-reminder"><ArrowBackIcon sx={iconButtonSx}/></Button>

                        <Button disabled={!formState.isValid}
                                type="submit"><ArrowForwardIcon sx={iconButtonSx}/></Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );
}

