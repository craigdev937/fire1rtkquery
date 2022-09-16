import React from "react";
import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Provider } from "react-redux";
import { RootReducer } from "../global/RootReducer";
import { Main } from "../routes/Main";

export const App = () => {
    return (
        <React.Fragment>
            <Provider store={RootReducer}>
                <Main />
            </Provider>
        </React.Fragment>
    );
};



