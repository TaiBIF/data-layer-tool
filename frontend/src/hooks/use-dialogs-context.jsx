import { useContext } from "react";
import DialogsContext from "../context/dialogs";

function useDialogsContext() {
    return useContext(DialogsContext);
}

export default useDialogsContext;
