import React, { useState } from 'react';
import { Orbis } from "@orbisclub/orbis-sdk";

const orbis = new Orbis({}); // Instantiate Orbis outside the component

export default function HomePage() {
  const [user, setUser] = useState(null);

  const connect = async () => {
    const res = await orbis.connect_v2({
      provider: window.ethereum,
      chain: 'ethereum',
      lit: false,
    });

    if (res.status === 200) {
      setUser(res.did);
    } else {
      console.log("Error connecting to Orbis: ", res);
      alert("Error connecting to Orbis.");
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <p>Connected with: {user}</p>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </div>
  );
}
