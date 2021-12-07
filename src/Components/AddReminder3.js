import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI Components
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const timesSuggestions = [
    {label: "1"},
    {label: "2"},
    {label: "3"},
    {label: "4"},
    {label: "5"}
];

const validationSchema = Yup.object().shape({
    times: Yup.string()
        .required("Times are required")
});

export default function AddReminder3() {
    // Styles
    const autoCompleteSx = {
        width: "100%"
    };

    const boxSx = {
        "& .MuiTextField-root": {mb: 5, width: "100%"},
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
    };

    const containerSx = {
        m: 0,
        pl: 5,
        pr: 5,
        width: "100%"
    };

    const iconButtonSx = {
        fontSize: 75,
        ml: 2.5,
        mr: 2.5
    };

    const linkSx = {
        color: "#1976d2"
    };

    const stackSx = {
        mb: 5
    };

    const typographySx = {
        mb: 5,
        textAlign: "center"
    };

    const breadcrumbs = [
        <Link key="1" underline="hover" color="inherit" href="/add-reminder" sx={linkSx}>
            Name & Dose
        </Link>,
        <Link key="2" underline="hover" color="inherit" href="/add-reminder/days" sx={linkSx}>
            Days of Week
        </Link>,
        <Typography key="3" color="text.primary">
            # of Times
        </Typography>
    ];

    const {handleSubmit, control, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        // This saves the reminder into a local session storage for the purposes of displaying the reminders on another page.
        // If I were going to create a deployed version of the app, I would create a DB and save the data there.
        // I also set this condition --> localStorage.getItem("reminders").length < 2 --> because if the array is empty, the length === 2
        if (localStorage.getItem("reminders") === null || localStorage.getItem("reminders").length < 3) {
            localStorage.setItem("reminders", JSON.stringify([{
                id: 0,
                medication: "",
                dose: "",
                days: [],
                timesPerDay: 0,
                times: [],
                submitted: false
            }]));
        }

        const reminderList = localStorage.getItem("reminders");
        const parsed = JSON.parse(reminderList);
        const mostRecent = parsed[parsed.length - 1];
        mostRecent.timesPerDay = parseInt(data.times);
        parsed[parsed.length - 1] = mostRecent;
        localStorage.setItem("reminders", JSON.stringify(parsed));

        fetch("/add-reminder/days/nums/times")
            .then(() => {
                window.location = "/add-reminder/days/nums/times";
            });

    };

    // I added these because without it, all the autofill elements were showing up as selected
    const [timesValue, setTimesValue] = useState(null);

    return (
        <Container sx={containerSx}>
            <Stack spacing={2} sx={stackSx}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={boxSx}>
                    <Typography sx={typographySx} variant="h4">
                        How many times a day do you take your medicine?
                    </Typography>

                    <Controller
                        name="times"
                        control={control}
                        render={({field: {ref, ...field}, fieldState: {error}}) => (
                            <Autocomplete
                                {...field}
                                autoHighlight
                                disableClearable
                                disablePortal
                                isOptionEqualToValue={(option, value) => value.label === option.label}
                                id="times-autocomplete"
                                onChange={(event, value) => {
                                    field.onChange(value.label);
                                    setTimesValue(value);
                                }}
                                options={timesSuggestions}
                                value={timesValue}
                                sx={autoCompleteSx}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        error={!!error}
                                        helperText={error?.message}
                                        id="times"
                                        label="Number of Times"
                                        name="times"
                                        type="search"
                                        inputRef={ref}
                                        {...params}
                                    />
                                )}
                            />
                        )}
                    />

                    <Box>
                        <Button href="/add-reminder/days"><ArrowBackIcon sx={iconButtonSx}/></Button>

                        <Button disabled={!formState.isValid}
                                type="submit"><ArrowForwardIcon sx={iconButtonSx}/></Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );
}
