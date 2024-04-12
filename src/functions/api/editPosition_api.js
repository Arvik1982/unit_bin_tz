import { host } from "./host";

export default async function editPosition_api(
  positionName,
  positionDescription,
  positionMeasurement,
  positionCode,
  id
) {
  
  const response = await fetch(
    ` ${host}/items/${id}`,

    {
      method: "PATCH",
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
  if (response.status !== 200) {
    throw new Error("authorization error");
  }

  const newData = await response.json();

  console.log(newData);
}
