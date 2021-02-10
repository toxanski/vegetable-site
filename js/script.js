window.addEventListener('DOMContentLoaded', () => {
  //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(contentItem => {
            contentItem.classList.add('hide');
            contentItem.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

  //Timer
    const deadline = '2021-01-13T23:17:15';

    function getTimeRemaining(endtime) {  //задача функции -> получить разницу между датами
        const t = Date.parse(endtime) - Date.parse(new Date()),
                //получим кол-во мс, которое в нашем времени и отнимем настоящее время(в мс)

              days = Math.floor(t / (1000 * 60 * 60 * 24)), 
              // 1сек = 1000 мс, 1мин = 60сек, 1час = 60 мин, 1 день = 24часа

              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              // общее количество часов делим на 24 часа (не больше 24)

              minutes = Math.floor((t / 1000 / 60) % 60),
              // сначало получаем количесвто секунд, потом делим на 60 полчаем кол-во минут

              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds  
        };
    }
    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); // функция инициализации, запустится и сразу подставит нужную дату
                        // игнорирую, что прописано в верстке

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { //если время идет в отриц. число, то таймер не обновляем
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


// Forms AJAX POST

const forms = document.querySelectorAll('form');

const message = {
    loading: "Ожидание",
    success: "Успешно! скоро мы с вами свяжемся",
    fail: "Упс. Какая-то ошибка."
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'application/json');

        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) { // ключ(key): зн-ие(value) у объекта
            console.log(value);
            console.log(key);
            object[key] = value;
        } );
        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load' , () => {
            if (request.status === 200){
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            } else {
                statusMessage.textContent = message.fail;
            }
        });
    });

    function showThanksModal(message) {

        const previousModalDialog = document.querySelector('.modal__dialog');

        previousModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>

        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            hideModal();
        }, 4000);
    }


} 












});

