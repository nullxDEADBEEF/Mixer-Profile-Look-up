import React from "react";
import MixerLookup from "./MixerLookup";
import "./MixerLookup.css";

class App extends React.Component {

    render() {
        return ( [
            <h1 className="change-left-margin change-top-margin title">Look up A Mixer Profile</h1>,
            <MixerLookup />
            ]
        )
    }
}

export default App;