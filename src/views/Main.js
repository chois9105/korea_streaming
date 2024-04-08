import Scroller from "@enact/sandstone/Scroller";
import React from "react";
import Item from "@enact/sandstone/Item";
import onairList from "./streaming/onairList.json";
import cableList from "./streaming/cableList.json";
import homeshoppingList from "./streaming/homeshoppingList.json";
import Spottable from "@enact/spotlight/Spottable";
import Spotlight from "@enact/spotlight";
import { useEffect, useRef } from "react";

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
  "TV조선",
  "TV조선2",
];

const OnAirComponent = React.memo(
  ({ index, onSpotlightDown, onSpotlightUp, onClick, streaming }) => {
    return (
      <Item
        key={`onair_${index}`}
        onSpotlightDown={() => onSpotlightDown(index)}
        onSpotlightUp={() => onSpotlightUp(index)}
        onClick={() => onClick(index)}
        className={`onairItem onairItem_${index}`}
      >
        {streaming.name}
      </Item>
    );
  },
  () => true
);

const CableComponent = React.memo(
  ({ index, onSpotlightDown, onSpotlightUp, onClick, streaming }) => {
    return (
      <Item
        key={`cable_${index}`}
        onSpotlightDown={() => onSpotlightDown(index)}
        onSpotlightUp={() => onSpotlightUp(index)}
        onClick={() => onClick(index)}
        className={`cableItem cableItem_${index}`}
      >
        {streaming.name}
      </Item>
    );
  },
  () => true
);

const HomeshoppingComponent = React.memo(
  ({ index, onSpotlightDown, onSpotlightUp, onClick, streaming }) => {
    return (
      <Item
        key={`homeshopping_${index}`}
        onSpotlightDown={() => onSpotlightDown(index)}
        onSpotlightUp={() => onSpotlightUp(index)}
        onClick={() => onClick(index)}
        className={`homeshoppingItem homeshoppingItem_${index}`}
      >
        {streaming.name}
      </Item>
    );
  },
  () => true
);

const SpottableOnAirComponent = Spottable(React.memo(OnAirComponent));
const SpottableCableComponent = Spottable(React.memo(CableComponent));
const SpottableHomeshoppingComponent = Spottable(
  React.memo(HomeshoppingComponent)
);

const Main = () => {
  const streamingItemList = useRef([]);

  useEffect(() => {
    const onairItemList = document.getElementsByClassName("onairItem");
    const cableItemList = document.getElementsByClassName("cableItem");
    const homeshoppingItemList =
      document.getElementsByClassName("homeshoppingItem");

    streamingItemList.current = [
      ...onairItemList,
      ...cableItemList,
      ...homeshoppingItemList,
    ];
    streamingItemList.current[0].focus();
    Spotlight.focus("onair_1", {
      enterTo: "default-element",
    });
  }, []);

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
    if (M3U8_LIST.includes(name)) {
      downloadM3U8(url);
    } else if (OPEN_URL_LIST.includes(name)) {
      openURL(url);
    }
  };

  const onClickCable = async (index) => {
    const { name, url } = cableList[index];
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
            <SpottableOnAirComponent
              spotlightId={`onair_${index}`}
              index={index}
              onSpotlightDown={onSpotlightDown}
              onSpotlightUp={onSpotlightDown}
              onClick={onClickOnair}
              streaming={streaming}
            />
          ))}
        </Scroller>
      </div>
      <div class="column" style={{ flex: 1 }}>
        <Scroller style={{ backgroundColor: "black" }}>
          {cableList.map((streaming, index) => (
            <SpottableCableComponent
              spotlightId={`cable_${index}`}
              onSpotlightDown={() => onSpotlightDown(index)}
              onSpotlightUp={() => onSpotlightUp(index)}
              onClick={() => onClickCable(index)}
              className="cableItem"
              streaming={streaming}
            />
          ))}
        </Scroller>
      </div>
      <div class="column" style={{ flex: 1 }}>
        <Scroller style={{ backgroundColor: "black" }}>
          {homeshoppingList.map((streaming, index) => (
            <SpottableHomeshoppingComponent
              spotlightId={`homeshopping_${index}`}
              onSpotlightDown={() => onSpotlightDown(index)}
              onSpotlightUp={() => onSpotlightUp(index)}
              onClick={() => onClickHomeshopping(index)}
              className="homeshoppingItem"
              streaming={streaming}
            />
          ))}
        </Scroller>
      </div>
    </div>
  );
};
const SpottableComponent = Spottable(Main);
export default SpottableComponent;
