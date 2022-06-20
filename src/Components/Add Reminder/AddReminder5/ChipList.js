import {v4 as uuidv4} from "uuid";

// Material UI Components
import Chip from "@mui/material/Chip";

// Styles
const chipSx = {
    fontSize: 17,
    mb: 0.75,
    mr: 1.5,
    mt: 0.75
};

export default function ChipList({arr, type}) {
    if (type === "times") {
        arr.sort((a, b) => {
            return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
        });
    } else {
        const days = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
            Sunday: 6
        };

        arr.sort((a, b) => {
            const day1 = days[a];
            const day2 = days[b];
            return (day1 > day2) ? 1 : -1;
        });
    }

    const unique = [...new Set(arr)];

    return (unique.map((chip) => {
        return (<Chip sx={chipSx} key={"Chip_" + uuidv4()} label={chip}/>);
    }));
}
