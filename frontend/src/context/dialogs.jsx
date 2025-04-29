import { createContext, useState } from "react";

const DialogsContext = createContext();

function DialogsProvider({ children }) {
    const [dialog, setDialog] = useState({ activeDialog: "" });

    const openDialog = (key) =>
        setDialog((item) => ({ ...item, activeDialog: key }));
    const closeDialog = (key) =>
        setDialog((item) => ({ ...item, activeDialog: "" }));
    const shareContent = { dialog, openDialog, closeDialog };
    return (
        <DialogsContext.Provider value={shareContent}>
            {children}
        </DialogsContext.Provider>
    );
}

export { DialogsProvider };
export default DialogsContext;
