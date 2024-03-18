function Ant(crslId) {

	let id = document.getElementById(crslId);
	if(id) {
		this.crslRoot = id
	}
	else {
		this.crslRoot = document.querySelector('.content__participants')
	};

	// Carousel objects
	this.crslList = this.crslRoot.querySelector('.participants__carousel');
	this.crslElements = this.crslList.querySelectorAll('.carousel__item');
	this.crslElemFirst = this.crslList.querySelector('.carousel__item');
	this.leftArrow = this.crslRoot.querySelector('.participants__left-button');
	this.rightArrow = this.crslRoot.querySelector('.participants__right-button');
	// this.indicatorDots = this.crslRoot.querySelector('.participants__switch-pages');

	// Initialization
	this.options = Ant.defaults;
	Ant.initialize(this)
};

Ant.defaults = {

	// Default options for the carousel
	elemVisible: 3, // Кол-во отображаемых элементов в карусели
	loop: true,     // Бесконечное зацикливание карусели 
	auto: true,     // Автоматическая прокрутка
	interval: 5000, // Интервал между прокруткой элементов (мс)
	speed: 750,     // Скорость анимации (мс)
	// touch: true,    // Прокрутка  прикосновением
	arrows: true,   // Прокрутка стрелками
	// dots: true      // Индикаторные точки
};

Ant.prototype.elemPrev = function(num) {
	num = num || 3;

	// if(this.options.dots) this.dotOn(this.currentElement);
	this.currentElement -= num;

	// if(this.currentElement < 0) this.currentElement = this.dotsVisible-1;
	// if(this.options.dots) this.dotOff(this.currentElement);

    // сдвиг вправо с циклом
		let elm, buf, this$ = this;
		for(let i=0; i<num; i++) {
			elm = this.crslList.lastElementChild;
			buf = elm.cloneNode(true);
			this.crslList.insertBefore(buf, this.crslList.firstElementChild);
			this.crslList.removeChild(elm)
		};
		this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
		// let compStyle = window.getComputedStyle(this.crslList).marginLeft;
		this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
		this.crslList.style.marginLeft = '0px';
		// setTimeout(function() {
		// 	this$.crslList.style.cssText = 'transition:none;'
		// }, this.options.speed)
};

Ant.prototype.elemNext = function(num) {
	num = num || 3;

	// if(this.options.dots) this.dotOn(this.currentElement);
	this.currentElement += num;
	// if(this.currentElement >= this.dotsVisible) this.currentElement = 0;
	// if(this.options.dots) this.dotOff(this.currentElement);

	// if(!this.options.loop) {  // сдвиг влево без цикла
	// 	this.currentOffset -= this.elemWidth*num;
	// 	this.crslList.style.marginLeft = this.currentOffset + 'px';
	// 	// if(this.currentElement == this.dotsVisible-1) {
	// 	// 	this.rightArrow.style.display = 'none'; this.touchNext = false
	// 	// }
	// 	// this.leftArrow.style.display = 'block'; this.touchPrev = true
	// }else
	 {                    // сдвиг влево с циклом
		let elm, buf, this$ = this;
		this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
		this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
		setTimeout(function() {
			this$.crslList.style.cssText = 'transition:none;';
			for(let i=0; i<num; i++) {
				elm = this$.crslList.firstElementChild;
				buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
				this$.crslList.removeChild(elm)
			};
			this$.crslList.style.marginLeft = '0px'
		}, this.options.speed)
	}
};

// Ant.prototype.dotOn = function(num) {
// 	this.indicatorDotsAll[num].style.cssText = 'opacity: 60%;'
// };

// Ant.prototype.dotOff = function(num) {
// 	this.indicatorDotsAll[num].style.cssText = 'opacity: 1;'
// };

