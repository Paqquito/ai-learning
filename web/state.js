export const STORAGE_KEY='ai-learning-progress-v1';
export const emptyProgress=()=>({version:1,read:[],attempts:[],caseDraft:''});
export function validateProgress(value,lessonIds,questionCount=6){
 if(!value||value.version!==1||!Array.isArray(value.read)||!Array.isArray(value.attempts)||typeof value.caseDraft!=='string')throw new Error('Format de progression non reconnu.');
 if(value.caseDraft.length>50000||value.read.some(id=>!lessonIds.includes(id))||value.attempts.length>1000)throw new Error('Contenu de progression invalide.');
 // Conserver les deux éditions précédentes du quiz sans les confondre avec l'actuelle.
 for(const a of value.attempts)if(!a||!Number.isInteger(a.score)||a.score<0||a.score>a.total||![6,14,questionCount].includes(a.total)||typeof a.date!=='string'||!Number.isFinite(Date.parse(a.date)))throw new Error('Résultat de quiz invalide.');
 return {version:1,read:[...new Set(value.read)],attempts:value.attempts.map(a=>({score:a.score,total:a.total,date:a.date})),caseDraft:value.caseDraft};
}
export function gradeQuiz(questions,answers){
 if(questions.some(q=>!Number.isInteger(answers[q.id])||answers[q.id]<0||answers[q.id]>=q.options.length))throw new Error('Réponds à toutes les questions avant de corriger.');
 return questions.reduce((score,q)=>score+Number(answers[q.id]===q.answer),0);
}
