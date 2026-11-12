export const STORAGE_KEY='ai-learning-progress-v1';
export const emptyProgress=()=>({version:1,read:[],attempts:[],caseDraft:'',notes:{},reviews:{}});
export function validateProgress(value,lessonIds,questionCount=6){
 if(!value||value.version!==1||!Array.isArray(value.read)||!Array.isArray(value.attempts)||typeof value.caseDraft!=='string')throw new Error('Format de progression non reconnu.');
 if(value.caseDraft.length>50000||value.read.some(id=>!lessonIds.includes(id))||value.attempts.length>1000)throw new Error('Contenu de progression invalide.');
 // Conserver les éditions précédentes du quiz sans les confondre avec l'actuelle.
 for(const a of value.attempts)if(!a||!Number.isInteger(a.score)||a.score<0||a.score>a.total||![6,14,24,30,34,questionCount].includes(a.total)||typeof a.date!=='string'||!Number.isFinite(Date.parse(a.date)))throw new Error('Résultat de quiz invalide.');
 const notes=value.notes??{},reviews=value.reviews??{};
 if(typeof notes!=='object'||Array.isArray(notes)||typeof reviews!=='object'||Array.isArray(reviews))throw new Error('Carnet invalide.');
 for(const [id,note] of Object.entries(notes))if(!lessonIds.includes(id)||typeof note!=='string'||note.length>12000)throw new Error('Brouillon de cours invalide.');
 for(const [id,r] of Object.entries(reviews))if(!lessonIds.includes(id)||!r||typeof r.correct!=='boolean'||typeof r.date!=='string'||typeof r.due!=='string'||!Number.isFinite(Date.parse(r.date))||!Number.isFinite(Date.parse(r.due))||Date.parse(r.due)<Date.parse(r.date))throw new Error('Révision invalide.');
 return {version:1,read:[...new Set(value.read)],attempts:value.attempts.map(a=>({score:a.score,total:a.total,date:a.date})),caseDraft:value.caseDraft,notes:{...notes},reviews:Object.fromEntries(Object.entries(reviews).map(([id,r])=>[id,{date:r.date,due:r.due,correct:r.correct}]))};
}
export function gradeQuiz(questions,answers){
 if(questions.some(q=>!Number.isInteger(answers[q.id])||answers[q.id]<0||answers[q.id]>=q.options.length))throw new Error('Réponds à toutes les questions avant de corriger.');
 return questions.reduce((score,q)=>score+Number(answers[q.id]===q.answer),0);
}
