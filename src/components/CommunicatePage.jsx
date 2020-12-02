import React from "react";
import { useHistory } from "react-router";

export default function CommunicatePage() {
  const history = useHistory();

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
