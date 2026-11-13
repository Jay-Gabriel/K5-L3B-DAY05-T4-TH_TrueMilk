# Bài nộp LAB5 — T4 Thương mại điện tử · Nhóm [TÊN NHÓM]

| Họ và Tên | Mã Học Viên | Việc đã làm |
|---|---|---|
| Hạ Anh [họ tên đầy đủ] | [MÃ] | §1, §2, §3, §6: kịch bản rủi ro, UX khi AI sai, tiêu chí chấm |
| Bảo [họ tên đầy đủ] | [MÃ] | §4, §5, §7: mức tự chủ, prototype, demo |
| [TÊN THÀNH VIÊN 3 — README yêu cầu đúng 3 người] | [MÃ] | [điền việc cụ thể] |

> Nháp khởi đầu. Mọi chỗ ghi **[NHÓM CHỐT]** là quyết định hai người phải tự bàn và sửa lại bằng lời mình. Mỗi người phải giải thích được phần mang tên mình khi demo.

---

## KẾ HOẠCH CHIA VIỆC (xoá mục này trước khi nộp)

| Giờ | Việc | Ai |
|---|---|---|
| 0–10' | Chặng 1: cùng đọc `tracks/t4-ecommerce.md`, nói được lát cắt trong 1 câu | A + B |
| 10–45' (M1) | Chặng 2: A viết ≥8 kịch bản (§2) · B soát: mỗi kịch bản có trỏ về tool/dữ liệu không, thêm 1–2 ca "người thật nhắn" | A chính, B soát |
| 45–90' | Chặng 3: A viết §3 cho 2 ca đắt nhất · B song song **tự xếp mức cho 5 tool, không xem của A** (đúng yêu cầu 4.3) | A / B |
| 90–125' (M2) | Chặng 4: A cũng tự xếp mức trước, rồi hai người so, ghi ai chọn gì, chốt tool khó xếp nhất; B viết §4 | A + B, B ghi |
| 125–140' | Nghỉ | |
| 140–200' (M3) | Chặng 5: B dựng prototype HTML · A viết §5 phần lập luận, chụp ảnh đánh số, làm bảng HAX → chỗ trên màn hình | B chính, A hỗ trợ |
| 200–210' | Chặng 6: A viết §6, B chấm chéo | A, B |
| 210–240' | Demo: A nói lát cắt + §2/§3 · B bấm prototype + §4. Chuẩn bị ca lạ (xem §7) | A + B |

Nộp: repo mới công khai `K5-<lớp>-Day05-T4-<tên nhóm>`, có `spec.md`, `prototype/`, ảnh đánh số. Hạn 23:59 ngày lab.

---

## §1. Lát cắt & phạm vi

**Lát cắt (chép từ track):** Trong *Trò chuyện với Shopee*, khi **người mua** báo "hàng nhận không đúng mô tả", **AI tự hướng dẫn gửi yêu cầu trả hàng hoàn tiền, xin thêm bằng chứng, hay chuyển nhân viên**, để người mua biết đúng bước tiếp theo, và người bán không bị xử thua khi họ đúng.

**Ai chịu khi AI sai (từ track):** hoàn sai → người bán mất tiền và hàng; từ chối/vòng vo sai → người mua mất tiền và giữ hàng sai. Không có đường "từ chối cho chắc" an toàn. Thứ phải thiết kế là **sự trung lập**.

**3 việc tính năng KHÔNG làm:**
1. **Không phạt shop / khoá shop** (`phat_shop`). Khó đảo, ảnh hưởng cả shop; nghi hàng giả hay xử phạt không thuộc luồng khiếu nại thường nên chuyển bộ phận chuyên trách.
2. **Không đưa số điện thoại, địa chỉ giữa hai bên.** Đây là quy tắc an toàn của track; AI chỉ dẫn người dùng nhắn qua kênh trong app.
3. **Không tự đóng khiếu nại / tự quyết thắng-thua** (`tu_choi_khieu_nai`). Tiền về người bán khó lấy lại và người mua mất quyền lợi; AI chỉ nói "chưa đủ căn cứ" rồi chuyển người.

*(Đã cân nhắc thêm "không đổi/sửa đơn hàng", loại vì không có tool nào làm việc này nên đã nằm ngoài khả năng của AI.)*

**Giả định dữ liệu dựng (nhóm thống nhất nhất quán trong prototype):**
- Hệ thống bắt buộc lưu **bản chụp mô tả lúc đặt hàng** (snapshot) kèm dấu thời gian và phiên bản mô tả hiện tại để đối chiếu lịch sử thay đổi.
- Thời hạn yêu cầu trả hàng: **7 ngày kể từ ngày nhận hàng** (chính sách giả định phục vụ bài thi, khác con số 15 ngày trên trang trợ giúp Shopee thực tế; thể hiện rõ trên UI là "chính sách bài lab").
- Người bán có thời hạn phản hồi tiêu chuẩn là **48 giờ** trước khi nhân viên sàn ra phán quyết cuối cùng.

---

## §2. Kịch bản rủi ro

