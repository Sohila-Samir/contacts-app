import { useState } from "react";

const useDetectCapsLockState = () => {
  const [capsLockState, setCapsLockState] = useState("");

  const handleCapsLockState = (e) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLockState("capsLock is on");
    } else {
      setCapsLockState("");
    }
  };

  const CapsLockDetect = capsLockState ? (
    <p className="capsLock-detect-msg">CapsLock is On</p>
  ) : (
    ""
  );

  return [handleCapsLockState, CapsLockDetect];
};

export default useDetectCapsLockState;
