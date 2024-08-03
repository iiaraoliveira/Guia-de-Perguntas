export function initializeDarkMode() {
    const colormode = document.getElementById('colormode');
    const body = document.querySelector('body');

    // Função para aplicar o modo escuro
    function applyDarkMode(isDark) {
        if (isDark) {
            colormode.classList.add('dark');
            body.classList.add('dark');
        } else {
            colormode.classList.remove('dark');
            body.classList.remove('dark');
        }
    }

    // Verifica se existe uma preferência de modo escuro no localStorage
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Aplica a preferência de modo escuro ao carregar a página
    applyDarkMode(isDarkMode);

    colormode.addEventListener('click', () => {
        // Alterna o modo escuro
        isDarkMode = !isDarkMode;
        
        // Aplica o modo escuro
        applyDarkMode(isDarkMode);

        // Salva a preferência no localStorage
        localStorage.setItem('darkMode', isDarkMode);
    });

}
