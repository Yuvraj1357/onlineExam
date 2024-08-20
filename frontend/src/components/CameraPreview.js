import React, { useState, useEffect, useRef } from 'react';
import { useNavigate} from 'react-router-dom';

const CameraMicTest = () => {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [micAccess, setMicAccess] = useState(false);
  const [permissionsChecked, setPermissionsChecked] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermissions = async () => {
      let cameraStream = null;
      let micStream = null;

      try {
        // Request access to camera
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraAccess(true);
        if (videoRef.current) {
          videoRef.current.srcObject = cameraStream;
        }
      } catch (error) {
        console.error('Camera access denied:', error);
        setCameraAccess(false);
      }

      try {
        // Request access to microphone
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicAccess(true);
        micStream.getTracks().forEach(track => track.stop()); // Stop the microphone stream
      } catch (error) {
        console.error('Microphone access denied:', error);
        setMicAccess(false);
      }

      // Stop the camera stream when component unmounts
      return () => {
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
        }
      };
    };


    checkPermissions().finally(() => setPermissionsChecked(true));
  }, []);
  const clickHandle=()=>{
      navigate('/test')
  }
  const canStartTest = cameraAccess && micAccess;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Camera and Microphone Test</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Camera Access:
          {cameraAccess ? (
            <span style={{ color: 'green', marginLeft: '10px' }}>✔</span>
          ) : (
            <span style={{ color: 'red', marginLeft: '10px' }}>✘</span>
          )}
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Microphone Access:
          {micAccess ? (
            <span style={{ color: 'green', marginLeft: '10px' }}>✔</span>
          ) : (
            <span style={{ color: 'red', marginLeft: '10px' }}>✘</span>
          )}
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <video ref={videoRef} autoPlay playsInline style={{ width: '320px', height: '240px', border: '1px solid #ccc', borderRadius: '8px' }} />
      </div>
      <button disabled={!canStartTest} style={{ marginTop: '20px' }} onClick={clickHandle}>
        Start Test
      </button>
    </div>
  );
};

export default CameraMicTest;
