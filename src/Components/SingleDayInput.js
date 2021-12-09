import {useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const daysOfWeekSuggestions = [
    {label: "Every day", disabled: false},
    {label: "Sunday", disabled: false},
    {label: "Monday", disabled: false},
    {label: "Tuesday", disabled: false},
    {label: "Wednesday", disabled: false},
    {label: "Thursday", disabled: false},
    {label: "Friday", disabled: false},
    {label: "Saturday", disabled: false}
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
                    sx={autoCompleteSx}
                    value={dayValue}
                    renderInput={(ac_params) => (
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
                            {...ac_params}
                        />
                    )}
                />
            )}
        />
    );
}
