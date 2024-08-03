import { CloseApp, Minimize } from "../../wailsjs/go/main/App";

const AppBar = () => {
  const handleMinimize = async () => {
    await Minimize();
  };
  const handleQuit = async () => {
    await CloseApp();
  };
  return (
    <div className="appBar">
      <div className="ab-left">
        <div className="ab-ttl">Godo</div>
      </div>
      <div className="ab-right">
        <button className="window-action-btn" onClick={handleMinimize}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#000000"
            fill="none"
          >
            <path
              d="M20 12L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="window-action-btn" onClick={handleQuit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#000000"
            fill="none"
          >
            <path
              d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppBar;
