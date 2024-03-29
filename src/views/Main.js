import Scroller from "@enact/sandstone/Scroller";
import Item from "@enact/sandstone/Item";
import onairList from "./streaming/onairList.json";
import cableList from "./streaming/cableList.json";
import homeshoppingList from "./streaming/homeshoppingList.json";
import Spottable from "@enact/spotlight/Spottable";

const M3U8_LIST = ["KBS1", "KBS2"];
const OPEN_URL_LIST = [
  "SBS",
  "MBN",
  "MBC",
  "채널A",
  "연합뉴스TV",
  "EBS1",
  "EBS2",
  "YTN",
  "YTN2",
];

const Main = () => {
  const onSpotlightUp = (index) => {};

  const onSpotlightDown = (index) => {};

  const openURL = (a) => {
    window.open(a, "_blank");
    return !1;
  };

  const onClickHomeshopping = async (index) => {
    const { name, url } = homeshoppingList[index];
    openURL(url);
  };

  const downloadM3U8 = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const b = res.channel_item[0].service_url;
        openURL(b);
      });
  };

  const onClickOnair = async (index) => {
    const { name, url } = onairList[index];
    console.log(`${name} :: ${url}`);
    if (M3U8_LIST.includes(name)) {
      downloadM3U8(url);
    } else if (OPEN_URL_LIST.includes(name)) {
      openURL(url);
    }
  };

  const onClickCable = async (index) => {
    const { name, url } = cableList[index];
    console.log(`${name} :: ${url}`);
    if (M3U8_LIST.includes(name)) {
      downloadM3U8(url);
    } else if (OPEN_URL_LIST.includes(name)) {
      openURL(url);
    }
  };

  return (
    <div class="container" style={{ display: "flex", height: "100vh" }}>
      <div class="column" style={{ flex: 1 }}>
        <Scroller style={{ backgroundColor: "black" }}>
          {onairList.map((streaming, index) => (
            <Item
              key={`onair_${index}`}
              onSpotlightDown={() => onSpotlightDown(index)}
              onSpotlightUp={() => onSpotlightUp(index)}
              onClick={() => onClickOnair(index)}
            >
              {streaming.name}
            </Item>
          ))}
        </Scroller>
      </div>
      <div class="column" style={{ flex: 1 }}>
        <Scroller style={{ backgroundColor: "black" }}>
          {cableList.map((streaming, index) => (
            <Item
              key={`cable_${index}`}
              onSpotlightDown={() => onSpotlightDown(index)}
              onSpotlightUp={() => onSpotlightUp(index)}
              onClick={() => onClickCable(index)}
            >
              {streaming.name}
            </Item>
          ))}
        </Scroller>
      </div>
      <div class="column" style={{ flex: 1 }}>
        <Scroller style={{ backgroundColor: "black" }}>
          {homeshoppingList.map((streaming, index) => (
            <Item
              key={`homeshopping_${index}`}
              onSpotlightDown={() => onSpotlightDown(index)}
              onSpotlightUp={() => onSpotlightUp(index)}
              onClick={() => onClickHomeshopping(index)}
            >
              {streaming.name}
            </Item>
          ))}
        </Scroller>
      </div>
    </div>
  );
};
const SpottableComponent = Spottable(Main);
export default SpottableComponent;
