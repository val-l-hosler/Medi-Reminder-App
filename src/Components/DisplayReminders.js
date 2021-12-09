import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI Components
import AddIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Custom Components
import DaysInput from "./DaysInput.js";
import NoRegisteredReminders from "./NoRegisteredReminders.js";
import TimeInput from "./TimeInput.js";

const initOptions = [
    {label: "Every day", disabled: false},
    {label: "Sunday", disabled: false},
    {label: "Monday", disabled: false},
    {label: "Tuesday", disabled: false},
    {label: "Wednesday", disabled: false},
    {label: "Thursday", disabled: false},
    {label: "Friday", disabled: false},
    {label: "Saturday", disabled: false}
];

const validationSchema = Yup.object().shape({
    daysOfWeek: Yup.array()
        .of(
            Yup.object().shape({
                label: Yup.string(),
                disabled: Yup.boolean()
            })
        )
        .min(1, "Days of the week are required")
});

export default function DisplayReminders() {
    // Styles
    const boxSx = {
        "& .MuiTextField-root": {mb: 5, width: "100%"},
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        ml: "50px",
        mr: "50px"
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
        m: 0,
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

    // This is the array of reminder objects that will be displayed on the cards
    const reminderList = localStorage.getItem("reminders");
    let parsed = JSON.parse(reminderList);

    if (parsed !== null) {
        parsed = parsed.filter((index) => index.submitted === true);
    }

    // This forces the component to re-render after a medication has been deleted
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const ChipList = (params) => {
        params.arr.sort();
        const unique = [...new Set(params.arr)];

        return (unique.map((index, i) => {
            const handleDelete = () => {
                // This removes the appropriate index from the array that is passed into the params
                params.arr.splice(i, 1);

                for (const ind of parsed) {
                    if (ind.id === params.id) {
                        // This resets the appropriate object's key/value pair with the updated list
                        parsed[i][params.objKey] = params.arr;
                    }
                }

                localStorage.setItem("reminders", JSON.stringify(parsed));

                // This forces the medication list to re-render
                forceUpdate();
            };

            return (<Chip onDelete={handleDelete} sx={chipSx} key={"Chip_" + index} label={index}/>);
        }));
    };

    // This is the Reminder component that is displayed including a card, reminder info, and a delete reminder button
    const Reminder = ({reminder}) => {
        function getThisReminder(reminderId, parsedReminders) {
            let index;

            for (let i = 0; i < parsedReminders.length; i++) {
                if (parsedReminders[i].id === reminderId) {
                    index = i;
                }
            }

            return [parsedReminders[index], index];
        }

        // This handles the add day dialog
        const [openAddDay, setOpenAddDay] = useState(false);
        const handleClickAddDay = () => {
            setOpenAddDay(true);
        };
        const handleCloseAddDay = () => {
            setOpenAddDay(false);
        };

        function addDay(reminderId, parsedReminders, data) {
            const thisReminder = getThisReminder(reminderId, parsedReminders)[0];
            const thisReminderIndex = getThisReminder(reminderId, parsedReminders)[1];
            thisReminder.days = [...thisReminder.days, data.daysOfWeek[0].label];
            parsed[thisReminderIndex] = thisReminder;
            localStorage.setItem("reminders", JSON.stringify(parsed));

            // This forces the dialog to close
            setOpenAddDay(false);

            // This forces the reminder list to re-render
            forceUpdate();
        }

        // This needs to be inside the component or else an unmounted component error displays in the console
        // This controls the add day form
        const {
            control: controlAddDay,
            handleSubmit: handleSubmitAddDay,
            formState: formStateAddDay
        } = useForm({
            mode: "onChange",
            resolver: yupResolver(validationSchema)
        });

        // This handles the add time dialog
        const [openAddTime, setOpenAddTime] = useState(false);
        const handleClickAddTime = () => {
            setOpenAddTime(true);
        };
        const handleCloseAddTime = () => {
            setOpenAddTime(false);
        };

        // This needs to be inside the component or else an unmounted component error displays in the console
        // This controls the add time form
        const {
            control: controlAddTime,
            handleSubmit: handleSubmitAddTime,
            setValue: setValueAddTime,
            register: registerAddTime,
            getValues: getValuesAddTime
        } = useForm({
            mode: "onChange",
            resolver: yupResolver(validationSchema)
        });

        // Function that is triggered when the add time form is submitted
        function addTime(reminderId, parsedReminders, data) {
            const thisReminder = getThisReminder(reminderId, parsedReminders)[0];
            const thisReminderIndex = getThisReminder(reminderId, parsedReminders)[1];
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
                    let newSliced = sliced.slice(0, 2);
                    finalTime = (parseInt(newSliced) - 12) + sliced.slice(2) + " pm";
                }

                time = finalTime;
            });

            thisReminder.times = [...thisReminder.times, time];
            parsed[thisReminderIndex] = thisReminder;
            localStorage.setItem("reminders", JSON.stringify(parsed));

            // This forces the dialog to close
            setOpenAddTime(false);

            // This forces the reminder list to re-render
            forceUpdate();
        }

        // This handles the delete medication confirmation dialog
        const [openDelete, setOpenDelete] = useState(false);
        const handleClickOpenDelete = () => {
            setOpenDelete(true);
        };
        const handleCloseDelete = () => {
            setOpenDelete(false);
        };

        // Function for the delete reminder button
        function deleteReminder(reminderId, parsedReminders) {
            const thisReminderIndex = getThisReminder(reminderId, parsedReminders)[1];

            if (parsedReminders.length > 1) {
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
        }

        // This is what is rendered for the Reminder component
        return (
            <Box>
                <Card sx={cardSx}>
                    <CardContent>
                        <Typography sx={typographySx} variant="h5">
                            Medication: {reminder.medication}
                        </Typography>
                        <Typography sx={typographySx} variant="h5">
                            Dose: {reminder.dose} mg
                        </Typography>
                        <Typography sx={typographyChipSx} variant="h5">
                            Days: <ChipList id={reminder.id} arr={reminder.days} objKey={"days"}/>
                            {/* Note: the onDelete creates the icon in the appropriate spot and there isn't an onAdd option */}
                            <Chip color={"primary"} onDelete={handleClickAddDay} deleteIcon={<AddIcon/>} sx={chipSx}
                                  label={"Add day"}/>
                        </Typography>
                        <Typography sx={typographyChipSx} variant="h5">
                            Times: <ChipList id={reminder.id} arr={reminder.times} objKey={"times"}/>
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
                        <form onSubmit={handleSubmitAddDay((data) => addDay(reminder.id, parsed, data))} noValidate>
                            <Box sx={boxSx}>
                                <Typography sx={dialogTypographySx} variant="h5">
                                    Add day
                                </Typography>

                                <DaysInput initOptions={initOptions} control={controlAddDay} label={"Day"}/>

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
                        <form onSubmit={handleSubmitAddTime((data) => addTime(reminder.id, parsed, data))}>
                            <Box sx={boxSx}>
                                <Typography sx={dialogTypographySx} variant="h5">
                                    Add time
                                </Typography>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimeInput setValue={setValueAddTime} getValues={getValuesAddTime}
                                               register={registerAddTime}
                                               control={controlAddTime}
                                               counter={""} key={"TimeInputs" + reminder.id}/>
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
                        <Typography variant="h5" sx={{m: 5}}> Do you want to delete the reminder for {reminder.dose} mg
                            of {reminder.medication}? </Typography>

                        <Box>
                            <Button onClick={() => deleteReminder(reminder.id, parsed)}
                                    size="large"
                                    sx={confirmationButtonSx} variant="contained">Yes</Button>
                            <Button onClick={handleCloseDelete} color="error"
                                    size="large"
                                    sx={confirmationButtonSx} variant="contained">No</Button>
                        </Box>
                    </Box>
                </Dialog>
            </Box>
        )
    }; // End Reminder component

    let reminders;

    if (parsed !== null && parsed.length > 0) {
        reminders = parsed.map((reminder, index) => {
            return (<Reminder reminder={reminder} key={"reminder" + index}/>)
        });
    } else {
        reminders = <NoRegisteredReminders/>;
    }

    // This is the actual final block of code that is rendered for this component
    return (
        <Container sx={containerSx}>
            <Box style={{flexDirection: "column"}}>
                {reminders}
            </Box>
        </Container>
    );
}
