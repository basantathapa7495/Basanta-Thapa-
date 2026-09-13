/* ==================================================================
   ONE-YEAR GOAL
   Start: September 11, 2026 | Finish: September 10, 2027
================================================================== */
const JOURNEY_START = "2026-09-11";
const JOURNEY_END = "2027-09-10";

/* ==================================================================
   DAILY DATA — THIS IS THE ONLY SECTION AI NEEDS TO UPDATE

   DAILY WORKFLOW:
   1. Upload today's Android activity screenshots to AI.
   2. Ask AI to extract time, opens and notifications.
   3. Ask AI to insert one new object directly ABOVE "END DAILY DATA".
   4. Use null when a value is not visible. Never guess a missing value.
   5. Keep records ordered from oldest to newest and use YYYY-MM-DD dates.

   COPY THIS TEMPLATE FOR EVERY NEW DAY:

   {
     date: "2026-09-12",
     type: "real",
     apps: [
       { name: "YouTube", minutes: 27, opens: 11, notifications: 3 },
       { name: "WhatsApp", minutes: 18, opens: 16, notifications: 12 }
     ]
   },
================================================================== */
const dailyData = [
  // Add real screenshot records here.
  // ======================= END DAILY DATA =======================
];

const appMeta={
 "YouTube":["Entertainment","youtube.com",false],"WhatsApp":["Communication","whatsapp.com",false],"Instagram":["Social","instagram.com",false],"Chrome":["Learning","google.com",false],"Gallery":["Utilities","photos.google.com",false],"PLAYit":["Entertainment","playit.app",false],"Google":["Learning","google.com",false],"Offline Games":["Entertainment","play.google.com",false],"Lite":["Social","facebook.com",false],"Clock":["Utilities","google.com",false],"VidMate":["Entertainment","vidmateapp.com",false]
};
const colors={Entertainment:"#f97316",Communication:"#2563eb",Social:"#db2777",Learning:"#16a34a",Finance:"#7c3aed",Utilities:"#64748b",Other:"#111827"};
dailyData.sort((a,b)=>a.date.localeCompare(b.date));
dailyData.forEach(day=>day.apps=day.apps.map(app=>({
 name:app.name,
 minutes:app.minutes ?? null,
 opens:app.opens ?? null,
 notifications:app.notifications ?? null,
 category:app.category || (appMeta[app.name]||["Other"])[0],
 domain:app.domain || (appMeta[app.name]||[null,"google.com"])[1],
 private:app.private ?? (appMeta[app.name]||[null,null,false])[2]
})));

