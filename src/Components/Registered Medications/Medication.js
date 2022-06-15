import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import * as Yup from "yup";

// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

// Custom components
import DoseInput from "../Inputs/DoseInput";

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

// Form validation using Yup
const validationSchema = Yup.object().shape({
    dose: Yup.string()
        .required("Dose is required")
});

// Styles
const boxSx = {
    "& .MuiTextField-root": {mb: 5, width: "100%"},
    ml: 5,
    mr: 5
};

const buttonSx = {
    borderRadius: 0,
    fontSize: "17px",
    height: "5.75ch",
    width: "50%"
};

const cardSx = {
    bgcolor: "#eeeeee",
    boxShadow: 3,
    mb: 5,
    mt: 5
};

const dialogBoxSx = {
    width: "75vw"
};

const dialogTitleSx = {
    p: 3
};

const formButtonSx = {
    borderRadius: 0,
    fontSize: "17px",
    height: "5.75ch",
    mb: 5,
    width: "100%"
};

const iconButtonSx = {
    position: "absolute",
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500]
};

const typographyMedicationSx = {
    m: 1.5
};

const updateDoseTypographySx = {
    mb: 5,
    ml: 5,
    mr: 5,
    textAlign: "center"
};

export default function Medication({medication, parsedList, updated, setUpdated, setLastDeleted}) {
    const {handleSubmit, control, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    // This handles the update dose dialog
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    // This is passed into the dose input
    const [doseValue, setDoseValue] = useState(null);

    // Function for the update dose button
    const updateDose = (medicationId, parsedMedications, data) => {
        const {dose: updatedDose} = data;

        let med;

        for (const index of parsedMedications) {
            if (index.id === medicationId) {
                med = index;
            }
        }

        med.dose = updatedDose;

        localStorage.setItem("medications", JSON.stringify([...parsedMedications]));

        // This forces the dialog to close
        setOpenUpdate(false);

        // This forces the medication list to re-render
        setUpdated(!updated);
    };

    // This handles the delete medication confirmation dialog
    const [openDelete, setOpenDelete] = useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    // Function for the delete med button
    const deleteMedication = (medicationId, parsedMedications) => {
        let index = -1;

        for (let i = 0; i < parsedMedications.length; i++) {
            if (parsedMedications[i].id === medicationId) {
                index = i;
                break;
            }
        }

        let updatedMedications = [];

        if (parsedMedications.length > 0) {
            // This removes the appropriate index of the array of medication objects
            parsedMedications.forEach((medication, i) => {
                if (index > -1 && index !== i) {
                    updatedMedications.push(medication);
                } else if (index === i) {
                    setLastDeleted(JSON.stringify([medication.medication, medication.dose]));
                }
            });
        }

        localStorage.setItem("medications", JSON.stringify(updatedMedications));

        // This forces the dialog to close
        setOpenDelete(false);

        // This forces the medication list to re-render
        setUpdated(!updated);
    };

    return (
        <Box>
            <Card sx={cardSx}>
                <CardContent>
                    <Typography sx={typographyMedicationSx} variant="h5">
                        Medication: {medication.medication}
                    </Typography>
                    <Typography sx={typographyMedicationSx} variant="h5">
                        Dose: {medication.dose}
                    </Typography>
                </CardContent>
                <Box>
                    <Button onClick={handleClickOpenUpdate} size="large"
                            sx={buttonSx}
                            variant="contained">Edit
                        Dose</Button>
                    <Button onClick={handleClickOpenDelete} color="error"
                            size="large"
                            sx={buttonSx} variant="contained">Delete
                        Med </Button>
                </Box>
            </Card>

            {/* Delete medication confirmation dialog */}
            <Dialog
                keepMounted={true}
                open={openDelete}
                onClose={handleCloseDelete}
            >
                <Box sx={dialogBoxSx}>
                    <Typography variant="h5" sx={{m: 5}}> Do you want to
                        delete {medication.dose} of {medication.medication}? </Typography>

                    <Box>
                        <Button onClick={() => deleteMedication(medication.id, parsedList)}
                                size="large"
                                sx={buttonSx} variant="contained">Yes</Button>
                        <Button onClick={handleCloseDelete} color="error"
                                size="large"
                                sx={buttonSx} variant="contained">No</Button>
                    </Box>
                </Box>
            </Dialog>

            {/* Update dose dialog */}
            <Dialog
                keepMounted={true}
                open={openUpdate}
                onClose={handleCloseUpdate}
            >
                <DialogTitle sx={dialogTitleSx}>
                    {handleCloseUpdate ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseUpdate}
                            sx={iconButtonSx}
                        >
                            <CloseIcon/>
                        </IconButton>
                    ) : null}
                </DialogTitle>

                <Box sx={dialogBoxSx}>
                    <form onSubmit={handleSubmit((data) => updateDose(medication.id, parsedList, data))} noValidate>
                        <Typography sx={updateDoseTypographySx} variant="h5">
                            Update dose
                        </Typography>

                        <Box
                            sx={boxSx}
                        >
                            <DoseInput control={control} suggestions={doseSuggestions} doseValue={doseValue}
                                       setDoseValue={setDoseValue} variant={"outlined"}/>

                            <Button disabled={!formState.isValid} size="large"
                                    sx={formButtonSx} type="submit"
                                    variant="contained">Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Dialog>
        </Box>
    );
}