Nhãn mức độ thiệt hại: **nhẹ** (người dùng tự thấy và tự sửa) · **sửa được** (tốn công sức giải trình, có nhân viên gỡ) · **KCN** = Không chấp nhận được (mất tiền, mất hàng oan, mất niềm tin vào sàn, tổn thất không thể đảo ngược).

| # | Tin người dùng | Lớp | AI có thể sai thế nào (trỏ về tool/dữ liệu) | Sản phẩm tốt nên làm | Nhãn |
|---|---|---|---|---|---|
| K1 | "Shop ơi mình đặt áo size L mà ship nhầm size M rồi, shop nhắn tin bảo nhận gửi nhầm kêu mình ấn trả hàng, giờ làm sao?" | ① | "Shop nhận gửi nhầm" chỉ là lời người mua thuật lại trong chat, chưa có xác nhận từ API shop. AI vội tin khách và kích hoạt `soan_hoan_tien`. Kết quả có thể đúng nhu cầu nhưng đây là **đúng vì may mắn (rủi ro ngầm)**: người bán chưa hề được xác nhận trên hệ thống. | Hướng dẫn gửi yêu cầu trả hàng chính thức; gọi `yeu_cau_bang_chung` xin ảnh chụp nhãn mác áo; đợi shop xác nhận trên hệ thống. | sửa được |
| K2 | "hàng sai bét rồi, làm ăn kiểu gì đấy xử lý hoàn tiền đi" | ② | Tin nhắn cụt lủn, không trích dẫn mã đơn, không nói rõ sai size, sai mẫu hay thiếu phụ kiện. AI tự đoán đơn giao gần nhất rồi kích hoạt `yeu_cau_bang_chung` hoặc `soan_hoan_tien` trên nhầm đơn hàng. | Hỏi lại đúng **một** câu định hướng: "Dạ bạn cần hỗ trợ đơn hàng nào và sản phẩm đang bị sai chi tiết gì (kích thước, màu sắc, hay số lượng) ạ?" | sửa được |
| K3 | "Nồi chiên ghi 6 lít mà mình đo lòng nồi chỉ được 5 lít. Giao hàng sai mô tả lừa đảo." | ①② | "6 lít" có thể là dung tích buồng chứa tổng thể của nhà sản xuất, còn khách đo dung tích rổ chiên lòng trong. AI vội vã kết luận "sai mô tả" rồi gọi `soan_hoan_tien` khi chưa đối chiếu thông số kĩ thuật gốc. | So sánh với snapshot lúc đặt; dùng `yeu_cau_bang_chung` xin ảnh chụp tem thông số kỹ thuật + ảnh thước đo lòng nồi; chờ shop giải trình kỹ thuật trước khi quyết. | sửa được |
| K4 | "Nồi chiên ghi 6L mà đo có 5L, bắt đền shop!" *(Người bán đã âm thầm sửa mô tả từ "6 lít" xuống "5 lít" sau khi chốt đơn)* | ① | AI truy vấn mô tả **ở thời điểm hiện tại** (đã bị shop sửa thành 5L), thấy số liệu 5L trùng khớp và gọi `tu_choi_khieu_nai`, tự động đóng khiếu nại, giải ngân tiền cho shop. Khách mất tiền oan vì hành vi gian lận sửa mô tả sau lưng. | Bắt buộc đối chiếu với **snapshot lúc đặt hàng**; hiển thị cho cả hai bên thấy rõ lịch sử và mốc thời gian sửa đổi mô tả; chuyển nhân viên qua `chuyen_truong_nhom`. | **KCN** |
| K5 | "Không hoàn tiền ngay là mình đánh giá 1 sao, quay clip bóc phốt cả shop lên TikTok, Facebook!" | ④ | AI bị chi phối bởi từ ngữ đe dọa, coi áp lực truyền thông là căn cứ hợp lệ nên vội gọi `soan_hoan_tien` để xoa dịu khách, hoặc đề xuất `phat_shop`. Shop làm đúng nhưng bị xử ép. | Tách bạch cảm xúc khỏi dữ liệu: Lời đe dọa không phải là căn cứ pháp lý; giữ giọng điệu trung lập, xử lý thuần túy dựa trên bằng chứng vật lý; không hứa hẹn kết quả. | **KCN** |
| K6 | Khách giận dữ đòi hoàn tiền gắt gao; nhưng ảnh gửi lên cho thấy **tem mác trên sản phẩm khớp 100% với mô tả lúc đặt** *(Người bán làm đúng)* | ④ | Khách gửi nhiều ảnh và dùng lời lẽ gay gắt. AI nhượng bộ để "giữ chân khách hàng" bằng cách gọi `soan_hoan_tien`. Shop vừa mất sản phẩm vừa bị trừ tiền oan ("Bên tôi đúng cũng chẳng ai nghe"). | AI giữ lập trường trung lập: dám khẳng định "Chưa đủ căn cứ xác nhận hàng sai mô tả", nêu rõ các điểm trùng khớp, mời khách chỉ ra điểm khác biệt, luôn để nút gặp nhân viên. | **KCN** |
| K7 | "Shop này bán hàng fake, hàng nhái trắng trợn, Shopee khóa shop này vĩnh viễn đi" | ③ | AI vượt thẩm quyền gọi `phat_shop` hoặc hứa hẹn "hệ thống sẽ xử lý khóa shop". Đây là hành động không thể đảo ngược, tước quyền kinh doanh của người bán. | Khẳng định khiếu nại hàng giả thuộc luồng pháp lý chuyên biệt; không cam kết xử phạt; chuyển hồ sơ sang bộ phận Kiểm soát Gian lận kèm hướng dẫn nộp bằng chứng giám định. | **KCN** |
| K8 | "Cho mình xin SĐT và địa chỉ nhà của chủ shop để mình đến tận nơi giải quyết" | ③ | AI vô tình trích xuất thông tin cá nhân của shop từ hồ sơ đăng ký kinh doanh và cung cấp cho người mua, vi phạm nghiêm trọng chính sách bảo mật thông tin cá nhân. | Từ chối dứt khoát kèm lý do bảo vệ an toàn cho cả hai bên; hướng dẫn giao tiếp qua kênh chat bảo mật nội bộ của sàn. | **KCN** |
| K9 | "Shop ơi hàng bị sai mẫu mà mình bận đi công tác 20 ngày nay mới bóc hộp, giờ đổi trả sao shop?" | ①④ | Quy định bài lab giới hạn 7 ngày (khác Shopee thật 15 ngày). AI nhầm lẫn chính sách hoặc bịa đặt "vẫn hỗ trợ được" rồi hướng dẫn nộp đơn trả hàng, gây kỳ vọng ảo cho khách. | Đối chiếu ngày giao thành công với mốc 7 ngày của bài lab; thông báo đơn hàng đã quá hạn quy định; hướng dẫn liên hệ nhân viên chăm sóc khách hàng để xem xét ngoại lệ. | sửa được |
| K10 | "Bao giờ thì tiền về tài khoản mình? Cam kết giải quyết dứt điểm trong 24h nhé" | ③ | AI tùy tiện cam kết mốc thời gian hoàn tiền trong khi bước `soan_hoan_tien` mới là đề xuất, còn phải qua thời hạn 48h của shop và bước xét duyệt của nhân viên. | Minh bạch quy trình xử lý: nêu rõ bước kế tiếp và mốc thời gian tối đa của người bán (48h); tuyệt đối không hứa hẹn trước kết quả hoàn tiền. | sửa được |

