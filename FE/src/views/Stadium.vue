<script setup lang="ts">

</script>
<template>
    <main id="stadium_page"
        class="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center">
        <div id="stadium_image_background" class="container-fluid m-0 p-0"></div>

        <section id="stadium_content" class="container-fluid p-0 px-md-5 px-4 mt-3">
            <div class="container-fluid p-0">
                <h1 class="text-center">SÂN VẬN ĐỘNG THIÊN TRƯỜNG</h1>
                <p>Sân vận động Thiên Trường được khánh thành vào năm 2003, là niềm tự hào của người dân thành Nam và là sân nhà của Thép Xanh Nam Định. Nằm tại trung tâm thành phố Nam Định, sân được xây dựng nhằm phục vụ SEA Games 22, đồng thời tạo nên một công trình thể thao hiện đại, mang đậm bản sắc văn hóa Việt Nam. 
                    Từ một khu vực từng là sân Chùa Cuối cũ, Thiên Trường đã vươn mình trở thành một trong những sân vận động đẹp và giàu cảm xúc nhất Việt Nam, thường xuyên tổ chức các trận đấu quốc nội, quốc tế cũng như nhiều sự kiện thể thao lớn.</p>
                <p>Với sức chứa khoảng 30.000 chỗ ngồi, sân Thiên Trường là một trong những sân vận động lớn và sôi động nhất Việt Nam.
                Không chỉ là nơi diễn ra các trận đấu, sân còn được người hâm mộ gọi bằng cái tên đầy cảm xúc “Nhà máy dệt giấc mơ”, biểu tượng cho niềm tin và khát vọng của bóng đá Nam Định.
                Thiên Trường từng đăng cai các trận đấu tại SEA Games 2003, các trận của đội tuyển quốc gia và nhiều giải đấu quan trọng, khẳng định vị thế là một trong những sân đấu hàng đầu khu vực phía Bắc.</p>
            </div>

            <div class="container-fluid p-0 mt-4 d-flex flex-column justify-content-center align-items-center">
                <h3 class="w-100">MẶT SÂN VÀ CƠ SỞ HẠ TẦNG</h3>
                <ul class="w-100">
                    <li>Kích thước: 115m x 72m (đạt tiêu chuẩn quốc tế)</li>
                    <li>Mặt cỏ tự nhiên chất lượng cao, phù hợp khí hậu Việt Nam</li>
                    <li>Gồm 4 khán đài chính: A, B, C, D</li>
                    <li>Khán đài A & B: mỗi khu ~7.000 chỗ</li>
                    <li>Khán đài C & D: mỗi khu ~3.000 chỗ</li>
                    <li>20 cổng ra vào</li>
                    <li>Khu VIP, phòng họp báo, khu tác nghiệp</li>
                    <li>Phòng thay đồ, y tế và khu chức năng riêng biệt</li>
                    <li>Hệ thống chiếu sáng đạt chuẩn thi đấu ban đêm</li>
                </ul>

                <img class="container w-75" src="/pictures/Sơ đồ svd.jpg">
            </div>

            <div class="container-fluid p-0 mt-4">
                <h3>KIẾN TRÚC VÀ THIẾT KẾ</h3>
                <p>Sân Thiên Trường được thiết kế với hình dáng cân đối, mang nét đặc trưng của kiến trúc Việt Nam:</p>
                <ul>
                    <li>Mái che cong mềm mại gợi hình ảnh mái đình truyền thống</li>
                    <li>Khung bê tông cốt thép vững chắc</li>
                    <li>Màu vàng chủ đạo tượng trưng cho khát vọng và niềm tin chiến thắng</li>
                </ul>
                <p>Đây là một trong những công trình thể thao hiếm hoi tại Việt Nam hoàn thành đúng ngân sách (~70,5 tỷ VNĐ) mà vẫn đảm bảo chất lượng cao.</p>
            </div>

            <div class="container-fluid p-0 mt-4">
                <h3>DI CHUYỂN TỚI SVĐ</h3>
                <ul>
                    <li>Địa chỉ: Đường Đặng Xuân Thiều, phường Vị Hoàng, thành phố Nam Định, tỉnh Nam Định</li>
                    <li>Từ ga Nam Định: khoảng 2–3 km, bạn có thể đi taxi hoặc xe máy theo các trục đường trung tâm</li>
                    <li>Từ quốc lộ 10: di chuyển theo hướng vào thành phố, hỏi lối rẽ về phường Vị Hoàng – đường Đặng Xuân Thiều</li>
                    <li>Gửi xe: Các bãi gửi xe tự phát xung quanh sân thường hoạt động vào ngày có trận đấu; nên đến sớm để đảm bảo chỗ</li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
#stadium_image_background {
    height: 100dvh;
    overflow: hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(../pictures/SVĐ\ Thiên\ Trường\ 3.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

}

#stadium_content {
    font-family: 'Barlow', sans-serif;
    white-space: pre-line;

    h1 {
        padding: 10px 0;
        color: rgb(0, 133, 205);
        font-weight: 700;
        font-size: clamp(30px, 6vw, 45px);

    }

    h3 {
        padding-bottom: 10px;
        color: rgb(0, 133, 205);
        font-weight: 700;
        font-size: clamp(20px, 4vw, 30px);
    }

    p, ul {
        padding: 5px 0;
        font-weight: 500;
        font-size: clamp(15px, 2vw, 18px);
    }
}

@media screen and (max-width: 720px) {

    #stadium_image_background {
        height: 400px;
    }
}
</style>