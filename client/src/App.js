import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Auth from "./components/Auth";
import { animated, useTransition } from "react-spring";

import { __RouterContext } from "react-router";

function useRouter() {
  return useContext(__RouterContext);
}

const App = () => {
  const { location } = useRouter();

  const transitions = useTransition(location, (location) => location.key, {
    from: {
      opacity: 0,
      position: "absolute",
      width: "100%",
      transform: `translate3d(100%, 0, 0)`,
    },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: {
      opacity: 0,
      transform: `translate3d(-50%, 0, 0)`,
    },
  });
  return transitions.map(({ item, props: transition, key }) => (
    <animated.div key={key} style={transition}>
      <Switch location={item}>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Auth} />
      </Switch>
    </animated.div>
  ));
};

export default App;
