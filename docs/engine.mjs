export const exercises = {
  squat: {name:'Squats', joint:'Knee angle', a:23,b:25,c:27, low:105,high:158, start:'high', full:true, tip:'Stand side-on. Keep your head, hips, knees and feet in view.', lower:'Bend your knees with control.', upper:'Stand tall to complete the rep.'},
  pushup: {name:'Push-ups',joint:'Elbow angle',a:11,b:13,c:15,low:95,high:155,start:'high',full:true,tip:'Place the camera near floor height, side-on to your whole body.',lower:'Lower with control. Keep your body in a straight line.',upper:'Push back up to complete the rep.'},
  curl: {name:'Biceps curls',joint:'Elbow angle',a:11,b:13,c:15,low:65,high:150,start:'high',full:false,tip:'Stand slightly side-on. Keep both shoulders, elbows and wrists visible.',lower:'Curl slowly. Keep your upper arm still.',upper:'Lower your arm with control.'},
  press: {name:'Shoulder press',joint:'Elbow angle',a:11,b:13,c:15,low:105,high:155,start:'low',full:false,tip:'Face the camera. Leave space above your head for your hands.',lower:'Bring your elbows down with control.',upper:'Press overhead without leaning back.'},
  lunge: {name:'Lunges',joint:'Knee angle',a:23,b:25,c:27,low:110,high:158,start:'high',full:true,tip:'Stand side-on with your whole body visible. Keep the same lead leg for this set.',lower:'Lower gently. Keep your front knee aligned with your foot.',upper:'Return to standing to finish the rep.'}
};
export function angle(a,b,c){const u=a.map((v,i)=>v-b[i]),v=c.map((n,i)=>n-b[i]);const den=Math.hypot(...u)*Math.hypot(...v);return den?Math.acos(Math.max(-1,Math.min(1,u.reduce((s,n,i)=>s+n*v[i],0)/den)))*180/Math.PI:NaN;}
export class RepCounter {
  constructor(config){this.config=config;this.reset();}
  reset(){this.phase='setup';this.candidate=null;this.since=0;this.reps=0;this.smoothed=null;}
  loseTracking(){this.phase='setup';this.candidate=null;this.smoothed=null;}
  update(value,now){
    if(!Number.isFinite(value))return false;
    this.smoothed=this.smoothed===null?value:.4*value+.6*this.smoothed;
    const zone=this.smoothed<=this.config.low?'low':this.smoothed>=this.config.high?'high':'middle';
    if(zone==='middle'){this.candidate=null;return false;}
    if(this.candidate!==zone){this.candidate=zone;this.since=now;return false;}
    if(now-this.since<160)return false;
    const first=this.config.start,other=first==='high'?'low':'high';
    if(this.phase==='setup'&&zone===first)this.phase='ready';
    else if(this.phase==='ready'&&zone===other)this.phase='return';
    else if(this.phase==='return'&&zone===first){this.phase='ready';this.reps++;return true;}
    return false;
  }
}