Ant.initialize = function(that) {

	// Constants
	that.elemCount = that.crslElements.length; // Количество элементов
	that.dotsVisible = that.elemCount;         // Число видимых точек
	let elemStyle = window.getComputedStyle(that.crslElemFirst);
	that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
	  parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

	// Variables
	that.currentElement = 0; that.currentOffset = 0;
	// that.touchPrev = true; that.touchNext = true;
	// let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

  if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
	};

	if(that.options.arrows) {  // инициализация стрелок
		if(!that.options.loop) that.crslList.style.cssText =
      'transition:margin '+that.options.speed+'ms ease;';
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > that.options.speed) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > that.options.speed) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	// else {
	// 	that.leftArrow.style.display = 'none';
  //   that.rightArrow.style.display = 'none'
	// };

	// if(that.options.dots) {  // инициализация индикаторных точек
	// 	let sum = '', diffNum;
	// 	for(let i=0; i<that.dotsVisible; i++) {
	// 		sum += '<p class="participants__switch-page"></p>'
	// 	};
	// 	that.indicatorDots.innerHTML = sum;
	// 	that.indicatorDotsAll = that.crslRoot.querySelectorAll('p.participants__switch-page');

	// 	that.dotOff(0);  // точка[0] выключена, остальные включены
	// 	for(let i=1; i<that.dotsVisible; i++) {
	// 		that.dotOn(i)
	// 	}
	// }
};

new Ant();




const gridBtnLeft = document.querySelector(".grid__btn-left")
const gridBtnRight = document.querySelector(".grid__btn-right")
const dots = document.querySelectorAll(".grid__dots")
const containerForGrids = document.querySelector(".stage__container")
const cards = document.querySelectorAll('.card__item')
const totalCards = cards.length
const cardBtnLeft = document.querySelector('.carousel__btn-left')
const cardBtnRight = document.querySelector('.carousel__btn-right')
const firstCounter = document.querySelector('.count-1')
const secondCounter = document.querySelector('.count-2')
const cardsContainer = document.querySelector('.participants__cards-wrapper')
let currentIndexCarousel = 0
let autoSlideInterval
let currentIndexGrids = 0

gridBtnLeft.addEventListener("click", () => {
    if (currentIndexGrids > 0) {
        currentIndexGrids--
        updateSlide()
        updateButtonStyles()
    }
})

gridBtnRight.addEventListener("click", () => {
    if (currentIndexGrids < dots.length - 1) {
        currentIndexGrids++
        updateSlide()
        updateButtonStyles()
    }

})

function updateSlide() {
    const translateValue = -currentIndexGrids * 100
    containerForGrids.style.transform = `translateX(${translateValue}%)`
    dots.forEach((dot, index) => {
        dot.classList.toggle("dots-active", index === currentIndexGrids)
    })
}

function updateButtonStyles() {
    gridBtnLeft.classList.toggle('disabled', currentIndexGrids === 0)
    gridBtnRight.classList.toggle('disabled', currentIndexGrids === dots.length - 1)
}

function updateCarousel() {
    const cardWidthPercent = getCardWidthPercent()
    const translateValue = -currentIndexCarousel * cardWidthPercent
    cardsContainer.style.transform = `translateX(${translateValue}%)`
    updateCounter()
}

function updateCounter() {
    firstCounter.textContent = currentIndexCarousel + 1
    secondCounter.textContent = totalCards
}

function prevCards() {
    currentIndexCarousel = (currentIndexCarousel - 1 + totalCards) % totalCards
    updateCarousel()
}

function nextCards() {
    currentIndexCarousel = (currentIndexCarousel + 1) % totalCards
    updateCarousel()
}
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextCards()
    }, 4000)
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval)
}

// function getCardWidthPercent() {
//     let res
//     if (window.innerWidth < 425) {
//         res = 100
//     } else if (window.innerWidth > 425 && window.innerWidth < 768) {
//         res = 50
//     } else {
//         res = 33.33
//     }
//     return res
// }
function getCardWidthPercent() {
    let res
    if (window.innerWidth < 425) {
        res = 100
    } else if (window.innerWidth > 425 && window.innerWidth <= 768) {
        res = 50
    } else {
        res = 33.33
    }
    return res
}


cardBtnRight.addEventListener('click', () => {
    nextCards()
    stopAutoSlide()
})
cardBtnLeft.addEventListener('click', () => {
    prevCards()
    stopAutoSlide()
})

updateCarousel()
startAutoSlide()