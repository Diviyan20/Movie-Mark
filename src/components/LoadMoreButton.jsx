import "../css/LoadMoreButton.css";

function LoadMoreButton({ onClick, disabled, loading, text = "Load More" }) {
  return (
    <div className="load-button-container">
      <button
        className="load-button"
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? "Loading..." : text}
      </button>
    </div>
  );
}

export default LoadMoreButton;
