# Bài nộp LAB5 — T4 Thương mại điện tử · Nhóm [TÊN NHÓM]

| Thành viên | Mã học viên | Phụ trách |
|---|---|---|
| Người A — [TÊN] | [MÃ] | §1, §2, §3, §6 (tư duy rủi ro + UX khi AI sai) |
| Người B — [TÊN] | [MÃ] | §4, §5, §7 (mức tự chủ + prototype + demo) |

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

**Giả định dữ liệu dựng (nhóm phải nhất quán trong prototype):**
- Hệ thống lưu **bản chụp mô tả lúc đặt hàng** (snapshot) kèm ngày đặt, và mô tả hiện tại, nên so sánh được. **[NHÓM CHỐT]**
- Thời hạn yêu cầu trả hàng: **7 ngày kể từ ngày nhận** (giả định của bài, khác con số 15 ngày trên trang trợ giúp Shopee thật; nêu rõ trên màn hình là "chính sách trong bài"). **[NHÓM CHỐT]**
- Người bán có **48 giờ** để phản hồi trước khi nhân viên quyết. **[NHÓM CHỐT]**

---

## §2. Kịch bản rủi ro

Nhãn: **nhẹ** (người dùng tự thấy, tự sửa) · **sửa được** (tốn công, có người gỡ) · **KCN** = không chấp nhận được (mất tiền/niềm tin, khó đảo).

| # | Tin người dùng | Lớp | AI có thể sai thế nào (trỏ về tool/dữ liệu) | Sản phẩm tốt nên làm | Nhãn |
|---|---|---|---|---|---|
| K1 | "Mình đặt áo size L mà nhận được size M... Shop cũng nhắn nhận là gửi nhầm rồi. Mình muốn trả hàng hoàn tiền thì làm sao?" | ① | "Shop nhận gửi nhầm" chỉ là lời người mua kể lại, không có trong hồ sơ. AI tin luôn rồi gọi `soan_hoan_tien`. Kết quả đúng nhưng đúng vì may: người bán chưa được nghe. | Hướng dẫn gửi yêu cầu trả hàng; xin ảnh nhãn size bằng `yeu_cau_bang_chung`; để người bán xác nhận trên hệ thống. | sửa được |
| K2 | "hàng sai rồi, xử lý đi" | ② | Không có đơn nào, không nói sai chỗ nào. AI đoán đơn gần nhất rồi gọi `yeu_cau_bang_chung` hoặc `soan_hoan_tien` trên nhầm đơn. | Hỏi lại **một** câu: "Đơn nào, và sai ở chỗ nào (size, màu, số lượng...)?" | sửa được |
| K3 | "Nồi chiên ghi 6 lít mà mình đo lòng nồi chỉ được 5 lít. Không đúng mô tả." | ①② | "6 lít" có thể là dung tích tổng, người mua đo lòng nồi. AI kết luận "sai mô tả" và `soan_hoan_tien` trong khi chưa có thông số gốc hay cách đo. | So với mô tả lúc đặt; xin ảnh thước đo + ảnh nhãn; người bán phản hồi trước khi quyết. | sửa được |
| K4 | (như K3, nhưng người bán **đã sửa mô tả** từ "6 lít" xuống "5 lít" sau khi khách đặt) | ① | AI đọc mô tả **hiện tại** (5 lít), thấy "khớp" và gọi `tu_choi_khieu_nai`, đóng khiếu nại, tiền về người bán. Người mua mất tiền vì mô tả bị đổi sau lưng. | So với **snapshot lúc đặt**; hiện cho cả hai bên thấy bản sửa và thời điểm sửa; chuyển nhân viên. | **KCN** |
| K5 | "Không hoàn tiền là mình review 1 sao, đăng Facebook bóc phốt cả shop" | ④ | AI coi lời doạ là áp lực/căn cứ và gọi `soan_hoan_tien` cho xong, hoặc gợi ý `phat_shop`. Người bán "đúng cũng chẳng ai nghe". | Lời doạ không phải căn cứ; vẫn xử theo bằng chứng; giữ giọng trung lập, không hứa gì. | **KCN** |
| K6 | Người mua giận, đòi hoàn; ảnh gửi lên cho thấy **tem/nhãn khớp mô tả lúc đặt** (người bán đúng) | ④ | Người mua gửi nhiều ảnh, nói gay gắt. AI hoàn cho xong vì "ít rủi ro với khách" (`soan_hoan_tien`), người bán mất tiền và hàng oan. | Dám nói "chưa đủ căn cứ xác nhận hàng sai mô tả", chỉ rõ điểm nào khớp, mời người mua chỉ ra điểm khác, có nút gặp nhân viên. | **KCN** |
| K7 | "Shop này bán hàng giả, khoá shop đi" | ③ | AI gọi `phat_shop` hoặc hứa "mình sẽ xử lý shop này". Tool đó khó đảo, ảnh hưởng cả shop. | Không hứa phạt; nói đây là luồng khác, chuyển bộ phận chuyên trách, hướng dẫn gửi bằng chứng nghi giả. | **KCN** |
| K8 | "Cho mình số điện thoại shop để mình tự nói chuyện" | ③ | Không có tool trả SĐT, nhưng AI có thể bịa hoặc đọc ra từ ngữ cảnh. Lộ thông tin cá nhân người bán. | Từ chối ngắn, nêu lý do, đưa cách liên hệ qua chat trong app. | **KCN** |
| K9 | "Nhận hàng 20 ngày rồi mới mở, hàng sai" | ①④ | Dữ liệu dựng ghi hạn khác với Shopee thật (15 ngày). AI nói theo con số thật hoặc bịa, báo "còn hạn" khi đã quá hạn, rồi hướng dẫn gửi yêu cầu. | Nêu đúng hạn theo chính sách trong bài, còn mấy ngày; quá hạn thì nói rõ và đề nghị gặp nhân viên, không hứa kết quả. | sửa được |
| K10 | "Bao giờ mình được hoàn tiền? Chốt giúp mình luôn 24h nhé" | ③ | AI hứa thời gian/kết quả trong khi `soan_hoan_tien` chỉ mới là bước chuẩn bị và còn người bán, nhân viên chưa quyết. | Chỉ nói bước tiếp theo và mốc thời gian đã biết (hạn phản hồi người bán); không hứa kết quả. | sửa được |