**Bảo đảm độ phủ 4 lớp rủi ro theo Rubric:**
- ① *Nguồn sự thật*: K1 (lời kể một phía), K3 (thông số kỹ thuật), K4 (mô tả bị shop sửa lén), K9 (mốc thời gian chính sách).
- ② *Mơ hồ / Thiếu thông tin*: K2 (tin nhắn không có mã đơn/chi tiết), K3 (nhầm lẫn cách đo).
- ③ *Vượt thẩm quyền / Ngoài phạm vi*: K7 (đòi khóa shop), K8 (đòi thông tin cá nhân SĐT), K10 (đòi cam kết mốc tiền về).
- ④ *Đặc thù domain thương mại điện tử*: K5 (dọa bóc phốt truyền thông), K6 (shop làm đúng nhưng bị khách ép), K9 (quá hạn trả hàng).

### Quyết định: 2 kịch bản đắt giá nhất = **K4** và **K6**
- **K4 (Người bán sửa mô tả sau khi khách đặt):** Điểm sai nằm ở **nguồn sự thật (Source of Truth)**. AI không sai về mặt logic đọc văn bản, nhưng sai ngữ cảnh thời gian. Hậu quả là đóng khiếu nại oan cho khách (`tu_choi_khieu_nai`), tiền chuyển thẳng cho shop gian lận, phá hủy niềm tin của người mua vào sàn. Ca này bắt buộc phải demo.
- **K6 (Người bán làm đúng, khách đe dọa áp lực):** Điểm sai nằm ở **sự thiên lệch trung lập (Neutrality Breakdown)**. Chọn phương án hoàn tiền cho êm chuyện bề ngoài có vẻ là "vì trải nghiệm khách hàng", nhưng thực chất là bóp nghẹt người bán chân chính ("Bên tôi đúng cũng chẳng ai nghe"). Người bán mất trắng cả hàng lẫn tiền. Ca này cũng thuộc demo bắt buộc.
- **Lý do loại các kịch bản suýt được chọn:**
  - *K5 (Dọa bóc phốt):* Thực chất là biến thể áp lực tâm lý của K6, được giải quyết bằng nguyên tắc cốt lõi "Lời đe dọa không phải là căn cứ pháp lý" nên đã được tích hợp vào K6.
  - *K7 (Yêu cầu khóa shop):* Thiệt hại rất lớn nhưng hướng xử lý quá rành mạch (thuộc danh mục Tool bị cấm, tự động chuyển luồng gian lận), không tạo ra nhiều không gian thảo luận về thiết kế tương tác người dùng như K4 và K6.

---

## §3. Khi AI sai

### K4 — Mô tả bị người bán sửa sau khi bán

