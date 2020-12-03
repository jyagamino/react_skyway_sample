import React, { useEffect, useContext, useRef, useState } from "react";
// import { useHistory } from "react-router";
import { PeerContext } from "../App";

export default function AppsPage() {
  const peer = useContext(PeerContext);
  // const history = useHistory();

  // PeerID
  const [myId, setMyId] = useState("");
  const [callId, setCallId] = useState("");
  // Video DOM
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  // Call Flag
  const [isCalling, setIsCalling] = useState(true);

  const [mediaConnectionState, setMediaConnectionState] = useState(null);

  useEffect(() => {
    // カメラ映像取得
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(localStream => {
        localVideo.current.srcObject = localStream;
      })
      .catch(error => {
        // 失敗時にはエラーログを出力
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
      console.log("");
  })

  // PeerIDの取得
  peer.on('open', () => {
    setMyId(peer.id);
  });

  // 着信処理
  peer.on('call', mediaConnection => {
    setMediaConnectionState(mediaConnection);
    mediaConnection.answer(localVideo.current.srcObject);

    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream
      setIsCalling(false);
    });

    mediaConnection.once('close', () => {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
    });
  });

  const handleClickCall = () => {
    peer.listAllPeers(peers => {
      let isExistsPeer = false;
      isExistsPeer = peers.some(peer => peer === callId);

      if (isExistsPeer) {
        const mediaConnection = peer.call(callId, localVideo.current.srcObject);
        setMediaConnectionState(mediaConnection);
  
        mediaConnection.on('stream', async stream => {
          remoteVideo.current.srcObject = stream;
          await remoteVideo.current
            .play()
            .catch(error => {
              // 失敗時にはエラーログを出力
              console.error(error);
              return;
            });
          setIsCalling(false);
        });
  
        mediaConnection.once('close', () => {
          remoteVideo.srcObject.getTracks().forEach(track => track.stop());
          remoteVideo.srcObject = null;
        });
      }
    });
  };

  const handleClickEndCall = () => {
    mediaConnectionState.close(true);
  };

  return (
    <>
      <h2>AppsPage</h2>
      <div>
        <video autoPlay muted playinline="true" ref={localVideo}></video>
        <p>ID: {myId}</p>
        <label htmlFor="callId">
          発信先:
          <input
            id="callId" 
            type="text" 
            value={callId}
            onChange={e => setCallId(e.target.value)}
          />
        </label>
        <button disabled={callId.length <= 0} onClick={handleClickCall}>Call</button>
        <video autoPlay muted playinline="true" ref={remoteVideo}></video>
      </div>
      {/* <div style={{ display: isCalling ? 'block' : 'none' }}>
        <video autoPlay muted playinline="true" ref={localVideo}></video>
        <p>ID: {myId}</p>
        <label htmlFor="callId">
          発信先:
          <input
            id="callId" 
            type="text" 
            value={callId}
            onChange={e => setCallId(e.target.value)}
          />
        </label>
        <button disabled={callId.length <= 0} onClick={handleClickCall}>Call</button>
      </div>
      <div style={{ display: !isCalling ? 'block' : 'none' }}>
        <video autoPlay muted playinline="true" ref={localVideo}></video>
        <p>VS</p>
        <video autoPlay muted playinline="true" ref={remoteVideo}></video>
        <button onClick={handleClickEndCall}>End Call</button>
      </div> */}
    </>
  );

}
