import RegisterForm from "@/components/auth/RegisterForm";
import api from "@/lib/api";
export default function RegisterPage() {
  const handleRegister =
  async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

      /*
      SAVE TOKEN
      */
      localStorage.setItem(
        "token",
        response.data.token
      );

      /*
      SAVE USER
      */
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      /*
      REDIRECT
      */
      router.push(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response.data.message
      );

    }

  };
  return <RegisterForm />;
}