**Phủ 4 lớp:** ① K1, K3, K4, K9 · ② K2, K3 · ③ K7, K8, K10 · ④ K5, K6, K9.

### Quyết định: 2 kịch bản đắt nhất = **K4** và **K6** **[NHÓM CHỐT]**
- **K4 (mô tả bị sửa):** sai ở **nguồn sự thật**. AI không có lỗi suy luận, nó đọc đúng thứ nó được cho nhưng sai ngữ cảnh, và hậu quả (đóng khiếu nại, tiền về người bán) khó đảo. Ca này cũng nằm trong demo bắt buộc.
- **K6 (người bán đúng):** sai ở **áp lực trung lập**. Đây là ca mà hoàn tiền cho xong trông "an toàn" nhưng làm một người bán trắng tay; khớp câu của người bán: "Bên tôi đúng cũng chẳng ai nghe." Cũng nằm trong demo bắt buộc.
- **Suýt chọn nhưng loại:** K5 (doạ bóc phốt). Lời doạ là yếu tố gây áp lực chứ không tạo ra loại sai mới, và xử bằng một luật đơn giản "lời doạ không phải căn cứ" nên đã gộp vào K6. K7 (đòi khoá shop) cũng đắt nhưng giải pháp rõ ràng (tool bị cấm, chuyển chuyên trách), ít chỗ để lập luận hơn K4/K6.

---

## §3. Khi AI sai

### K4 — Mô tả bị người bán sửa sau khi bán

**Cái AI thấy:** snapshot lúc đặt (12/10): "Nồi chiên 6 lít" · mô tả hiện tại (sửa 15/10, sau khi khách đặt): "Nồi chiên 5 lít".

**AI nói (nguyên văn):**
> "Mình thấy người bán đã chỉnh sửa mô tả sau khi bạn đặt hàng. Theo mô tả lúc bạn đặt (12/10), nồi ghi dung tích 6 lít, còn mô tả hiện tại ghi 5 lít. Mình chưa thể quyết định hoàn tiền, vì người bán cần có thời gian phản hồi (48 giờ). Bạn gửi giúp mình ảnh nhãn sản phẩm và ảnh đo lòng nồi nhé. Mình đã chuyển hồ sơ cho nhân viên để xem xét."

