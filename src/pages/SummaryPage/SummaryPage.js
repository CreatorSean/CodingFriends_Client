import styles from "./SummaryPage.module.css";
import Back from "../../assets/AddInfoIcons/back.png";
import Copy from "../../assets/AddInfoIcons/Copy.png";
import Becareful from "../../assets/AddInfoIcons/Becareful.png";

import Star from "../../assets/icons/clip.png";
import FillStar from "../../assets/AddInfoIcons/FillStar.png";

import React from "react";
import axios from "axios";
import Bottom from "../../component/Bottom/Bottom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicCodeBlock from "../../component/DynamicCodeBlock/DynamicCodeBlock";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//modal
import SelectModal from "../../Modal/SelectModal/SelectModal";
import LangModal from "../../Modal/LangModal/LangModal";
import SubModal from "../../Modal/Subject/Subject";

const SummaryPage = () => {
  axios.defaults.withCredentials = true;

  const [isModalOpen, sestIsModalOpen] = useState(false);
  const openModal = () => sestIsModalOpen(true);
  const closeModal = () => sestIsModalOpen(false);

  //학습 언어
  const [isModalOpen1, sestIsModalOpen1] = useState(false);
  const openModal1 = () => sestIsModalOpen1(true);
  const closeModal1 = () => sestIsModalOpen1(false);

  //주제
  const [isModalOpen2, sestIsModalOpen2] = useState(false);
  const openModal2 = () => sestIsModalOpen2(true);
  const closeModal2 = () => sestIsModalOpen2(false);

  //주제와 언어
  const [question, setQuestion] = useState(null);
  const [language, setLanguage] = useState(null);
  const [file, setFile] = useState(null);

  //내용과 코드
  const [data, setData] = useState(null);

  const [scrapId, setScrapId] = useState(null);
  const [scrapCheck, setScrapCheck] = useState(0);
  const [isScrappedChange, setIsScrappedChange] = useState("NO");

  const sendDataHandle = async () => {
    closeModal();
    const formData = new FormData();

    formData.append("imageFile", file);
    formData.append("question", question);
    formData.append("fav_language", language);
    console.log("file: ", file);
    console.log("question: ", question);
    console.log("language: ", language);

    const accessToken = localStorage.getItem("accessToken");
    console.log("토근 확인: ", accessToken);

    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/ai/summary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        timeout: 60000,
      })
      .then((response) => {
        console.log("요청성공");
        console.log(response.data);
        setData(response.data);
        setCodeBlock(extractCodeBlock(response.data.content));
        console.log("같은지 비교하기. ", response.data.content);
        setScrapId(response.data.id);
      })
      .catch((error) => {
        console.log("요청실패");
        console.log(error);
      });
  };

  const location = useLocation();
  useEffect(() => {
    setFile(location.state.file);
    setQuestion("예시 코드 만들어줘");
    setLanguage("C언어");
    openModal();
  }, [location.state.file]);

  //코드 블럭 추출 로직
  function extractCodeBlock(content) {
    // 정규식을 사용하여 코드 블록을 추출합니다.
    const codeBlock = content.match(/```c([\s\S]*?)```/);

    return codeBlock ? codeBlock[0] : null;
  }

  const [codeBlock, setCodeBlock] = useState(null);

  //코드 블럭 스타일
  const codeBlockStyle = {
    backgroundColor: "#000000", // 배경색 변경
    padding: "10px",
    borderRadius: "4px", // 모서리 둥글게 만들기
    overflow: "auto",
  };

  const contentStyle = {
    color: "white", // 글자 색 변경
    letterspacing: "20px",
  };

  const preWrap = {
    whiteSpace: "pre-wrap", // 공백 문자와 줄 바꿈 보존
  };

  //스크랩버튼
  const scrapHandle = () => {
    console.log("버튼이 클릭되었습니다!");

    const formDataId = new FormData();
    formDataId.append("id", scrapId);
    console.log("scrapId: ", scrapId);

    try {
      const response = axios.post(
        `${process.env.REACT_APP_SERVER_URL}/ai/summary/like`,
        formDataId,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("응답 성공:", response);
      setScrapCheck(scrapCheck + 1);
      console.log(scrapCheck);
      if (scrapCheck % 2 === 0) {
        alert("스크랩 완료");
        setIsScrappedChange("YES");
      } else {
        alert("스크랩 제거");
        setIsScrappedChange("NO");
      }
    } catch (error) {
      console.log(error);
      console.log("요청실패");
    }
  };
  const copyHandle = () => {
    console.log("버튼이 클릭되었습니다!");
  };

  return (
    <>
      <header className={styles.SumTitle}>
        <div className={styles.SumLeft}>
          <div>
            <button type="button">
              <img src={Back} alt="뒤로가기" />
            </button>
          </div>
        </div>
        <div className={styles.SumRight}>
          <div className={styles.S}>
            <button type="button" onClick={copyHandle}>
              <img className={styles.RightImg} src={Copy} alt="복사" />
            </button>
            <button type="button" onClick={scrapHandle}>
              {isScrappedChange === "NO" || isScrappedChange === "No" ? (
                <img className={styles.RightImg} src={Star} alt="텅 빈 별" />
              ) : (
                <img
                  className={styles.RightImg}
                  src={FillStar}
                  alt="꽉 찬 별"
                />
              )}
            </button>
          </div>
        </div>
      </header>
      <article className={styles.article}>
        {data ? (
          <div style={preWrap}>
            <p>
              {data.content.split(codeBlock).map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  {index < data.content.split(codeBlock).length - 1 && (
                    <div>
                      <pre style={codeBlockStyle}>
                        <code style={contentStyle}>
                          {codeBlock.replace(/```c|```/g, "")}
                        </code>
                      </pre>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        ) : (
          ""
        )}
      </article>
      {/* <article className={styles.article}>
        <button type="button">
          <img className={styles.Copy} src={Copy} alt="복사" />
        </button>
      </article> */}
      <footer>
        <div className={styles.articleDesc}>
          <img className={styles.articleImg} src={Becareful} alt="주의" />
          <span>내용이 정확하지 않을 수 있습니다</span>
        </div>
      </footer>

      <SelectModal isOpen={isModalOpen} closeModal={closeModal}>
        <div className={styles.HomeMainModal}>
          <div className={styles.SelectPart}>
            <strong className={styles.SelectLang}>학습언어</strong>
            {/* 모달1가 열림*/}
            <button
              className={styles.SelectLanguage}
              type="button"
              onClick={openModal1}
            >
              C언어
            </button>
          </div>
          <div className={styles.SelectPart}>
            <span className={styles.SelectSubj}>
              <strong className={styles.SelectSub}>주제</strong>
              <img src={Becareful} alt="경고" />
            </span>
            {/* 모달2가 열림*/}
            <button
              className={styles.SelectSubject}
              type="button"
              onClick={openModal2}
            >
              선택없음
            </button>
          </div>
          <div className={styles.SelectBottom}>
            {/* 데이터 전송 버튼 */}
            <button
              className={styles.SelectBtn}
              type="button"
              onClick={sendDataHandle}
            >
              확인
            </button>
            {/* SelectModal창 닫기 버튼 */}
            <Link to="/HomePage" className={styles.SelectBtn}>
              취소
            </Link>
          </div>
        </div>
      </SelectModal>

      {/* 학습언어 */}
      <div
        className={styles.HomePage_Lang}
        style={{ display: isModalOpen1 ? "block" : "none" }}
      >
        <LangModal isOpen={isModalOpen1} onClose={closeModal1} />
      </div>
      {/*주제 모달*/}
      <div
        className={styles.HomePage_Sub}
        style={{ display: isModalOpen2 ? "block" : "none" }}
      >
        <SubModal isOpen={isModalOpen2} onClose={closeModal2} />
      </div>
      <Bottom />
    </>
  );
};
export default SummaryPage;
