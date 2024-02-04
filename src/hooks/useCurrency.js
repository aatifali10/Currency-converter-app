import { useState, useEffect } from "react";
import axios from "axios";

const UseCurrency = (currency) => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
      )
      .then((res) => setData(res[currency]));
    console.log(data);
  }, [currency]);

  console.log(data);
  return data;
};

export default UseCurrency;
