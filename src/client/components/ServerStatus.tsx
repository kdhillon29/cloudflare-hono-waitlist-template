import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState("...loading");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  return (
    <div className="bg-info-content flex w-full justify-center rounded-md p-4 text-center">
      <p className="text-center text-green-500">
        {" "}
        <strong className="px-2">Server Status</strong>
        {status}
      </p>
    </div>
  );
};
