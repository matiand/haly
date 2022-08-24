import { Toaster as ToasterInner } from "react-hot-toast";

function Toaster() {
    return <ToasterInner position="bottom-center" toastOptions={{ style: { lineHeight: "1.4" } }} />;
}

export default Toaster;
