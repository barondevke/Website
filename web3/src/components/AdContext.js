import { createContext, useContext } from "react";

const AdContext = createContext();

export const useAdContext = () => useContext(AdContext);
export default AdContext;
