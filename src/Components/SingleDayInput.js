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

    const label = params.label;

    return (
        <Controller
            name="daysOfWeek"
            control={params.control}
            defaultValue={[]}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    filterSelectedOptions
                    getOptionDisabled={(option) => !!option.disabled}
                    id="days-autocomplete"
                    onChange={(event, value) => {
                        field.onChange(value);
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
                            label={label}
                            name="daysOfWeek"
                            type="search"
                            inputRef={ref}
                            {...ac_params}
                        />
                    )}
                />
            )}
        />
    );
}
