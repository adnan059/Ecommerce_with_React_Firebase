import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Emart from "./Emart/Emart";
import { MyState } from "./Emart/context/myState";
import { persistor, store } from "./Emart/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MyState>
          <Emart />
        </MyState>
      </PersistGate>
    </Provider>
  );
};

export default App;
