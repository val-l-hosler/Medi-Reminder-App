import {useForm} from "react-hook-form";
import {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {v4 as uuidv4} from "uuid";

// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Custom Components
import DoseInput from "../Inputs/DoseInput.js";
import MedicationInput from "../Inputs/MedicationInput";

const doseSuggestions = [
    {label: "10 mg"},
    {label: "20 mg"},
    {label: "30 mg"},
    {label: "40 mg"},
    {label: "50 mg"},
    {label: "60 mg"},
    {label: "70 mg"},
    {label: "80 mg"}
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
const onSubmit = (data) => {
    const {medication, dose} = data;

    // This saves the medications into a local session storage for the purposes of displaying the medications on another page.
    // If I were going to create a deployed version of the app, I would create a DB and save the data there.
    // I also set this condition --> localStorage.getItem("medications").length < 2 --> because if the array is empty, the length === 2
    if (localStorage.getItem("medications") === null || localStorage.getItem("medications").length < 3) {
        localStorage.setItem("medications", JSON.stringify([{
            id: uuidv4(),
            medication,
            dose
        }]));
    } else {
        const medicationList = localStorage.getItem("medications");
        const parsed = JSON.parse(medicationList);
        parsed.push({id: uuidv4(), medication, dose});
        localStorage.setItem("medications", JSON.stringify(parsed));
    }

    fetch("/medication-confirmation")
        .then(() => {
            window.location = "/medication-confirmation"
        });
};

export default function AddMedication() {
    // This is passed into the medication input
    const [medValue, setMedValue] = useState(null);

    // This is passed into the medication input
    const [doseValue, setDoseValue] = useState(null);

    const {handleSubmit, control, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    return (
        <Container sx={containerSx}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Typography sx={typographyMedicationSx} variant="h4">
                    Add a new medication
                </Typography>

                <Box
                    sx={boxSx}
                >

                    <MedicationInput control={control} suggestions={medicationSuggestions} medValue={medValue}
                                     setMedValue={setMedValue} setDoseValue={setDoseValue} variant={"outlined"}/>

                    <DoseInput control={control} suggestions={doseSuggestions} doseValue={doseValue}
                               setDoseValue={setDoseValue} variant={"outlined"}/>

                    <Button disabled={!formState.isValid} size="large" sx={buttonSx} type="submit"
                            variant="contained">Submit</Button>
                </Box>
            </form>
        </Container>
    );
}
