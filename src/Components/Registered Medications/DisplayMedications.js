import {useState} from "react";

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

    // This forces the DisplayMedications component to re-render after a medication has been deleted
    const [updated, setUpdated] = useState(false);

    let medicationComps;

    // I also set this condition (localStorage.getItem("medications").length > 2) because if the array is empty, the length === 2
    if (localStorage.getItem("medications") !== null && localStorage.getItem("medications").length > 2) {
        const stringified = [];
        const comparedComponents = [];
        const dupeIndexes = [];

        // This makes it so the objs can be more easily compared
        for (const obj of parsedList) {
            stringified.push(JSON.stringify([obj.medication, obj.dose]));
        }

        // This checks for duplicates
        stringified.forEach((arr, index) => {
            if (!comparedComponents.includes(arr)) {
                comparedComponents.push(arr);
            } else {
                dupeIndexes.push(index);
            }
        });

        const copiedList = [...parsedList];

        for (let i = 0; i < copiedList.length; i++) {
            for (const element of dupeIndexes) {
                if (i === element) {
                    copiedList[i] = "dupe";
                    break;
                }
            }
        }

        const finalComponents = copiedList.filter((index) => index !== "dupe");

        localStorage.setItem("medications", JSON.stringify(finalComponents));

        medicationComps = finalComponents.map((medication) => {
            return (
                <Medication medication={medication} updated={updated} setUpdated={setUpdated} parsedList={parsedList}
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
