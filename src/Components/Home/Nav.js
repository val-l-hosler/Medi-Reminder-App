import {useState} from "react";

// Material UI Components
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import ListItemText from "@mui/material/ListItemText";

// Styles
const accordionDetailsSx = {
    padding: 2.5
};

const accordionSummarySx = {
    bgcolor: "#eeeeee",
    padding: 5
};

const containerSx = {
    mb: 5,
    mt: 5,
    pl: 0,
    pr: 0,
    width: "100%"
}

const expandMoreIconSx = {
    height: 65,
    width: 65
};

const listSx = {
    pl: 5,
    pr: 5
};

const listItemButtonSx = {
    padding: "40px"
};

const listItemTextSx = {
    color: "#1769aa",
    fontSize: "28px",
    textAlign: "center"
};

export default function Nav() {
    const [expanded, setExpanded] = useState("");

    const handleChange = (panel) => (_event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Container sx={containerSx}>
            <nav aria-label="medication nav">
                <List sx={listSx}>
                    <Accordion disableGutters expanded={expanded === "medicationsPanel"}
                               onChange={handleChange("medicationsPanel")}>
                        <AccordionSummary aria-controls="medicationsPanel-content" id="medicationsPanel-header"
                                          expandIcon={<ExpandMoreIcon sx={expandMoreIconSx}/>}
                                          sx={accordionSummarySx}>
                            <Typography sx={listItemTextSx}>Medication(s)</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={accordionDetailsSx}>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="/add-medication" sx={listItemButtonSx}>
                                    <ListItemText disableTypography
                                                  primary={<Typography sx={listItemTextSx}>Add
                                                      medication</Typography>}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="/medications" sx={listItemButtonSx}>
                                    <ListItemText disableTypography
                                                  primary={<Typography sx={listItemTextSx}>Manage
                                                      medication(s)</Typography>}/>
                                </ListItemButton>
                            </ListItem>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disableGutters expanded={expanded === "remindersPanel"}
                               onChange={handleChange("remindersPanel")}>
                        <AccordionSummary aria-controls="remindersPanel-content" id="remindersPanel-header"
                                          expandIcon={<ExpandMoreIcon sx={expandMoreIconSx}/>}
                                          sx={accordionSummarySx}>
                            <Typography sx={listItemTextSx}>Reminder(s)</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={accordionDetailsSx}>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="/add-reminder" sx={listItemButtonSx}>
                                    <ListItemText disableTypography
                                                  primary={<Typography sx={listItemTextSx}>Add
                                                      reminder</Typography>}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="/reminders" sx={listItemButtonSx}>
                                    <ListItemText disableTypography
                                                  primary={<Typography sx={listItemTextSx}>Manage
                                                      reminder(s)</Typography>}/>
                                </ListItemButton>
                            </ListItem>
                        </AccordionDetails>
                    </Accordion>
                </List>
            </nav>
        </Container>
    );
}
