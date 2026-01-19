import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";

const ErrorPage = () => {
  return (
    <section className="py-[9rem] text-center">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <div>
          <h2 className="text-[10rem] font-bold">404</h2>
          <h3 className="text-[4.2rem] font-bold">UH OH! You are lost.</h3>
          <p className="my-[2rem] text-[1.6rem]">
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>

          <NavLink to="/">
            <Button>Go Back to Home</Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
