import React from "react";

interface WazeMapProps {
  userLat: number;
  userLon: number;
}

export default function WazeMap(props: WazeMapProps) {
  return (
    <iframe
      id="wazeMap"
      src={`https://embed.waze.com/iframe?zoom=14&lat=${props.userLat}&lon=${props.userLon}`}
      width={"100%"}
      height={"100%"}
    ></iframe>
  );
}
