import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { type AppType } from "../../server";
import { hc, type InferResponseType } from "hono/client";

const client = hc<AppType>("/");
type SubscriberCountResponse = InferResponseType<
  typeof client.api.subscribers.count.$get
>;

interface PeopleJoinedCardProps {
  avatars?: string[];
}
const SubscriberJoinedCard = ({ avatars = [] }: PeopleJoinedCardProps) => {
  const [count, setCount] = useState<SubscriberCountResponse>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await client.api.subscribers.count.$get();
        const data = await response.json();
        setCount(data);
      } catch (error) {
        setCount(0);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="bg-success/80 mx-auto mb-6 w-42 max-w-sm rounded-2xl border border-gray-100 p-1 shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <CountUp
          start={1}
          end={count}
          duration={3}
          className="text-info-content/60 text-xl font-bold"
        />
        {/* <p className="text-info-content/60 text-xl font-bold">{count}</p> */}
        <h3 className="text-sm font-medium text-gray-500"> people Joined</h3>
      </div>

      {/* Optional Avatars */}
      {avatars.length > 0 && (
        <div className="mt-4 flex items-center">
          <div className="flex -space-x-3">
            {avatars.slice(0, 4).map((avatar, i) => (
              <img
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white"
                src={avatar}
                alt="Member"
              />
            ))}
          </div>
          {count > 4 && (
            <span className="ml-3 text-xs text-gray-500">
              +{count - 4} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriberJoinedCard;