let currentIndex=dailyData.length-1;
let calendarCursor=new Date((dailyData[currentIndex]?.date || JOURNEY_START)+"T00:00:00");
let goals=JSON.parse(localStorage.getItem("digitalGoals")||'{"YouTube":30,"Instagram":15}');
let totalGoal=Number(localStorage.getItem("digitalTotalGoal")||150);
const $=id=>document.getElementById(id);
const sum=(arr,key)=>arr.reduce((n,x)=>n+(x[key]||0),0);
const minutes=m=>m==null?"—":m<60?m+"m":Math.floor(m/60)+"h"+(m%60?" "+m%60+"m":"");
const longDate=d=>new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
const shortDate=d=>new Date(d+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"});
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const visibleApps=day=>day.apps;
function logo(a){return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(a.domain)}&sz=128`}
function notify(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}

document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".tab,.panel").forEach(x=>x.classList.remove("active"));btn.classList.add("active");$(btn.dataset.panel+"Panel").classList.add("active");if(btn.dataset.panel==="weekly")renderWeekly();if(btn.dataset.panel==="monthly")renderMonthly();if(btn.dataset.panel==="goals")renderGoals()}));
function moveDay(step){if(!dailyData.length)return;currentIndex=Math.max(0,Math.min(dailyData.length-1,currentIndex+step));calendarCursor=new Date((dailyData[currentIndex]?.date || JOURNEY_START)+"T00:00:00");$("searchInput").value="";renderAll()}
function latestDay(){if(!dailyData.length)return;currentIndex=dailyData.length-1;calendarCursor=new Date((dailyData[currentIndex]?.date || JOURNEY_START)+"T00:00:00");renderAll()}
function comparison(current,previous,key,lowerBetter=true){if(!previous)return ["No previous day","",0];const a=sum(visibleApps(current),key),b=sum(visibleApps(previous),key),diff=a-b;if(!diff)return ["Same as previous day","",0];const good=lowerBetter?diff<0:diff>0;return [`${diff<0?"↓":"↑"} ${key==="minutes"?minutes(Math.abs(diff)):Math.abs(diff)} vs previous`,good?"good":"bad",diff]}
function renderDate(){const d=dailyData[currentIndex];$("currentDate").textContent=longDate(d.date);$("dataBadge").textContent=d.type==="real"?"Recorded":"Demo data";$("dataBadge").className="badge "+(d.type==="real"?"badge-real":"badge-demo");$("previousButton").disabled=currentIndex===0;$("nextButton").disabled=currentIndex===dailyData.length-1}
function renderSummary(){const d=dailyData[currentIndex],apps=visibleApps(d),prev=dailyData[currentIndex-1],top=[...apps].sort((a,b)=>(b.minutes||0)-(a.minutes||0))[0];$("totalTime").textContent=minutes(sum(apps,"minutes"));$("totalOpens").textContent=sum(apps,"opens");$("totalNotifications").textContent=sum(apps,"notifications");$("totalApps").textContent=apps.length;$("mostUsed").textContent=top?.name||"—";$("mostUsedTime").textContent=top?minutes(top.minutes):"—";[["timeDelta","minutes"],["openDelta","opens"],["notificationDelta","notifications"]].forEach(([id,key])=>{const [text,cls]=comparison(d,prev,key);$(id).textContent=text;$(id).className="summary-small delta "+cls});renderScore(d,apps)}
function renderScore(day,apps){const used=sum(apps,"minutes"),ratio=used/totalGoal;let score=Math.max(0,100-Math.max(0,ratio-0.55)*75);Object.entries(goals).forEach(([name,limit])=>{const app=apps.find(a=>a.name===name);if(app&&app.minutes>limit)score-=Math.min(15,(app.minutes-limit)/limit*15)});score=Math.round(Math.max(0,Math.min(100,score)));$("scoreText").textContent=score+"/100";$("scoreLabel").textContent=score>=85?"Excellent control":score>=70?"Good balance":score>=50?"Needs attention":"Reset tomorrow";$("scoreBar").style.width=score+"%";$("scoreBar").style.background=score>=70?"var(--green)":score>=50?"var(--amber)":"var(--red)";$("screenGoalText").textContent=minutes(used)+" / "+minutes(totalGoal);$("screenGoalLabel").textContent=used<=totalGoal?minutes(totalGoal-used)+" remaining":minutes(used-totalGoal)+" over limit";$("screenGoalBar").style.width=Math.min(100,used/totalGoal*100)+"%";$("screenGoalBar").style.background=used<=totalGoal?"var(--blue)":"var(--red)";renderJourney(day.date)}
function renderJourney(date){const start=new Date(JOURNEY_START+"T00:00:00"),end=new Date(JOURNEY_END+"T00:00:00"),selected=new Date(date+"T00:00:00"),total=Math.round((end-start)/86400000)+1,day=Math.max(1,Math.min(total,Math.round((selected-start)/86400000)+1)),percent=Math.round(day/total*100);$("journeyValue").textContent=`Day ${day} of ${total}`;$("journeyPercent").textContent=percent+"%";$("journeyMeta").textContent=(total-day)+" days remaining · "+loggedStreak()+"-day logging streak";$("journeyBar").style.width=percent+"%";$("journeyBar").style.background="var(--purple)"}
function loggedStreak(){if(!dailyData.length)return 0;const dates=dailyData.map(d=>new Date(d.date+"T00:00:00"));let streak=1;for(let i=dates.length-1;i>0;i--){if((dates[i]-dates[i-1])/86400000===1)streak++;else break}return streak}
function populateFilters(){const categories=[...new Set(dailyData.flatMap(d=>d.apps.map(a=>a.category)))].sort();$("categorySelect").innerHTML='<option value="all">All categories</option>'+categories.map(c=>`<option>${c}</option>`).join("")}
function renderTable(){if(!dailyData.length){$("appTable").innerHTML="";$("emptyState").style.display="block";$("emptyState").textContent="No recorded activity yet. Real screenshot data will appear here.";return;}const day=dailyData[currentIndex],q=$("searchInput").value.toLowerCase().trim(),cat=$("categorySelect").value,sort=$("sortSelect").value;let apps=visibleApps(day).filter(a=>a.name.toLowerCase().includes(q)&&(cat==="all"||a.category===cat));const sorters={"time-desc":(a,b)=>(b.minutes||0)-(a.minutes||0),"time-asc":(a,b)=>(a.minutes||0)-(b.minutes||0),"opens-desc":(a,b)=>(b.opens||0)-(a.opens||0),"notifications-desc":(a,b)=>(b.notifications||0)-(a.notifications||0),name:(a,b)=>a.name.localeCompare(b.name)};apps.sort(sorters[sort]);$("resultCount").textContent=apps.length+" app"+(apps.length===1?"":"s");$("tableContainer").style.display=apps.length?"block":"none";$("emptyState").style.display=apps.length?"none":"block";const max=Math.max(1,...day.apps.map(a=>a.minutes||0));$("appTable").innerHTML=apps.map(a=>{const limit=goals[a.name],over=limit!=null&&a.minutes>limit;return `<tr><td><div class="app-cell"><div class="logo"><img src="${logo(a)}" alt="" onerror="this.remove();this.parentNode.textContent='${a.name[0]}'"></div><div><span class="app-name">${a.name}</span><span class="category">${a.category}</span></div></div></td><td><strong>${minutes(a.minutes)}</strong></td><td><div class="bar-row"><div class="usage-bar"><span style="width:${(a.minutes||0)/max*100}%"></span></div></div></td><td class="${a.opens==null?'muted':''}">${a.opens==null?'—':a.opens+'×'}</td><td class="${a.notifications==null?'muted':''}">${a.notifications??'—'}</td><td>${limit==null?'—':`<span class="goal-pill ${over?'over':''}">${minutes(a.minutes||0)} / ${minutes(limit)}</span>`}</td></tr>`}).join("")}

function includedWeek(){const end=new Date((dailyData[currentIndex]?.date || JOURNEY_START)+"T00:00:00"),start=new Date(end);start.setDate(end.getDate()-6);return dailyData.filter(d=>{const date=new Date(d.date+"T00:00:00");return date>=start&&date<=end&&d.type==="real"})}
function renderChart(days){const box=$("weeklyChart");if(!days.length){box.innerHTML='<div class="empty" style="display:block">No recorded data in this 7-day window.</div>';return}const vals=days.map(d=>sum(visibleApps(d),"minutes")),max=Math.max(60,...vals),W=760,H=230,pad={l:42,r:20,t:20,b:34},x=i=>days.length===1?W/2:pad.l+i*(W-pad.l-pad.r)/(days.length-1),y=v=>H-pad.b-v/max*(H-pad.t-pad.b);const pts=vals.map((v,i)=>`${x(i)},${y(v)}`).join(" "),area=`${x(0)},${H-pad.b} ${pts} ${x(vals.length-1)},${H-pad.b}`;let grid="";for(let i=0;i<=4;i++){const gy=pad.t+i*(H-pad.t-pad.b)/4,gv=Math.round(max*(1-i/4));grid+=`<line class="grid-line" x1="${pad.l}" x2="${W-pad.r}" y1="${gy}" y2="${gy}"/><text class="chart-label" x="0" y="${gy+3}">${minutes(gv)}</text>`}box.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Seven day screen time line chart"><defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2563eb" stop-opacity=".22"/><stop offset="1" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs>${grid}<polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${pts}"/>${vals.map((v,i)=>`<circle class="chart-dot" cx="${x(i)}" cy="${y(v)}" r="4"/><text class="chart-value" text-anchor="middle" x="${x(i)}" y="${y(v)-10}">${minutes(v)}</text><text class="chart-label" text-anchor="middle" x="${x(i)}" y="${H-8}">${shortDate(days[i].date)}</text>`).join("")}</svg>`}
function groupedApps(days){const m={};days.flatMap(d=>visibleApps(d)).forEach(a=>m[a.name]=(m[a.name]||0)+(a.minutes||0));return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function groupedCategories(days){const m={};days.flatMap(d=>visibleApps(d)).forEach(a=>m[a.category]=(m[a.category]||0)+(a.minutes||0));return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function listRows(items,target,isCategory=false){const max=Math.max(1,...items.map(x=>x[1]));$(target).innerHTML=items.length?items.slice(0,6).map(([name,val])=>`<div class="category-row"><div class="category-name">${isCategory?`<i class="category-dot" style="background:${colors[name]||colors.Other}"></i>`:""}${name}</div><div class="category-bar"><span style="width:${val/max*100}%;background:${isCategory?(colors[name]||colors.Other):'var(--blue)'}"></span></div><div class="category-time">${minutes(val)}</div></div>`).join(""):'<div class="empty" style="display:block">No included data.</div>'}
function renderWeekly(){const days=includedWeek(),totals=days.map(d=>sum(visibleApps(d),"minutes")),total=totals.reduce((a,b)=>a+b,0),apps=groupedApps(days);renderChart(days);$("weekAverage").textContent=days.length?minutes(Math.round(total/days.length)):"—";$("weekTotal").textContent=days.length?minutes(total):"—";$("weekTopApp").textContent=apps[0]?.[0]||"—";$("weekTopTime").textContent=apps[0]?minutes(apps[0][1]):"—";if(days.length>1){const diff=totals.at(-1)-totals[0];$("weekChange").textContent=(diff<=0?"↓ ":"↑ ")+minutes(Math.abs(diff));$("weekChange").style.color=diff<=0?"var(--green)":"var(--red)"}else{$("weekChange").textContent="Need 2 days";$("weekChange").style.color=""}listRows(groupedCategories(days),"weeklyCategories",true);listRows(apps,"weeklyApps")}
function renderMonthly(){const year=calendarCursor.getFullYear(),month=calendarCursor.getMonth(),monthData=dailyData.filter(d=>{const x=new Date(d.date+"T00:00:00");return x.getFullYear()===year&&x.getMonth()===month}),totals=monthData.map(d=>sum(visibleApps(d),"minutes")),apps=groupedApps(monthData),best=monthData.length?[...monthData].sort((a,b)=>sum(visibleApps(a),"minutes")-sum(visibleApps(b),"minutes"))[0]:null;$("monthRecorded").textContent=monthData.length;$("monthAverage").textContent=monthData.length?minutes(Math.round(totals.reduce((a,b)=>a+b,0)/monthData.length)):"—";$("monthBest").textContent=best?shortDate(best.date):"—";$("monthTop").textContent=apps[0]?.[0]||"—";renderCalendar()}
function renderCalendar(){const labels=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],year=calendarCursor.getFullYear(),month=calendarCursor.getMonth(),first=new Date(year,month,1),daysInMonth=new Date(year,month+1,0).getDate(),start=new Date(JOURNEY_START+"T00:00:00"),end=new Date(JOURNEY_END+"T00:00:00");$("monthTitle").textContent=first.toLocaleDateString("en-US",{month:"long",year:"numeric"});let html=labels.map(x=>`<div class="cal-label">${x}</div>`).join("")+Array(first.getDay()).fill('<div class="cal-day empty-day"></div>').join("");for(let day=1;day<=daysInMonth;day++){const date=new Date(year,month,day),key=dateKey(date),i=dailyData.findIndex(d=>d.date===key),record=i>=0?dailyData[i]:null,inJourney=date>=start&&date<=end;if(!inJourney){html+='<div class="cal-day empty-day"></div>';continue}if(!record){html+=`<button class="cal-day no-data" disabled><div class="cal-number">${day}</div><div class="cal-time">—</div><div class="cal-meta">Not logged</div></button>`;continue}html+=`<button class="cal-day ${record.type==='demo'?'demo-day':''} ${i===currentIndex?'active':''}" onclick="openDay(${i})"><div class="cal-number">${day}</div><div class="cal-time">${minutes(sum(visibleApps(record),'minutes'))}</div><div class="cal-meta">${record.type==='real'?'Recorded':'Demo'}</div></button>`}$("calendarGrid").innerHTML=html;const startMonth=new Date(start.getFullYear(),start.getMonth(),1),endMonth=new Date(end.getFullYear(),end.getMonth(),1),currentMonth=new Date(year,month,1);$("previousMonth").disabled=currentMonth<=startMonth;$("nextMonth").disabled=currentMonth>=endMonth;$("datePicker").value=(dailyData[currentIndex]?.date || JOURNEY_START)}
function moveMonth(step){calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+step,1);renderMonthly()}
function openDay(i){currentIndex=i;calendarCursor=new Date(dailyData[i].date+"T00:00:00");document.querySelector('[data-panel="today"]').click();renderAll();window.scrollTo({top:0,behavior:"smooth"})}
function renderHeroInsights(){
  const latest=dailyData.at(-1);
  if(!latest)return;
  const apps=[...visibleApps(latest)].filter(app=>app.minutes!=null).sort((a,b)=>b.minutes-a.minutes).slice(0,5);
  const total=sum(visibleApps(latest),"minutes");
  $("heroLastDayTotal").textContent=minutes(total);
  $("heroLastDayLabel").textContent=shortDate(latest.date);
  const maxApp=Math.max(1,...apps.map(app=>app.minutes||0));
  $("lastDayChart").innerHTML=apps.length?apps.map(app=>`<div class="hero-app-row"><span>${app.name}</span><i><b style="width:${(app.minutes||0)/maxApp*100}%"></b></i><small>${minutes(app.minutes)}</small></div>`).join(""):'<div class="empty-mini-chart">No usage recorded.</div>';

  const end=new Date(latest.date+"T00:00:00");
  const start=new Date(end);
  start.setDate(end.getDate()-6);
  const byDate=new Map(dailyData.filter(day=>{const date=new Date(day.date+"T00:00:00");return date>=start&&date<=end}).map(day=>[day.date,sum(visibleApps(day),"minutes")]));
  const week=[];
  for(let i=0;i<7;i++){
    const date=new Date(start);
    date.setDate(start.getDate()+i);
    const key=dateKey(date);
    week.push({date,value:byDate.get(key) ?? null});
  }
  const recorded=week.filter(day=>day.value!==null);
  const average=recorded.length?Math.round(recorded.reduce((total,day)=>total+day.value,0)/recorded.length):0;
  const maxDay=Math.max(1,...week.map(day=>day.value));
  $("heroWeekAverage").textContent=recorded.length?minutes(average):"—";
  $("weeklyMiniChart").innerHTML=week.map(day=>`<div class="week-mini-column" title="${longDate(dateKey(day.date))}: ${day.value!==null?minutes(day.value):"Not logged"}"><i style="height:${day.value?Math.max(8,day.value/maxDay*100):4}%"></i><span>${day.date.toLocaleDateString("en-US",{weekday:"narrow"})}</span></div>`).join("");
}

