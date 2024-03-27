export function formataDataHora (stringData: string) {
    const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const data = stringData.split("T")[0];
    const dataDate = new Date(data);
    const dataArray = data.split("-");
    const hora = stringData.split("T")[1].slice(0,5);
    const diaSemana = dataDate.getDay();
    const mes = dataDate.getMonth();
    const ano = dataDate.getFullYear();
    const dia = dataArray[dataArray.length - 1];
    return `${diasSemana[diaSemana]}, ${dia} ${meses[mes]} de ${ano} • ${hora}`
}