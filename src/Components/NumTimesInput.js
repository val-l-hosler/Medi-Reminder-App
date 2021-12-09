import {useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const timesSuggestions = [
    {label: "1"},
    {label: "2"},
    {label: "3"},
    {label: "4"},
    {label: "5"}
];

export default function NumTimesInput(params) {
    // Styles
    const autoCompleteSx = {
        width: "100%"
    };

    const [timesValue, setTimesValue] = useState(null);

    return (
        <Controller
            name="times"
            control={params.control}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    isOptionEqualToValue={(option, value) => value.label === option.label}
                    id="times-autocomplete"
                    onChange={(event, value) => {
                        field.onChange(value.label);
                        setTimesValue(value);
                    }}
                    options={timesSuggestions}
                    value={timesValue}
                    sx={autoCompleteSx}
                    renderInput={(acParams) => (
                        <TextField
                            required
                            error={!!error}
                            helperText={error?.message}
                            id="times"
                            label="Number of Times"
                            name="times"
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
