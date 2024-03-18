// переменные для карусели и слайдов
const carousel = document.querySelector('.participants__carousel');
const slides = carousel.querySelectorAll('.carousel__item');

// переменные для переключателей
const leftButton = document.querySelector('.participants__left-button')
const rightButton = document.querySelector('.participants__right-button')
// переменные для нумерации слайдов
const slideNumber = document.querySelector('.participants__switch-page_active')
const slidesQuantity = document.querySelector('.participants__switch-page')

const placesButtonLeft = document.querySelector(".places__button-left")
const placesButtonRight = document.querySelector(".places__button-right")
const dots = document.querySelectorAll(".places__dots")
const placesContainer = document.querySelector(".places__items")

let currentIndexSlieds = 0

let currentIndexCarousel = 0
let interval

const totalSlides = slides.length

// обновляем карусель
function updateCarousel() {
    const cardWidth = getCardWidthPercent()
    // console.log(cardWidth)
    const translateValue = -currentIndexCarousel * cardWidth
    carousel.style.transform = `translateX(${translateValue}%)`
    updateCounter()
}

// обновляем счетчик
function updateCounter() {
    slideNumber.textContent = currentIndexCarousel + 1
    slidesQuantity.textContent = totalSlides
}

// переключение с кнопки
function prevCards() {
    currentIndexCarousel = (currentIndexCarousel - 1 + totalSlides) % totalSlides
    updateCarousel()
}

function nextCards() {
    currentIndexCarousel = (currentIndexCarousel + 1) % totalSlides
    updateCarousel()
}

// автоматическая смена слайдов
function avtoCarusel() {
    interval = setInterval(() => {
        nextCards()
    }, 4000)
}

// определяем ширину прокрутки в зависимости от размера экрана
function getCardWidthPercent() {
    console.log(window.innerWidth)
    let res
    if (window.innerWidth < 691) {
        res = 100
    } else if (window.innerWidth > 690 && window.innerWidth <= 1000) {
        res = 50
    } else {
        res = 33.33
    }
    return res
}

// обновление карусели places
function updatePlacesSlide() {
    const translateValue = -currentIndexSlieds * 100
    placesContainer.style.transform = `translateX(${translateValue}%)`
    dots.forEach((dot, index) => {
        dot.classList.toggle("dots-active", index === currentIndexSlieds)
    })
}
// обновление кнопок
function toggleButton() {
    gridBtnLeft.classList.toggle('disabled', currentIndexSlieds === 0)
    gridBtnRight.classList.toggle('disabled', currentIndexSlieds === dots.length - 1)
}

// адаптация под мобильный экран lead
function replace() {
  const form = document.querySelector(".form");
  const first = document.querySelector(".first");
  const second = document.querySelector(".second");
  const img = document.querySelector(".lead__image");
  if (window.innerWidth <= 960 ) {
    form.append(second)
  } else  {
    form.append(img)
    first.innerHTML = '<p class="lead__subtitle first">ЧТОБЫ ПОДДЕРЖАТЬ МЕЖДУНАРОДНЫЙ ВАСЮКИНСКИЙ ТУРНИР <span class="lead__subtitle second"> ПОСЕТИТЕ ЛЕКЦИЮ НА ТЕМУ: <span class="lead__subtitle_red "> «ПЛОДОТВОРНАЯ ДЕБЮТНАЯ ИДЕЯ»</span></span></p>'
    second.remove()
  }
  return form
};

// адаптация под мобильный экран participants
function replaceSwitch() {
    const form = document.querySelector(".participants");
    const first = document.querySelector(".participants__title-container");
    const second = document.querySelector(".participants__switch-container");
    const carousel = document.querySelector(".participants-carousel-hider");
    if (window.innerWidth <= 690 ) {
      form.append(second)
    } else  {
      form.append(carousel)
      first.append(second )
    //   second.remove()
    }
    return form
};

// адаптация под мобильный экран places
function replacePlacesItems() {
    const first = document.querySelector(".first-item");
    const second = document.querySelector(".second-item");
    const four = document.querySelector(".four-item")
    const five = document.querySelector(".five-item")

    const number2 = document.querySelector(".replace-number-2");
    const text2 = document.querySelector(".replace-text-2");
    const number5 = document.querySelector(".replace-number-5");
    const text5 = document.querySelector(".replace-text-5");

    if (window.innerWidth <= 960 ) {
      first.append(number2)
      first.append(text2)
      four.append(number5)
      four.append(text5)
    } else  {
      second.append(number2)
      second.append(text2)
      five.append(number5)
      five.append(text5)
    }
};

// слушатели на кнопки переключения слайдов
rightButton.addEventListener('click', () => {
    nextCards()
})

leftButton.addEventListener('click', () => {
    prevCards()
})

placesButtonLeft.addEventListener("click", () => {
    if (currentIndexSlieds > 0) {
        currentIndexSlieds--
        updatePlacesSlide()
        updateButtonStyles()
    }
})

placesButtonRight.addEventListener("click", () => {
    if (currentIndexSlieds < dots.length - 1) {
        currentIndexSlieds++
        updatePlacesSlide()
        toggleButton()
    }
})

// слушатель на размер экрана
window.addEventListener('resize', (e) =>
    replace(e)
);
window.addEventListener('resize', (e) =>
    replaceSwitch(e)
);
window.addEventListener('resize', (e) =>
replacePlacesItems(e)
);

// вызов функции карусели и автопрокрутки
updateCarousel()
avtoCarusel()
replace()
replaceSwitch()
replacePlacesItems()