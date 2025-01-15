import Auth from "../components/Auth";
import Quote from "../components/Quote";

export default function SignUp() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <Auth type="signup" />
      </div>
      <div className="md:block hidden">
        <Quote />
      </div>
    </div>
  );
}