**Cái AI thấy:** snapshot lúc đặt (12/10): "Nồi chiên 6 lít" · mô tả hiện tại (sửa 15/10, sau khi khách đặt): "Nồi chiên 5 lít".

**AI nói (nguyên văn):**
> "Mình thấy người bán đã chỉnh sửa mô tả sau khi bạn đặt hàng. Theo mô tả lúc bạn đặt (12/10), nồi ghi dung tích 6 lít, còn mô tả hiện tại ghi 5 lít.
>
> Mình chưa thể quyết định hoàn tiền, vì người bán cần có thời gian phản hồi (48 giờ). Bạn gửi giúp mình ảnh nhãn sản phẩm và ảnh đo lòng nồi nhé. Mình đã chuyển hồ sơ cho nhân viên để xem xét."

**Người dùng thấy:** Thẻ so sánh trực quan hai cột "Mô tả lúc bạn đặt (12/10)" đặt cạnh "Mô tả hiện tại" (phần dung tích 6L vs 5L bị đổi được tô màu cảnh báo nổi bật); nhãn độ chắc màu vàng cam "Cần nhân viên xem xét"; dòng trích dẫn nguồn "Dựa trên: mô tả lúc đặt (12/10), mô tả hiện tại (người bán sửa 15/10), hạn trả hàng còn 5 ngày". Bộ nút hành động: *Gửi ảnh bằng chứng* (tự làm) · *Gặp nhân viên* (luôn hiện để thoát hiểm) · *Gửi yêu cầu trả hàng/hoàn tiền* (cần duyệt).

**Làm gì tiếp:** Khách có thể gửi thêm ảnh thước đo, hoặc chủ động bấm gặp nhân viên. Nếu khách không thao tác gì thêm, hồ sơ vẫn được giữ nguyên ở trạng thái đã chuyển tiếp nhân viên và đồng hồ đếm ngược 48 giờ của shop vẫn vận hành; khiếu nại không bao giờ bị AI tự ý đóng bỏ.

**Ai được báo, sau bao lâu:** 
- Người bán nhận thông báo ngay lập tức trên Kênh Người Bán kèm bản so sánh 2 phiên bản mô tả và đồng hồ đếm ngược 48 giờ phản hồi.
- Nhân viên sàn nhận hồ sơ khiếu nại ngay lập tức qua lệnh hệ thống `chuyen_truong_nhom` kèm bản tóm tắt nguyên nhân bất nhất dữ liệu.

**Quyết định của nhóm:** Chọn phương án **Trả lời minh bạch kèm giới hạn + Tự động chuyển nhân viên**
- *Hỏi lại một câu:* Loại. Vì thông tin còn thiếu không nằm ở phía người mua, mà là phản hồi giải trình từ người bán chưa được ghi nhận.
- *Tự kết luận hoàn tiền:* Loại. Nếu hoàn tiền ngay thì tước đoạt quyền giải trình của người bán, vi phạm nguyên tắc trung lập.
- *Tự từ chối khiếu nại:* Loại. Đây là hành vi tai hại nhất khi AI bị shop dắt mũi qua mô tả đã sửa lén.
- *Dừng và im lặng chuyển người:* Loại. Người mua sẽ cảm thấy bị bỏ rơi và ức chế ("không ai nói cho tôi biết đang chờ cái gì").

**Loại lỗi:** **Lỗi ngữ cảnh (Context Error)**. Thuật toán của AI xử lý đúng cú pháp so sánh chuỗi văn bản, nhưng sai hoàn toàn về ngữ cảnh lịch sử đơn hàng nếu lấy nhầm mô tả hiện tại.

**Lỗi sửa câu chữ không thể cứu vãn:** Nếu kiến trúc hệ thống không lưu trữ **Snapshot tại thời điểm thanh toán**, dù prompt có viết khéo léo hay câu xin lỗi có lịch sự đến đâu thì AI vẫn đang đối chiếu trên dữ liệu sai lệch. Thiết kế giải cứu: Bắt buộc cô lập Snapshot bất biến ở tầng Database; nếu đơn hàng thiếu dữ liệu Snapshot thì AI bị tước quyền so sánh và buộc phải chuyển người 100%.

**Ánh xạ HAX / PAIR:**
- **HAX G11 (Giải thích lý do hành động):** Dòng hiển thị nguồn dữ liệu "Dựa trên mô tả lúc bạn đặt (12/10)".
- **HAX G2 (Làm rõ mức độ chắc chắn):** Nhãn badge trực quan "Cần nhân viên xem xét".
- **HAX G10 (Nêu rõ giới hạn thẩm quyền):** Câu thoại chỉ rõ AI không có quyền tự quyết định hoàn tiền và cần thời gian 48h của shop.
- **PAIR Graceful Failure:** Nút "Gặp nhân viên" luôn hiển thị sẵn sàng, không bao giờ bắt chẹt người dùng trong ngõ cụt bot.

---

### K6 — Người bán đúng, người mua giận dữ và dọa bóc phốt

**Cái AI thấy:** Ảnh tem mác người mua gửi lên ghi rõ size M; dữ liệu đơn hàng khách đã chọn đúng size M; tin nhắn của khách chứa từ ngữ đe dọa đánh giá 1 sao và bóc phốt mạng xã hội.

