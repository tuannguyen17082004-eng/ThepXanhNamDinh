<script setup lang="ts"></script>

<template>
    <main class="container-fluid p-0">
        <section id="introduction_background" class="container-fluid p-0 position-relative">
            <video src="/pictures/Video trang giới thiệu.mp4" class="w-100 position-absolute" muted autoplay></video>

            <div id="filter" class="container-fluid h-100 p-0 d-flex align-items-end">
                <h1 class="p-0 px-sm-5 p-3">CLB Bóng đá Thép Xanh Nam Định</h1>
            </div>
        </section>

        <section id="introduction_content" class="container-fluid p-0 d-flex flex-column align-items-center">
            <div class="row w-100 m-0 p-4">
                <div class="col-md-6 px-md-3 p-0 d-flex flex-column align-items-center justify-content-center">
                    <p class="mt-3">Câu lạc bộ Bóng đá Thép Xanh Nam Định là một trong những đội bóng giàu truyền thống và có lượng người hâm mộ đông đảo nhất Việt Nam. Đội bóng có trụ sở tại thành phố Nam Định, thi đấu tại V.League 1 – giải đấu cao nhất của bóng đá Việt Nam. Với lịch sử phát triển lâu đời cùng bản sắc riêng, Thép Xanh Nam Định luôn là niềm tự hào của người dân thành Nam và là biểu tượng của tinh thần đoàn kết, ý chí vươn lên trong thể thao.</p>

                    <p>Tiền thân của câu lạc bộ là Đội bóng đá Nam Hà, được thành lập vào năm 1965. Trải qua nhiều giai đoạn phát triển, thay đổi tên gọi và mô hình hoạt động, đội bóng vẫn luôn gìn giữ truyền thống, tinh thần thi đấu quyết tâm và lối chơi cống hiến. Bước sang giai đoạn mới với sự đồng hành của nhà tài trợ Thép Xanh, câu lạc bộ đã có những bước phát triển mạnh mẽ về cơ sở vật chất, chất lượng đội hình và tham vọng chinh phục các danh hiệu.</p>
                </div>

                <div class="col-md-6 p-sm-4" style="aspect-ratio: 16 / 9; overflow: hidden; background-image: url('/pictures/CLB.png'); background-size: cover; background-repeat: no-repeat; background-position: center;">
                </div>
            </div>

            <div class="row w-100 m-0 p-4" style="background-color: rgb(0, 133, 205); color: white;">
                <div class="col-md-6 p-sm-4" style="aspect-ratio: 16 / 9; overflow: hidden; background-image: url('/pictures/San 0.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
                </div>

                <div class="col-md-6 px-md-3 p-0 d-flex flex-column align-items-center justify-content-center">
                    <p>Sân vận động Thiên Trường là sân nhà của Thép Xanh Nam Định và được xem là một trong những sân vận động có bầu không khí sôi động nhất Việt Nam. Với sức chứa hơn 30.000 chỗ ngồi, nơi đây luôn ngập tràn sắc vàng của người hâm mộ trong mỗi trận đấu. Sự cổ vũ cuồng nhiệt từ các cổ động viên đã trở thành nguồn động lực to lớn, góp phần tạo nên bản sắc và sức mạnh tinh thần của đội bóng.</p>

                    <div class="row p-0 m-0 w-100">
                        <div class="col-6 p-0" style="aspect-ratio: 16 / 9; overflow: hidden;">
                            <img src="/pictures/San 1.jpg" style="width: 100%;">
                        </div>

                        <div class="col-6 ps-3 p-0" style="aspect-ratio: 16 / 9; overflow: hidden;">
                            <img src="/pictures/San 2.jpg" style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 p-4">
                <div class="col-md-6 px-md-3 p-0 d-flex flex-column align-items-center justify-content-center">
                    <p>Trong những năm gần đây, Thép Xanh Nam Định không ngừng khẳng định vị thế bằng việc xây dựng đội hình chất lượng, kết hợp giữa các cầu thủ giàu kinh nghiệm và những tài năng trẻ triển vọng. Đội bóng luôn hướng đến lối chơi hiện đại, tinh thần thi đấu máu lửa và mục tiêu cạnh tranh những danh hiệu cao nhất ở các giải đấu quốc nội.</p>

                    <p>Không chỉ là một câu lạc bộ bóng đá chuyên nghiệp, Thép Xanh Nam Định còn là biểu tượng của niềm đam mê bóng đá, lòng trung thành và sự gắn kết giữa đội bóng với người hâm mộ. Với truyền thống hơn nửa thế kỷ, nền tảng vững chắc cùng khát vọng vươn lên, Thép Xanh Nam Định đang từng bước khẳng định vị thế là một trong những câu lạc bộ hàng đầu của bóng đá Việt Nam.</p>
                </div>

                <div class="col-md-6 p-sm-4" style="aspect-ratio: 16 / 9; overflow: hidden; background-image: url('/pictures/Fan.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
                </div>
            </div>          
        </section>

        <section id="advertisement" class="container-fluid py-3 px-3 d-flex justify-content-center align-items-center" style="gap: 20px; flex-wrap: wrap;">
                <img src="/pictures/Ocany advertisement.webp" alt="Quảng cáo Ocany" class="w-100" style="max-width: 250px;">
                <img src="/pictures/Jogarbola advertisement.jpg" alt="Quảng cáo Jogarbola" class="w-100" style="max-width: 250px;">
        </section>
    </main>
</template>

<style scoped>
#introduction_background {
    height: 100dvh;
    overflow: hidden;
    z-index: 1;

    video {
        z-index: 2;
        height: 100dvh;
        object-fit: cover;
    }

    #filter {
        position: relative;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
        z-index: 50;
        font-family: 'Barlow', sans-serif;
        color: white;

        h1 {
            font-weight: 700;
            font-size: clamp(40px, 3vw, 50vw);
        }
    }
}

#introduction_content {
    font-family: "Barlow", sans-serif;

    p {
        padding-top: 10px;
        width: 100%;
        font-size: clamp(15px, 3vw, 20px);
        font-weight: 400;
    }
}
</style>