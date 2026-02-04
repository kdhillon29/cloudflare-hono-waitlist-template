import { useEffect, useState } from "react";
import { type AppType } from "../../server";
import { hc, type InferResponseType } from "hono/client";

const client = hc<AppType>("/");
type HealthResponse = InferResponseType<typeof client.api.health.$get>;
export const ServerStatus = () => {
  const [status, setStatus] = useState<HealthResponse | string>("Loading...");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await client.api.health.$get();
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        setStatus("Error fetching server status");
      }
    };

    fetchStatus();
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
