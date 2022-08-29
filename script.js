let nome = prompt("Qual seu lindo nome?")

let mensagens = [];

function buscarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    promessa.catch(mostrarErro);

    scrollMensagens();

}

buscarMensagens();

function enviarNome() {
    const novoNome = {
        name: nome
    }
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoNome);
    promessa.then(podeEntrar);
    promessa.catch(naoEntra);
}

function enviarMensagem() {
    const mensagemDigitada = document.querySelector(".enviar-mensagem");

    const novaMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemDigitada.value,
        type: "message"
    }

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
    promessa.then(buscarMensagens());
    promessa.catch(erroMensagem());
}


function renderizarMensagens(res) {
    mensagens = res.data;
    const listaMensagens = document.querySelector("ul");

    for(let i = 0; i < mensagens.length; i++) {
        if(mensagens[i].type === "status") {
            listaMensagens.innerHTML += `
            <li class = "status">
                <span class = "tempo">(${mensagens[i].time})</span>
                <span class = "nick">${mensagens[i].from}</span>
                ${mensagens[i].text}
            </li>
        `
        } else if(mensagens[i].type === "message") {
            listaMensagens.innerHTML += `
            <li class = "todos">
                <span class = "tempo">(${mensagens[i].time})</span>
                <span class = "nick">${mensagens[i].from}</span>
                para <span class = "nick">${mensagens[i].to}</span>:
                ${mensagens[i].text}
            </li>
        `
        } else if(nome === mensagens[i].to){
            listaMensagens.innerHTML += `
            <li class = "reservadamente">
                <span class = "tempo">(${mensagens[i].time})</span>
                <span class = "nick">${mensagens[i].from}</span>
                reservadamente para <span class = "nick">${mensagens[i].to}</span>
                ${mensagens[i].text}
            </li>
        `
        }

        

    }

    

}

function manterConexao() {

    const nomeConexao = {
        name: nome
    }

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status");
    promessa.then( enviarNome());
}


function scrollMensagens() {
    const rolarTela = document.querySelector(".para-scroll");
    rolarTela.scrollIntoView();
}

function mostrarErro(err) {
    alert("errinho");
    console.log(err.responde);
}

function podeEntrar() {
    console.log("deu certoo");
}

function naoEntra() {
    alert('Esse nome já está em uso, digite outro nome!')
    document.location.reload(true);
}

function erroMensagem() {
    document.location.reload(true);
}

buscarMensagens();

enviarNome();



setInterval(buscarMensagens,3000);