const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const nameSong = $(".name-music");
const image = $(".image-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const isPlaying = false;
const progress = $("#progress");
const timeCurrent = $(".time-current");
const timeEnd = $(".time-end");
const prevBtn = $(".prev");
const nextBtn = $(".next");
const cd = $(".image-thumb");
const nute = $(".nute");
const playListSong = $(".play-list");




const _this = this;
const app = {
  currentIndex: 0,
  songs: [
    {
      name: "Hãy Trao Cho Anh",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/son_tung_m_tp_hay_trao_cho_anh_ft_snoop_dogg_official_mv_3235851961034898641.mp3",
      image: "./assets/images/haytraochoanh.jpg",
    },
    {
      name: "Nơi Này Có Anh",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/noi_nay_co_anh_official_music_video_son_tung_m_tp_389533849233227181.mp3",
      image: "./assets/images/noinaycoanh.jpg",
    },
    {
      name: "Chúng Ta Không Thuộc Về Nhau",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/chung_ta_khong_thuoc_ve_nhau_official_music_video_son_tung_m_tp_9167939245039770898.mp3",
      image: "./assets/images/chungtakhongthuocvenhau.png",
    },
    {
      name: "Chạy Ngay Đi",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/chay_ngay_di_run_now_son_tung_m_tp_official_music_video_kQrNB3MByoK-gucZFDHP.mp3",
      image: "./assets/images/chayngaydi.jpg",
    },
    {
      name: "Một Năm Mới Bình An",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/y2meta.com - VIRAL CLIP - MỘT NĂM MỚI BÌNH AN _ SƠN TÙNG M-TP (128 kbps).mp3",
      image: "./assets/images/motnammoibinhan.png",
    },
    {
      name: "Lạc Trôi",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/y2meta.com - LẠC TRÔI _ OFFICIAL MUSIC VIDEO _ SƠN TÙNG M-TP (128 kbps).mp3",
      image: "./assets/images/lactroi.jpg",
    },
    {
      name: "Không Phải Dạng Vừa Đâu",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/y2meta.com - KHÔNG PHẢI DẠNG VỪA ĐÂU - SƠN TÙNG MTP _ LYRICS VIDEO _ NHẠC KÝ (128 kbps).mp3",
      image: "./assets/images/khongphaidangvuadau.jpg",
    },
    {
      name: "Chúng Ta Của Hiện Tại",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/y2meta.com - CHÚNG TA CỦA HIỆN TẠI _ SƠN TÙNG M-TP _ AUDIO (128 kbps).mp3",
      image: "./assets/images/chungtacuahientai.jpg",
    },

    {
      name: "Hoa Cỏ Lau",
      singer: "Phong Max",
      path: "./assets/music/phong_max_hoa_co_lau_official_music_video_3894657416892600482.mp3",
      image: "./assets/images/hoacolau.jpg",
    },
  ],

  render: function() {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="playlist__content ${index === this.currentIndex ? "active" : ""}" data-index = ${index}>
            <div class="image-l">
            <img src="${song.image}" alt="">
            </div>
            <div class="info">
                <h3 class="name">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>
            `;
    });
    $(".play-list").innerHTML = htmls.join("");
  },

  handleEvent: function() {
    const _this = this;
    // xử lý quay đĩa
    const cdAnimate = cd.animate([
      {transform: "rotate(360deg)"}
    ],{
      duration:50000,
      Intersections: Infinity
    })
    cdAnimate.pause();
    

    // chuyển đổi thời gian thành phút : giây
    const formattedTime = (seconds)=>{
      const minutes = Math.floor(seconds / 60);
      seconds %= 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    // Xử lý playBtn
    playBtn.onclick = ()=> {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      
    };
    // Xử lý khi next
    nextBtn.onclick = ()=> {
      _this.nextSong();
      audio.play();
      _this.scrollToActiveSong();
    }
    // xử lý khi prev
    prevBtn.onclick = ()=> {
      _this.prevSong();
      audio.play();
      _this.scrollToActiveSong();
    }
    // xử lý khi hết bài
    audio.onended = ()=> {
      nextBtn.click();
    }
    // Xử lý khi bật tắt âm thanh
    var isMuted = false;
    nute.onclick = ()=> {
      console.log(isMuted);
      if (isMuted) {
        audio.muted = false; // Bật âm thanh
        $('.offVolume').style.display = 'none';
        $('.onVolume').style.display = 'block';
      } else {
        audio.muted = true; // Tắt âm thanh
        $('.offVolume').style.display = 'block';
        $('.onVolume').style.display = 'none';
      }
      isMuted = !isMuted; // Đảo ngược trạng thái
    }
    // khi playBtn
    audio.onplay = ()=> {
      _this.isPlaying = true;
      playBtn.classList.add("playing");
      cdAnimate.play();
    };
    // khi pause
    audio.onpause =  ()=> {
      _this.isPlaying = false;
      playBtn.classList.remove("playing");
      cdAnimate.pause();
    };
    // xử lý tiến độ bài hát thay đổi
    
    audio.ontimeupdate = ()=>{
      if(audio.duration) {
        timeCurrent.innerHTML = formattedTime(Math.floor(audio.currentTime));
        timeEnd.innerHTML = formattedTime(Math.floor(audio.duration));
        progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
      }
    }
    // Xử lý tua xong
    progress.onchange = (e)=>{
      const seekTime = audio.duration / 100 * e.target.value;
      audio.currentTime = seekTime;
    }
    
    // Xử lý khi click vào danh sách bài hát
    playListSong.onclick = (e)=>{
      const songElement = e.target.closest('.playlist__content:not(.active)');

     if(songElement||e.target.closest('.option')){
        if(songElement){
          _this.currentIndex = Number(songElement.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
        // click vào opsion
     }
    }
  },
  // xử lý khi click vào danh sách bài hát 
  scrollToActiveSong: function(){
    console.log("hah");
      setTimeout(()=>{
        const scrollActive = $(".playlist__content.active");
        if (scrollActive) {
          scrollActive.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else {
          console.error('Element not found');
        }
      },200);
  },

  defineProperties: function() {
    Object.defineProperty(this, "currentSong", {
      get: function() {
        return this.songs[this.currentIndex];
        
      },
    });
  },

  loadCurrentSong: function() {
    nameSong.textContent = this.currentSong.name;
    image.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    this.render();
  },
  
  nextSong: function() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function() {
    this.currentIndex--;
    console.log(this.currentIndex);
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  
  start: function(){
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();
    // Tải thông tin bài hát đầu tiên vào UI
    this.loadCurrentSong();
    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvent();
    // Tải giao diện
    this.render();
  },
};

app.start();
