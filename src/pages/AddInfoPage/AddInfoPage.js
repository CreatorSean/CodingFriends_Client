import styles from "./AddInfoPage.module.css";

import Baby from "../../assets/AddInfoIcons/baby.png";
import Boy from "../../assets/AddInfoIcons/boy.png";
import Adult from "../../assets/AddInfoIcons/adult.png";
import Grand from "../../assets/AddInfoIcons/grand.png";

import Unknown from "../../assets/AddInfoIcons/unknown.png";
import CPlus from "../../assets/AddInfoIcons/c++.png";

import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

const AddInfoPage = () => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  //   const history = useHistory();

  const handleNextPage = () => {
    // 다음 페이지로 이동하는 동작 구현
    // history.push("/next-page");
  };

  const handleSkillSelect = (skill) => {
    if (selectedSkill.includes(skill)) {
      // 이미 선택된 스킬인 경우 선택 해제
      setSelectedSkill(selectedSkill.filter((ski) => ski !== skill));
    } else {
      // 새로운 스킬을 선택한 경우 추가
      setSelectedSkill([...selectedSkill, skill]);
    }
  };

  const handleLanguageSelect = (language) => {
    if (selectedLanguages.includes(language)) {
      // 이미 선택된 언어인 경우 선택 해제
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      // 새로운 언어를 선택한 경우 추가
      setSelectedLanguages([...selectedLanguages, language]);
    }

    handleSubmit(); // 버튼 클릭 시 바로 서버로 데이터 전송
  };

  const handleSubmit = () => {
    // 서버로 데이터 전송
    const data = {
      skill: selectedSkill,
      languages: selectedLanguages,
    };

    //"/api/submit-data" 실제 백엔드 API URL에 맞게 수정되어야 한다.
    fetch("/api/submit-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.href = "/next-page";
      })
      .catch((error) => console.error("Error:", error));
  };

  const skill = [
    {
      name: "입문자",
      image: Baby,
    },
    {
      name: "초보자",
      image: Boy,
    },
    {
      name: "중급자",
      image: Adult,
    },
    {
      name: "상급자",
      image: Grand,
    },
  ];

  const languages = [
    {
      name: "선택없음",
      image: Unknown,
    },
    {
      name: "C++",
      image: CPlus,
    },
  ];

  return (
    <>
      <section className={styles.ability_section}>
        <div className={styles.container}>
          <div className={styles.content1}>
            <h1 className={styles.title}>자신의 실력을 선택하세요</h1>
            <div className={styles.ability}>
              <button
                className={styles.button}
                onClick={() => handleSkillSelect("입문자")}
              >
                <img className={styles.image} src={Baby} alt="입문자" />
                <span>입문자</span>
              </button>
              <button
                className={styles.button}
                onClick={() => handleSkillSelect("초보자")}
              >
                <img className={styles.image} src={Boy} alt="초보자" />
                <span>초보자</span>
              </button>
              <button
                className={styles.button}
                onClick={() => handleSkillSelect("중급자")}
              >
                <img className={styles.image} src={Adult} alt="중급자" />
                <span>중급자</span>
              </button>
              <button
                className={styles.button}
                onClick={() => handleSkillSelect("상급자")}
              >
                <img className={styles.image} src={Grand} alt="상급자" />
                <span>상급자</span>
              </button>
            </div>
          </div>

          {selectedSkill && (
            <>
              {/* 선택된 실력과 관련된 내용 표시 */}
              {/* 추가적인 로직 구현 */}
              {/* 예시로 다음 페이지로 이동하는 링크를 제공합니다 */}
              <a href="/next-page">다음 페이지로 이동</a>
            </>
          )}
        </div>
      </section>
      <section className={styles.language_section}>
        <div className={styles.container}>
          <div className={styles.content2}>
            {/* 프로그래밍 언어 선택 부분 */}
            <h2 className={styles.title}>배우고 싶은 언어를 선택하세요</h2>
            <div className={styles.grid}>
              {languages.map((language) => (
                <button
                  key={language.name}
                  className={`${styles.button} ${
                    selectedLanguages.includes(language.name)
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => handleLanguageSelect(language.name)}
                >
                  <img src={language.image} alt={language.name} />
                  <span>{language.name}</span>
                </button>
              ))}
            </div>

            {/* 선택된 언어 목록 표시 */}
            {selectedLanguages.length > 0 && (
              <>
                <h3>선택한 언어:</h3>
                <ul>
                  {selectedLanguages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>

                {/* 추가 정보 입력 등의 로직 구현 */}
              </>
            )}
            {/* 다음 페이지로 이동하는 링크 제공 */}
            {/* 예시로 다음 페이지 경로는 "/additional-info" */}
            {/* <a href="/additional-info">다음 페이지로 이동</a> */}
          </div>
        </div>
      </section>
      <div className={styles.nextButtonContainer}>
        <button className={styles.nextButton} onClick={handleNextPage}>
          다음
        </button>
      </div>
    </>
  );
};

export default AddInfoPage;
