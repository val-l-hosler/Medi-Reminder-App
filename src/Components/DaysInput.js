import {useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DaysInput(params) {
    // Styles
    const autoCompleteSx = {
        width: "100%"
    };

    const [daysOfWeekSuggestions, setOptions] = useState(params.initOptions);
    const [selected, setSelected] = useState([]);

    const onChangeDisabled = (e, valueArr) => {
        setSelected(valueArr);

        if (valueArr.length === 0) {
            const resetOptions = [...daysOfWeekSuggestions].map((opt) => {
                opt.disabled = false;
                return opt;
            });

            setOptions(resetOptions);
        } else {
            const everyDaySelected = valueArr.find(
                (item) => item.label === "Every day"
            );

            if (everyDaySelected) {
                const updatedOptions = [...daysOfWeekSuggestions].map((opt) => {
                    opt.disabled = opt.label !== "Every day";
                    return opt;
                });

                setOptions(updatedOptions);
            } else {
                const updatedOptions = [...daysOfWeekSuggestions].map((opt) => {
                    opt.disabled = opt.label === "Every day";
                    return opt;
                });

                setOptions(updatedOptions);
            }
        }
    };

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
                    multiple
                    getOptionDisabled={(option) => !!option.disabled}
                    id="days-autocomplete"
                    onChange={(event, value) => {
                        field.onChange(value);
                        onChangeDisabled(event, value);
                    }}
                    options={daysOfWeekSuggestions}
                    sx={autoCompleteSx}
                    value={selected}
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
