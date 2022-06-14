import {v4 as uuidv4} from "uuid";

// Material UI Components
import Chip from "@mui/material/Chip";

const chipSx = {
    fontSize: 17,
    mb: 0.75,
    mr: 1.5,
    mt: 0.75
};

export default function ChipList({type, parsedList, arr, parentId, forceUpdate}) {
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

    // This checks to see if Every day was chosen for the days chips
    let everyDayFlag = false;
    let everyDayObj;

    arr.some(index => {
        if (index === "Every day") {
            everyDayFlag = true;
            everyDayObj = index;
            return false;
        }

        return true;
    });

    let unique;
    let editableUnique;

    if (!everyDayFlag) {
        unique = [...new Set(arr)];
        editableUnique = [...unique];
    } else {
        unique = [everyDayObj];
        editableUnique = [...unique];

        if (editableUnique.length > 0) {
            // This adds "Every day" to the beginning of the arr
            editableUnique.unshift("Every day");
            // This removes all the other days
            editableUnique.splice(1);

            for (const reminder of parsedList) {
                if (reminder.id === parentId) {
                    // This resets the appropriate object's key/value pair with the updated list
                    reminder[type] = editableUnique;
                    break;
                }
            }

            localStorage.setItem("reminders", JSON.stringify(parsedList));
        }
    }

    const handleDelete = (uIdx) => {
        // This removes the appropriate index from the array that is passed into the params
        editableUnique.splice(uIdx, 1);

        for (const reminder of parsedList) {
            if (reminder.id === parentId) {
                // This resets the appropriate object's key/value pair with the updated list
                reminder[type] = editableUnique;
                break;
            }
        }

        localStorage.setItem("reminders", JSON.stringify(parsedList));

        // This forces the reminder list to re-render
        forceUpdate();
    };

    return (unique.map((chip, uIndex) => {
        const chipKey = "Chip_" + uuidv4();

        return (<Chip onDelete={() => handleDelete(uIndex)} sx={chipSx} key={chipKey}
                      label={chip}/>);
    }));
}
