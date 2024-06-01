const galleryContainer = document.querySelector('#firstGallery');
const galleryControlsContainer = galleryContainer.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = galleryContainer.querySelectorAll('.gallery-item');

const galleryContainer2 = document.querySelector('#secondGallery');
const galleryControlsContainer2 = galleryContainer2.querySelector('.gallery-controls');
const galleryControls2 = ['previous', 'next'];
const galleryItems2 = galleryContainer2.querySelectorAll('.gallery-item');

class Carousel {

    constructor(container, items, controlsContainer, controls) {
        this.carouselContainer = container;
        this.carouselControlsContainer = controlsContainer;
        this.carouselControls = controls;
        this.carouselArray = [...items];
        this.updateGallery()
        window.addEventListener('resize', this.updateGallery.bind(this));
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1')
            el.classList.remove('gallery-item-2')
            el.classList.remove('gallery-item-3')
            el.classList.remove('gallery-item-4')
            el.classList.remove('gallery-item-5')
            el.classList.remove('gallery-text')
        });

        if (window.innerWidth < 576) {
            this.carouselArray[1].classList.add('gallery-item-1');
            this.carouselArray[1].querySelector('.gallery-text').style.display = 'block';
        } else if (window.innerWidth < 992) {
            this.carouselArray.slice(0, 3).forEach((el, i) => {
                el.classList.add(`gallery-item-${i + 1}`);
            });
            this.carouselArray[1].querySelector('.gallery-text').style.display = 'block';
        } else {
            this.carouselArray.slice(0, 5).forEach((el, i) => {
                el.classList.add(`gallery-item-${i + 1}`);
            });
            this.carouselArray[2].querySelector('.gallery-text').style.display = 'block';
        }
    }

    setCurrentState(direction) {
        const currentIndex = this.carouselArray.findIndex(item => item.classList.contains('gallery-item-3'));
        const currentIndex1 = this.carouselArray.findIndex(item => item.classList.contains('gallery-item-2'));
        const currentIndex2 = this.carouselArray.findIndex(item => item.classList.contains('gallery-item-1'));

        if (direction.className === 'gallery-controls-previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }

        this.updateGallery();

        this.carouselArray.forEach(el => {
            el.querySelector('.gallery-text').style.display = 'none';
        });


        if (window.innerWidth < 576) {
            if (currentIndex2 !== -1) {
                this.carouselArray[currentIndex2].querySelector('.gallery-text').style.display = 'block';
            }
        } else if (window.innerWidth < 992) {
            if (currentIndex1 !== -1) {
                this.carouselArray[currentIndex1].querySelector('.gallery-text').style.display = 'block';
            }
        } else {
            if (currentIndex !== -1) {
                this.carouselArray[currentIndex].querySelector('.gallery-text').style.display = 'block';
            }
        }

    }

    setControls() {
        this.carouselControls.forEach(control => {
            this.carouselControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
        })
    }

    useControls() {
        const triggers = [...this.carouselControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control)
            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControlsContainer, galleryControls);
exampleCarousel.setControls();
exampleCarousel.useControls();

const exampleCarousel2 = new Carousel(galleryContainer2, galleryItems2, galleryControlsContainer2, galleryControls2);

exampleCarousel2.setControls();
exampleCarousel2.useControls();
