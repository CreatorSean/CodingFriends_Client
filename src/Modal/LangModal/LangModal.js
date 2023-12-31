//css
import Lang from "./LangModal.module.css";
//library
import React, { useState } from "react";

const LangModal = ({ isOpen, onClose }) => {
  const languages = [
    "상관없음",
    "C",
    "C++",
    "Dart",
    "Django",
    "Go",
    "Java",
    "JavaScript",
    "Kotlin",
    "Python",
    "R",
    "React",
    "Ruby",
    "Spring-Boot",
    "SQL",
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageClick = (language) => {
    if (onClose && typeof onClose === "function") {
      setSelectedLanguage(language); // 선택한 언어 설정
      onClose(language); // 모달 창 닫기
    }
  };

  return (
    <div className={Lang.HomeSub}>
      <h2 className={Lang.HomeLangTitle}>학습 언어</h2>
      <span className={Lang.HomeLangDesc}>
        요약을 원하는 언어를 선택해 주세요
      </span>
      <ul className={Lang.LangList}>
        {languages.map((language, index) => (
          <li key={index}>
            <button
              className={Lang.HomeLangBtn}
              onClick={() => {
                handleLanguageClick(language);
              }}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LangModal;
