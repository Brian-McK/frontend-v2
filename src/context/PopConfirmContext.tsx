import React, { useState, useContext, createContext } from "react";

type PopconfirmContextType = {
  open: boolean;
  confirmLoading: boolean;
  showPopconfirm: () => void;
  handleOk: () => void;
  handleCancel: () => void;
};

const PopconfirmContext = createContext<PopconfirmContextType | undefined>(
  undefined
);

export const usePopconfirmContext = () => {
  const context = useContext(PopconfirmContext);
  if (!context) {
    throw new Error(
      "usePopconfirmContext must be used within a PopconfirmProvider"
    );
  }
  return context;
};

type PopconfirmProviderProps = {
  children: React.ReactNode;
};

export const PopconfirmProvider: React.FC<PopconfirmProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const contextValue: PopconfirmContextType = {
    open,
    confirmLoading,
    showPopconfirm,
    handleOk,
    handleCancel,
  };

  return (
    <PopconfirmContext.Provider value={contextValue}>
      {children}
    </PopconfirmContext.Provider>
  );
};
