let currentIndex = 0;

const vSliderFunction = (sliderObj) => {
    const { imagePaths, mobileImg, allow, slideItems } = sliderObj;

    let vSliderObj = {
        vSlider: document.getElementById("vslider"),
        dots: document.querySelectorAll(".slider-dot"),
        prevBtn: document.querySelector(".slider-prev"),
        nextBtn: document.querySelector(".slider-next"),
        imagePaths,
        mobileImg,
        allow,
        slideItems,
        actions: {
            imgLoad: function () {
                let dotHtml = ""
                let imgHtml = ""
                vSliderObj.actions.setImg();
                for (let index = 0; index < vSliderObj.imagePaths.length / vSliderObj.slideItems; index++) {
                    dotHtml += `<span class="slider-dot"></span>`;
                }

                document.querySelector(".slider-dots").innerHTML = dotHtml;
                document.querySelector(".slider-dots").querySelector(".slider-dot:first-child").classList.add('active');

                document.querySelectorAll(".slider-dot").forEach((dot, index) => {
                    dot.addEventListener("click", () => {
                        vSliderObj.actions.goToSlide(index);
                    });
                });

            },
            setImg: function () {
                const windowWidth = window.innerWidth;
                let imgHtml = '';
                for (let index = 0; index < vSliderObj.imagePaths.length; index++) {
                    if (typeof vSliderObj.imagePaths[index] == 'object') {
                        if (windowWidth < 768 && typeof vSliderObj.imagePaths[index].mobile != 'undefined') {
                            imgHtml += `<div class="vSlider_item"><img src="${vSliderObj.imagePaths[index].mobile}"/></div>`;
                        } else {
                            imgHtml += `<div class="vSlider_item"><img src="${vSliderObj.imagePaths[index].desktop}"/></div>`;
                        }
                    } else if (typeof vSliderObj.imagePaths[index] == 'string') {
                        imgHtml += `<div class="vSlider_item"><img src="${vSliderObj.imagePaths[index]}"/></div>`;
                    }
                }

                vSliderObj.vSlider.innerHTML = imgHtml
            },
            updateSlider: function () {
                const images = document.querySelectorAll(".slider img");
                vSliderObj.vSlider.style.transform = `translateX(-${(currentIndex * 100)/ vSliderObj.slideItems}%)`;
                document.querySelectorAll(".slider-dot").forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentIndex);
                });
                images.forEach((img, index) => {
                    img.classList.toggle("active", index === currentIndex);
                });
                vSliderObj.prevBtn.classList.toggle('disable', currentIndex === 0);
                vSliderObj.nextBtn.classList.toggle('disable', currentIndex === document.querySelectorAll(".slider-dot").length - 1);

            },

            goToSlide: function (index = 0) {
                currentIndex = index;
                vSliderObj.actions.updateSlider();
            },
            nextSlide: function () {
                currentIndex = (currentIndex + 1) % (vSliderObj.imagePaths.length / vSliderObj.slideItems);      
                vSliderObj.actions.updateSlider();
            },
            prevSlide: function () {
                currentIndex = (currentIndex - 1 + vSliderObj.imagePaths.length) % vSliderObj.imagePaths.length;                
                vSliderObj.actions.updateSlider();
            },
            autoPlay: function () {
                if (vSliderObj.allow.autoPlayStatus === true) {
                    let autoPlaySlide = setInterval(() => {
                        vSliderObj.actions.nextSlide();
                    }, 3000);
                }
            },
            slidersItem: function () {
                const itemsList = document.querySelectorAll(".vSlider_item");
                itemsList.forEach(function (itemss) {
                    itemss.style.flex = `0 0 ${100 / parseInt(slideItems)}%`;
                });

            },
        }

    }


    vSliderObj.actions.goToSlide();
    vSliderObj.actions.nextSlide();
    vSliderObj.actions.prevSlide();
    vSliderObj.actions.autoPlay();

    // disable buttons
    if(currentIndex == 0){
        vSliderObj.prevBtn.classList.add('disable');
    }

    // dots
    if (vSliderObj.allow.sDots) {
        document.querySelector('.slider-dots').classList.remove('hide_cls');
    } else {
        document.querySelector('.slider-dots').classList.add('hide_cls');
    }
    // Navs
    if (vSliderObj.allow.sNavs) {
        document.querySelector('.slider-prev').classList.remove('hide_cls');
        document.querySelector('.slider-next').classList.remove('hide_cls');
    } else {
        document.querySelector('.slider-prev').classList.add('hide_cls');
        document.querySelector('.slider-next').classList.add('hide_cls');
    }

    vSliderObj.prevBtn.addEventListener("click", function () {
        vSliderObj.actions.prevSlide();
    });

    vSliderObj.nextBtn.addEventListener("click", function(){
        vSliderObj.actions.nextSlide();
    });

    // loop funcation

    // Load images after the page has loaded
    window.addEventListener("load", function () {
        if(vSliderObj.allow.autoPlayStatus == true){
            vSliderObj.prevBtn.classList.remove('disable');
            vSliderObj.nextBtn.classList.remove('disable');
        }
        
        vSliderObj.actions.imgLoad();

        setTimeout(() => {
            vSliderObj.actions.slidersItem();
        }, 300);
    });



    window.addEventListener('resize', vSliderObj.actions.setImg());
}




