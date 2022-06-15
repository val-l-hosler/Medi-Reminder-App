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
    // This forces the DisplayMedications component to re-render after a medication has been deleted
    const [updated, setUpdated] = useState(false);
    const [lastDeleted, setLastDeleted] = useState(null);

    // This is the array of medication objects that will be displayed on the cards
    const medicationList = localStorage.getItem("medications");
    const parsedList = JSON.parse(medicationList);

    let medicationComps;

    if (parsedList && parsedList.length > 0) {
        const stringified = [];
        const comparedComponents = [];
        const dupeIndexes = [];

        console.log(parsedList, "parsedList");

        // This makes it so the objs can be more easily compared
        for (const obj of parsedList) {
            stringified.push(JSON.stringify([obj.medication, obj.dose]));
        }

        console.log(stringified, "stringified");

        // This checks for duplicates
        stringified.forEach((arr, index) => {
            if (!comparedComponents.includes(arr) && arr !== lastDeleted) {
                console.log(lastDeleted, "in if");
                comparedComponents.push(arr);
            } else {
                console.log(lastDeleted, "in else");
                dupeIndexes.push(index);
            }
        });

        const copiedList = [...parsedList];
        console.log(copiedList, "copiedList");

        for (let i = 0; i < copiedList.length; i++) {
            for (const element of dupeIndexes) {
                if (i === element) {
                    copiedList[i] = "dupe";
                    break;
                }
            }
        }

        const finalComponents = copiedList.filter((index) => index !== "dupe");
        console.log(finalComponents, "finalComponents");

        localStorage.setItem("medications", JSON.stringify(finalComponents));

        if (finalComponents.length > 0) {
            medicationComps = finalComponents.map((medication) => {
                return (
                    <Medication medication={medication} updated={updated} setUpdated={setUpdated}
                                parsedList={parsedList}
                                setLastDeleted={setLastDeleted} key={"Medication_" + medication.id}/>)
            });
        } else {
            medicationComps = <NoRegisteredMedications/>;
        }
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
