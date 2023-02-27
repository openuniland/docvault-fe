import classNames from "classnames/bind";

import styles from "./TestPageContent.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SummarizeIcon from "@mui/icons-material/Summarize";
const cx = classNames.bind(styles);

export const TestPageContent = () => {
  const { t } = useTranslation();
  const Subjects = [
    { name: "An ninh mạng", totalExam: 10, path: "" },
    { name: "Toán rời rạc", totalExam: 12, path: "" },
    { name: "Cấu trúc dữ liệu và giải thuật", totalExam: 12, path: "" },
    { name: "Toán rời rạc", totalExam: 12, path: "" },
    { name: "Toán rời rạc", totalExam: 1, path: "" },
    { name: "Lập trình HSK", totalExam: 15, path: "" },
    { name: "Giải tích 2", totalExam: 12, path: "" },
  ];
  return (
    <div className={cx("container")}>
      <div className={cx("content__top")}>
        <div>
          <MenuBookIcon /> {t("exam.subjects.title")}
        </div>
        <button>
          <AddCircleIcon />
          {t("exam.subjects.add")}
        </button>
      </div>
      <div className={cx("content__body")}>
        {Subjects.map((item, index) => (
          <Link to={item.path} className={cx("subject__item")} key={index}>
            <SummarizeIcon />
            <div className={cx("subject-name")}>{item.name}</div>
            <span className={cx("exam-quantity")}>({item.totalExam})</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
