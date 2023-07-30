export default function Navbar() {
  return (
    <>
      <header>
        <div className="container">
          <div id="navbar">
            <div id="left">
              <img
                src="./assets/fingerprint_5818822.png"
                alt="icon"
                id="webIcon"
              />
              <h1>Voting System</h1>
            </div>
            <div id="right">
              <div className="accountLogo">
                <img
                  src="./assets/accountLogo.svg"
                  alt="Account"
                  id="accountLogo"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
