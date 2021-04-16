const word_el = document.getElementById('word');
const popup = document.getElementById("popup");
const message = document.getElementById("success-message");

const correctLetters = [];
const wrongLetters = [];

const selectedWord = getRandomWord();
const playAgain = document.getElementById("btnPlayAgain");

const wrongHarfs = document.getElementById("wrongHarfs");
const items = document.querySelectorAll(".item");

const message_el = document.getElementById("message");

let sayac = 0;


function getRandomWord() {
    const words = ["Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
}

function displayWord() {

    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}
    
    `;

    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        message.innerText = "Tebrikler. Doğru Bildiniz !";
        popup.style.display = "flex";
        popup.classList.add("popup-success");
        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                location.reload();
            }
        });
    }

    if (w !== selectedWord) {
        wrongHarfs.innerText = wrongLetters;
    }
}

function messageInfo() {
    message_el.innerText = "Bu harfi zaten Eklediniz.";
    message_el.classList.add("show");
    setTimeout(function () {
        message_el.innerText = "Bu harfi zaten Eklediniz.";
        message_el.classList.remove("show");
    }, 2000);
}

window.addEventListener("keydown", function (e) {
    const key = e.key;
    if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 222 || e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 186 || e.keyCode == 220 || e.keyCode == 191) {

        if (selectedWord.includes(key)) {
            if (!correctLetters.includes(key)) {
                correctLetters.push(key);
                displayWord();
            } else {
                messageInfo();
            }
        } else {
            if (!wrongLetters.includes(key)) {
                wrongLetters.push(key);
                updateWrongLetters();
                displayWord();
            } else {
                messageInfo();
            }
        }
    }
});

playAgain.addEventListener("click", function (e) {
    location.reload();
});

function updateWrongLetters() {
    if (sayac >= 0 && sayac < 5) {
        items[sayac].style.display = "flex";
        sayac++;
    } else {
        popup.style.display = "flex";
        message.innerText = "Hata. Bilemediniz !";
        popup.classList.add("popup-error");

        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                location.reload();
            }
        });
    }
}

console.log(selectedWord);
displayWord();