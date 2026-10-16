document.addEventListener('DOMContentLoaded', () => {
    // Configuração do Supabase
    const SUPABASE_URL = 'https://edrmehdyusznzdltlhxz.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcm1laGR5dXN6bnpkbHRsaHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjcxMDUsImV4cCI6MjEwNTgwMzEwNX0.TDclKranm8q1Zcb2ngv6lgflM4yU5fpANLVuyJer6gk';
    
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const userAvatarImg = document.getElementById('userAvatar');

    // Menu Lateral e Botões
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');
    const newChatBtn = document.getElementById('newChatBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Dropdown de Fundos
    const bgDropdownToggle = document.getElementById('bgDropdownToggle');
    const bgOptionsList = document.getElementById('bgOptionsList');

    // Troca de Fundo de Vídeo
    const bgVideo = document.getElementById('bgVideo');
    const bgOptions = document.querySelectorAll('.bg-option');

    // Modo Claro / Escuro
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    let usuarioEmail = 'usuario_anonimo';

    // Carregar Foto de Perfil e Identificar o Utilizador Logado
    async function carregarPerfilESessao() {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session && session.user) {
                if (session.user.email) {
                    usuarioEmail = session.user.email;
                }
                if (session.user.user_metadata) {
                    const fotoGoogle = session.user.user_metadata.avatar_url || session.user.user_metadata.picture;
                    if (fotoGoogle && userAvatarImg) {
                        userAvatarImg.src = fotoGoogle;
                    }
                }
            }
        } catch (erro) {
            console.log("Erro ao carregar sessão:", erro);
        }
    }
    carregarPerfilESessao();

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    }

    hamburgerBtn.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    // Botão de Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabaseClient.auth.signOut();
            localStorage.clear();
            window.location.href = 'sleep-login.html';
        });
    }

    // Menu retrátil de Ambientes de Fundo
    if (bgDropdownToggle) {
        bgDropdownToggle.addEventListener('click', () => {
            bgOptionsList.classList.toggle('show');
            bgDropdownToggle.classList.toggle('active');
        });
    }

    // Lógica para alternar o vídeo de fundo
    bgOptions.forEach(option => {
        option.addEventListener('click', () => {
            bgOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            const videoFile = option.getAttribute('data-video');

            if (videoFile === 'none') {
                bgVideo.pause();
                bgVideo.style.display = 'none';
            } else {
                bgVideo.style.display = 'block';
                bgVideo.src = videoFile;
                bgVideo.load();
                bgVideo.play().catch(e => console.log("Autoplay bloqueado:", e));
            }
            toggleSidebar();
        });
    });

    // Nova Conversa
    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <img src="watermarked_img_13711062385359371688.jpg" alt="DoctorSleep" class="msg-avatar">
                <div class="message-content glass-bubble">
                    <p>Nova conversa iniciada. Como posso te ajudar a descansar melhor hoje?</p>
                    <span class="msg-time">Agora mesmo</span>
                </div>
            </div>
        `;
        toggleSidebar();
    });

    // Tema Claro / Escuro
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        if (isLight) {
            themeIcon.className = "fa-solid fa-sun";
            themeText.textContent = "Modo Claro";
        } else {
            themeIcon.className = "fa-solid fa-moon";
            themeText.textContent = "Modo Escuro";
        }
    });

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

        const avatarImg = document.createElement('img');
        avatarImg.classList.add('msg-avatar');
        
        if(sender === 'user') {
            avatarImg.src = userAvatarImg.src;
        } else {
            avatarImg.src = "watermarked_img_13711062385359371688.jpg";
        }

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content', 'glass-bubble');

        const p = document.createElement('p');
        p.textContent = text;

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('msg-time');
        timeSpan.textContent = getCurrentTime();

        contentDiv.appendChild(p);
        contentDiv.appendChild(timeSpan);

        messageDiv.appendChild(avatarImg);
        messageDiv.appendChild(contentDiv);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    }

    // --- COMUNICAÇÃO COM O DIFY AI ---
    async function enviarParaDify(textoUsuario) {
        const DIFY_API_URL = 'https://api.dify.ai/v1/chat-messages';
        const DIFY_API_KEY = 'app-Y15GKO84FoCM7R7O0HqMAfG1';

        try {
            const response = await fetch(DIFY_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${DIFY_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: {},
                    query: textoUsuario,
                    response_mode: "blocking",
                    user: usuarioEmail
                })
            });

            if (!response.ok) {
                throw new Error('Erro na comunicação com o assistente Dify.');
            }

            const data = await response.json();
            return data.answer || "Desculpe, não consegui processar a resposta no momento.";
        } catch (erro) {
            console.log("Erro Dify:", erro);
            return "Ocorreu um erro ao conectar com o especialista em sono. Verifique sua conexão.";
        }
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        userInput.value = '';

        const respostaIa = await enviarParaDify(text);
        appendMessage(respostaIa, 'bot');
    });
});