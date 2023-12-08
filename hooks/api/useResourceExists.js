import { useEffect, useState } from "react";

const resourceExists = async (url) => {
  try {
    const response = await fetch(url?.href, { cache: "no-cache", method: "HEAD" });
    return response.status === 200;
  } catch (err) {
    console.log({ err });
    console.error(err?.stack);
    return false;
  }
};

export const useResourceExists = (url) => {
  const [data, setData] = useState([false, url]);

  useEffect(() => {
    (async () => {
      if (url === null) setData[(false, url)];
      else {
        const exists = await resourceExists(url);
        setData([exists, url]);
      }
    })();
  }, [url?.href]);

  return data;
};
