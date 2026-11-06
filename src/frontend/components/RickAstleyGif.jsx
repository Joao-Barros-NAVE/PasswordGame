import { useEffect } from "react";

function RickAstleyGif() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://tenor.com/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="tenor-gif-embed"
      data-postid="25137171"
      data-share-method="host"
      data-aspect-ratio="1"
      data-width="100%"
    >
      <a href="https://tenor.com/view/rick-astley-rick-roll-rick-rolled-roll-rick-gif-25137171">
      </a>
    </div>
  );
}

export default RickAstleyGif