function renderAll(){if(!dailyData.length){renderEmpty();return;}renderDate();renderSummary();renderTable();renderHeroInsights();if($("weeklyPanel").classList.contains("active"))renderWeekly();if($("monthlyPanel").classList.contains("active"))renderMonthly()}
$("searchInput").addEventListener("input",renderTable);$("categorySelect").addEventListener("change",renderTable);$("sortSelect").addEventListener("change",renderTable);$("datePicker").addEventListener("change",e=>{const selected=new Date(e.target.value+"T00:00:00"),i=dailyData.findIndex(d=>d.date===e.target.value);calendarCursor=new Date(selected.getFullYear(),selected.getMonth(),1);if(i>=0)openDay(i);else{renderMonthly();notify("No activity has been added for this date yet")}});
populateFilters();renderAll();

function renderEmpty(){
 $("currentDate").textContent="No recorded data yet";
 $("dataBadge").textContent="Awaiting first record";
 $("scoreLabel").textContent="Not enough data";
 $("journeyValue").textContent="0 days logged";
 $("journeyPercent").textContent="0%";
 $("screenGoalLabel").textContent="Awaiting first record";
 $("heroLastDayLabel").textContent="Not logged";
 $("lastDayChart").textContent="Real activity will appear after the first screenshot record.";
 $("weeklyMiniChart").textContent="No recorded days yet.";
 $("previousButton").disabled=true;$("nextButton").disabled=true;
 renderTable();renderWeekly();renderMonthly();
}
