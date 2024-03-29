import Scroller from "@enact/sandstone/Scroller";
import Item from "@enact/sandstone/Item";
import streamingList from "../streaminList.json";
import Spottable from "@enact/spotlight/Spottable";
import Spotlight from "@enact/spotlight";

const Main = () => {
  const onSpotlightUp = (index) => {
    console.log(index);
  };

  const onSpotlightDown = (index) => {
    console.log(index === streamingList.length - 1);
    const a = document.getElementsByClassName("tv_0");
    console.log(a);
    Spotlight.focus(`.tv_0`);
    if (index === streamingList.length - 1) {
      Spotlight.focus(`tv_0`);
    }
  };

  return (
    <Scroller style={{ backgroundColor: "black" }}>
      {streamingList.map((streaming, index) => (
        <Item
          itemID={`tv_${index}`}
          classID={`tv_${index}`}
          className={`tv_${index}`}
          onSpotlightDown={() => onSpotlightDown(index)}
          onSpotlightUp={() => onSpotlightUp(index)}
        >
          {streaming.name}
        </Item>
      ))}
    </Scroller>
  );
};
const SpottableComponent = Spottable(Main);
export default SpottableComponent;
