import { useEffect, useState } from "react";

export default function useFetch(url, method, header, body) {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();
  useEffect(() => {
    fetch(url, {
      method: method,
      header: header,
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }, []);
  return [data, errorStatus];
}