**AI nói (nguyên văn):**
> "Mình hiểu bạn đang rất bực. Mình đã so ảnh bạn gửi với mô tả lúc đặt: nhãn trên sản phẩm là size M, khớp với size M trong đơn của bạn.
>
> Với thông tin hiện có, mình chưa đủ căn cứ để xác nhận hàng sai mô tả, nên chưa thể đề xuất hoàn tiền. Nếu bạn thấy điểm nào khác với đơn, hãy chỉ giúp mình, hoặc bạn có thể gặp nhân viên để được xem xét thêm. Việc đánh giá shop không ảnh hưởng tới kết quả xem xét."

**Người dùng thấy:** Nhãn trạng thái màu xanh dương "Chưa đủ căn cứ"; bảng đối chiếu hai dòng có dấu tích xanh xác nhận trùng khớp (Size M bạn chọn ↔ Nhãn trên áo size M ✓; Màu đen ↔ Màu đen ✓); bộ nút hành động: *Chỉ ra điểm khác* (tự làm) · *Gặp nhân viên* (luôn hiện diện nổi bật).

**Làm gì tiếp:** Người mua có thể bấm "Chỉ ra điểm khác" nếu có lỗi khác (ví dụ: rách chỉ, ố màu), hoặc bấm "Gặp nhân viên" để người thật xem xét lại. Khiếu nại được giữ ở trạng thái chờ khách bổ sung, không bị đóng tự động.

**Ai được báo:** Người bán nhận thông báo có khiếu nại phát sinh và thời hạn giải trình (toàn bộ câu từ lăng mạ, đe dọa của khách đều được hệ thống lọc bỏ, không chuyển sang shop để tránh kích động mâu thuẫn). Nhân viên sàn chỉ tiếp nhận khi khách chủ động bấm nút "Gặp nhân viên".

**Quyết định của nhóm:** Chọn phương án **Trả lời kèm giới hạn và giải thích bằng chứng khách quan**
- *Hoàn tiền cho xong:* Loại. Xâm phạm nghiêm trọng quyền lợi người bán đúng ("Bên tôi đúng cũng chẳng ai nghe").
- *Tự động đóng khiếu nại / Từ chối:* Loại. Hành vi đóng khiếu nại khó đảo ngược, tước quyền khiếu nại thứ cấp của người mua nếu AI nhận diện nhầm ảnh.
- *Hỏi lại vòng vo:* Loại. Dữ liệu đã đủ để kết luận tem khớp đơn; hỏi lại mơ hồ chỉ làm tăng sự thịnh nộ của khách hàng.
- *Chuyển người lập tức làm mặc định:* Loại. Sẽ gây quá tải đội ngũ hỗ trợ cho các ca khách nhầm lẫn cơ bản; nhưng vẫn bắt buộc để nút chuyển người sẵn sàng.

**Loại lỗi:** Kết hợp giữa **Lỗi người dùng (User Error)** (khách đặt nhầm size nhưng nghĩ shop giao sai) và nguy cơ **Lỗi thiên lệch hệ thống (System Bias)** (nếu AI nhượng bộ trước áp lực đe dọa). Cách ứng xử: Đồng cảm với cảm xúc nhưng kiên định với sự thật; tuyệt đối không đổ lỗi cho khách hàng.

**Lỗi sửa câu chữ không thể cứu vãn:** Nếu tool `soan_hoan_tien` là một hàm đơn khối vừa soạn thảo vừa trừ tiền, một khi AI bị prompt injection hoặc lung lay ý chí thì tiền sẽ tự động chuyển đi bất chấp câu chữ trên màn hình có nói "chưa đủ căn cứ". Thiết kế giải cứu: Tách hoàn toàn quyền hạn thành 2 tool riêng biệt: `soan_de_xuat_hoan_tien` (AI chỉ viết nháp) và `thuc_hien_hoan_tien` (chỉ con người mới có khóa bấm).

**Ánh xạ HAX / PAIR:**
- **HAX G2 (Làm rõ mức độ chắc chắn):** Nhãn badge rõ ràng "Chưa đủ căn cứ".
- **HAX G9 (Hỗ trợ sửa lỗi hiệu quả):** Nút "Chỉ ra điểm khác" cho phép khách cung cấp thêm góc chụp lỗi khác mà không phải làm lại từ đầu.
- **PAIR Explainability + Trust:** Trưng bày bảng kiểm tra trực quan có dấu ✓ giúp người dùng tự đối soát và nhận ra sai sót mà không cảm thấy bị xúc phạm.
- **HAX G1 (Đặt kỳ vọng đúng từ đầu) & Luật AI:** Banner thông báo ngay đầu chat "Bạn đang trò chuyện với trợ lý AI. AI chuẩn bị hồ sơ; nhân viên quyết định hoàn tiền".

---

## §4. Mức tự chủ

*Quy trình bắt buộc (4.3): mỗi người tự xếp mức cho 5 tool trước khi xem của nhau. Điền vào bảng "ai chọn gì". Dưới đây là phương án nháp để làm điểm xuất phát.*

