import classNames from "classnames/bind";
import { Typography } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/no-redeclare
import {
  ArrowBackIos,
  LockOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./PrivacyPageWrapper.module.scss";
import { Logo } from "app/components/Logo";

const cx = classNames.bind(styles);

export const PrivacyPageWrapper = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  const handleToggleSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")}>
        <div className={cx("contentSidebar")}>
          <Logo className={cx("logo")} />
          <Typography component="h1" className={cx("title")}>
            Trung tâm quyền riêng tư
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
            <div className={cx("privacyBtn")} onClick={handleToggleSideBar}>
              <LockOutlined />
              <Typography component="p" className={cx("text")}>
                Chính sách quyền riêng tư
              </Typography>
              {isOpenSideBar ? (
                <KeyboardArrowUpOutlined />
              ) : (
                <KeyboardArrowDownOutlined />
              )}
            </div>
            {isOpenSideBar && (
              <ul className={cx("listPrivacy")}>
                <li>
                  <a href="#title1">Chính sách quyền riêng tư là gì?</a>
                </li>
                <li>
                  <a href="#title2">Mục đích thu thập thông tin</a>
                </li>
                <li>
                  <a href="#title3">Thông tin thu thập</a>
                </li>
                <li>
                  <a href="#title4">Bảo mật thông tin</a>
                </li>
                <li>
                  <a href="#title5">Bảo vệ thông tin</a>
                </li>
                <li>
                  <a href="#title6">Quyền riêng tư của người dùng</a>
                </li>
                <li>
                  <a href="#title7">Thay đổi chính sách</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("titleContent")}>Chính sách quyền riêng tư</div>
        <div className={cx("frame")}>
          <Typography
            component="h1"
            className={cx("frameTitle")}
            id={cx("title1")}
          >
            Chính sách quyền riêng tư là gì ?
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Có hiệu lực: 1 tháng 1, 2023
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Tại đây chúng tôi muốn các bạn hiểu những thông tin mà chúng tôi thu
            thập và cách mà chúng tôi sử dụng và chia sẻ chúng. Đó là lý do tại
            sao chúng tôi khuyến khích các bạn đọc Chính sách quyền riêng tư của
            chúng tôi. Điều này sẽ giúp bạn sử dụng phần mềm theo cách phù hợp
            nhất.
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Trong chính sách quyền riêng tư này, chúng tôi giải thích cách chúng
            tôi thu thập, sử dụng, chia sẻ lưu giữ và chuyển thông tin. Chúng
            tôi cho bạn biết các quyền của bạn. Mỗi phần của Chính sách bao gồm
            các ví dụ hữu ích và ngôn ngữ đơn giản hơn để làm cho các hoạt động
            của chúng tôi dễ hiểu hơn.
          </Typography>
        </div>
        <div className={cx("frame")}>
          <Typography
            component="h1"
            className={cx("frameTitle")}
            id={cx("title2")}
          >
            Mục đích thu thập thông tin
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi thu thập thông tin người dùng trên trang web của mình để
            cung cấp các dịch vụ và sản phẩm tốt nhất cho người dùng của chúng
            tôi. Các thông tin thu thập có thể bao gồm tên, địa chỉ email, địa
            chỉ IP, và các thông tin liên quan đến hoạt động trên trang web của
            chúng tôi. Chúng tôi cũng có thể sử dụng các công cụ theo dõi để thu
            thập thông tin liên quan đến việc sử dụng trang web của chúng tôi.
            Chúng tôi cam kết sử dụng các thông tin này theo các mục đích đã nêu
            trên và sẽ không chia sẻ thông tin với bất kỳ bên thứ ba nào nếu
            không có sự đồng ý của người dùng hoặc nếu không yêu cầu bởi pháp
            luật.
          </Typography>
        </div>
        <div className={cx("frame")}>
          <Typography
            component="h1"
            className={cx("frameTitle")}
            id={cx("title3")}
          >
            Thông tin thu thập
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi có thể thu thập các loại thông tin sau đây từ người dùng
            trên trang web của chúng tôi:
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            1.Tên đầy đủ và địa chỉ email của người dùng khi họ đăng ký tài
            khoản hoặc đăng ký nhận tin tức từ chúng tôi.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            2.Địa chỉ IP và thông tin về trình duyệt mà người dùng sử dụng để
            truy cập trang web của chúng tôi.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            3.Thông tin liên quan đến hoạt động trên trang web của chúng tôi,
            bao gồm các trang mà người dùng đã truy cập và thời gian truy cập.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            4.Thông tin liên quan đến các giao dịch mà người dùng thực hiện trên
            trang web của chúng tôi, bao gồm thông tin về sản phẩm và dịch vụ mà
            họ đã mua và thông tin thanh toán.
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi có thể sử dụng các phương thức sau để thu thập thông tin:
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            1.Tài khoản Google: Chúng tôi sử dụng tài khoản google của bạn như
            một công cụ bên thứ 3 nhằm xác minh danh tính của bạn. Thử chúng tôi
            lưu trữ là Email, Tên đầy đủ, Ảnh nhằm mục đích xác thực những lần
            đăng nhập tiếp theo và hoạt động của các dịch vụ trong phần mềm cũng
            như hiển thị cho bạn biết bạn là ai.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            2.Cookie: Chúng tôi sử dụng cookie để thu thập thông tin về cách
            người dùng sử dụng trang web của chúng tôi. Cookie là các tệp văn
            bản nhỏ được lưu trữ trên ổ đĩa của người dùng và cho phép chúng tôi
            nhận ra người dùng khi họ truy cập trang web của chúng tôi. Chúng
            tôi sử dụng cookie để cung cấp các tính năng tùy chỉnh và cải thiện
            trải nghiệm của người dùng trên trang web của chúng tôi.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            3.Pixel: Chúng tôi cũng sử dụng các pixel để thu thập thông tin về
            hoạt động trên trang web của chúng tôi. Pixel là các đoạn mã nhỏ
            được nhúng vào trang web của chúng tôi và cho phép chúng tôi theo
            dõi các hoạt động của người dùng trên trang web của chúng tôi.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            4.Mẫu điền thông tin: Chúng tôi cũng thu thập thông tin từ người
            dùng thông qua các mẫu điền thông tin trên trang web của chúng tôi,
            ví dụ như khi họ liên hệ với chúng tôi hoặc đăng ký nhận thông tin
            từ chúng tôi.
          </Typography>
        </div>
        <div className={cx("frame")}>
          <Typography
            component="h1"
            className={cx("frameTitle")}
            id={cx("title4")}
          >
            Bảo mật thông tin
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi cam kết bảo mật thông tin người dùng trên trang web của
            chúng tôi. Chúng tôi không chia sẻ thông tin người dùng với bất kỳ
            bên thứ ba nào mà không được sự đồng ý của người dùng, trừ khi có
            yêu cầu pháp lý hoặc để bảo vệ quyền lợi của chúng tôi.
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Nếu chúng tôi cần chia sẻ thông tin người dùng với bên thứ ba, chúng
            tôi sẽ liệt kê danh sách các bên này và mục đích của việc chia sẻ
            thông tin như sau:
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            1.Đối tác kinh doanh: Hiện tại phần mềm chúng tôi làm ra mục đích
            phục vụ miễn phí cho một nhóm cộng đồng vẫn chưa có kế hoạch kinh
            doanh hay liên kết kinh doanh với các đối tác.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            2.Đơn vị xử lý thanh toán: Phần mềm không dùng bất kì một hình thức
            thanh toán nào.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            3.Yêu cầu pháp lý: Chúng tôi có thể chia sẻ thông tin người dùng nếu
            có yêu cầu pháp lý hoặc khi chúng tôi tin rằng việc chia sẻ thông
            tin là cần thiết để tuân thủ các quy định pháp luật hoặc bảo vệ
            quyền lợi của chúng tôi.
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi sẽ chỉ chia sẻ thông tin người dùng nếu được sự đồng ý của
            người dùng hoặc nếu có yêu cầu pháp lý. Chúng tôi cam kết bảo mật
            thông tin người dùng và sử dụng thông tin này chỉ cho các mục đích
            được nêu trong chính sách bảo mật của chúng tôi.
          </Typography>
        </div>
        <div className={cx("frame")}>
          <Typography
            component="h1"
            className={cx("frameTitle")}
            id={cx("title5")}
          >
            Bảo vệ thông tin
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi đã áp dụng các biện pháp bảo vệ thông tin để đảm bảo rằng
            thông tin người dùng trên trang web của chúng tôi được bảo vệ một
            cách an toàn và đáng tin cậy. Các biện pháp bảo vệ thông tin bao
            gồm:
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            1.Mã hóa dữ liệu: Chúng tôi sử dụng các thuật toán mã hóa dữ liệu để
            bảo vệ thông tin người dùng khi chúng tôi lưu trữ hoặc truyền dữ
            liệu giữa máy chủ và trình duyệt của người dùng. Chúng tôi sử dụng
            SSL (Secure Socket Layer) hoặc TLS (Transport Layer Security) để mã
            hóa dữ liệu giữa máy chủ và trình duyệt của người dùng.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            2.Giới hạn quyền truy cập: Chúng tôi chỉ cấp quyền truy cập vào
            thông tin người dùng cho các nhân viên có nhu cầu thực hiện công
            việc liên quan đến việc xử lý thông tin người dùng. Các nhân viên
            này được đào tạo và cam kết bảo mật thông tin người dùng theo các
            tiêu chuẩn tương tự như của chúng tôi. Chúng tôi cũng sử dụng các
            công nghệ và biện pháp để ngăn chặn truy cập trái phép vào thông tin
            người dùng.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            3.Kiểm tra bảo mật thường xuyên: Chúng tôi thường xuyên kiểm tra các
            biện pháp bảo mật của mình để đảm bảo rằng chúng vẫn đủ mạnh để bảo
            vệ thông tin người dùng. Chúng tôi cập nhật các biện pháp bảo mật
            của mình theo các tiêu chuẩn mới nhất và thường xuyên đào tạo nhân
            viên của mình về các vấn đề bảo mật mới nhất.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            4.Bảo vệ chống lại tấn công: Chúng tôi sử dụng các giải pháp bảo mật
            mạnh nhất để bảo vệ trang web của chúng tôi chống lại các cuộc tấn
            công bảo mật, bao gồm phát hiện và ngăn chặn các cuộc tấn công phần
            mềm độc hại và tấn công DDoS (tấn công từ chối dịch vụ).
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi cam kết bảo vệ thông tin người dùng của chúng tôi và đảm
            bảo rằng các biện pháp bảo mật của chúng tôi đủ mạnh để bảo vệ thông
            tin của người dùng trước các mối đe dọa bảo mật.
          </Typography>
        </div>
        <div className={cx("frame")}>
          <Typography
            component="h1"
            className={cx("frameTitle")}
            id={cx("title6")}
          >
            Quyển riêng tư của người dùng
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi tôn trọng quyền riêng tư của người dùng và cam kết bảo vệ
            thông tin của họ. Người dùng có quyền yêu cầu xem, chỉnh sửa hoặc
            xóa thông tin của mình bất cứ lúc nào. Ngoài ra, chúng tôi cũng cam
            kết không bán hoặc chia sẻ thông tin của người dùng cho bên thứ ba
            mà không được sự đồng ý của họ. Các quyền của người dùng:
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            1.Quyền yêu cầu truy cập thông tin cá nhân: Người dùng có quyền yêu
            cầu truy cập thông tin cá nhân của mình bao gồm tên, địa chỉ email,
            địa chỉ IP, v.v.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            2.Quyền yêu cầu sửa đổi thông tin cá nhân: Người dùng có quyền yêu
            cầu sửa đổi thông tin cá nhân của mình nếu thông tin này đã bị lỗi
            hoặc không chính xác.
          </Typography>
          <Typography component="p" className={cx("frameContent", "desTitle")}>
            3.Quyền yêu cầu xóa thông tin cá nhân: Người dùng có quyền yêu cầu
            xóa thông tin cá nhân của mình khỏi hệ thống của chúng tôi bất cứ
            lúc nào.
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Để yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình,
            người dùng có thể liên hệ với chúng tôi qua thông tin liên lạc được
            cung cấp trên trang web của chúng tôi. Chúng tôi sẽ cố gắng hồi đáp
            yêu cầu của người dùng trong thời gian sớm nhất có thể.
          </Typography>
        </div>
        <div className={cx("frame")}>
          <Typography
            component="h1"
            className={cx("frameTitle")}
            id={cx("title7")}
          >
            Thay đổi chính sách
          </Typography>
          <Typography component="p" className={cx("frameContent")}>
            Chúng tôi có thể thay đổi chính sách bảo mật của mình bất cứ lúc nào
            và bằng cách sử dụng trang web này, bạn đồng ý với các thay đổi đó.
            Chúng tôi sẽ thông báo cho người dùng về bất kỳ thay đổi nào trong
            chính sách bảo mật này bằng cách đăng thông báo trên trang web của
            chúng tôi. Ngày hiệu lực của chính sách mới sẽ được đưa ra trong
            thông báo.
          </Typography>
        </div>
      </div>
    </div>
  );
};
