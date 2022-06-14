import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// Styles
const autoCompleteSx = {
    width: "100%"
};

export default function DoseInput({control, suggestions, variant, doseValue, setDoseValue}) {
    return (
        <Controller
            name="dose"
            control={control}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    isOptionEqualToValue={(option, value) => value.label === option.label}
                    id="dose-autocomplete"
                    onChange={(_event, value) => {
                        field.onChange(value.label);
                        setDoseValue(value);
                    }}
                    options={suggestions}
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
                            type="search"
                            variant={variant}
                            inputRef={ref}
                            {...tfParams}
                        />
                    )}
                />
            )}
        />
    );
}
