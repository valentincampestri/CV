/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tc =>{
            tc.classList.remove('filters__active')
        })
        target.classList.add('filters__active')

        tabs.forEach(t =>{
            t.classList.remove('filter-tab-active')
        })
        tab.classList.add('filter-tab-active')
    })
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Colores predefinidos
const predefinedColors = ['#8a2be2', '#ff0000', '#0066ff', '#14c84a', '#ee00ff'];

// Tema y icono seleccionados anteriormente (si el usuario seleccionó)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtenemos el tema actual que tiene la interfaz verificando la clase dark-theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// Si el usuario eligió un tema anteriormente, aplicamos esa elección
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activar/desactivar el tema manualmente con el botón
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Guardamos el tema y el icono actual que eligió el usuario
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== COLOR PICKER ===============*/
const colorPickerIcon = document.getElementById('color-picker-icon');
const colorMenu = document.getElementById('color-menu');

// Asigna una función al evento de clic del icono de la paleta
colorPickerIcon.addEventListener('click', function () {
    // Alternar la clase activa para mostrar/ocultar el menú de colores
    colorMenu.classList.toggle('active');
});

// Asigna una función al evento de clic en una opción de color
colorMenu.addEventListener('click', function (event) {
    const colorOption = event.target.closest('.color-option');
    if (colorOption) {
        const selectedColor = colorOption.dataset.color;
        const selectedColorAlt = colorOption.dataset.colorAlt;

        // Modifica las variables CSS para el nuevo color y su "alt" correspondiente
        document.documentElement.style.setProperty('--principal-color', selectedColor);
        document.documentElement.style.setProperty('--principal-color-alt', selectedColorAlt);

        // Remueve la clase activa para ocultar el menú de colores
        colorMenu.classList.remove('active');
    }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.profile__border`);
sr.reveal(`.profile__name`, {delay: 500});
sr.reveal(`.profile__profession`, {delay: 600});
sr.reveal(`.profile__social`, {delay: 700});
sr.reveal(`.profile__info-group`, {interval: 100, delay: 700});
sr.reveal(`.profile__buttons`, {delay: 800});
sr.reveal(`.filters__content`, {delay: 900});
sr.reveal(`.filters`, {delay: 1000});

/*=============== CUSTOM JAVASCRIPT FOR EDUCATION SECTION ===============*/
// Get references to the elements
const approvedSubjectsBtn = document.getElementById('approvedSubjectsBtn');
const descriptionsContainer = document.getElementById('approvedSubjectsDescriptions');
const subjectDescriptions = document.querySelectorAll('.subject-description');
const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);

approvedSubjectsBtn.addEventListener('click', () => {
    descriptionsContainer.classList.toggle('show-descriptions');
});

subjectDescriptions.forEach(description => {
    description.addEventListener('click', () => {
      // Mostrar modal con el nombre y descripción
      modal.innerHTML = `
        <div class="modal-content">
          <h2>${description.dataset.name}</h2>
          <p>${description.dataset.description}</p>
          <button class="button close-btn" onclick="closeModal()">Close</button> 
        </div>
      `;
      
      // Aplica estilos al modal
      modal.querySelector('.modal-content').style.maxHeight = '70vh';
      
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 50); // Agrega un pequeño retraso antes de mostrar el recuadro
      modal.style.display = 'block';
    });
  });

function closeModal() {
    modal.style.opacity = '0'; // Configura la opacidad a 0 al cerrar
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Ajusta la duración de la transición
}

/*=============== EXPERIENCE DURATION CALCULATION ===============*/
function calculateExperienceDuration(startDate, endDate = 'present') {
    const start = new Date(startDate);
    const end = endDate.toLowerCase() === 'present' ? new Date() : new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    // Ajuste si el mes de finalización es anterior al mes de inicio en el año
    if (months < 0) {
        years--;
        months += 12;
    }

    // Construir el texto de la duración
    let durationText = '';
    if (years > 0) {
        durationText += years + ' yr' + (years > 1 ? 's ' : ' ');
    }
    if (months > 0) {
        durationText += months + ' mo' + (months > 1 ? 's' : '');
    }

    return durationText.trim();
}

// Selecciona todas las experiencias laborales
const experienceJobs = document.querySelectorAll('.experience__job');

experienceJobs.forEach(job => {
    const startDate = job.dataset.start;
    const endDate = job.dataset.end;
    const durationElement = job.querySelector('.experience-duration');

    if (startDate && durationElement) {
        durationElement.textContent = calculateExperienceDuration(startDate, endDate);
    }
});