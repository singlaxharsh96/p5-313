import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const articles = [
  {
    id: 1,
    title: "Getting Started with React",
    description: "Understand components and JSX with a small example.",
    author: "Harsh",
    rating: "5",
    image: "/assets/react-card.svg"
  },
  {
    id: 2,
    title: "JavaScript Arrays Made Simple",
    description: "Learn how arrays can keep related items together.",
    author: "Alex",
    rating: "5",
    image: "/assets/array-card.svg"
  },
  {
    id: 3,
    title: "Planning a Web Page",
    description: "A few easy ideas for making pages clear and usable.",
    author: "Sam",
    rating: "4.9",
    image: "/assets/design-card.svg"
  }
];

const tutorials = [
  {
    id: 1,
    title: "Create Your First Component",
    description: "Split a page into small, reusable React pieces.",
    author: "Harsh",
    rating: "5",
    image: "/assets/component-card.svg"
  },
  {
    id: 2,
    title: "Use State in React",
    description: "Update what appears on a page after a user action.",
    author: "Alex",
    rating: "5",
    image: "/assets/state-card.svg"
  },
  {
    id: 3,
    title: "Style with Tailwind",
    description: "Make a responsive layout using utility classes.",
    author: "Sam",
    rating: "4.9",
    image: "/assets/tailwind-card.svg"
  }
];

function ContentCards({ title, items, sectionId, buttonLabel }) {
  return (
    <section id={sectionId} className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <article key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <img src={item.image} alt={item.title} className="w-full h-44 object-cover bg-cyan-50" />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-6 mb-4">{item.description}</p>
              <p className="text-yellow-600 font-semibold">★ {item.rating} <span className="ml-2 text-gray-700">{item.author}</span></p>
            </div>
          </article>
        ))}
      </div>
      <div className="text-center mt-6">
        <button type="button" onClick={() => window.alert(`${buttonLabel} will be added in a future task.`)} className="rounded-full bg-gray-200 px-5 py-2 text-sm hover:bg-gray-300">
          See all {buttonLabel.toLowerCase()}
        </button>
      </div>
    </section>
  );
}

function Subscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    const cleanEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    if (!emailPattern.test(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setIsSending(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail })
      });

      // The original Express server responds with JSON for both success and failure.
      const result = await response.json();

      if (response.ok && result.success) {
        setMessage(`${result.message} (HTTP ${response.status})`);
        setMessageType("success");
        setEmail("");
      } else {
        setMessage(result.message || `Request failed (HTTP ${response.status}). Please try again.`);
        setMessageType("error");
      }
    } catch (error) {
      console.error("Newsletter request failed:", error);
      setMessage("Could not connect to the newsletter server. Make sure the backend is running on port 3000.");
      setMessageType("error");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="newsletter" className="max-w-6xl mx-auto px-6 py-8">
      <div className="bg-gray-900 rounded-lg px-6 py-9 text-white text-center">
        <h2 className="text-2xl font-bold">SIGN UP FOR OUR DAILY INSIDER</h2>
        <p className="text-gray-300 mt-2">Subscribe to receive updates from DEV@Deakin.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full sm:w-96 rounded px-4 py-3 text-gray-900"
            required
          />
          <button
            type="submit"
            disabled={isSending}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-white rounded px-6 py-3 font-semibold"
          >
            {isSending ? "Sending..." : "Subscribe"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 rounded p-3 text-sm ${messageType === "success" ? "bg-green-900 text-green-100" : "bg-red-900 text-red-100"}`}
            role={messageType === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-cyan-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 text-center">
          <p className="uppercase tracking-widest text-cyan-100 text-sm mb-3">Learn · Build · Share</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to DEV@Deakin</h1>
          <p className="text-lg max-w-2xl mx-auto text-cyan-50">A place to explore programming articles, tutorials and student projects.</p>
          {user && <p className="mt-5 bg-white/15 inline-block rounded-full px-4 py-2">Welcome back, {user.displayName || user.email}!</p>}
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 pt-10">
        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-3">About Me</h2>
          <p className="text-gray-600 leading-7">Hello, my name is Harsh. I am a university student interested in programming, web development and technology. This website is built with React and Tailwind CSS and now includes login and registration pages.</p>
        </div>
      </section>

      <ContentCards title="Featured Articles" items={articles} sectionId="articles" buttonLabel="Articles" />
      <ContentCards title="Featured Tutorials" items={tutorials} sectionId="tutorials" buttonLabel="Tutorials" />
      <Subscribe />
    </>
  );
}
