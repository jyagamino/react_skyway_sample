import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { PeerContext } from "../App";

export default function TopPage() {
  const peer = useContext(PeerContext);
  const history = useHistory();
  // 自分のPeerID
  const [myId, setMyId] = useState("");

  useEffect(() => {
    // PeerIDの取得
    peer.on('open', () => {
      setMyId(peer.id);
    });
  }, []);

  const handleClick = () => {
    history.push({
      pathname: "/calling",
      state: { myId }
    });
  };

  return (
    <>
      <h2>TopPage</h2>
      <button onClick={handleClick}>Call</button>
    </>
  );
}
