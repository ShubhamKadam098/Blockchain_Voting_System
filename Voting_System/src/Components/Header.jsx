import Logo from "../Assets/Logo.png";
import accountlogo from "../Assets/accountlogo.png";

export default function Header(props) {
  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="left">
            <img id="logoImg" src={Logo} alt="Logo" />
            <h1 id="logoHeading">Indian Elections 2024</h1>
          </div>
          <div className="right">
            <h3 id="aadharNumber">{props.accountNumber}</h3>
            <div className="candidateInfo">
              <img id="candidateImg" src={accountlogo} alt="Img" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
