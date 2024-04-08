import kind from "@enact/core/kind";
import "./attachErrorHandler";
import Main from "../views/Main";
import css from "./App.module.less";

const App = kind({
  name: "App",
  styles: {
    css,
    className: "app",
  },
  render: () => <Main />,
});
export default SpotlightRootDecorator(App);
