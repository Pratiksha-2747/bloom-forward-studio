import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "./instagram.css";

const InstagramSection = () => {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "instagramPosts"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const urls = snapshot.docs.map((doc) => doc.data().url);
      setPosts(urls);
    };

    fetchPosts();
  }, []);

  return (
    <section className="insta-section">
      <h2>
        Let’s Connect on <span>Instagram</span>
      </h2>

      <div className="insta-grid">
        {posts.map((url, index) => (
          <div className="insta-box" key={index}>
            <iframe
              src={`${url}embed`}
              width="100%"
              height="480"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              allow="encrypted-media"
              title={`instagram-${index}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
