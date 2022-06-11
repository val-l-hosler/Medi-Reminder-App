import {useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const initOptions = [
    {label: "Every day", disabled: false},
    {label: "Monday", disabled: false},
    {label: "Tuesday", disabled: false},
    {label: "Wednesday", disabled: false},
    {label: "Thursday", disabled: false},
    {label: "Friday", disabled: false},
    {label: "Saturday", disabled: false},
    {label: "Sunday", disabled: false}
];

// Styles
const autoCompleteSx = {
    width: "100%"
};

export default function DaysInput(params) {
    const [daysOfWeekSuggestions, setOptions] = useState(initOptions);
    const [selected, setSelected] = useState([]);

    const onChangeDisabled = (_event, valueArr) => {
        setSelected(valueArr);

        // The hook is in conditional statements because no matter what it will be set
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
                    value={selected}
                    sx={autoCompleteSx}
                    renderInput={(tfParams) => (
                        <TextField
                            required
                            error={!!error}
                            helperText={error?.message}
                            id="daysOfWeek"
                            label="Day(s)"
                            name="daysOfWeek"
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
