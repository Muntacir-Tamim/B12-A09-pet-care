import axios from "axios";
import { useEffect, useState } from "react";

const useService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios("/appData.json")
      .then((data) => {
        setServices(data.data);
      })
      .catch((err) => {
        console.error("Data fetch error:", err);

        setError("Failed to load services data. Check network and JSON path.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
};

export default useService;