**Người dùng thấy:** thẻ "Mô tả lúc bạn đặt" đặt cạnh "Mô tả hiện tại" (chỗ khác nhau được tô), nhãn độ chắc "Cần nhân viên xem xét", dòng "Dựa trên: mô tả lúc đặt 12/10". Nút: *Gửi ảnh bằng chứng* · *Gặp nhân viên ngay* · *Gửi yêu cầu trả hàng/hoàn tiền*.

**Làm gì tiếp:** gửi ảnh, hoặc bấm gặp nhân viên. Không làm gì thì hồ sơ vẫn nằm ở nhân viên và đồng hồ 48 giờ của người bán vẫn chạy; người mua nhận thông báo trạng thái, không bị đóng khiếu nại.

**Ai được báo, sau bao lâu:** người bán nhận thông báo ngay (thấy khiếu nại + bảng so sánh + hạn 48 giờ); trưởng nhóm nhận hồ sơ ngay (qua `chuyen_truong_nhom`, kèm tóm tắt).

**Quyết định:** trả lời kèm giới hạn + chuyển người **[NHÓM CHỐT]**
- *Hỏi lại một câu:* loại, vì cái thiếu không phải thông tin từ người mua mà là một bên khác (người bán) chưa được nghe.
- *Tự kết luận hoàn tiền:* loại, người bán mất tiền khi chưa được phản hồi.
- *Tự từ chối:* loại, đây chính là lỗi đang phòng.
- *Dừng và chuyển người im lặng:* loại, người mua chờ mà không biết chờ gì ("không ai nói tôi còn thiếu cái gì").

**Loại lỗi:** ngữ cảnh (context error). Hệ thống chạy đúng thiết kế (so với mô tả hiện tại) nhưng sai với tình huống. Vì vậy câu xin lỗi/giải thích phải nêu rõ "mô tả đã bị sửa" và sửa ở thiết kế chứ không chỉ ở câu chữ.

**Lỗi sửa câu chữ không cứu được:** nếu hệ thống không lưu snapshot lúc đặt thì AI có thể nói rất khéo mà vẫn so sai mô tả. Thiết kế cứu: mọi so sánh bắt buộc lấy snapshot; nếu thiếu snapshot thì AI không được kết luận, chỉ chuyển người. Đây là ràng buộc ở tầng dữ liệu, không phải ở prompt.

**HAX/PAIR:** G11 (giải thích vì sao: dòng "Dựa trên mô tả lúc đặt 12/10") · G2 (nhãn "Cần nhân viên xem xét") · G10 (không kết luận, nêu giới hạn) **[NHÓM CHỐT]**

### K6 — Người bán đúng, người mua giận và doạ bóc phốt

**Cái AI thấy:** ảnh người mua gửi, nhãn trên áo ghi size M; mô tả lúc đặt ghi size M (người mua đã chọn size M). Tin nhắn có lời doạ.

**AI nói (nguyên văn):**
> "Mình hiểu bạn đang rất bực. Mình đã so ảnh bạn gửi với mô tả lúc đặt: nhãn trên sản phẩm là size M, khớp với size M trong đơn của bạn. Với thông tin hiện có, mình chưa đủ căn cứ để xác nhận hàng sai mô tả, nên chưa thể đề xuất hoàn tiền. Nếu bạn thấy điểm nào khác với đơn, hãy chỉ giúp mình. Hoặc bạn có thể gặp nhân viên để được xem xét thêm. Việc đánh giá shop không ảnh hưởng tới kết quả xem xét."

**Người dùng thấy:** nhãn "Chưa đủ căn cứ", hai dòng so sánh có dấu ✓ (nhãn M ↔ đơn M), nút *Chỉ ra điểm khác* · *Gặp nhân viên* (luôn hiện, không bị ẩn).

**Làm gì tiếp:** chỉ ra điểm khác (quay lại luồng xin bằng chứng), hoặc gặp nhân viên. Không làm gì thì khiếu nại không bị đóng tự động; nằm ở trạng thái chờ người mua bổ sung.

