import classNames from "classnames/bind";
import { Typography } from "@mui/material";
import { ArrowBackIos, PeopleAlt } from "@mui/icons-material";
import { Link } from "react-router-dom";

import styles from "./TermsOfUserPageWrapper.module.scss";
import { Logo } from "app/components/Logo";

const cx = classNames.bind(styles);

export const TermsOfUserPageWrapper = () => {
  return (
    <div className={cx("bg")}>
      <div className={cx("container")}>
        <div className={cx("sidebar")}>
          <div className={cx("contentSidebar")}>
            <Logo className={cx("logo")} />
            <Typography component="h1" className={cx("title")}>
              Điều khoản người dùng
            </Typography>
            <div className={"contentSidebar"}>
              <Link to="/" className={cx("linkBackHome")}>
                <div className={cx("backHomeBtn")}>
                  <ArrowBackIos />
                  <Typography component="p" className={cx("text")}>
                    Quay về trang chủ
                  </Typography>
                </div>
              </Link>
              <div className={cx("privacyBtn")}>
                <PeopleAlt />
                <Typography component="p" className={cx("text")}>
                  Điều khoản của người dùng
                </Typography>
              </div>
              <ul className={cx("listPrivacy")}>
                <li>
                  <a href="#title1">Mô tả và mục đích của trang web</a>
                </li>
                <li>
                  <a href="#title2">Điều kiện sử dụng</a>
                </li>
                <li>
                  <a href="#title3">
                    Quyền của chủ sở hữu trang web về việc xóa bỏ bất kỳ nội
                    dung hoặc tài khoản người dùng nào
                  </a>
                </li>
                <li>
                  <a href="#title4">
                    Nội dung về trách nhiệm của người dùng và hành vi cấm.
                  </a>
                </li>
                <li>
                  <a href="#title5">
                    Các điều khoản về thay đổi chính sách và giải quyết tranh
                    chấp.
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("titleContent")}>
            Các điều khoản bạn đồng ý khi sử dụng dịch vụ của chúng tôi
          </div>
          <Typography component="p" className={cx("frameContent")}>
            Có hiệu lực: 1 tháng 1, 2023
          </Typography>
          <div className={cx("frame")}>
            <Typography
              component="h1"
              className={cx("frameTitle")}
              id={cx("title1")}
            >
              Mô tả và mục đích của trang web
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Trang web của chúng tôi là một cộng động nhỏ và có kiểm soát được
              thiết kế nhằm mục đích giúp các thành viên chia sẻ tài liệu học
              tập cho nhau. Trang web cung cấp cho người dùng các tính năng như
              xem tài liệu, thử làm bài kiểm tra, thêm tài liệu mới, thêm bài
              kiểm tra mới theo môn học. Để tạo ra một nền tảng cho thành viên
              chia sẻ và truy cập tài liệu dễ dàng và nhanh chóng có chọn lọc.
            </Typography>
          </div>
          <div className={cx("frame")}>
            <Typography
              component="h1"
              className={cx("frameTitle")}
              id={cx("title2")}
            >
              Điều kiện sử dụng
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Khi sử dụng trang web, người sử dụng cần tuân thủ các điều khoản
              và quy định sau đây:
            </Typography>
            <Typography
              component="p"
              className={cx("frameContent", "desTitle")}
            >
              1.Không được sao chép, sửa đổi, phân phối hoặc bán lại bất kỳ nội
              dung trên trang web cho bất kỳ mục đích thương mại nào.
            </Typography>
            <Typography
              component="p"
              className={cx("frameContent", "desTitle")}
            >
              2.Không được sử dụng trang web để phát tán hoặc quảng cáo bất kỳ
              nội dung phi pháp hoặc vi phạm bản quyền.
            </Typography>
            <Typography
              component="p"
              className={cx("frameContent", "desTitle")}
            >
              3.Không được sử dụng trang web để xúc phạm, đe dọa hoặc phân biệt
              đối xử với bất kỳ thành viên trong cộng đồng.
            </Typography>
            <Typography
              component="p"
              className={cx("frameContent", "desTitle")}
            >
              4.Không được sử dụng trang web để thực hiện bất kỳ hành động nào
              vi phạm pháp luật.
            </Typography>
          </div>
          <div className={cx("frame")}>
            <Typography
              component="h1"
              className={cx("frameTitle")}
              id={cx("title3")}
            >
              Quyền của chủ sở hữu trang web về việc xóa bỏ bất kỳ nội dung hoặc
              tài khoản người dùng nào.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Chủ sở hữu trang web có quyền xóa bỏ bất kỳ nội dung hoặc tài
              khoản người dùng nào mà chủ sở hữu coi là vi phạm Điều khoản sử
              dụng hoặc gây hại đến trang web hoặc người dùng khác. Chủ sở hữu
              cũng có quyền xóa bỏ bất kỳ nội dung hoặc tài khoản người dùng nào
              mà chủ sở hữu cho rằng có tính phản động hoặc không phù hợp với
              mục đích của trang web. Chủ sở hữu sẽ cố gắng thông báo trước cho
              người dùng khi xóa bỏ nội dung hoặc tài khoản của họ, trừ khi việc
              thông báo trước sẽ làm giảm tính hiệu quả của việc xóa bỏ nội dung
              hoặc tài khoản đó.
            </Typography>
          </div>
          <div className={cx("frame")}>
            <Typography
              component="h1"
              className={cx("frameTitle")}
              id={cx("title4")}
            >
              Nội dung về trách nhiệm của người dùng và hành vi cấm.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Người dùng phải chịu trách nhiệm về tất cả các hành động được thực
              hiện trên trang web của chúng tôi bằng tài khoản của mình. Người
              dùng không được phép chia sẻ tài khoản hoặc mật khẩu của mình cho
              bất kỳ ai khác.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Người dùng không được phép sử dụng trang web của chúng tôi để thực
              hiện bất kỳ hoạt động vi phạm pháp luật nào, bao gồm nhưng không
              giới hạn vào việc xâm phạm quyền riêng tư, vi phạm bản quyền hoặc
              bất kỳ hành vi gây hại nào đối với trang web, người dùng khác hoặc
              bên thứ ba.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Người dùng không được phép sử dụng trang web của chúng tôi để
              truyền tải bất kỳ nội dung không đúng đắn hoặc vi phạm quyền riêng
              tư của người khác.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Người dùng phải tuân thủ tất cả các quy định, điều khoản và điều
              kiện được nêu trong điều khoản sử dụng của chúng tôi và không được
              phép thực hiện bất kỳ hành vi nào vi phạm chúng. Chúng tôi có
              quyền từ chối hoặc tạm ngừng sử dụng trang web của người dùng nếu
              phát hiện bất kỳ vi phạm nào.
            </Typography>
          </div>
          <div className={cx("frame")}>
            <Typography
              component="h1"
              className={cx("frameTitle")}
              id={cx("title5")}
            >
              Các điều khoản về thay đổi chính sách và giải quyết tranh chấp.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Thay đổi chính sách: Chủ sở hữu trang web có quyền thay đổi chính
              sách và các điều khoản sử dụng bất cứ lúc nào. Việc thay đổi này
              sẽ được thông báo trên trang web và có hiệu lực ngay sau khi được
              công bố. Người dùng nên xem lại các điều khoản này thường xuyên để
              cập nhật với những thay đổi mới nhất.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Giải quyết tranh chấp: Trang web sẽ cố gắng giải quyết các tranh
              chấp phát sinh từ việc sử dụng trang web theo cách thỏa đáng và
              công bằng. Nếu có bất kỳ tranh chấp nào, người dùng có thể liên hệ
              với chủ sở hữu trang web để giải quyết vấn đề. Nếu không thể giải
              quyết được bằng các phương tiện thông thường, các bên sẽ tham gia
              vào các phương án giải quyết tranh chấp được quy định bởi pháp
              luật.
            </Typography>
            <Typography component="p" className={cx("frameContent")}>
              Quy định pháp lý: Các điều khoản sử dụng này phải tuân thủ đúng
              quy định của pháp luật hiện hành và các quy định pháp lý khác liên
              quan đến việc sử dụng trang web. Việc sử dụng trang web này có
              nghĩa là người dùng đồng ý tuân thủ và chấp nhận các quy định và
              điều khoản này.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
