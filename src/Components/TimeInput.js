import {useEffect, useState} from "react";
import {Controller} from "react-hook-form";

// Material UI Components
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";

export default function TimeInput(params) {
    const name = "Time " + params.counter;

    const [time, setTime] = useState(new Date("2000-01-01T00:00:00"));
    const value = params.getValues(name);

    useEffect(() => {
        params.register(name);
    }, [name, params]);
    useEffect(() => {
        setTime(value || null);
    }, [setTime, value]);

    return (
        <Controller
            control={params.control}
            name={name}
            defaultValue={time}
            render={({field: {ref, ...field}}) => (
                <TimePicker
                    {...field}
                    keepMounted={true}
                    label={name}
                    value={time}
                    onChange={(val) => {
                        params.setValue(name, val, {shouldValidate: true, shouldDirty: true});
                        setTime(val);
                    }}
                    renderInput={(params) =>
                        <TextField
                            id={name}
                            name={name}
                            inputRef={ref}
                            {...params}
                        />
                    }
                />
            )}
        />
    );
}
