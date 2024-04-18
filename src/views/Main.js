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

    if(null === Spotlight.getCurrent()){
      Spotlight.focus(".onairItem", {
        enterTo: "last-focused",
      });

      streamingItemList.current[0].focus();
    }
    
  }, []);

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
    <div
      class="container"
      style={{ display: "flex", height: "230vh", backgroundColor: "black", paddingTop: "10vh" }}
    >
      <div class="column" style={{ flex: 1, backgroundColor: "black" }}>
        {onairList.map((streaming, index) => (
          <Item
            key={`onair_${index}`}
            spotlightId={`onair_${index}`}
            onClick={() => onClickOnair(index)}
            className="onairItem"
          >
            {streaming.name}
          </Item>
        ))}
        {cableList.map((streaming, index) => (
          <Item
            key={`cable_${index}`}
            spotlightId={`cable_${index}`}
            onClick={() => onClickCable(index)}
            className="cableItem"
          >
            {streaming.name}
          </Item>
        ))}
        {homeshoppingList.map((streaming, index) => (
          <Item
            key={`homeshopping_${index}`}
            spotlightId={`homeshopping_${index}`}
            onClick={() => onClickHomeshopping(index)}
            className="homeshoppingItem"
          >
            {streaming.name}
          </Item>
        ))}
      </div>
      <div class="column" style={{ flex: 1, backgroundColor: "black" }}>
        {/* 
        {cableList.map((streaming, index) => (
          <Item
            key={`cable_${index}`}
            spotlightId={`cable_${index}`}
            onClick={() => onClickCable(index)}
            className="cableItem"
          >
            {streaming.name}
          </Item>
        ))}
        */}
      </div>
      <div class="column" style={{ flex: 1, backgroundColor: "black" }}>
        {/* 
        {homeshoppingList.map((streaming, index) => (
          <Item
            key={`homeshopping_${index}`}
            spotlightId={`homeshopping_${index}`}
            onClick={() => onClickHomeshopping(index)}
            className="homeshoppingItem"
          >
            {streaming.name}
          </Item>
        ))}
        */}
      </div>
    </div>
  );
};
const SpottableComponent = Spottable(Main);
export default SpottableComponent;
