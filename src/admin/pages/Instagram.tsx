import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Plus, Trash2, ExternalLink, Instagram as InstaIcon } from "lucide-react";

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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <InstaIcon className="w-8 h-8 text-bloom-chocolate" />
          <h1 className="text-4xl font-serif text-foreground">
            Instagram Management
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Manage Instagram posts shown on the homepage.
        </p>
      </motion.div>

      {/* Add Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-xl bg-card p-6 shadow-soft border border-border/50"
      >
        <h2 className="text-xl font-serif font-medium mb-4">Add New Post</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Instagram post or reel URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addPost}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50 shadow-soft"
          >
            <Plus className="w-4 h-4" />
            {loading ? "Adding..." : "Add Post"}
          </motion.button>
        </div>
      </motion.div>

      {/* List Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-serif font-medium mb-4">
          Current Posts ({posts.length})
        </h2>
        <div className="space-y-3">
          {posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground"
            >
              <InstaIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No Instagram posts added yet.</p>
            </motion.div>
          )}

          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-xl bg-card p-4 shadow-soft border border-border/50 flex items-center justify-between group hover:shadow-medium transition-all"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-primary/80 flex items-center gap-2 flex-1 break-all group-hover:underline transition"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{post.url}</span>
                </a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deletePost(post.id)}
                  className="ml-4 p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition shadow-soft"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Instagram;
