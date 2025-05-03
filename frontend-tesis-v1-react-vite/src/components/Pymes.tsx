import { useEffect, useState, useTransition } from "react";
import { fetchpymes } from "../api";
import { PymesArray } from "../schemas/pymes";

const Pymes = () => {
  const [isPending, startTransition] = useTransition();
  const [pymes, setPymes] = useState<PymesArray>([]);

  useEffect(() => {
    fetchpymes().then((data) => {
      startTransition(() => {
        setPymes(data);
      });
    });
  }, []);

  return (
    <>
      {(isPending || pymes.length === 0) && <p>Loading...</p>}
      {pymes.length > 0 && (
        <ul>
          {pymes.map((pyme) => (
            <li key={pyme.id}>
              <h2>{pyme.name}</h2>
              <p>{pyme.description}</p>
              <p>{pyme.location}</p>
              <p>{pyme.phone}</p>
              <p>{pyme.email}</p>
              <p>{pyme.qualification}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pymes;
