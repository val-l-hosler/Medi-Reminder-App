import "./App.css";

// Custom components
import AddMedication from "./Components/AddMedication.js";
// import AddMedication_B from "./Components/AddMedication_B.js";
import AddReminder1 from "./Components/AddReminder1.js";
import AddReminder2 from "./Components/AddReminder2.js";
import AddReminder3 from "./Components/AddReminder3.js";
import AddReminder4 from "./Components/AddReminder4.js";
import AddReminder5 from "./Components/AddReminder5.js";
import DisplayMedications from "./Components/DisplayMedications.js";
import DisplayReminders from "./Components/DisplayReminders.js";
import Login from "./Components/Login.js";
import MedicationConfirmation from "./Components/MedicationConfirmation.js";
import MenuAppBar from "./Components/MenuAppBar.js";
import Nav from "./Components/Nav.js";
import ReminderConfirmation from "./Components/ReminderConfirmation.js";

import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <div className="Login">
                            <Login/>
                        </div>
                    }/>

                    <Route path="/add-medication" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <AddMedication/>
                                {/* <AddMedication_B/> */}
                            </div>
                        </div>
                    }/>

                    <Route path="/add-reminder" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <AddReminder1/>
                            </div>
                        </div>
                    }/>

                    <Route path="/add-reminder/days" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <AddReminder2/>
                            </div>
                        </div>
                    }/>

                    <Route path="/add-reminder/days/nums" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <AddReminder3/>
                            </div>
                        </div>
                    }/>

                    <Route path="/add-reminder/days/nums/times" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <AddReminder4/>
                            </div>
                        </div>
                    }/>

                    <Route path="/add-reminder/days/nums/times/confirmation" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <AddReminder5/>
                            </div>
                        </div>
                    }/>

                    <Route path="/main-menu" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <Nav/>
                            </div>
                        </div>
                    }/>

                    <Route path="/medications" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <DisplayMedications/>
                            </div>
                        </div>
                    }/>

                    <Route path="/medication-confirmation" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <MedicationConfirmation/>
                            </div>
                        </div>
                    }/>

                    <Route path="/reminder-confirmation" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <ReminderConfirmation/>
                            </div>
                        </div>
                    }/>

                    <Route path="/reminders" element={
                        <div>
                            <MenuAppBar/>
                            <div className="Container">
                                <DisplayReminders/>
                            </div>
                        </div>
                    }/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
