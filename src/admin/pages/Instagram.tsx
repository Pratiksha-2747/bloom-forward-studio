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
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-foreground mb-2">Instagram</h1>
      <p className="text-muted-foreground mb-6">
        Manage Instagram posts shown on the homepage.
      </p>

      {/* Add Post */}
      <div className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Instagram post or reel URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
        />
        <button
          onClick={addPost}
          disabled={loading}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Post"}
        </button>
      </div>

      {/* List Posts */}
      <div className="space-y-3">
        {posts.length === 0 && (
          <p className="text-muted-foreground">No Instagram posts added yet.</p>
        )}

        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl bg-card p-4 shadow-soft flex items-center justify-between"
          >
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline flex-1 break-all"
            >
              {post.url}
            </a>
            <button
              onClick={() => deletePost(post.id)}
              className="ml-4 px-4 py-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition text-sm whitespace-nowrap"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instagram;
