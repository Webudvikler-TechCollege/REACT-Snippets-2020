import { useRef, useEffect, useMemo } from "react";

import { useLocation } from "react-router-dom";

// Hent parametre
export default function useURLSearchParams(...keys) {
  const searchParams = new URLSearchParams(useLocation().search);

  const cachedKeys = useRef(keys);

  useEffect(() => {
    cachedKeys.current = keys;
  }, [keys, cachedKeys]);

  return useMemo(() => {
    const returnObj = {};
    if (!cachedKeys.current || cachedKeys.current?.length === 0) {
      searchParams.forEach((value, key) => {
        returnObj[key] = value;
      });
    } else {
      cachedKeys.current.forEach((key) => {
        returnObj[key] = searchParams.get(key);
      });
    }
    return returnObj;
  }, [searchParams, cachedKeys]);
}
