import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// Styles
const autoCompleteSx = {
    width: "100%"
};

export default function MedicationInput({control, suggestions, variant, medValue, setMedValue, setDoseValue}) {
    return (
        <Controller
            name="medication"
            control={control}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    isOptionEqualToValue={(option, value) => value.label === option.label}
                    id="medication-autocomplete"
                    onChange={(_event, value) => {
                        field.onChange(value.label);
                        setMedValue(value);
                        setDoseValue(null);
                    }}
                    options={suggestions}
                    value={medValue}
                    sx={autoCompleteSx}
                    renderInput={(tfParams) => (
                        <TextField
                            required
                            error={!!error}
                            helperText={error?.message}
                            id="medication"
                            label="Medication"
                            name="medication"
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
