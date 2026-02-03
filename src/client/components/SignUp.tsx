import { Mail } from "lucide-react";
import Countdown from "./Countdown";

export const Signup = () => {
  return (
    <div className="max-w-md text-center">
      <div className="join">
        <div>
          <label className="input validator join-item">
            <Mail className="text-neutral-content" />
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        <button className="btn btn-neutral join-item">Join</button>
      </div>

      <p className="text-accent-700 dark:text-accent mt-3 text-center text-sm font-semibold">
        Subscribe for more updates and special discounts!
      </p>
    </div>
  );
};

export default Signup;
