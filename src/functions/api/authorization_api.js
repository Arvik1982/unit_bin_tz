import { host } from "./host";

export default async function authorization_api() {
  const response = await fetch(`${host}/auth/login`,

    {
      method: "POST",
      body: JSON.stringify({
        login: "admin",
        password: "admin",
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("authorization error");
  }

  const newData = await response.json();

  localStorage.setItem("user_token", newData.access_token);
}
