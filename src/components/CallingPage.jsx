import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { PeerContext } from "../App";

export default function CallingPage(props) {
  const peer = useContext(PeerContext);
  const history = useHistory();
  // PeerId
  // props.location.state.myId

  useEffect(() => {

  }, []);

  const handleClickEndCall = () => {
    // TODO: 発信の終了
    history.push("/");
  }

  return (
    <>
      <h2>CallingPage</h2>
      <p>発信中です...</p>
      <button onClick={handleClickEndCall}>End call</button>
    </>
  );
}
