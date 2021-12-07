import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const doseSuggestions = [
    {label: "10"},
    {label: "20"},
    {label: "30"},
    {label: "40"},
    {label: "50"},
    {label: "60"},
    {label: "70"},
    {label: "80"}
];

const medicationSuggestions = [
    {label: "Lisinopril"},
    {label: "Valsartan"}
];

const validationSchema = Yup.object().shape({
    medication: Yup.string()
        .required("Medication is required"),
    dose: Yup.string()
        .required("Dose is required")
});

export default function AddMedication_B() {
    // Styles
    const boxSx = {
        "& .MuiTextField-root": {mb: 5, width: "100%"}
    };

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

    const onSubmit = (data) => {
        // This saves the medications into a local session storage for the purposes of displaying the medications on another page.
        // If I were going to create a deployed version of the app, I would create a DB and save the data there.
        // I also set this condition --> localStorage.getItem("medications").length < 2 --> because if the array is empty, the length === 2
        if (localStorage.getItem("medications") === null || localStorage.getItem("medications").length < 3) {
            localStorage.setItem("medications", JSON.stringify([{
                id: 0,
                medication: data.medication,
                dose: data.dose
            }]));
        } else {
            const medicationList = localStorage.getItem("medications");
            const parsed = JSON.parse(medicationList);
            const newId = parsed[parsed.length - 1].id + 1;
            parsed.push({id: newId, medication: data.medication, dose: data.dose});
            localStorage.setItem("medications", JSON.stringify(parsed));
        }

        fetch("/medication-confirmation")
            .then(() => {
                window.location = "/medication-confirmation"
            });
    };

    const {handleSubmit, control, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    // I added these because without it, all the autofill elements were showing up as selected
    const [medValue, setMedValue] = useState(null);
    const [doseValue, setDoseValue] = useState(null);

    return (
        <Container sx={containerSx}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Typography sx={typographyMedicationSx} variant="h4">
                    Add a new medication
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
                                options={medicationSuggestions}
                                value={medValue}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        error={!!error}
                                        helperText={error?.message}
                                        id="medication"
                                        label="Medication"
                                        name="medication"
                                        type="search"
                                        variant="filled"
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
                                options={doseSuggestions}
                                value={doseValue}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        error={!!error}
                                        helperText={error?.message}
                                        id="dose"
                                        label="Dose"
                                        name="dose"
                                        type="numeric"
                                        variant="filled"
                                        inputRef={ref}
                                        {...params}
                                    />
                                )}
                            />
                        )}
                    />

                    <Button disabled={!formState.isValid} size="large" sx={buttonSx} type="submit"
                            variant="contained">Submit</Button>
                </Box>
            </form>
        </Container>
    );
}
