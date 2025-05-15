
import { useEffect, useState } from "react";
import "../Loader.css";

const Loader = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        setHide(true);
      }, 300);
    });
  }, []);

  return (
    <div className={`gif ${hide ? "vanish" : ""}`}>
      <img
        src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif"
      />
    </div>
  );
};

export default Loader;
