export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__section footer__section--about">
          <div className="infoBox">
            <h3>About</h3>
            <div className="infoText">
              <span>History</span>
              <span>Mission</span>
            </div>
          </div>
        </div>
        <div className="footer__section footer__section--contact">
          <div className="infoBox">
            <h3>Contact and help</h3>
            <div className="infoText">
              <span>FAQ</span>
              <span>auction@arternative.com</span>
              <span>+02 003 004</span>
            </div>
          </div>
        </div>
        <div className="footer__section footer__section--information">
          <div className="infoBox">
            <h3>Information</h3>
            <div className="infoText">
              <span>How to buy</span>
              <span>Terms of service</span>
              <span>Integrity policy</span>
            </div>
          </div>
        </div>
        <div className="footer__section footer__section--socials">
          <div className="infoBox">
            <h3>Socials</h3>
            <div className="infoText">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
