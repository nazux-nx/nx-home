import Explainer from "./explainer";

export default function HomePage() {
  return (
    <main>
      <h1 className="logo">
        <svg className="mark" viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="15" fill="#d3d6db" />
          <g fill="#172647">
            <polygon points="14.6,17.2 26.4,16.4 27.1,48.8 15.2,49.6" />
            <polygon points="38.2,15.6 50.4,16.6 51.1,48.2 39.1,47.4" />
            <polygon points="20.2,18.8 31.2,17.4 49.4,46.6 38.4,48.4" />
          </g>
        </svg>
        <span className="wordmark">nazux</span>
      </h1>
      <p className="lede">
        Plain explainers for remote workers who want a calmer home office.
      </p>
      <Explainer />
      <p className="channel">
        <a href="https://www.youtube.com/@Nazux-n5e">Watch on YouTube</a>
      </p>
    </main>
  );
}
