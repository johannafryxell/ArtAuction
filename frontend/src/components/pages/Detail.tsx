import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Detail() {
  const [id, setId] = useState(useParams().id);

  //Söker igenom alla bokningar i databasen efter bokningen med rätt id
  useEffect(() => {
    axios.get("http://localhost:3001/art/getsingleauction?id=" + id).then((res) => {
      if (res.data === "error") {
        console.log(res.data);
      } else {
        console.log(res.data);
      }
    });
  }, []);

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <>
      <h1>Detail</h1>
    </>
  );
}
