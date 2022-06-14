import {useEffect, useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";

export default function TimeInput({counter, getValues, register, control, setValue, variant}) {
    const name = "Time " + counter;

    const [time, setTime] = useState(new Date("2000-01-01T00:00:00"));
    const value = getValues(name);

    useEffect(() => {
        register(name);
    }, [name, register]);
    useEffect(() => {
        setTime(value || null);
    }, [setTime, value]);

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={time}
            render={({field: {ref, ...field}}) => (
                <TimePicker
                    {...field}
                    keepMounted={true}
                    label={name}
                    value={time}
                    onChange={(t) => {
                        setValue(name, t, {shouldValidate: true, shouldDirty: true});
                        setTime(t);
                    }}
                    renderInput={(tfParams) =>
                        <TextField
                            id={name}
                            name={name}
                            variant={variant}
                            inputRef={ref}
                            {...tfParams}
                        />
                    }
                />
            )}
        />
    );
}
