import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate("/SignIn");
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-4 md:flex-row">
      <button
        onClick={goToSignIn}
        className="w-full px-6 py-3 text-lg font-semibold text-white transition bg-blue-500 rounded-lg shadow md:w-auto hover:bg-blue-600"
      >
        Sign In
      </button>
      <button
        onClick={goToSignUp}
        className="w-full px-6 py-3 text-lg font-semibold text-white transition bg-green-500 rounded-lg shadow md:w-auto hover:bg-green-600"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Home;
