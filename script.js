const funcionarios = {};

function registrarAcao(tipoAcao) {
    const nome = document.getElementById('nome').value;
    const historico = document.getElementById('historico');
    const totalHoras = document.getElementById('total');

    const dataHoraAtual = new Date();
    const dataHoraFormatada = `${dataHoraAtual.toLocaleDateString()} ${dataHoraAtual.toLocaleTimeString()}`;
    
    const registro = `${nome} - ${tipoAcao}: ${dataHoraFormatada}`;
    const listItem = document.createElement('li');
    listItem.textContent = registro;
    historico.appendChild(listItem);

    if (!funcionarios[nome]) {
        funcionarios[nome] = { entrada: null, saida: null, horasTrabalhadas: 0 };
    }

    if (tipoAcao === 'Entrada') {
        funcionarios[nome].entrada = dataHoraAtual;
    } else {
        funcionarios[nome].saida = dataHoraAtual;
        calcularHorasTrabalhadas(nome);
    }

    exibirHorasTrabalhadas();

    limparCampoNome();
}

function calcularHorasTrabalhadas(nome) {
    const entrada = funcionarios[nome].entrada;
    const saida = funcionarios[nome].saida;

    if (entrada && saida) {
        const horasTrabalhadas = calcularHoras(entrada, saida);
        funcionarios[nome].horasTrabalhadas += horasTrabalhadas;
    }
}

function calcularHoras(entrada, saida) {
    const milissegundosAlmoco = 60 * 60 * 1000; // 1 hora de almoço em milissegundos
    const milissegundosTrabalhadas = saida - entrada - milissegundosAlmoco;

    return milissegundosTrabalhadas / (1000 * 60 * 60); // Converter para horas
}

function exibirHorasTrabalhadas() {
    const totalHoras = document.getElementById('total');
    totalHoras.innerHTML = '';

    for (const funcionario in funcionarios) {
        const horasTrabalhadas = funcionarios[funcionario].horasTrabalhadas.toFixed(2);
        const listItem = document.createElement('li');
        listItem.textContent = `${funcionario}: ${horasTrabalhadas} horas trabalhadas`;
        totalHoras.appendChild(listItem);
    }
}

function limparCampoNome() {
    document.getElementById('nome').value = '';
}
