import {useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DoseInput(params) {
    // Styles
    const autoCompleteSx = {
        width: "100%"
    };

    const [doseValue, setDoseValue] = useState(null);

    return (
        <Controller
            name="dose"
            control={params.control}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    isOptionEqualToValue={(option, value) => value.label === option.label}
                    id="dose-autocomplete"
                    onChange={(event, value) => {
                        field.onChange(value.label);
                        setDoseValue(value);
                    }}
                    options={params.suggestions}
                    value={doseValue}
                    sx={autoCompleteSx}
                    renderInput={(tfParams) => (
                        <TextField
                            required
                            error={!!error}
                            helperText={error?.message}
                            id="dose"
                            label="Dose"
                            name="dose"
                            type="numeric"
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
