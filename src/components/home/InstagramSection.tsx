import { useEffect } from "react";
import "./instagram.css";

const posts = [
  "https://www.instagram.com/reel/DAIZhUtBJ6k/",
  "https://www.instagram.com/p/DAbF6nGBjLr/",
  "https://www.instagram.com/reel/C_5noGJNHYW/",
  "https://www.instagram.com/reel/C-1iy1QSxzt/",
  "https://www.instagram.com/reel/C7D2uM-NoBZ/",
  "https://www.instagram.com/p/C3PxAIoB7zL/",
];

const InstagramSection = () => {
  useEffect(() => {
    if (!(window as any).instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="insta-section">
      <h2>
        Let’s Connect on <span>Instagram</span>
      </h2>

      <div className="insta-grid">
        {posts.map((url, index) => (
          <div className="insta-box" key={index}>
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
