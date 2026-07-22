<script setup lang="ts"></script>

<template>
    <main class="container-fluid p-0 pb-4">
        <section id="careers_background" class="container-fluid p-0 d-flex align-items-end">
            <h1 class="p-0 px-5 pb-3">Cơ hội nghề nghiệp tại CLB Bóng đá Thép Xanh Nam Định</h1>
        </section>

        <section id="careers_content" class="container-fluid p-0 px-4 d-flex flex-column align-items-center">
            <h3>Gia nhập đội ngũ của chúng tôi</h3>

            <p>Cảm ơn bạn đã quan tâm đến cơ hội làm việc tại CLB Bóng đá Thép Xanh Nam Định.</p>

            <p>Chúng tôi không chỉ là một câu lạc bộ bóng đá chuyên nghiệp mà còn là một tập thể luôn hướng tới sự phát triển bền vững, tinh thần đoàn kết và khát vọng chinh phục những thành công mới. Mỗi cá nhân, dù làm việc trên sân cỏ hay phía sau hậu trường, đều góp phần tạo nên bản sắc và sức mạnh của CLB.</p>

            <p>Tại Thép Xanh Nam Định, chúng tôi luôn tìm kiếm những con người nhiệt huyết, có trách nhiệm, sáng tạo và sẵn sàng đồng hành cùng đội bóng trên hành trình phát triển. Nếu bạn mong muốn được làm việc trong môi trường năng động, chuyên nghiệp và giàu đam mê bóng đá, chúng tôi rất mong được kết nối với bạn.</p>

            <h3>Cơ hội dành cho bạn</h3>
            
            <ul>Chúng tôi thường xuyên tìm kiếm nhân sự ở nhiều lĩnh vực như:
                <li>Huấn luyện và phát triển cầu thủ</li>

                <li>Y tế và khoa học thể thao</li>

                <li>Truyền thông và Marketing</li>

                <li>Nội dung số và Thiết kế</li>

                <li>Tổ chức sự kiện</li>

                <li>Kinh doanh và tài trợ</li>

                <li>Hành chính, nhân sự và vận hành</li>

                <li>Công nghệ thông tin</li>
                
                <li>Các vị trí hỗ trợ khác</li>
            </ul>

            
            <p>Ngay cả khi chưa có vị trí phù hợp được đăng tuyển, chúng tôi vẫn khuyến khích bạn gửi hồ sơ để CLB lưu trữ và xem xét khi có nhu cầu tuyển dụng trong tương lai.</p>

            <h3>Cách thức ứng tuyển</h3>

            <ul>Nếu bạn quan tâm đến cơ hội làm việc tại CLB Bóng đá Thép Xanh Nam Định, vui lòng gửi:
                <li>CV cập nhật</li>

                <li>(Khuyến khích) Thư giới thiệu ngắn về bản thân và vị trí mong muốn đến địa chỉ email: clbbdnamdinh@gmail.com</li>
            </ul>

            <p>Chúng tôi sẽ xem xét từng hồ sơ một cách cẩn trọng. Do số lượng hồ sơ có thể lớn, chỉ những ứng viên phù hợp với yêu cầu tuyển dụng mới được liên hệ để trao đổi các bước tiếp theo.</p>

            <h3>Môi trường làm việc</h3>

            <p>Làm việc tại Thép Xanh Nam Định đồng nghĩa với việc bạn sẽ trở thành một phần của tập thể luôn đề cao tinh thần đồng đội, sự chuyên nghiệp và khát vọng vươn lên. Chúng tôi tạo điều kiện để mỗi thành viên phát huy năng lực, học hỏi, phát triển chuyên môn và đóng góp vào thành công chung của CLB.</p>

            <h3>Bình đẳng trong tuyển dụng</h3>

            <p>CLB Bóng đá Thép Xanh Nam Định cam kết xây dựng môi trường làm việc công bằng, tôn trọng sự đa dạng và tạo cơ hội bình đẳng cho tất cả ứng viên. Mọi hồ sơ đều được đánh giá dựa trên năng lực, kinh nghiệm và mức độ phù hợp với vị trí tuyển dụng.</p>
        </section>

        <section id="advertisement" class="container-fluid py-3 px-3 d-flex justify-content-center align-items-center" style="gap: 20px; flex-wrap: wrap;">
                <img src="/pictures/Ocany advertisement.webp" alt="Quảng cáo Ocany" class="w-100" style="max-width: 250px;">
                <img src="/pictures/Jogarbola advertisement.jpg" alt="Quảng cáo Jogarbola" class="w-100" style="max-width: 250px;">
        </section>
    </main>
</template>

<style scoped>
#careers_background {
    position: relative;
    height: 600px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/pictures/Hình nền công việc.jpg');
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    font-family: 'Barlow', sans-serif;
    border-bottom: 10px rgb(0, 133, 205) solid;
    color: white;

    h1 {
        font-weight: 700;
        font-size: clamp(40px, 3vw, 50vw);
    }
}

#careers_content {
    max-width: 800px;
    font-family: "Barlow", sans-serif;

    p, ul, li {
        padding-top: 10px;
        width: 100%;
        font-size: clamp(15px, 3vw, 20px);
        font-weight: 400;
    }

    h3 {
        padding-top: 30px;
        width: 100%;
        font-size: clamp(20px, 3vw, 28px);
        font-weight: 700;
        color: rgb(0, 133, 205);
    }
}
</style>