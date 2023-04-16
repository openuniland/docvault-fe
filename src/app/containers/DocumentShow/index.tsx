import { useParams, Link } from "react-router-dom";
import classNames from "classnames/bind";
import { Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { useGetDocument } from "queries/document";

import styles from "./DocumentShow.module.scss";
import { RenderContentIem } from "app/components/RenderContentIem";
import { RankingDenied } from "app/components/RankingDenied";

const cx = classNames.bind(styles);

export const DocumentShow = () => {
  const { documentId } = useParams();
  const { data: document } = useGetDocument(documentId as string);

  if (document?.notice) {
    return <RankingDenied notice={document?.notice} />;
  }

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <BreadcrumbsCustomization
          current={document?.subject?.subject_name}
          breadcrumbsList={[{ linkTo: "/documents", text: "Documents" }]}
        />

        <Tooltip title="Báo cáo nếu có thông tin sai!">
          <HelpOutlineIcon className={cx("helpIcon")} />
        </Tooltip>
      </div>
      {!document?.is_approved && (
        <div className={cx("notification")}>
          <Typography className={cx("notiText")} component="p">
            Đang chờ phê duyệt
          </Typography>
        </div>
      )}
      <Typography className={cx("title")} component="h1">
        {document?.title}
      </Typography>
      <Typography className={cx("description")} component="p">
        {document?.description}
      </Typography>

      <div>
        <div className={cx("descWrapper")}>
          <Typography className={cx("titleName")} component="p">
            Người đăng:
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {document?.author?.fullname || document?.author?.nickname}
          </Typography>
        </div>
        <div className={cx("descWrapper")}>
          <Typography className={cx("titleName")} component="p">
            Môn học:
          </Typography>
          <Link
            to={`/documents/subject/${document?.subject?._id}`}
            className={cx("highlight")}
          >
            {document?.subject?.subject_name}
          </Link>
        </div>
        <div className={cx("descWrapper")}>
          <Typography className={cx("schoolYear")} component="strong">
            {`Học kỳ ${document?.semester} năm học ${document?.school_year}`}
          </Typography>
        </div>
      </div>

      <div className={cx("content")}>
        {document?.content?.map(item => (
          <RenderContentIem
            key={item.name}
            title={item.name}
            desc={item.description}
            image={item.image}
            file={item.file}
          />
        ))}
      </div>
    </div>
  );
};
