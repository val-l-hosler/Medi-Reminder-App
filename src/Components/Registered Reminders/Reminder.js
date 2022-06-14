import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Custom Components
import ChipList from "./ChipList";
import TimeInput from "../Inputs/TimeInput";
import SingleDayInput from "../Inputs/SingleDayInput";

const validationSchema = Yup.object().shape({
    day: Yup.string()
        .required("Day of the week is required")
});

// Styles
const boxSx = {
    "& .MuiTextField-root": {mb: 5, width: "100%"},
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    ml: 5,
    mr: 5
};

const buttonSx = {
    borderRadius: 0,
    fontSize: "17px",
    height: "5.75ch",
    width: "100%"
};

const cardSx = {
    bgcolor: "#eeeeee",
    boxShadow: 3,
    mb: 5,
    mt: 5
};

const confirmationButtonSx = {
    borderRadius: 0,
    fontSize: "17px",
    height: "5.75ch",
    width: "50%"
};

const chipSx = {
    fontSize: 17,
    mb: 0.75,
    mr: 1.5,
    mt: 0.75
};

const dialogBoxSx = {
    width: "75vw"
};

const dialogTitleSx = {
    p: 3
};

const dialogTypographySx = {
    mb: 5,
    ml: 5,
    mr: 5
};

const iconButtonSx = {
    position: "absolute",
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500]
};

const typographyChipSx = {
    m: 1.5
};

const typographySx = {
    m: 1.5
};