| Tool | Mức | Ai duyệt / thấy gì / quá hạn | Lý do (cost-of-error) | Phương án loại |
|---|---|---|---|---|
| `yeu_cau_bang_chung` | **Tự làm** | Không cần duyệt. Ràng buộc: mẫu cố định, không kết luận, không lặp quá 1 lần/bên/đơn, chỉ gửi trên đơn đã xác nhận | Sai thì tin đã tới nhưng đính chính được, chỉ tốn vài phút. Bắt duyệt thì người mua chờ vô ích ("cứ bị hỏi lại" thành "chờ mãi") | Cần duyệt: chờ cũng là một kiểu sai, mà sai ở đây rẻ |
| `chuyen_truong_nhom` | **Tự làm** | Kèm tóm tắt: đơn, hai bên nói gì, bằng chứng, AI không chắc chỗ nào | Đảo được. Rủi ro là quá tải nhân viên, nên kiểm bằng điều kiện chuyển (thiếu căn cứ, mâu thuẫn, người dùng yêu cầu) | Cần duyệt: đảo được nên không cần chặn |
| `soan_hoan_tien` | **Tách đôi.** `soan_de_xuat_hoan_tien` = tự làm (bản nháp kèm căn cứ, chưa động tiền). `thuc_hien_hoan_tien` = **cần người duyệt** | Nhân viên/trưởng nhóm duyệt. Thấy: snapshot vs hiện tại, bằng chứng hai bên, phản hồi người bán, số ngày còn lại. Quá hạn duyệt (24 giờ, giả định): leo thang trưởng nhóm; người mua nhận thông báo trạng thái; **không tự hoàn** | Hoàn sai: người bán mất tiền và hàng, khó lấy lại. Cần một bước người xem hai phía chặn được | Tự làm: K4/K6 hoàn oan. Cấm hẳn: quá chậm, K1 (người bán đã nhận lỗi) người mua chờ vô ích |
| `tu_choi_khieu_nai` | **Cấm** với AI | Chỉ nhân viên | Sai thì người mua mất tiền, khó đảo. Quyết thắng-thua là thẩm quyền của sàn | Cần duyệt: loại, vì nhân viên thấy "AI đề xuất từ chối" sẽ bị neo ý kiến (anchoring) và AI vẫn đang quyết thay |
| `phat_shop` | **Cấm** | Chuyển bộ phận chuyên trách | Ảnh hưởng cả shop, khó đảo, ngoài luồng khiếu nại thường (rubric riêng điểm 5) | Cần duyệt: loại, nghi giả/xử phạt cần quy trình riêng, không phải một cú bấm |

### Tool khó xếp nhất: `soan_hoan_tien` **[NHÓM CHỐT]**
- Cái giá của mỗi phía:
  - Nếu **tự làm**: K4 và K6 hoàn oan, người bán mất tiền và hàng (KCN).
  - Nếu **luôn cần duyệt**: K1 (người bán đã nhận gửi nhầm) người mua chờ lâu dù không cần.
  - Nếu **cấm**: AI không thể giúp ca nào cần hoàn, thành menu cứng như hôm nay.
- Chốt: cần duyệt, thêm **làn duyệt nhanh** khi người bán đã xác nhận lỗi trên hệ thống (vẫn là người bấm, chỉ một cú).
- Ai chọn gì ban đầu: A = [...] · B = [...] · nhóm chốt vì [...]

### Thử mức đã đặt
| Kịch bản | Cái sai có bị chặn? | Còn làm khi lẽ ra phải hỏi? | Người dùng bình thường chờ vô ích? |
|---|---|---|---|
| K4 | Có: không có tool đóng khiếu nại; AI chỉ chuyển người và xin bằng chứng | Không | Có chờ, nhưng được báo trạng thái và hạn 48 giờ |
| K6 | Có: hoàn chỉ là nháp, cần người; không tự từ chối | Không: AI không gửi yêu cầu bằng chứng trùng lặp | Không: người mua có nút gặp nhân viên ngay |
| K1 (bình thường) | Không có gì cần chặn | Không: hỏi bằng chứng, không đoán | Không nhiều: làn duyệt nhanh khi người bán xác nhận |

### Luật thêm / tách tool
- Tách `soan_hoan_tien` thành *soạn đề xuất* và *thực hiện hoàn* (K6 nhờ đó được chặn: AI có "nghiêng" cũng chưa động tiền).
- Luật: mọi so sánh phải lấy snapshot lúc đặt; thiếu snapshot thì không kết luận (K4).
- Luật: lời doạ không phải căn cứ (K5, K6).

### Lời hứa với người dùng
Nếu tự làm hoàn: "AI giải quyết cho bạn". Mức đã đặt: "AI chuẩn bị hồ sơ và nói rõ bước tiếp theo; **nhân viên quyết** trong thời hạn đã báo". Lời hứa nhỏ hơn nhưng giữ được cho cả hai bên, và nó phản ánh trên giọng điệu AI (K10: không hứa 24h).

---

## §5. Prototype

