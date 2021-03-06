import {useState} from "react";

// Material UI Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// Custom Components
import NoRegisteredReminders from "./NoRegisteredReminders.js";
import Reminder from "./Reminder";

const containerSx = {
    pl: 5,
    pr: 5,
    width: "100%"
};

export default function DisplayReminders() {
    // This is the array of reminder objects that will be displayed on the cards
    const reminderList = localStorage.getItem("reminders");
    let parsedList = JSON.parse(reminderList);

    // This checks to make sure that all the displayed reminders are fully complete
    if (parsedList && parsedList.length > 0) {
        parsedList = parsedList.filter((index) => index.submitted === true);
    }

    // This forces the DisplayReminder component to re-render if a reminder is deleted
    const [updated, setUpdated] = useState(false);

    let reminderComps;

    if (parsedList && parsedList.length > 0) {
        reminderComps = parsedList.map((reminder) => {
            return (<Reminder reminder={reminder} updated={updated} setUpdated={setUpdated} parsedList={parsedList}
                              key={"Reminder_" + reminder.id}/>)
        });
    } else {
        reminderComps = <NoRegisteredReminders/>;
    }

    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                {reminderComps}
            </Box>
        </Container>
    );
}
