import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI Components
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// Custom Components
import NoRegisteredMedications from "./NoRegisteredMedications";

const validationSchema = Yup.object().shape({
    medication: Yup.string()
        .required("Medication is required"),
    dose: Yup.string()
        .required("Dose is required"),
});

function setSuggestions() {
    // This is the array of medication objects that will be displayed on the cards
    const medicationList = localStorage.getItem("medications");
    const parsed = JSON.parse(medicationList);

    // This will be an array of medication suggestions for the inputs
    let medSuggestions;
    let doseSuggestions;

    if (parsed !== null && parsed.length > 0) {
        const meds = {};
        const doses = {};

        parsed.forEach((medication, index) => {
            meds[medication.medication] = index;
            doses[medication.dose] = index;
        });

        medSuggestions = Object.keys(meds).map((med) => {
            return {label: med};
        })

        doseSuggestions = Object.keys(doses).map((dose) => {
            return {label: dose};
        })

        return [medSuggestions, doseSuggestions];
    }

    return [];
}

export default function AddReminder1() {
    // Styles
    const autoCompleteSx = {
        width: "100%"
    };

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
        fontSize: 75
    };

    const stackSx = {
        mb: 5
    };

    const typographySx = {
        mb: 5,
        textAlign: "center"
    };

    const breadcrumbs = [
        <Typography key="1" color="text.primary">
            Name & Dose
        </Typography>
    ];

    const {handleSubmit, control, formState} = useForm({
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
                medication: data.medication,
                dose: data.dose,
                days: [],
                timesPerDay: 0,
                times: [],
                submitted: false
            }]));
        } else {
            const reminderList = localStorage.getItem("reminders");
            const parsed = JSON.parse(reminderList);
            const lastReminder = parsed[parsed.length - 1];

            if (lastReminder.submitted === true) {
                const newId = lastReminder.id + 1;

                parsed.push({
                    id: newId,
                    medication: data.medication,
                    dose: data.dose,
                    days: [],
                    timesPerDay: 0,
                    times: [],
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

    // I added these because without it, all the autofill elements were showing up as selected
    const [medValue, setMedValue] = useState(null);
    const [doseValue, setDoseValue] = useState(null);

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
                        <Controller
                            name="medication"
                            control={control}
                            render={({field: {ref, ...field}, fieldState: {error}}) => (
                                <Autocomplete
                                    {...field}
                                    autoHighlight
                                    disableClearable
                                    disablePortal
                                    isOptionEqualToValue={(option, value) => value.label === option.label}
                                    id="medication-autocomplete"
                                    onChange={(event, value) => {
                                        field.onChange(value.label);
                                        setMedValue(value);
                                    }}
                                    options={setSuggestions()[0]}
                                    value={medValue}
                                    sx={autoCompleteSx}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            error={!!error}
                                            helperText={error?.message}
                                            id="medication"
                                            label="Medication"
                                            name="medication"
                                            type="search"
                                            inputRef={ref}
                                            {...params}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Controller
                            name="dose"
                            control={control}
                            render={({field: {ref, ...field}, fieldState: {error}}) => (
                                <Autocomplete
                                    {...field}
                                    autoHighlight
                                    disableClearable
                                    disablePortal
                                    isOptionEqualToValue={(option, value) => value.label === option.label}
                                    id="dose-autocomplete"
                                    onChange={(event, value) => {
                                        field.onChange(value.label);
                                        setDoseValue(value);
                                    }}
                                    options={setSuggestions()[1]}
                                    value={doseValue}
                                    sx={autoCompleteSx}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            error={!!error}
                                            helperText={error?.message}
                                            id="dose"
                                            label="Dose"
                                            name="dose"
                                            type="numeric"
                                            inputRef={ref}
                                            {...params}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Button disabled={!formState.isValid}
                                type="submit"><ArrowForwardIcon sx={iconButtonSx}/></Button>
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