export default function Reminder({parsedList, forceUpdate, reminder}) {
    const getThisReminder = (reminderId, parsedReminders) => {
        let index;

        for (let i = 0; i < parsedReminders.length; i++) {
            if (parsedReminders[i].id === reminderId) {
                index = i;
                break;
            }
        }

        return [parsedReminders[index], index];
    };

    // This handles the add day dialog
    const [openAddDay, setOpenAddDay] = useState(false);
    const handleClickAddDay = () => {
        setOpenAddDay(true);
    };
    const handleCloseAddDay = () => {
        setOpenAddDay(false);
    };

    // This needs to be inside the component or else an unmounted component error displays in the console
    // This controls the add day form
    const {
        control: controlAddDay,
        handleSubmit: handleSubmitAddDay,
        formState: formStateAddDay,
        reset
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    // Function that is triggered when the add day(s) form is submitted
    const addDay = (reminderId, parsedReminders, data) => {
        const [thisReminder, thisReminderIndex] = getThisReminder(reminderId, parsedReminders);
        thisReminder.days = [...thisReminder.days, data.day];
        parsedList[thisReminderIndex] = thisReminder;
        localStorage.setItem("reminders", JSON.stringify(parsedList));

        // This forces the dialog to close
        setOpenAddDay(false);

        // This resets the form
        reset({
            day: null
        });

        // This forces the reminder list to re-render
        forceUpdate();
    };

    // This handles the add time dialog
    const [openAddTime, setOpenAddTime] = useState(false);
    const handleClickAddTime = () => {
        setOpenAddTime(true);
    };
    const handleCloseAddTime = () => {
        setOpenAddTime(false);
    };

    // This controls the add time form
    const {
        control: controlAddTime,
        handleSubmit: handleSubmitAddTime,
        setValue: setValueAddTime,
        register: registerAddTime,
        getValues: getValuesAddTime
    } = useForm();

    // Function that is triggered when the add time form is submitted
    const addTime = (reminderId, parsedReminders, data) => {
        const [thisReminder, thisReminderIndex] = getThisReminder(reminderId, parsedReminders);
        let time;

        Object.values(data).forEach((value) => {
            const val = value.toString();
            const sliced = val.slice(16, 21);
            let finalTime;

            if (sliced.charAt(0) === "0" && sliced.charAt(1) === "0") { // this catches 12:00 - 12:59 am
                finalTime = "12" + sliced.slice(2) + " am";
            } else if (sliced.charAt(0) === "0" && sliced.charAt(1) !== "0") { // this catches 1:00 - 9:59 am
                finalTime = sliced.slice(1) + " am";
            } else if (sliced.charAt(0) === "1" && (sliced.charAt(1) === "0" || sliced.charAt(1) === "1")) { // this catches 10:00 - 11:59 am
                finalTime = sliced + " am";
            } else if (sliced.charAt(0) === "1" && sliced.charAt(1) === "2") { // this catches 12:00 - 12:59 pm
                finalTime = sliced + " pm";
            } else { // this catches 1:00 pm and later
                const newSliced = sliced.slice(0, 2);
                finalTime = (parseInt(newSliced) - 12) + sliced.slice(2) + " pm";
            }

            time = finalTime;
        });

        thisReminder.times = [...thisReminder.times, time];
        parsedList[thisReminderIndex] = thisReminder;
        localStorage.setItem("reminders", JSON.stringify(parsedList));

        // This forces the dialog to close
        setOpenAddTime(false);

        // This forces the reminder list to re-render
        forceUpdate();
    };

    // This handles the delete medication confirmation dialog
    const [openDelete, setOpenDelete] = useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    // Function for the delete reminder button
    const deleteReminder = (reminderId, parsedReminders) => {
        const [, thisReminderIndex] = getThisReminder(reminderId, parsedReminders);

        if (parsedReminders.length > 0) {
            // This removes the appropriate index of the array of reminder objects
            parsedReminders.splice(thisReminderIndex, 1);
        } else {
            parsedReminders = [];
        }

        localStorage.setItem("reminders", JSON.stringify(parsedReminders));

        // This forces the dialog to close
        setOpenDelete(false);

        // This forces the reminder list to re-render
        forceUpdate();
    };

    return (
        <Box>
            <Card sx={cardSx}>
                <CardContent>
                    <Typography sx={typographySx} variant="h5">
                        Medication: {reminder.medication}
                    </Typography>
                    <Typography sx={typographySx} variant="h5">
                        Dose: {reminder.dose}
                    </Typography>
                    <Typography sx={typographyChipSx} variant="h5">
                        Days: <ChipList parentId={reminder.id} parsedList={parsedList} arr={reminder.days}
                                        type={"days"} forceUpdate={forceUpdate}/>
                        {/* Note: the onDelete creates the icon in the appropriate spot and there isn't an onAdd option */}
                        <Chip color={"primary"} onDelete={handleClickAddDay} deleteIcon={<AddIcon/>} sx={chipSx}
                              label={"Add day"}/>
                    </Typography>
                    <Typography sx={typographyChipSx} variant="h5">
                        Times: <ChipList parentId={reminder.id} parsedList={parsedList} arr={reminder.times}
                                         type={"times"} forceUpdate={forceUpdate}/>
                        {/* Note: the onDelete creates the icon in the appropriate spot and there isn't an onAdd option */}
                        <Chip color={"primary"} onDelete={handleClickAddTime} deleteIcon={<AddIcon/>} sx={chipSx}
                              label={"Add time"}/>
                    </Typography>
                </CardContent>
                <Button onClick={handleClickOpenDelete} color="error"
                        size="large"
                        sx={buttonSx} variant="contained">Delete Reminder</Button>
            </Card>

            {/* Add day dialog */}
            <Dialog
                keepMounted={true}
                open={openAddDay}
                onClose={handleCloseAddDay}
            >
                <DialogTitle sx={dialogTitleSx}>
                    {handleCloseAddDay ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseAddDay}
                            sx={iconButtonSx}
                        >
                            <CloseIcon/>
                        </IconButton>
                    ) : null}
                </DialogTitle>

                <Box sx={dialogBoxSx}>
                    <form onSubmit={handleSubmitAddDay((data) => addDay(reminder.id, parsedList, data))} noValidate>
                        <Box sx={boxSx}>
                            <Typography sx={dialogTypographySx} variant="h5">
                                Add day
                            </Typography>

                            <SingleDayInput control={controlAddDay} variant={"outlined"}/>

                            <Button disabled={!formStateAddDay.isValid} size="large" sx={{...buttonSx, mb: 5}}
                                    type="submit"
                                    variant="contained">Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Dialog>

            {/* Add time dialog */}
            <Dialog
                keepMounted={true}
                open={openAddTime}
                onClose={handleCloseAddTime}
            >
                <DialogTitle sx={dialogTitleSx}>
                    {handleCloseAddTime ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseAddTime}
                            sx={iconButtonSx}
                        >
                            <CloseIcon/>
                        </IconButton>
                    ) : null}
                </DialogTitle>

                <Box sx={dialogBoxSx}>
                    <form onSubmit={handleSubmitAddTime((data) => addTime(reminder.id, parsedList, data))}
                          noValidate>
                        <Box sx={boxSx}>
                            <Typography sx={dialogTypographySx} variant="h5">
                                Add time
                            </Typography>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimeInput setValue={setValueAddTime} getValues={getValuesAddTime}
                                           register={registerAddTime} control={controlAddTime}
                                           counter={""} key={"AddTime_" + reminder.id} variant={"outlined"}/>
                            </LocalizationProvider>
                            <Button size="large" sx={{...buttonSx, mb: 5}} type="submit"
                                    variant="contained">Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Dialog>

            {/* Delete reminder confirmation dialog */}
            <Dialog
                keepMounted={true}
                open={openDelete}
                onClose={handleCloseDelete}
            >
                <Box sx={dialogBoxSx}>
                    <Typography variant="h5" sx={{m: 5}}> Do you want to delete the reminder
                        for {reminder.dose} of {reminder.medication}? </Typography>

                    <Box>
                        <Button onClick={() => deleteReminder(reminder.id, parsedList)}
                                size="large"
                                sx={confirmationButtonSx} variant="contained">Yes</Button>
                        <Button onClick={handleCloseDelete} color="error"
                                size="large"
                                sx={confirmationButtonSx} variant="contained">No</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}

