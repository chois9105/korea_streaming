import kind from "@enact/core/kind";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import "./attachErrorHandler";
import Main from "../views/Main";
import css from "./App.module.less";
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const Container = SpotlightContainerDecorator('div');

const App = kind({
  name: "App",
  styles: {
    css,
    className: "app",
  },
  render: (props) => {
    return 	<Container {...props}>
      <Main />
</Container>
  }
});

export default ThemeDecorator(App);
