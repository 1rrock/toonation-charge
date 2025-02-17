import React from "react";

interface buttonProps {
  btnText: string;
  setIsChangeCacheModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface menuButtonProps {
  btnText: string;
  mode: string;
  setChargeMode: React.Dispatch<React.SetStateAction<string>>;
  chargeMode: string;
}

interface blindTextProps {
  blindText: string;
}

interface alignCenterBtn {
  isDisable?: boolean;
  btnText?: string;
  btnText2?: string;
  size?: string;
  isPlus?: boolean;
  ico?: string;
  color?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface textProps {
  txt?: string;
  size?: string;
  color?: string;
}

export type {
  menuButtonProps,
  buttonProps,
  blindTextProps,
  alignCenterBtn,
  textProps,
}