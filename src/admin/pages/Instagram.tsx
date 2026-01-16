import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type InstaPost = {
  id: string;
  url: string;
};

const Instagram = () => {
  const [url, setUrl] = useState("");
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const q = query(
      collection(db, "instagramPosts"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
    }));

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async () => {
    if (!url.trim()) return;

    setLoading(true);
    await addDoc(collection(db, "instagramPosts"), {
      url: url.trim(),
      createdAt: serverTimestamp(),
    });

    setUrl("");
    setLoading(false);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "instagramPosts", id));
    fetchPosts();
  };

  return (
    <div className="admin-page admin-instagram">
      <h1>Instagram</h1>
      <p className="admin-description">
        Manage Instagram posts shown on the homepage.
      </p>

      {/* Add Post */}
      <div className="instagram-add">
        <input
          type="text"
          placeholder="Instagram post or reel URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addPost} disabled={loading}>
          {loading ? "Adding..." : "Add Post"}
        </button>
      </div>

      {/* List Posts */}
      <div className="instagram-list">
        {posts.length === 0 && (
          <p className="admin-description">No Instagram posts added yet.</p>
        )}

        {posts.map((post) => (
          <div key={post.id} className="instagram-item">
            <a href={post.url} target="_blank" rel="noreferrer">
              {post.url}
            </a>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instagram;
