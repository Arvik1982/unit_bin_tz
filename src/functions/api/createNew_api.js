import { host } from "./host";

export default async function createNew_api(
  positionName,
  positionDescription,
  positionMeasurement,
  positionCode
) {
  const response = await fetch(
    ` ${host}/items`,

    {
      method: "POST",
      body: JSON.stringify({
        name: positionName,
        description: positionDescription,
        measurement_units: positionMeasurement,
        code: positionCode,
      }),
      headers: {
        Authorization: `${localStorage.getItem("user_token")}`,
        "content-type": "application/json",
      },
    }
  );
  if (response.status !== 201) {
    throw new Error("authorization error");
  }

  const newData = await response.json();

  console.log(newData);
}
