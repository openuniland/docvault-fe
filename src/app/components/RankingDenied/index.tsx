import classNames from "classnames/bind";

import styles from "./RankingDenied.module.scss";
import { Notice } from "types/Common";
import { Box, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { RANK } from "utils/constants";

const cx = classNames.bind(styles);

interface Props {
  notice?: Notice;
}

const GetTimelineDot = (props: any) => {
  const { rank, notice } = props;
  let color: any = "grey";

  if (rank === notice?.your_rank) {
    color = "error";
  }

  if (rank === notice?.minimum_required_rank) {
    color = "success";
  }

  return <TimelineDot color={color} />;
};

export const RankingDenied = (props: Props) => {
  const { notice } = props;

  return (
    <div className={cx("container")}>
      <Box className={cx("noticeWrapper")}>
        <Typography component="h1" className={cx("title")}>
          Bạn chưa đạt đủ RANK để xem tài liệu này!
        </Typography>
        <Typography component="p" className={cx("desc")}>
          Để được tăng 1 RANK, bạn cần có điểm cống hiến tối thiểu là 10 điểm.
          Điểm cống hiến được tính dựa trên số lượng tài liệu và bài kiểm tra
          bạn cống hiến cho cộng đồng. Với mỗi bài được APPROVED bạn sẽ được
          cộng 1 điểm cống hiến.
        </Typography>
        <div className={cx("noticeItem")}>
          <Typography className={cx("name")} component="p">
            Cấp độ yêu cầu:
          </Typography>
          <Typography className={cx("value", "required")} component="strong">
            {notice?.minimum_required_rank}
          </Typography>
        </div>
        <div className={cx("noticeItem")}>
          <Typography className={cx("name")} component="p">
            Cấp của bạn:
          </Typography>
          <Typography className={cx("value")} component="strong">
            {notice?.your_rank}
          </Typography>
        </div>
        <Typography className={cx("name")} component="p">
          {notice &&
            `Điểm cống hiến hiện tại của bạn là ${
              notice?.your_dedication_score
            }, bạn cần thêm ${
              notice?.minimum_required_score - notice?.your_dedication_score
            } điểm để đạt đủ RANK của bài này.`}
        </Typography>
      </Box>

      <Box>
        <Timeline position="alternate">
          {RANK?.map(rank => (
            <TimelineItem key={rank.level}>
              <TimelineSeparator>
                <GetTimelineDot rank={rank.name} notice={notice} />
                {rank.name !== RANK[RANK.length - 1].name && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent>{rank.name}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </div>
  );
};
