
// docs.js (lista + utilitários)
const DOCS = [
  { id:"identificacao_modelo", titulo:"Identificação do Modelo", descricao:"Identificação clara do modelo/variante e codificação comercial/técnica.", tipo:"form" },
  { id:"fotos_dispositivo", titulo:"Fotos do Dispositivo Médico", descricao:"Fotos nítidas do produto, acessórios e etiquetas, conforme padrão.", tipo:"page", href:"fotos_dispositivo.html" },
  { id:"memorial_descritivo", titulo:"Memorial descritivo", descricao:"Descrição técnica do produto e características.", tipo:"text" },
  { id:"manual_usuario", titulo:"Manual do usuário", descricao:"Manual em português (quando aplicável), instruções e advertências.", tipo:"text" },
  { id:"arte_embalagens", titulo:"Desenho ou arte final das embalagens", descricao:"Arte/lay-out final das embalagens primária e secundária.", tipo:"text" },
  { id:"relatorio_amostragem", titulo:"Relatório de Amostragem", descricao:"Critério de amostragem e identificação das amostras.", tipo:"text" },
  { id:"declaracao_alteracao_projeto", titulo:"Declaração de Alteração de Projeto", descricao:"Mudanças de projeto e rastreabilidade.", tipo:"text" },
  { id:"etiquetas_identificacao", titulo:"Etiquetas de identificação", descricao:"Conteúdo, símbolos e informações obrigatórias.", tipo:"text" },
  { id:"selo_conformidade", titulo:"Selo de identificação da conformidade", descricao:"Layout/tamanho/local de aplicação do selo, quando aplicável.", tipo:"text" },
  { id:"rhproj", titulo:"Registro histórico do projeto (RHProj)", descricao:"Histórico: revisões, decisões e aprovações.", tipo:"text" },
  { id:"rmp", titulo:"Registro mestre do produto (RMP)", descricao:"Documento mestre: especificações e controle de versões.", tipo:"text" },
  { id:"biocompatibilidade", titulo:"Documentos de Biocompatibilidade", descricao:"Evidências aplicáveis para materiais em contato com o corpo.", tipo:"text" },
  { id:"auditoria_fabril", titulo:"Auditoria fabril", descricao:"Evidências/planejamento relacionados à auditoria na fábrica.", tipo:"text" },
  { id:"auditoria_solicitante_br", titulo:"Auditoria no solicitante da certificação no Brasil", descricao:"Evidências/planejamento relacionados à auditoria no solicitante.", tipo:"text" },
  { id:"relatorios_ensaios", titulo:"Relatórios de ensaios", descricao:"Relatórios de testes/ensaios aplicáveis conforme norma/escopo.", tipo:"text" },
  { id:"usabilidade", titulo:"Documentos de Usabilidade", descricao:"Evidências de usabilidade (quando aplicável).", tipo:"text" },
  { id:"declaracao_transferencia", titulo:"Declaração de transferência", descricao:"Declaração formal de transferência (quando aplicável).", tipo:"text" },
  { id:"portaria_aprovacao_modelo", titulo:"Portaria de Aprovação de Modelo", descricao:"esfigmomanômetros ou termômetros clínicos digitais", tipo:"text" },
];

const DOCS_BY_ID = DOCS.reduce((acc,d)=> (acc[d.id]=d, acc), {});
window.DOCS = DOCS;
window.DOCS_BY_ID = DOCS_BY_ID;

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
window.escapeHtml = escapeHtml;

window.AutoSave = {
  prefix: "eletromedico_docs:",
  key: (docId)=> window.AutoSave.prefix + (docId||"unknown"),
  bind: ({storageKey, rootEl, getState, setState, delayMs=3000})=>{
    let t = null;
    const schedule = ()=>{
      if(t) clearTimeout(t);
      t = setTimeout(()=>{
        try{
          localStorage.setItem(storageKey, JSON.stringify(getState()));
        }catch(e){ console.warn(e); }
      }, delayMs);
    };
    const handler = (ev)=>{
      const el = ev.target;
      if(!el) return;
      const tag = (el.tagName||"").toLowerCase();
      if(["input","textarea","select"].includes(tag)) schedule();
    };
    rootEl.addEventListener("input", handler, true);
    rootEl.addEventListener("change", handler, true);
    const restore = ()=>{
      const raw = localStorage.getItem(storageKey);
      if(!raw) return false;
      try{ setState(JSON.parse(raw)); return true; }catch(e){ console.warn(e); return false; }
    };
    const clear = ()=> localStorage.removeItem(storageKey);
    return { restore, clear };
  }
};
