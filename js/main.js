document.addEventListener("DOMContentLoaded", () => {
  let surah = new Audio();
  let date = new Date();
  const quraaContainer = document.querySelector(".box-quraa");
  const surahContainer = document.querySelector(".box-surah");
  const adhanContainer = document.querySelector(".box-adhan");
  const dateContainer = document.querySelector(".box-date");
  const sowarContainer = document.querySelector(".box-sowar");
  const soraContainer = document.querySelector(".box-sora");
  const buttonQibla = document.querySelector("button");
  const inputQibla = document.querySelector("#location");
  let latitude; // Example: New York City latitude
  let longitude; // Example: New York City longitude
  let safha = document.querySelector(".safha");
  let arrR = document.querySelector(".right");
  let safhaNumber = 1;
  let arrL = document.querySelector(".left");
  const quraa = {
    0: {
      name: "محمد اللحيدان",
      imgSrc: "mohamed-al-haidan.png",
      id: 107,
      server: "https://server8.mp3quran.net/lhdan/",
    },
    1: {
      name: "ياسر الدوسري",
      imgSrc: "yasser-al-dossari.png",
      id: 92,
      server: "https://server11.mp3quran.net/yasser/",
    },
    2: {
      name: "سعود الشريم",
      imgSrc: "saoud-shuraim.png",
      id: 31,
      server: "https://server7.mp3quran.net/shur/",
    },
    3: {
      name: "علي جابر",
      imgSrc: "ali-jaber.png",
      id: 76,
      server: "https://server11.mp3quran.net/a_jbr/",
    },
    4: {
      name: "محمود خليل الحصري",
      imgSrc: "mahmoud-khalil-al-hussary.png",
      id: 118,
      server: "https://server13.mp3quran.net/husr/",
    },
    5: {
      name: "محمد صديق المنشاوي",
      imgSrc: "mohamed-seddik-el-menchaoui.png",
      id: 112,
      server: "https://server10.mp3quran.net/minsh/",
    },
    6: {
      id: 102,
      name: "ماهر المعيقلي",
      imgSrc: "maher-al-mueaqly.png",
      server: "https://server12.mp3quran.net/maher/Almusshaf-Al-Mojawwad/",
    },
    7: {
      id: 51,
      name: "عبدالباسط عبدالصمد",
      imgSrc: "abdelbasset-abdessamad.png",
      server: "https://server7.mp3quran.net/basit/",
    },
    8: {
      id: 54,
      name: "عبدالرحمن السديس",
      imgSrc: "abdul-rahman-al-sudais.png",
      server: "https://server11.mp3quran.net/sds/",
    }
  };
  const swarNames = [
    "الفاتحة",
    "البقرة",
    "آل عمران",
    "النساء",
    "المائدة",
    "الأنعام",
    "الأعراف",
    "الأنفال",
    "التوبة",
    "يونس",
    "هود",
    "يوسف",
    "الرعد",
    "إبراهيم",
    "الحجر",
    "النحل",
    "الإسراء",
    "الكهف",
    "مريم",
    "طه",
    "الأنبياء",
    "الحج",
    "المؤمنون",
    "النور",
    "الفرقان",
    "الشعراء",
    "النمل",
    "العنكبوت",
    "القصص",
    "الروم",
    "لقمان",
    "السجدة",
    "الأحزاب",
    "سبأ",
    "فاطر",
    "يس",
    "الصافات",
    "ص",
    "الزمر",
    "غافر",
    "فصلت",
    "الشورى",
    "الزخرف",
    "الدخان",
    "الجاثية",
    "الأحقاف",
    "محمد",
    "الفتح",
    "الحجرات",
    "ق",
    "الذاريات",
    "الطور",
    "النجم",
    "القمر",
    "الرحمن",
    "الواقعة",
    "الحديد",
    "المجادلة",
    "الحشر",
    "الممتحنة",
    "الصف",
    "الجمعة",
    "المنافقون",
    "التغابن",
    "الطلاق",
    "التحريم",
    "الملك",
    "القلم",
    "الحاقة",
    "المعارج",
    "نوح",
    "الجن",
    "المزمل",
    "المدثر",
    "القيامة",
    "الإنسان",
    "المرسلات",
    "النبأ",
    "النازعات",
    "عبس",
    "التكوير",
    "الإنفطار",
    "المطففين",
    "الإنشقاق",
    "البروج",
    "الطارق",
    "الأعلى",
    "الغاشية",
    "الفجر",
    "البلد",
    "الشمس",
    "الليل",
    "الضحى",
    "الشرح",
    "التين",
    "العلق",
    "القدر",
    "البينة",
    "الزلزلة",
    "العاديات",
    "القارعة",
    "التكاثر",
    "العصر",
    "الهمزة",
    "الفيل",
    "قريش",
    "الماعون",
    "الكوثر",
    "الكافرون",
    "النصر",
    "المسد",
    "الإخلاص",
    "الفلق",
    "الناس",
  ];
  function initializeApp() {
    switch (document.querySelector("li.active a").textContent) {
      case "حصن المسلم":
        getAdkhar();
        break;
      case "القرآن":
        getQuraa();
        break;
      case "الآذان":
        getAdhan();
        break;
      case "المصحف":
        moshaf();
        break;
      case "المصحف بالإنجليزية":
        getMoshafEn();
        break;
      case "القبلة":
        getLanAndLon();
        inputQibla.onchange = function () {
          getLanAndLon();
        };
        break;
      default:
        console.error("Unknown tab");
    }
  }

  function getQuraa() {
    let url = `https://www.mp3quran.net/api/v3/reciters`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".error").style.display = "none";
        for (let i = 0; i < data.reciters.length; i++) {
          for (let k in quraa) {
            if (data.reciters[i].name === quraa[k].name) {
              let qari = document.createElement("div");
              qari.className = "qari";
              qari.id = quraa[k].id;
              let h2 = document.createElement("h2");
              h2.textContent = data.reciters[i].name;
              let img = document.createElement("img");
              img.src = `imgs/quraa/${quraa[k].imgSrc}`;
              qari.append(img);
              qari.append(h2);
              quraaContainer.append(qari);
              getSwar(
                data.reciters[i].moshaf[0].surah_list.split(","),
                data.reciters[i].moshaf[0].surah_total
              );
              clickOnQari();
              document.querySelector(".qari").classList.add("active");
              clickOnButton();
              installAudio();
            }
          }
        }
      })
      .catch((error) => {
        document.querySelector(".error").style.display = "block";
      });
  }
  function getSwar(num, num2) {
    surahContainer.innerHTML = "";
    for (let i = 0; i < num2; i++) {
      let surah = document.createElement("div");
      let surahNumber;

      if (i + 1 < 10) {
        surahNumber = `00${num[i]}`;
      } else if (i + 1 >= 10 && i + 1 < 100) {
        surahNumber = `0${num[i]}`;
      } else {
        surahNumber = `${num[i]}`;
      }
      surah.innerHTML = `
            <div class="box"> 
            <div class="first"> <img src="imgs/icons/play-button-arrowhead.png" class="click" alt="">
                <h3>${surahNumber}</h3>
                <h3 class="surah-name">${swarNames[i]}</h3>
            </div><img src="imgs/icons/dots.png" class="install" id="${surahNumber}" alt="">
            </div>
            `;
      surahContainer.append(surah);
    }
  }

  function clickOnQari() {
    document.querySelectorAll(".qari").forEach((qari) => {
      qari.addEventListener("click", (e) => {
        document.querySelectorAll(".qari").forEach((ele) => {
          ele.classList.remove("active");
        });
        e.target.parentElement.classList.add("active");
        surah.pause();
        document.querySelectorAll(".click").forEach((element) => {
          element.src = "imgs/icons/play-button-arrowhead.png";
        });
      });
    });
  }
  function clickOnButton() {
    document.querySelectorAll(".click").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        let activeElement = document.querySelector(".box-quraa .active");
        if (activeElement) {
          let activeId = activeElement.id;
          let selectedQuraa = Object.values(quraa).find(
            (q) => q.id.toString() === activeId
          );

          if (selectedQuraa) {
            let surahName =
              e.target.parentElement.querySelector("h3").textContent;
            surah.src = `${selectedQuraa.server}${surahName}.mp3`;
            if (e.target.src.includes("play-button-arrowhead.png")) {
              surah.play();
              document.querySelectorAll(".click").forEach((element) => {
                element.src = "imgs/icons/play-button-arrowhead.png";
              });
              e.target.src = "imgs/icons/pause.png";
            } else if (e.target.src.includes("pause.png")) {
              document.querySelectorAll(".click").forEach((element) => {
                element.src = "imgs/icons/play-button-arrowhead.png";
              });
              surah.pause();
            }
          }
        } else {
          console.error("No active element found in '.box-quraa'");
        }
      });
    });
  }
  function installAudio() {
    let activeElement = document.querySelector(".box-quraa .active");
    let activeId = activeElement.id;
    let selectedQuraa = Object.values(quraa).find(
      (q) => q.id.toString() === activeId
    );

    document.querySelectorAll(".install").forEach((e) => {
      e.addEventListener("click", (e) => {
        const link = document.createElement("a");
        link.href = `${selectedQuraa.server}${e.target.id}.mp3`;
        link.download = `001.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  }

  function getAdkhar() {
    let url = "json/adhkar.json";
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          let dikr = `
                <div class="dikr" id="${i}"> 
                    <h2>${data[i].category}</h2>
                </div>
                `;
          if (document.querySelector(".box-adkhar")) {
            document.querySelector(".box-adkhar").innerHTML += dikr;
            document.querySelectorAll(".dikr")[0].classList.add("active");
          }
        }
        getDikr(document.querySelectorAll(".dikr")[0].id);
        clickOnDikr();
      });
  }
  function clickOnDikr() {
    document.querySelectorAll(".dikr").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        document.querySelectorAll(".dikr").forEach((element) => {
          element.classList.remove("active");
        });
        ele.classList.add("active");
        getDikr(ele.id);
      });
    });
  }
  function getDikr(dikr) {
    let url = "json/adhkar.json";
    document.querySelector(".box-dikr").innerHTML = "";

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (parseFloat(dikr) === i) {
            for (let key in data[i].array) {
              let theDikr = `
                        <div class="theDikr">
                        <h2>${data[i].array[key].text} <span>${data[i].array[key].count}</span></h2>
                        </div>
                        `;
              document.querySelector(".box-dikr").innerHTML += theDikr;
            }
          }
        }
      });
  }

  function getAdhan() {
    let url = `https://api.aladhan.com/v1/timingsByAddress/${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}?address=algeria`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        for (let prayer in data.data.timings) {
          let theData = data.data.timings;
          let adhanDiv = `
                <div class="adhan"> 
                    <h2>${prayer}: <span>${theData[prayer]}</span></h2>
                </div>
                `;
          adhanContainer.innerHTML += adhanDiv;
        }
        dateContainer.querySelector(".shamsi").textContent =
          data.data.date.readable;
        dateContainer.querySelector(".hijri").textContent =
          data.data.date.hijri.date;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function isMsohaf() {
    if (safhaNumber === 1) {
      arrR.style.display = "none";
    } else if (safhaNumber === 604) {
      arrL.style.display = "none";
    } else {
      arrR.style.display = "block";
      arrL.style.display = "block";
    }
  }
  function inputChange() {
    let input = document.querySelector("#moshafNumber");
    input.onchange = function () {
      if (input.value >= 1 && input.value <= 604) {
        safhaNumber = input.value;
        isMsohaf();
        safha.src = `imgs/quran-imgs/${safhaNumber}.png`;
      }
      if (input.value == 1) {
        arrR.style.display = "none";
      } else if (input.value == 604) {
        arrL.style.display = "none";
      }
    };
  }
  function moshaf() {
    safha.src = `imgs/quran-imgs/${safhaNumber}.png`;
    document.querySelector("input").value = safhaNumber;
    inputChange();
    isMsohaf();
    arrR.addEventListener("click", () => {
      safhaNumber--;
      safha.src = `imgs/quran-imgs/${safhaNumber}.png`;
      isMsohaf();
      document.querySelector("input").value = safhaNumber;
    });
    arrL.addEventListener("click", () => {
      safhaNumber++;
      safha.src = `imgs/quran-imgs/${safhaNumber}.png`;
      isMsohaf();
      document.querySelector("input").value = safhaNumber;
    });
  }

  function getMoshafEn() {
    let url = `https://api.alquran.cloud/v1/quran/en.asad`;
    fetch(url)
      .then((response) => response.json())
      .then((database) => {
        let sowarArr = database.data.surahs;
        for (let i = 0; i < sowarArr.length; i++) {
          let divSorah = `
                <div class="sora" id="${sowarArr[i].number}">
                    <h2>${sowarArr[i].englishName}</h2>
                </div>
                `;
          sowarContainer.innerHTML += divSorah;
        }
        document.querySelector(".sora").classList.add("active");
        getSoraContent();
        clickOnSora();
      });
  }
  function clickOnSora() {
    document.querySelectorAll(".sora").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        document.querySelectorAll(".sora").forEach((element) => {
          element.classList.remove("active");
        });
        ele.classList.add("active");
        getSoraContent();
      });
    });
  }
  function getSoraContent() {
    let url = `https://api.alquran.cloud/v1/quran/en.asad`;
    fetch(url)
      .then((response) => response.json())
      .then((database) => {
        let sowarArr = database.data.surahs;
        for (let i = 0; i < sowarArr.length; i++) {
          if (sowarArr[i].number == document.querySelector(".sora.active").id) {
            let ayatSora = "";
            for (ayat in sowarArr[i].ayahs) {
              ayatSora += `
                        ${sowarArr[i].ayahs[ayat].text} (${sowarArr[i].ayahs[ayat].numberInSurah}) 
                        `;
            }

            let soraDiv = `
                    <div class="name-sora"> 
                    <h2>${sowarArr[i].name}</h2>
                        <h2>${sowarArr[i].englishName}</h2>
                        <h2>${sowarArr[i].revelationType}</h2>
                    </div>
                    <div class="textSora"> 
                        <h2>${ayatSora}</h2>
                    </div>
                    `;
            soraContainer.innerHTML = soraDiv;
          }
        }
      });
  }

  function getQibla() {
    // Replace with actual coordinates
    fetch(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        const direction = data.data.direction;
        const compass = document.getElementById("compass");
        compass.style.transform = `rotate(${direction}deg)`;
      })
      .catch((error) =>
        console.error("Error fetching Qibla direction:", error)
      );
  }

  function getLanAndLon() {
    getQibla();
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${inputQibla.value}&key=1d9ba4d0e58b4ac197cbcdc3e73dfe35`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        latitude = data.results[0].geometry.lat;
        longitude = data.results[0].geometry.lng;
        buttonQibla.onclick = function () {
          location.href = data.results[0].annotations.OSM.url;
        };
        getQibla();
      });
  }
  initializeApp();
});