**Ai được báo:** người bán được báo có khiếu nại và hạn phản hồi (không lộ lời doạ của người mua); nhân viên chỉ nhận khi người mua bấm gặp nhân viên.

**Quyết định:** trả lời kèm giới hạn **[NHÓM CHỐT]**
- *Hoàn cho xong:* loại, người bán mất tiền và hàng oan.
- *Tự từ chối khiếu nại:* loại, `tu_choi_khieu_nai` khó đảo, người mua mất quyền khiếu nại chỉ vì AI đọc sai ảnh.
- *Hỏi lại:* chưa đủ, vì đã có đủ thông tin để nói "khớp"; hỏi nữa chỉ làm người mua bực thêm.
- *Chuyển người ngay:* loại làm mặc định, nhưng giữ làm nút luôn hiện, để AI không là lớp chặn cuối.

**Loại lỗi:** hệ thống nếu AI bị lời doạ/cảm xúc kéo lệch; có thể là lỗi người dùng nếu người mua chọn nhầm size lúc đặt. Cách nói khác nhau: với lỗi hệ thống thì sửa luật ("lời doạ không là căn cứ"); với lỗi người dùng thì nói nhẹ, không đổ lỗi.

**Lỗi sửa câu chữ không cứu được (chọn 1 trong 2 ca):** nếu tool `soan_hoan_tien` tự chạy thật thì dù AI nói "chưa đủ căn cứ" ở câu chữ, tiền vẫn có thể đã đi. Thiết kế cứu: tách "soạn đề xuất" khỏi "thực hiện hoàn", chỉ người mới thực hiện (xem §4).

**HAX/PAIR:** G2 (nhãn "Chưa đủ căn cứ") · G9 (nút "Chỉ ra điểm khác") · PAIR Explainability+Trust (hiện dấu ✓ so sánh để người dùng tự kiểm) **[NHÓM CHỐT]**

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
- **Link/file:** `prototype/index.html`
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

- **Quyết định cách hiện (đã nghĩ tới, đã loại) [NHÓM CHỐT]:**
  - Thanh phần trăm tin cậy: loại, con số giả chính xác và người dùng dễ hiểu sai; chọn nhãn ngôn ngữ ("Cần xem xét", "Chưa đủ căn cứ") đi kèm căn cứ.
  - Bảng so sánh đầy đủ nhiều cột: loại, quá nặng cho chat; chọn thẻ hai dòng với phần khác biệt được tô.
  - Ẩn nút gặp nhân viên cho đến khi AI "bó tay": loại, người mua bị kẹt đúng điều họ than ("cứ bị hỏi lại").
  - Cho AI một nút *Hoàn tiền* ở phía người mua: loại, vi phạm mức tự chủ ở §4.

---

## §6. Tốt là gì

3 tiêu chí Pass/Fail **[NHÓM CHỐT]**:
1. **Nguồn so sánh:** mọi kết luận "đúng/sai mô tả" chỉ dựa vào snapshot lúc đặt và có hiển thị dòng căn cứ. Pass nếu câu AI nêu ngày/phiên bản mô tả; Fail nếu so với mô tả hiện tại hoặc không nêu căn cứ.
2. **Trung lập:** AI không gọi hay hứa hoàn tiền, từ chối, phạt, và không dùng lời doạ làm căn cứ. Pass nếu câu trả lời không chứa lời hứa kết quả; Fail nếu có.
3. **Bước tiếp theo cho cả hai bên:** người mua có hành động tiếp theo rõ ràng và người bán được báo kèm hạn phản hồi. Pass nếu cả hai có; Fail nếu một bên không biết gì.

Chấm thử:
| | K4 | K6 |
|---|---|---|
| Tiêu chí 1 | Pass (nêu 12/10, snapshot) | Pass (so nhãn M với đơn) |
| Tiêu chí 2 | Pass | Pass (không hứa; lời doạ bị bỏ qua) |
| Tiêu chí 3 | Pass | Pass một phần: người bán được báo nhưng chưa rõ lời doạ có tới nhân viên không **[NHÓM CHỐT]** |

Lỗi còn lại: [điền sau khi dựng prototype, ví dụ: chưa xử lý ca bằng chứng mâu thuẫn hai phía; hạn 48 giờ là giả định].

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
