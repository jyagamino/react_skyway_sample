import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { PeerContext } from "../App";

export default function TopPage() {
  const peer = useContext(PeerContext);
  const history = useHistory();
  // 自分のPeerID
  const [myId, setMyId] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    // PeerIDの取得
    peer.on('open', () => {
      setMyId(peer.id);
    });
  }, []);


  // TODO: 発信して成功したらCommunicatePageへ遷移し、失敗したらFailedPageへ遷移
  const handleClickCalling = () => {
    setIsCalling(true);
  };

  /**
   * 呼び出しを終了する
   */
  const handleClickEndCall = () => {
    peer.destroy();
    setIsCalling(false);
  }

  if (isCalling) {
    return (
      <>
        <h2>CallingPage</h2>
        <p>発信中です...</p>
        <button onClick={handleClickEndCall}>End call</button>
      </>
    );
  } else {
    return (
    <>
      <h2>TopPage</h2>
      <button onClick={handleClickCalling}>Call</button>
    </>
  );
  }

  
}
