import {useEffect, useState} from "react";

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
    const storedList = localStorage.getItem("medications");
    const [medicationList, setMedicationList] = useState(JSON.parse(storedList));

    // Medication component list state
    const [medicationComps, setMedicationComps] = useState(<NoRegisteredMedications/>);

    useEffect(() => {
        if (medicationList && medicationList.length > 0) {
            const stringified = [];
            const comparedComponents = [];
            const dupeIndexes = [];

            // This makes it so the objs can be more easily compared
            for (const obj of medicationList) {
                stringified.push(JSON.stringify([obj.medication, obj.dose]));
            }

            // This checks for duplicates
            // The arr is a stringified [med, dose]
            stringified.forEach((arr, index) => {
                if (!comparedComponents.includes(arr)) {
                    comparedComponents.push(arr);
                } else {
                    dupeIndexes.push(index);
                }
            });

            const updatedList = [...medicationList];

            for (let i = 0; i < updatedList.length; i++) {
                for (const element of dupeIndexes) {
                    if (i === element) {
                        updatedList[i] = "dupe";
                        break;
                    }
                }
            }

            const finalComponents = updatedList.filter((index) => index !== "dupe");

            localStorage.setItem("medications", JSON.stringify(finalComponents));

            if (finalComponents.length > 0) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setMedicationComps(finalComponents.map((medication) => {
                    return (<Medication medication={medication} medicationList={medicationList}
                                        setMedicationList={setMedicationList}
                                        key={"Medication_" + medication.id}
                        />
                    )
                }));
            } else {
                setMedicationComps(<NoRegisteredMedications/>);
            }
        }
    }, [medicationList]);

    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                {medicationComps}
            </Box>
        </Container>
    );
}
