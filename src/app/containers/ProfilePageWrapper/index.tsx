import classNames from "classnames/bind";
import { Typography, Pagination, Tabs, Tab, Box } from "@mui/material";
import React, { useState, useCallback, useMemo } from "react";

import styles from "./ProfilePageWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ContentItem } from "app/components/ContentItem";
import { Loading } from "app/components/Loading";
import { useGetDocumentsByOwner } from "queries/document";
import { DEFAULT_PAGINATION } from "utils/constants";

import { useGetExamsByOwner } from "queries/exam";
import {
  useGetUserExamsCompletedByOwner,
  useGetUserExamsNotCompletedByOwner,
} from "queries/userExam";

const cx = classNames.bind(styles);

interface TabPanelProps {
  className?: string;
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const allyProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const ProfilePageWrapper = () => {
  const [currentDocumentPage, setCurrentDocumentPage] = useState(1);
  const [currentExamPage, setCurrentExamPage] = useState(1);
  const [currentUserExamCompletedPage, setCurrentUserExamCompletedPage] =
    useState(1);
  const [currentUserExamNotCompletedPage, setCurrentUserExamNotCompletedPage] =
    useState(1);

  const [valueTab, setValueTab] = useState(0);

  const handleChange = useCallback(
    (e: React.SyntheticEvent, newValue: number) => {
      setValueTab(newValue);
    },
    [valueTab],
  );

  const { data: documentsByOwner, isLoading: isLoadingGetDocuments } =
    useGetDocumentsByOwner({
      currentPage: currentDocumentPage - 1,
    });
  const { data: examsByOwner, isLoading: isLoadingGetExams } =
    useGetExamsByOwner({
      currentPage: currentExamPage - 1,
    });

  const {
    data: userExamsNotCompletedByOwner,
    isLoading: isLoadingGetUserExamsNotCompleted,
  } = useGetUserExamsNotCompletedByOwner({
    currentPage: currentUserExamNotCompletedPage - 1,
  });

  const {
    data: userExamsCompletedByOwner,
    isLoading: isLoadingGetUserExamsCompleted,
  } = useGetUserExamsCompletedByOwner({
    currentPage: currentUserExamCompletedPage - 1,
  });

  const handlePagingDocument = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentDocumentPage(value);
    },
    [currentDocumentPage],
  );

  const handlePagingExam = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentExamPage(value);
    },
    [currentExamPage],
  );

  const handlePagingUserExamNotCompleted = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentUserExamNotCompletedPage(value);
    },
    [currentUserExamNotCompletedPage],
  );

  const handlePagingUserExamCompleted = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentUserExamCompletedPage(value);
    },
    [currentUserExamCompletedPage],
  );

  const pageCountDocument = useMemo(() => {
    const total = documentsByOwner?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [documentsByOwner?.meta?.total]);

  const pageCountExam = useMemo(() => {
    const total = examsByOwner?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [examsByOwner?.meta?.total]);

  const pageCountUserExamCompleted = useMemo(() => {
    const total = userExamsCompletedByOwner?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [userExamsCompletedByOwner?.meta?.total]);

  const pageCountUserExamNotCompleted = useMemo(() => {
    const total = userExamsNotCompletedByOwner?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [userExamsNotCompletedByOwner?.meta?.total]);

  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumb")}
        current="profile"
        breadcrumbsList={[{ linkTo: "/", text: "Trang chủ" }]}
      />

      <Box sx={{ width: "100%" }}>
        <Box className={cx("boxTab")}>
          <Tabs
            value={valueTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Tài liệu" {...allyProps(0)} />
            <Tab label="Bài kiểm tra" {...allyProps(1)} />
            <Tab label="Bài kiểm tra đã hoàn thành" {...allyProps(2)} />
            <Tab label="Bài kiểm tra chưa hoàn thành" {...allyProps(3)} />
          </Tabs>
        </Box>

        <TabPanel value={valueTab} index={0}>
          {isLoadingGetDocuments ? (
            <Loading className={cx("loading")} />
          ) : (
            <div className={cx("documentList")}>
              {documentsByOwner?.data?.map(document => (
                <ContentItem
                  key={document?._id}
                  createdAt={document?.created_at}
                  description={document?.description}
                  prefix="documents"
                  id={document?._id}
                  title={document?.title}
                />
              ))}
            </div>
          )}
          {documentsByOwner?.data?.length === 0 && (
            <Typography className={cx("nofiDocumentList")} color="text.primary">
              Danh sách tài liệu do bạn tạo hiện đang trống
            </Typography>
          )}
          {pageCountDocument >= 2 && (
            <div className={cx("paging")}>
              <Pagination
                count={pageCountDocument}
                variant="outlined"
                shape="rounded"
                page={currentDocumentPage}
                onChange={handlePagingDocument}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={valueTab} index={1}>
          {isLoadingGetExams ? (
            <Loading className={cx("loading")} />
          ) : (
            <div className={cx("examList")}>
              {examsByOwner?.data?.map(exam => (
                <ContentItem
                  key={exam?._id}
                  createdAt={exam?.created_at}
                  description={
                    exam?.description ||
                    `Kỳ ${exam?.semester} năm học ${exam?.school_year} `
                  }
                  prefix="exams"
                  id={exam?._id}
                  title={exam?.title}
                  isExam
                />
              ))}
            </div>
          )}
          {examsByOwner?.data?.length === 0 && (
            <Typography className={cx("nofiExamsList")} color="text.primary">
              Danh sách bài kiểm tra do bạn tạo hiện đang trống
            </Typography>
          )}
          {pageCountExam >= 2 && (
            <div className={cx("paging")}>
              <Pagination
                count={pageCountExam}
                variant="outlined"
                shape="rounded"
                page={currentExamPage}
                onChange={handlePagingExam}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={valueTab} index={2}>
          {isLoadingGetUserExamsCompleted ? (
            <Loading className={cx("loading")} />
          ) : (
            <div className={cx("userExamCompletedList")}>
              {userExamsCompletedByOwner?.data?.map(userExam => (
                <ContentItem
                  key={userExam?._id}
                  createdAt={userExam?.created_at}
                  description={`Kỳ ${userExam?.semester} năm học ${userExam?.school_year}`}
                  prefix="exams/do-exam"
                  id={userExam?._id}
                  title={userExam?.title}
                  isExam
                />
              ))}
            </div>
          )}
          {userExamsCompletedByOwner?.data?.length === 0 && (
            <Typography
              className={cx("nofiUserExamsCompletedList")}
              color="text.primary"
            >
              Danh sách bài kiểm tra đã hoàn thành của bạn hiện đang trống
            </Typography>
          )}
          {pageCountUserExamCompleted >= 2 && (
            <div className={cx("paging")}>
              <Pagination
                count={pageCountUserExamCompleted}
                variant="outlined"
                shape="rounded"
                page={currentUserExamCompletedPage}
                onChange={handlePagingUserExamCompleted}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={valueTab} index={3}>
          {isLoadingGetUserExamsNotCompleted ? (
            <Loading className={cx("loading")} />
          ) : (
            <div className={cx("userExamNotCompletedList")}>
              {userExamsNotCompletedByOwner?.data?.map(userExam => (
                <ContentItem
                  key={userExam?._id}
                  createdAt={userExam?.created_at}
                  description={`Kỳ ${userExam?.semester} năm học ${userExam?.school_year}`}
                  prefix="exams/do-exam"
                  id={userExam?._id}
                  title={userExam?.title}
                  isExam
                />
              ))}
            </div>
          )}
          {userExamsNotCompletedByOwner?.data?.length === 0 && (
            <Typography
              className={cx("nofiUserExamsNotCompletedList")}
              color="text.primary"
            >
              Danh sách bài kiểm tra chưa hoàn thành của bạn hiện đang trống
            </Typography>
          )}
          {pageCountUserExamNotCompleted >= 2 && (
            <div className={cx("paging")}>
              <Pagination
                count={pageCountUserExamNotCompleted}
                variant="outlined"
                shape="rounded"
                page={currentUserExamNotCompletedPage}
                onChange={handlePagingUserExamNotCompleted}
              />
            </div>
          )}
        </TabPanel>
      </Box>
    </div>
  );
};
