import React from "react";
import "./Footer.css";
import ReactLanguageSelect from 'react-languages-select';

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <span className="loginScreen__gray">Questions? Call </span>
            <span className="footer__link"><a className="footer__link" href="#">0850-390-7444</a></span>
            <h1 className="list-unstyled">
              <a className="footer__rowElements" href="#">FAQ</a>
              <a className="footer__rowElements" href="#">Help Center</a>
              <a className="footer__rowElements" href="#">Term of Use</a>
              <a className="footer__rowElementsLast" href="#">Privacy</a>
            </h1>
          </div>
          <div className="col">
            <h1 className="list-unstyled">
              <a className="footer__rowElementsSecondCol" href="#">Cookie Preferences</a>
              <a className="footer__rowElements" href="#">Corporate Information</a>
            </h1>
          </div>
          <div className="col">
            <div className="languageSelectStyle">
              <ReactLanguageSelect
              className="menu-languages"
              languages={["en", "tr"]}
              customLabels={{"en": "English", "tr": "Türkçe"}}
              defaultLanguage="en"
              placeholder="English"
              selectedSize={15}
              optionsSize={14}
              alignOptions="left"
              blacList={true}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;