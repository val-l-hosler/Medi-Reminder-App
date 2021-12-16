import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Custom Components
import PillLogo from "./pill.svg";

export default function Login() {
    // Styles
    const boxFormSx = {
        "& .MuiTextField-root": {mb: 5, width: "100%"}
    };

    const boxLinkSx = {
        mt: 2
    };

    const buttonSx = {
        fontSize: "17px",
        height: "5.75ch",
        mb: 2.5,
        width: "100%"
    };

    const containerDivStyle = {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    };

    const containerSx = {
        pb: 5,
        pt: 5,
        width: "100%"
    };

    const cardSx = {
        ml: 5,
        mr: 5,
        mt: 5,
        p: 5
    };

    const errorSx = {
        mb: 5,
        mt: 2.5
    };

    const imgStyle = {
        filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(103%) contrast(101%)",
        height: 250
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required")
    });

    const onSubmit = (data) => {
        // This is implemented so the error UI for an invalid username/password can be displayed
        if (!(data.username === "test" && data.password === "pass")) {
            document.getElementById("userPassError").style.display = "flex";
        } else {
            document.getElementById("userPassError").style.display = "none";
            fetch("/main-menu")
                .then(() => {
                    window.location = "/main-menu";
                });
        }
    };

    const {handleSubmit, control, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    return (
        <Container sx={containerSx}>
            <Box sx={containerDivStyle}>
                <img alt="Pill Logo" src={PillLogo} style={imgStyle}/>
            </Box>

            <Card variant="outlined" sx={cardSx}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box
                        sx={boxFormSx}
                    >

                        <Controller
                            name="username"
                            control={control}
                            defaultValue={""}
                            render={({field: {ref, ...field}, fieldState: {error}}) => (
                                <TextField
                                    {...field}
                                    required
                                    error={!!error}
                                    helperText={error?.message}
                                    id="username"
                                    label="Username"
                                    name="username"
                                    type="search"
                                    inputRef={ref}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            defaultValue={""}
                            render={({field: {ref, ...field}, fieldState: {error}}) => (
                                <TextField
                                    {...field}
                                    required
                                    error={!!error}
                                    helperText={error?.message}
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="search"
                                    inputRef={ref}
                                />
                            )}
                        />

                        <Button disabled={!formState.isValid} size="large" sx={buttonSx} type="submit"
                                variant="contained">Login</Button>

                        <Typography color="error" id="userPassError" style={{display: "none"}} sx={errorSx}
                                    variant="inherit">
                            The username and password are invalid
                        </Typography>
                    </Box>
                </form>

                <Box sx={boxLinkSx}>
                    <Link href="/" underline="hover">
                        {"Create an account"}
                    </Link>
                </Box>
            </Card>
        </Container>
    );
}
