import * as React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {v4 as uuidv4} from "uuid";

// Material UI Components
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Custom Components
import DoseInput from "../Inputs/DoseInput.js";
import MedicationInput from "../Inputs/MedicationInput.js";
import NoRegisteredMedications from "../Registered Medications/NoRegisteredMedications";

const validationSchema = Yup.object().shape({
    medication: Yup.string()
        .required("Medication is required"),
    dose: Yup.string()
        .required("Dose is required")
});

// Styles
const boxSx = {
    "& .MuiTextField-root": {mb: 5, width: "100%"},
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
};

const containerSx = {
    mb: 5,
    mt: 5,
    pl: 5,
    pr: 5,
    width: "100%"
};

const iconButtonSx = {
    fontSize: 75
};

const stackSx = {
    mb: 5
};

const typographySx = {
    mb: 5,
    textAlign: "center"
};

// Components -> this could be its own component
const breadcrumbs = [
    <Typography key="1" color="text.primary">
        Name & Dose
    </Typography>
];

// Functions
const onSubmit = (data) => {
    const {medication, dose} = data;

    // This saves the reminder into a local session storage for the purposes of displaying the reminders on another page.
    // If I were going to create a deployed version of the app, I would create a DB and save the data there.
    // I also set this condition --> localStorage.getItem("reminders").length < 2 --> because if the array is empty, the length === 2
    if (localStorage.getItem("reminders") === null || localStorage.getItem("reminders").length < 3) {
        localStorage.setItem("reminders", JSON.stringify([{
            id: uuidv4(),
            medication,
            dose,
            days: [],
            timesPerDay: 0,
            time: [],
            submitted: false
        }]));
    } else {
        const reminderList = localStorage.getItem("reminders");
        const parsed = JSON.parse(reminderList);
        const lastReminder = parsed[parsed.length - 1];

        if (lastReminder.submitted === true) {
            parsed.push({
                id: uuidv4(),
                medication,
                dose,
                days: [],
                timesPerDay: 0,
                time: [],
                submitted: false
            });

            localStorage.setItem("reminders", JSON.stringify(parsed));
        }
    }

    fetch("/add-reminder/days")
        .then(() => {
            window.location = "/add-reminder/days";
        });
};

const setSuggestions = () => {
    // This is the array of medication objects that will be displayed on the cards
    const medicationList = localStorage.getItem("medications");
    const parsed = JSON.parse(medicationList);

    if (parsed !== null && parsed.length > 0) {
        const meds = {};
        const doses = {};

        parsed.forEach((medication, index) => {
            meds[medication.medication] = index;
            doses[medication.dose] = index;
        });

        // {label: med}[]
        const medSuggestions = Object.keys(meds).map((med) => {
            return {label: med};
        });

        // {label: dose}[]
        const doseSuggestions = Object.keys(doses).map((dose) => {
            return {label: dose};
        });

        return [medSuggestions, doseSuggestions];
    }

    return [];
};

export default function AddReminder1() {
    const {handleSubmit, control, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    // If there are any registered medications
    if (setSuggestions().length > 1) {
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
                    <Typography sx={typographySx} variant="h4">
                        What medication do you want to make a reminder for?
                    </Typography>

                    <Box
                        sx={boxSx}
                    >
                        <MedicationInput control={control} suggestions={setSuggestions()[0]} variant={"outlined"}/>

                        <DoseInput control={control} suggestions={setSuggestions()[1]} variant={"outlined"}/>

                        <Box>
                            <Button disabled={!formState.isValid}
                                    type="submit"><ArrowForwardIcon sx={iconButtonSx}/></Button>
                        </Box>
                    </Box>
                </form>
            </Container>
        );
    } else {
        return (
            <Container sx={containerSx}>
                <NoRegisteredMedications/>
            </Container>
        );
    }
}
