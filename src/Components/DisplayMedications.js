import {useState, useCallback} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

// Custom Components
import DoseInput from "./DoseInput.js";
import NoRegisteredMedications from "./NoRegisteredMedications";

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

// Form validation using Yup
const validationSchema = Yup.object().shape({
    dose: Yup.string()
        .required("Dose is required")
});

export default function DisplayMedications() {
    // Styles
    const boxSx = {
        "& .MuiTextField-root": {mb: 5, width: "100%"},
        ml: "50px",
        mr: "50px"
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
        mt: 5,
        pb: 0,
        pt: 0
    };

    const containerSx = {
        m: 0,
        pl: 5,
        pr: 5,
        width: "100%"
    };

    const dialogBoxSx = {
        width: "75vw"
    };

    const dialogTitleSx = {
        m: 0,
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

    // This is the array of medication objects that will be displayed on the cards
    const medicationList = localStorage.getItem("medications");
    const parsed = JSON.parse(medicationList);

    // This forces the component to re-render after a medication has been deleted
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    // This is the Medication component that is displayed including a card, medication info, buttons, and dialogs
    const Medication = ({medication}) => {
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

        // Function for the update dose button
        function updateDose(medicationId, parsedMedications, data) {
            let med;

            for (const index of parsedMedications) {
                if (index.id === medicationId) {
                    med = index;
                }
            }

            med.dose = data.dose;
            localStorage.setItem("medications", JSON.stringify(parsedMedications));

            // This forces the dialog to close
            setOpenUpdate(false);
        }

        // This handles the delete medication confirmation dialog
        const [openDelete, setOpenDelete] = useState(false);
        const handleClickOpenDelete = () => {
            setOpenDelete(true);
        };
        const handleCloseDelete = () => {
            setOpenDelete(false);
        };

        // Function for the delete med button
        function deleteMedication(medicationId, parsedMedications) {
            let index;

            for (let i = 0; i < parsedMedications.length; i++) {
                if (parsedMedications[i].id === medicationId) {
                    index = i;
                }
            }

            if (parsedMedications.length > 1) {
                // This removes the appropriate index of the array of medication objects
                parsedMedications.splice(index, 1);
            } else {
                parsedMedications = [];
            }

            localStorage.setItem("medications", JSON.stringify(parsedMedications));

            // This forces the dialog to close
            setOpenDelete(false);

            // This forces the medication list to re-render
            forceUpdate();
        }

        // This is what is rendered for the Medication component
        return (
            <Box>
                <Card sx={cardSx}>
                    <CardContent>
                        <Typography sx={typographyMedicationSx} variant="h5">
                            Medication: {medication.medication}
                        </Typography>
                        <Typography sx={typographyMedicationSx} variant="h5">
                            Dose: {medication.dose} mg
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
                        <Typography variant="h5" sx={{m: 5}}> Do you want to delete {medication.dose} mg
                            of {medication.medication}? </Typography>

                        <Box>
                            <Button onClick={() => deleteMedication(medication.id, parsed)}
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
                        <form onSubmit={handleSubmit((data) => updateDose(medication.id, parsed, data))} noValidate>
                            <Typography sx={updateDoseTypographySx} variant="h5">
                                Update dose
                            </Typography>

                            <Box
                                sx={boxSx}
                            >
                                <DoseInput control={control} suggestions={doseSuggestions} variant={"outlined"}/>

                                <Button disabled={!formState.isValid} size="large"
                                        sx={formButtonSx} type="submit"
                                        variant="contained">Submit</Button>
                            </Box>
                        </form>
                    </Box>
                </Dialog>
            </Box>
        )
    }; // End Medication component

    let medications;

    // I also set this condition (localStorage.getItem("medications").length > 2) because if the array is empty, the length === 2
    if (localStorage.getItem("medications") !== null && localStorage.getItem("medications").length > 2) {
        medications = parsed.map((medication) => {
            return (<Medication medication={medication} key={"Medication_" + medication.id}/>)
        });
    } else {
        medications = <NoRegisteredMedications/>;
    }

    // This is the actual final block of code that is rendered for this component
    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                {medications}
            </Box>
        </Container>
    );
}
