let mensagens = [];

function buscarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    promessa.catch(mostrarErro);

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
        // }
        // listaMensagens.innerHTML += `
        //     <li>(${mensagens[i].time})
        //     ${mensagens[i].from}
        //     para ${mensagens[i].to}
        //     ${mensagens[i].text}
        //     </li>
        
        // `
        } else if(mensagens[i].type === "message") {
            listaMensagens.innerHTML += `
            <li class = "todos">
                <span class = "tempo">(${mensagens[i].time})</span>
                <span class = "nick">${mensagens[i].from}</span>
                para <span class = "nick">${mensagens[i].to}</span>:
                ${mensagens[i].text}
            </li>
        `
        } else {
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

function mostrarErro(err) {
    alert("errinho");
    console.log(err.responde);
}

buscarMensagens();

setInterval(buscarMensagens,3000);