import {useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function MedicationInput(params) {
    // Styles
    const autoCompleteSx = {
        width: "100%"
    };

    const [medValue, setMedValue] = useState(null);

    return (
        <Controller
            name="medication"
            control={params.control}
            render={({field: {ref, ...field}, fieldState: {error}}) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    disableClearable
                    isOptionEqualToValue={(option, value) => value.label === option.label}
                    id="medication-autocomplete"
                    onChange={(event, value) => {
                        field.onChange(value.label);
                        setMedValue(value);
                    }}
                    options={params.suggestions}
                    value={medValue}
                    sx={autoCompleteSx}
                    renderInput={(acParams) => (
                        <TextField
                            required
                            error={!!error}
                            helperText={error?.message}
                            id="medication"
                            label="Medication"
                            name="medication"
                            type="search"
                            variant={params.variant}
                            inputRef={ref}
                            {...acParams}
                        />
                    )}
                />
            )}
        />
    );
}
