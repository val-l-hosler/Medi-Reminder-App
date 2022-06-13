import {useState, useCallback} from "react";

// Material UI Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// Custom Components
import NoRegisteredMedications from "./NoRegisteredMedications";
import Medication from "./Medication";

// Styles
const containerSx = {
    pl: 5,
    pr: 5,
    width: "100%"
};

export default function DisplayMedications() {
    // This is the array of medication objects that will be displayed on the cards
    const medicationList = localStorage.getItem("medications");
    const parsedList = JSON.parse(medicationList);

    // This forces the component to re-render after a medication has been deleted
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    let medicationComps;

    // I also set this condition (localStorage.getItem("medications").length > 2) because if the array is empty, the length === 2
    if (localStorage.getItem("medications") !== null && localStorage.getItem("medications").length > 2) {
        medicationComps = parsedList.map((medication) => {
            return (<Medication medication={medication} forceUpdate={forceUpdate} parsedList={parsedList}
                                key={"Medication_" + medication.id}/>)
        });
    } else {
        medicationComps = <NoRegisteredMedications/>;
    }

    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                {medicationComps}
            </Box>
        </Container>
    );
}
