<script setup lang="ts"></script>

<template>
    <main class="container-fluid p-0">
        <section id="background" class="container-fluid p-0 d-flex align-items-end">
            <div class="container-fluid p-3">
                <h1>THÔNG TIN GIÁ VÉ</h1>
            </div>
        </section>

        <section id="content" class="container-fluid p-0 mt-4 px-4 d-flex align-items-center flex-column">
            <p>Để mua vé xem các trận đấu của Câu lạc bộ Thép Xanh Nam Định tại sân nhà Thiên Trường, người hâm mộ có thể mua trực tiếp tại phòng vé (cổng giữa khán đài A-D, SVĐ Thiên Trường) hoặc đặt mua trực tuyến thông qua nền tảng Trang bán vé CLB Thép Xanh Nam Định <a href="https://datve.clbnamdinh.vn/?fbclid=IwY2xjawQk8vBleHRuA2FlbQIxMABicmlkETFJSnY5TW9hY3lFNGJDVlR3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHiAciJVZaJJguu_9R9z9VL17unfyVnlUyIcd-jIhk7hKBH_Wv05b8ZVuPQkX_aem_hP1uyhrXHCtxxh3f8dzEjg">tại đây</a> khi câu lạc bộ mở bán chính thức.</p>
            
            <ul class="p-0">Mệnh giá vé thường được chia theo các khán đài cụ thể:
                <li class="pt-2">Khán đài A1, A2, A3, A4: 80.000 VNĐ</li>
                <li class="pt-2">Khán đài A5, A6, B: 40.000 VNĐ</li>
                <li class="pt-2">Khán đài D: 10.000 VNĐ</li>
            </ul>

            <img src="/pictures/Sơ đồ svd.jpg" alt="Sơ đồ SVĐ">

            <p class="pt-3">Ngoài ra, vé mùa cũng là lựa chọn dành cho những người hâm mộ luôn sát cánh cùng CLB Thép Xanh Nam Định trên mọi chặng đường. Chỉ với một lần đăng ký, bạn sẽ sở hữu quyền vào sân trong toàn bộ các trận đấu sân nhà của mùa giải, không cần lo lắng về việc mua vé từng trận.</p>
        
            <p>Không chỉ mang đến sự thuận tiện, vé mùa còn là lời khẳng định cho tình yêu và sự gắn bó với đội bóng. Mỗi lần có mặt trên khán đài, bạn sẽ góp phần tạo nên bầu không khí cuồng nhiệt, tiếp thêm động lực để các cầu thủ thi đấu hết mình vì màu cờ sắc áo.</p>

            <p>Hãy sở hữu vé mùa ngay hôm nay để đồng hành cùng Thép Xanh Nam Định trong suốt mùa giải và cùng nhau viết tiếp những khoảnh khắc đáng nhớ trên sân Thiên Trường.</p>
        </section>

        <section id="advertisement" class="container-fluid py-3 px-3 d-flex justify-content-center align-items-center" style="gap: 20px; flex-wrap: wrap;">
                <img src="/pictures/Ocany advertisement.webp" alt="Quảng cáo Ocany" class="w-100" style="max-width: 250px;">
                <img src="/pictures/Jogarbola advertisement.jpg" alt="Quảng cáo Jogarbola" class="w-100" style="max-width: 250px;">
        </section>
    </main>
</template>

<style scoped>
#background {
    height: 40vh;
    background-color: rgb(0, 133, 205);
    font-family: 'Barlow', sans-serif;
    color: white;

    h1 {
        font-weight: 700;
    }
}

#content {
    max-width: 800px;
    font-family: "Barlow", sans-serif;

    p, ul, li {
        width: 100%;
        font-size: clamp(15px, 3vw, 20px);
        font-weight: 500;
    }

    img {
        width: 100%;
        min-width: 250px;
    }
}
</style>