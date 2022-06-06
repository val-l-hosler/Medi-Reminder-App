import * as React from "react";

// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Styles
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

const getMedication = () => {
    const medicationList = localStorage.getItem("medications");
    const parsed = JSON.parse(medicationList);
    return (parsed[parsed.length - 1]);
};

export default function MedicationConfirmation() {
    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                <Typography sx={typographyMedicationSx} variant="h5">
                    You have added {getMedication().dose} of {getMedication().medication} to
                    your medication list.
                </Typography>

                <Button href="/add-medication" size="large" sx={{...buttonSx, mb: 5}}
                        variant="contained">Add another
                    medication</Button>
                <Button href="/medications" size="large" sx={buttonSx} variant="contained">View medication list</Button>
            </Box>
        </Container>
    );
}
