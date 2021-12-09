import {useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const daysOfWeekSuggestions = [
    {label: "Every day"},
    {label: "Sunday"},
    {label: "Monday"},
    {label: "Tuesday"},
    {label: "Wednesday"},
    {label: "Thursday"},
    {label: "Friday"},
    {label: "Saturday"}
];

export default function SingleDayInput(params) {
    // Styles
    const autoCompleteSx = {
        width: "100%"
    };

    const [dayValue, setDayValue] = useState(null);

    return (
        <Controller
            name="daysOfWeek"
            control={params.control}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    isOptionEqualToValue={(option, value) => value.label === option.label}
                    id="days-autocomplete"
                    onChange={(event, value) => {
                        field.onChange(value.label);
                        setDayValue(value);
                    }}
                    options={daysOfWeekSuggestions}
                    value={dayValue}
                    sx={autoCompleteSx}
                    renderInput={(acParams) => (
                        <TextField
                            required
                            error={!!error}
                            helperText={error?.message}
                            id="daysOfWeek"
                            label="Day(s)"
                            name="daysOfWeek"
                            type="search"
                            inputRef={ref}
                            variant={params.variant}
                            {...acParams}
                        />
                    )}
                />
            )}
        />
    );
}
