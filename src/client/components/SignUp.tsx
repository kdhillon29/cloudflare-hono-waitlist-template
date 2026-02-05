import { Loader2, Mail } from "lucide-react";
import { type AppType } from "../../server";
import { hc, type InferResponseType } from "hono/client";
import { useState } from "react";
import Success from "./Success";
import { z } from "zod";
import SubscriberCount from "./SubscriberCount";

const client = hc<AppType>("/");
type SubscribeResponse = InferResponseType<typeof client.api.subscribe.$post>;

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(true);

  async function handleSubscribe() {
    const emailSchema = z.email();
    const parseResult = emailSchema.safeParse(email);
    if (!parseResult.success) {
      setIsValid(false);
      return;
    }

    setLoading(true);
    const response = await client.api.subscribe.$post({ json: { email } });

    const data = await response.json();
    if (data.error) {
      console.log("Error subscribing:", data.error);
      setIsError(true);
    } else {
      setIsSuccess(true);
    }
    console.log(data);
    setLoading(false);
    setEmail("");
  }

  return !isSuccess && !isError ? (
    <div className="max-w-md text-center">
      <SubscriberCount />
      <div className="join">
        <div>
          <label className="input validator join-item">
            <Mail className="text-neutral-content" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValid(true);
              }}
              placeholder="mail@site.com"
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          <p className="text-error">
            {!isValid ? "Please enter a valid email address." : ""}
          </p>
        </div>
        <button
          onClick={handleSubscribe}
          className="btn btn-neutral join-item"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Join"}
        </button>
      </div>

      <p className="text-accent dark:text-accent mt-1 text-center text-sm font-semibold">
        Subscribe for more updates and special discounts!
      </p>
    </div>
  ) : (
    <Success
      error={
        isError
          ? "Subscription failed. Email may already be subscribed."
          : undefined
      }
      onClose={() => {
        setIsSuccess(false);
        setIsError(false);
      }}
    />
  );
};

export default Signup;