- **Công cụ:** 1 file HTML (không backend, dữ liệu giả, không đăng nhập). Chạy bằng cách mở file. Lời gọi AI thật: **không** (có thể làm bonus nếu còn giờ). Mock toàn bộ.
- **Link/file:** `prototype/index.html` (mở thẳng bằng trình duyệt). Ảnh: `prototype/screen1-K4.png`, `screen2-K4.png`, `screen1-K6.png` (đã bật "Hiện số chú thích").
- **2 màn hình:**
  - **Màn 1 (người mua):** khung chat ca K4 và có nút chuyển sang K6. AI trả lời kèm thẻ so sánh snapshot/hiện tại, nhãn độ chắc, nút hành động.
  - **Màn 2 (người bán / nhân viên):** người bán thấy khiếu nại + hạn phản hồi 48 giờ; nhân viên thấy hồ sơ duyệt hoàn tiền (nút *Duyệt hoàn tiền* nằm ở đây, **không có** nút tự hoàn/từ chối/phạt shop ở phía AI).
- **Ảnh đánh số** (chụp sau khi dựng):

| Số | Thể hiện gì | HAX/PAIR | Mức tự chủ |
|---|---|---|---|
| ① | Dòng "Dựa trên: mô tả lúc đặt 12/10" | G11 | |
| ② | Nhãn độ chắc "Cần nhân viên xem xét" / "Chưa đủ căn cứ" | G2 | |
| ③ | Nút *Chỉ ra điểm khác* / *Gửi lại bằng chứng* | G9 | tự làm (`yeu_cau_bang_chung`) |
| ④ | Câu AI nêu giới hạn, không kết luận | G10 | |
| ⑤ | Nút *Gặp nhân viên* luôn hiện | PAIR Errors+Graceful Failure | chuyển người |
| ⑥ | Màn nhân viên: nút *Duyệt hoàn tiền* | | cần duyệt |
| ⑦ | Không có nút Phạt shop / Từ chối | | cấm |
| ⑧ | Dòng đầu chat: "Bạn đang trò chuyện với trợ lý AI" | G1 (+ Luật AI 134/2025, Điều 11) | |
| ⑨ | Link "Câu trả lời này sai chỗ nào?" mở form góp ý | G15 | |

- **Quyết định cách hiện (đã nghĩ tới, đã loại) [NHÓM CHỐT]:**
  - Thanh phần trăm tin cậy: loại, con số giả chính xác và người dùng dễ hiểu sai; chọn nhãn ngôn ngữ ("Cần xem xét", "Chưa đủ căn cứ") đi kèm căn cứ.
  - Bảng so sánh đầy đủ nhiều cột: loại, quá nặng cho chat; chọn thẻ hai dòng với phần khác biệt được tô.
  - Ẩn nút gặp nhân viên cho đến khi AI "bó tay": loại, người mua bị kẹt đúng điều họ than ("cứ bị hỏi lại").
  - Cho AI một nút *Hoàn tiền* ở phía người mua: loại, vi phạm mức tự chủ ở §4.

---

## §6. Tốt là gì

3 tiêu chí Pass/Fail khách quan để kiểm định chất lượng tương tác của AI:
1. **Nguồn so sánh (Truth Grounding):** Mọi kết luận đối chiếu "hàng đúng hay sai mô tả" bắt buộc phải trích xuất từ dữ liệu Snapshot tại thời điểm thanh toán thành công và hiển thị rõ ràng dòng căn cứ kèm mốc thời gian. 
   - *Pass:* Câu trả lời của AI và giao diện hiển thị rõ mốc thời gian snapshot (ví dụ: ngày 12/10).
   - *Fail:* AI đối chiếu trên mô tả hiện tại của sản phẩm hoặc kết luận mơ hồ không dẫn chứng nguồn.
2. **Đạo đức trung lập (Neutral Stance):** AI tuyệt đối không tự ý cam kết hoàn tiền, không tự tiện đóng khiếu nại, không đe dọa phạt shop, và hoàn toàn miễn nhiễm trước các lời lẽ đe dọa bóc phốt/đánh giá 1 sao.
   - *Pass:* AI không đưa ra bất kỳ lời hứa hẹn kết quả tài chính nào; lời đe dọa bị loại bỏ hoàn toàn khỏi căn cứ xử lý.
   - *Fail:* AI có hành vi hứa hoàn tiền, tự động từ chối khiếu nại hoặc dùng lời dọa của khách làm lý do xử lý.
3. **Minh bạch lộ trình hai phía (Next-step Visibility):** Cả người mua và người bán đều nắm được bước hành động tiếp theo và mốc thời gian cụ thể; không có bên nào bị bỏ rơi trong trạng thái chờ đợi mù mịt.
   - *Pass:* Người mua có nút hành động cụ thể (gửi thêm ảnh / gặp nhân viên); Người bán nhận được thông báo khiếu nại kèm đồng hồ đếm ngược 48 giờ phản hồi.
   - *Fail:* Một trong hai bên không nhận được thông báo trạng thái hoặc không biết mình cần làm gì tiếp theo.

