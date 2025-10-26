document.addEventListener('DOMContentLoaded', function() {
    // ======= CARROSSEL =======
    function setupCarousel(carouselElement) {
        const carouselContainer = carouselElement.querySelector('.carousel-container');
        const items = carouselElement.querySelectorAll('.carousel-item');
        const prevBtn = carouselElement.querySelector('.carousel-btn.prev');
        const nextBtn = carouselElement.querySelector('.carousel-btn.next');
        let currentIndex = 0;

        function updateCarousel() {
            carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        });

        setInterval(function() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }, 5000);
    }

    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => setupCarousel(carousel));

    // ======= ABAS DA PROGRAMAÇÃO =======
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.dataset.day).classList.add('active');
        });
    });

    // ======= COMPRA DE INGRESSOS =======
    const planButtons = document.querySelectorAll('.plan-btn');
    let activePlan = null;

    // Função para criar modal customizado
    function showModal(message, callback) {
        // Cria elementos do modal
        const modalBg = document.createElement('div');
        modalBg.className = 'modal-bg';
        const modalBox = document.createElement('div');
        modalBox.className = 'modal-box';
        const msg = document.createElement('p');
        msg.textContent = message;
        const btnConfirm = document.createElement('button');
        btnConfirm.textContent = 'Confirmar';
        btnConfirm.className = 'modal-confirm btn';
        const btnCancel = document.createElement('button');
        btnCancel.textContent = 'Cancelar';
        btnCancel.className = 'modal-cancel btn';

        modalBox.appendChild(msg);
        modalBox.appendChild(btnConfirm);
        modalBox.appendChild(btnCancel);
        modalBg.appendChild(modalBox);
        document.body.appendChild(modalBg);

        // Eventos
        btnConfirm.addEventListener('click', function() {
            callback(true);
            document.body.removeChild(modalBg);
        });

        btnCancel.addEventListener('click', function() {
            callback(false);
            document.body.removeChild(modalBg);
        });
    }

    planButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedPlan = this.dataset.plan;

            if (activePlan && activePlan !== selectedPlan) {
                showModal(
                    `Você já selecionou o plano "${activePlan}". Deseja trocar para o plano "${selectedPlan}"?`,
                    function(confirmed) {
                        if (confirmed) {
                            activePlan = selectedPlan;
                            showToast(`Plano selecionado: ${activePlan}`);
                        }
                    }
                );
            } else {
                activePlan = selectedPlan;
                showToast(`Plano selecionado: ${activePlan}`);
            }
        });
    });

    // ======= TOAST CUSTOMIZADO =======
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 500);
        }, 2500);
    }
});
