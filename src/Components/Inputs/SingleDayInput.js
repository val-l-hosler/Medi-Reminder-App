import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const daysOfWeekSuggestions = [
    {label: "Every day"},
    {label: "Monday"},
    {label: "Tuesday"},
    {label: "Wednesday"},
    {label: "Thursday"},
    {label: "Friday"},
    {label: "Saturday"},
    {label: "Sunday"}
];

// Styles
const autoCompleteSx = {
    width: "100%"
};

export default function SingleDayInput(params) {
    return (
        <Controller
            name="day"
            control={params.control}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    isOptionEqualToValue={(option, value) => value.label === option.label}
                    id="day-autocomplete"
                    onChange={(_event, value) => {
                        field.onChange(value.label);
                    }}
                    options={daysOfWeekSuggestions}
                    value={null}
                    sx={autoCompleteSx}
                    renderInput={(tfParams) => (
                        <TextField
                            required
                            error={!!error}
                            helperText={error?.message}
                            id="day"
                            label="Day"
                            name="day"
                            type="search"
                            variant={params.variant}
                            inputRef={ref}
                            {...tfParams}
                        />
                    )}
                />
            )}
        />
    );
}
