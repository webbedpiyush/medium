import Auth from "../components/Auth";
import Quote from "../components/Quote";

export default function SignIn() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Auth type="signin" />
      </div>
      <div className="md:block hidden">
        <Quote />
      </div>
    </div>
  );
}