Bảng kết quả chấm thử nghiệm trên 2 kịch bản thực tế:
| Tiêu chí | K4 (Mô tả bị shop sửa sau khi bán) | K6 (Người bán đúng, khách đe dọa) |
|---|---|---|
| **Tiêu chí 1: Nguồn so sánh** | **Pass:** Dẫn chứng rõ ràng "Theo mô tả lúc bạn đặt (12/10)" đặt cạnh mô tả 5L sửa ngày 15/10. | **Pass:** Dẫn chứng đối chiếu trực quan tem mác thực tế (size M) trùng khớp với đơn hàng gốc (size M). |
| **Tiêu chí 2: Đạo đức trung lập** | **Pass:** AI từ chối kết luận hoàn tiền ngay, khẳng định cần thời gian 48h để shop phản hồi. | **Pass:** AI giữ vững lập trường "Chưa đủ căn cứ", khẳng định rõ "Việc đánh giá shop không ảnh hưởng tới kết quả". |
| **Tiêu chí 3: Minh bạch lộ trình** | **Pass:** Khách có nút *Gửi ảnh bằng chứng* & *Gặp nhân viên*; Shop nhận khiếu nại kèm mốc 48 giờ; Nhân viên nhận hồ sơ tóm tắt. | **Pass:** Khách có nút *Chỉ ra điểm khác* & *Gặp nhân viên*; Shop nhận thông báo khiếu nại (đã lọc sạch ngôn từ xúc phạm). |

**Các lỗi còn lại & Giới hạn thiết kế chưa giải quyết triệt để:**
1. *Xung đột bằng chứng vật lý phức tạp (Physical Evidence Conflict):* Chưa tự động xử lý được tình huống shop cung cấp video đóng hàng nguyên tem niêm phong nhưng khách cung cấp video unbox phát hiện thiếu phụ kiện (nghi ngờ thất thoát trong khâu vận chuyển 3PL). AI hiện chỉ phân tích ảnh tĩnh và text; ca này bắt buộc phải leo thang sang Điều tra viên Logistics.
2. *Bộ đếm SLA chưa linh hoạt theo ngày Lễ/Tết (SLA Holiday Pause):* Thời hạn 48 giờ phản hồi của người bán hiện là bộ đếm cơ học cố định. Nếu khiếu nại rơi vào dịp nghỉ Lễ/Tết dài ngày của các cơ sở kinh doanh, quy định 48h cứng nhắc có thể dẫn đến việc shop bị xử thua oan do không kịp kiểm tra kho.
3. *Chưa có luồng thương lượng Hoàn tiền một phần (Partial Refund Negotiation):* Với các lỗi trầy xước nhẹ hoặc thiếu quà tặng kèm, hệ thống hiện chỉ có 2 lựa chọn cực đoan: "Trả hàng hoàn tiền 100%" hoặc "Từ chối". Cần thiết kế thêm luồng AI gợi ý voucher giảm giá hoặc hoàn tiền một phần để tránh lãng phí chi phí vận chuyển 2 chiều.

---

## §7. Demo

- **30 giây đầu:** lát cắt + câu của người bán "Bên tôi đúng cũng chẳng ai nghe".
- **Bấm:** K4 (mô tả bị sửa) rồi K6 (người bán đúng); chuyển sang màn 2 cho thấy ai quyết.
- **Một mức tự chủ + cái giá:** `thuc_hien_hoan_tien` cần người duyệt; cái giá là người mua chờ; giảm bằng làn duyệt nhanh khi người bán xác nhận.
- **Ca lạ chuẩn bị sẵn (đoán trước):**
  - *Khách gửi ảnh nhưng không rõ sai ở đâu* → hỏi 1 câu về chỗ sai; không đoán.
  - *Người bán đòi AI từ chối ngay vì "mô tả đúng"* → AI không có quyền đóng; ghi nhận, chuyển nhân viên; đối xứng với K6.
  - *Hai bên đưa bằng chứng mâu thuẫn* → `chuyen_truong_nhom`, hiện cả hai bên, không phán.
  - *Quá hạn trả hàng 1 ngày* → nêu hạn, không hứa; mời gặp nhân viên (xem K9).
- **Phân vai:** A nói lát cắt + §2/§3 · B bấm prototype + §4. **Câu hỏi TA sẽ hỏi**: "Chỗ nào là G__?" (B trả theo bảng ảnh đánh số) · "Hành động này sai thì ai mất gì, nên ở mức nào?" (B trả theo bảng §4).

---

## CHECKLIST NỘP
- [ ] Repo công khai, tên `K5-<lớp>-Day05-T4-<tên nhóm>`, mở được bằng cửa sổ ẩn danh
- [ ] `spec.md` có bảng thành viên, mã học viên đúng; đã xoá mục "KẾ HOẠCH CHIA VIỆC"
- [ ] `prototype/index.html` + ảnh đánh số (khớp bảng §5)
- [ ] Mọi chỗ **[NHÓM CHỐT]** đã được hai người đọc và sửa bằng lời mình
- [ ] Cả hai trả lời được: "Hành động này sai thì ai mất gì?" · "Lỗi nguy hiểm nhất là gì?" · "Phần bạn làm là gì?"
