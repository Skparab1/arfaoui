// DS visualizer: lists


// ah how nice it is to touch javascript after so long.

// How about an interactive space where students can experiment 
// with data structures such as lists, stacks, queues, and dictionaries. 
// This playground could show how data is added, removed, and modified in real time. 
// Visual representation of operations like pushing to a stack or enqueuing elements in a queue. 
// Simple drag-and-drop interface for creating and modifying data structures.


// this is what i think should be done
// have a default data structure. some elements in a list or queue or whatever
// have some buttons for people to be able to modify the data structures. sort of like binarytree
// have a "code" panel. potentially drag and drop. but hesitant because of the space wastage. unless we have a vertical column
// have a vertical column. "run", "reset", "step" buttons, run blocks of code or reset.


function drawlist(lst){

    treeholder.innerHTML = "";

    startx = 100;

    starty = 10;

    i = 0;
    while (i < lst.length){

        drawnode(lst, i, startx, starty);

        i += 1;
        startx += 96;
    }
}


function delnode(i){
    univlst.splice(i, 1);
    drawlist(univlst);
}

function addright(i){
    univlst.splice(i+1, 0, 0);
    drawlist(univlst);
}

function addleft(i){
    univlst.splice(i, 0, 0);
    drawlist(univlst);
}


function drawnode(lst, index, x, y){

    // create element
    const div = document.createElement('div');

    // get the value that should be in the node
    let thisnum = index;
      
    // put the value into the element
    div.innerHTML = `
    <input id='val${thisnum}' type='text' class='nodeval' value='${lst[index]}' onchange="modvalue(${thisnum});">
    `;

    div.innerHTML += `
    
    <div class="nodecontrols" id='controls${thisnum}'>
        <button id='leftadder${thisnum}' class='nodeadderleft' onclick='addleft(${thisnum});'>left</button>
        <button id='rightadder${thisnum}' class='nodeadderright' onclick='addright(${thisnum});'>right</button>
        <button id='deletenode${thisnum}' onclick='delnode(${thisnum});' class='deletenode'>del</button>
    </div>`;

    // position the element
    div.style.position = 'absolute';
    div.style.marginLeft = x+'px';
    div.style.marginTop = y+'px';

    // set the id and classname
    div.id = 'thenode'+String(thisnum);
    div.className = 'node';


    // if a node is clicked then bring it to the brong
    div.onclick = function() {document.getElementById(div.id).style.zIndex = rnzindex; rnzindex += 1;};

    div.onmouseover = function() {
        document.getElementById(div.id.replace("thenode","controls")).style.opacity = 1;
        document.getElementById(div.id.replace("thenode","val")).style.fontSize = "20px";
    };
    div.onmouseout = function() {
        document.getElementById(div.id.replace("thenode","controls")).style.opacity = 0;
        document.getElementById(div.id.replace("thenode","val")).style.fontSize = "33px";
    };


    // rnzindex is the z index
    // this should be the highest for the most recently clicked elements
    rnzindex += 1;

    // put the element in
    treeholder.appendChild(div);
}

// put all the tree data into the url
function createshareURL(){

    document.getElementById("copysharelink").textContent = "Copy link";

    let query = preorderwithnullpointers(root);

    query = query.replaceAll(" ","%20"); 

    document.getElementById("shareurldisp").textContent = location.href.replace("/index.html","")+"/share?data="+query;
}




// make the results panel visible
function raiseresults(){
    if (stayingup){
        return;
    }
    let res = document.getElementById("res");
    res.style.top = (1-(res.offsetHeight/window.innerHeight))*100+"%"
}

// lower the results panel to hide it
function lowerresults(){
    if (stayingup){
        return;
    }
    let res = document.getElementById("res");
    res.style.top = "90%"
}



// get the share data 
function copyshare(){
    let query = preorderwithnullpointers(root);

    query = query.replaceAll(" ","%20"); 

    let shareurl = location.href.replace("/index.html","")+"/share?data="+query;

    // copy
    navigator.clipboard.writeText(shareurl);


    document.getElementById("copysharelink").textContent = "Copied!";
}



// show the solutions dialog
function showsolutions(){
    checkall();
    document.getElementById('solutions').style.display = 'block';
    document.getElementById('solutions').style.opacity = 1;
    document.getElementById('solutions').style.top = '25%';
}

// show the preferences dialog
function openprefs(){
    document.getElementById('preferences').style.display = 'block';
    document.getElementById('preferences').style.opacity = 1;
    document.getElementById('preferences').style.top = '25%';
}

// open whatever dialog
function openel(el){
    document.getElementById(el).style.display = 'block';
    document.getElementById(el).style.opacity = 1;
    document.getElementById(el).style.top = '25%';
}

// change the theme from dark to light or override for setting it to whatever the saved theme is
function toggletheme(override){
    var r = document.querySelector(':root');

    // get elapsed time since last time a toggle was clicked
    let endtime = new Date();
    var timediff = endtime - lasttoggle; 
    lasttoggle = endtime;

    // if we are not changing to the saved theme and the user just pressed the theme change then dont change
    // this is there because something toggle theme used to get called two times in a row and cancel itself out
    if (timediff < 333 && !override){
        return;
    }

    // console.log('changeing from  '+theme);
    if (theme == 'dark'){
        // make light
        theme = 'light';
        localStorage.setItem('bttheme','light');
        document.getElementById('theme').textContent = "Theme: (light)";
        r.style.setProperty('--bg', 'white');
        r.style.setProperty('--contrast', 'black');
        r.style.setProperty('--main', '#0d6efd');
        r.style.setProperty('--slight', 'rgb(220,220,220)');
    } else {
        // make dark
        theme = 'dark';
        localStorage.setItem('bttheme','dark');
        document.getElementById('theme').textContent = "Theme: (dark)";
        r.style.setProperty('--bg', 'black');
        r.style.setProperty('--contrast', 'white');
        r.style.setProperty('--main', '#0d6efd');
        r.style.setProperty('--slight', 'rgb(40, 40, 40)');
    }
}

// force the theme to change to dark, if thats the saved theme
function forcedark(){
    theme = 'dark';
    localStorage.setItem('bttheme','dark');
    document.getElementById('theme').textContent = "Theme: (dark)";
    
    var r = document.querySelector(':root');
    r.style.setProperty('--bg', 'black');
    r.style.setProperty('--contrast', 'white');
    r.style.setProperty('--main', '#0d6efd');
    r.style.setProperty('--slight', 'rgb(40, 40, 40)');
}

// toggle the angle of the connectors
function toggleangle(override){
    var r = document.querySelector(':root');

    // see the elapsed time since toggle was last clicked
    let endtime = new Date();
    var timediff = endtime - lasttoggle; 
    lasttoggle = endtime;

    // prevent a double click of this
    if (timediff < 333 && !override){
        // console.log('returned');
        return;
    }

    if (angle == 'cornered'){
        // make curved
        angle = 'curved';
        localStorage.setItem('btangle','curved');
        document.getElementById('lines').textContent = "Lines: (Curved)";
        r.style.setProperty('--br', '25px');
    } else {
        // make cornered
        angle = 'cornered';
        localStorage.setItem('btangle','cornered');
        document.getElementById('lines').textContent = "Lines: (Cornered)";
        r.style.setProperty('--br', '0px');
    }
}

// close preferences dialog
function closeprefs(){
    //document.getElementById('solutions').style.display = 'none';
    document.getElementById('preferences').style.opacity = 0;
    document.getElementById('preferences').style.top = '100%';
}

// close preferences dialog
function closeel(el){
    //document.getElementById('solutions').style.display = 'none';
    document.getElementById(el).style.opacity = 0;
    document.getElementById(el).style.top = '100%';
}


function closeel(el){
    //document.getElementById('solutions').style.display = 'none';
    document.getElementById(el).style.opacity = 0;
    document.getElementById(el).style.top = '100%';
    wholeoverlay.style.display = 'none';
    wholeoverlay.style.opacity = 0;
}

function closesolutions(){
    //document.getElementById('solutions').style.display = 'none';
    document.getElementById('solutions').style.opacity = 0;
    document.getElementById('solutions').style.top = '100%';
    wholeoverlay.style.display = 'none';
    wholeoverlay.style.opacity = 0;
}

function closeinstructions(){
    closescreen();
    document.getElementById('instructions').style.top = '100%';
    document.getElementById('instructions').style.opacity = 0;
    wholeoverlay.style.display = 'none';
    wholeoverlay.style.opacity = 0;
}
  


// open the background backdrop when a dialog is opened
function openscreen(){
    let el = document.getElementById("screen");
    el.style.display = "block";
    el.style.opacity = 0.4;

    let res = document.getElementById("res");
    res.style.opacity = 0.4;
    stayingup = true;
}

// close the background backdrop
function closescreen(){
    console.log("called to close");
    let el = document.getElementById("screen");
    el.style.display = "none";
    el.style.opacity = 0;

    let res = document.getElementById("res");
    res.style.opacity = 1;
    stayingup = false;
}

// force the theme to change to dark, if thats the saved theme
function forcedark(){
    theme = 'dark';
    localStorage.setItem('bttheme','dark');
    document.getElementById('theme').textContent = "Theme: (dark)";
    
    var r = document.querySelector(':root');
    r.style.setProperty('--bg', 'black');
    r.style.setProperty('--contrast', 'white');
    r.style.setProperty('--main', '#0d6efd');
    r.style.setProperty('--slight', 'rgb(40, 40, 40)');
}


// drag and drop workings

function allowDrop(ev) {
    ev.preventDefault();
}


function drag(ev) {
    console.log("starteddrag",ev.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    // console.log(ev.id,ev.id);

    boxid = parseInt(ev.target.id.replace("blockreceiver",""));


    if (ev.target.id == ""){
        ev.preventDefault();
    } else {

        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.innerHTML = ""; // reset it we can already assume there is nothing in it cuz we checked for that
        ev.target.appendChild(document.getElementById(data));

        droppedid = parseInt(data.replace("drag",""));
        console.log("dropped ",data, " into ",droppedid);

        codeel = get(data);
        indata1 = String(codeel.innerHTML);

        type = ""
        repopulatet = 0;
        if (indata1.includes("lst[")){
            type = "index";
            repopulatet = 0;
        } else if (indata1.includes("lst.append(")){
            type = "append";
            repopulatet = 1;
        } else if (indata1.includes("lst.insert(")){
            type = "insert";
            repopulatet = 2;
        } else if (indata1.includes("lst.pop(")){
            type = "pop";
            repopulatet = 3;
        }

        inputpossible = indata1.split('<input class="littleinput" id="');
        
        accountedinputs = [];
        i = 1
        while (i < inputpossible.length){
            crrnt = inputpossible[i].split('" oninput="checkinput')[0];
            accountedinputs.push(crrnt);
            i += 1;
        }

        currentcode[droppedid] = [boxid,type,accountedinputs];

        console.log(currentcode);

        repopulateall();
    }
}

function get(id){
    return document.getElementById(id);
}


function msmover(id){
    get(id).style.border = "2px dashed rgba(0,150,0)";
}

function msmoverdeny(id){
    get(id).style.border = "2px dashed rgba(255,0,0)";
}

function moverout(id){
    get(id).style.border = "2px dashed rgb(209, 209, 209)";
}

function moveroutbox(id){
    var r = document.querySelector(':root');
    get(id).style.border = "2px dashed" + r.style.getPropertyValue('contrast');
}

function adddraggable(ctr){
    htm = `
    <div class="bankbox" id="receiver${ctr}" droppable="true" ondrop="drop(event); moveroutbox('receiver${ctr}');" ondragover="if(!(get('receiver${ctr}').innerHTML.includes('div'))){allowDrop(event); msmover('receiver${ctr}');}else{msmoverdeny('receiver${ctr}');}" ondragleave="moveroutbox('receiver${ctr}');" aria-dropeffect="copy">
        <div id="drag${elfar}" class="command" draggable="true" droppable="false" ondragstart="lastdragnestable=false; drag(event)">
        ${statements[ctr]}
        </div>
    </div>
    `;

    elfar += 1;

    document.getElementById("codebank").innerHTML += htm;
}

function repopulateall(){
    j = 0;
    while (j < 4){
        repopulate(j);
        j += 1;
    }
}

function repopulate(i){
    el = document.getElementById("receiver"+i);

    el.innerHTML = `
    <div id="drag${elfar}" class="command" draggable="true" droppable="false" ondragstart="lastdragnestable=false; drag(event)">
    ${getstatementbank(i)}
    </div>
    `;

    elfar += 1;
}

function deletereceiver(id){
    // first check if you even can
    if (elfar <= 4){
        // abort;
        return;
    }

    elfar -= 1;


    // currentcode[] = ""

    el = get("blockreceiver"+id);

    getel1 = String(el.innerHTML);

    // console.log("deller1"+getel1);

    getel1 = String(getel1.split('<div id="'));

    // console.log("deller2"+getel1);

    getel1 = getel1.split('" class="command"')[0];

    // console.log("deller3"+getel1);

    getel1 = parseInt(getel1.replace(",drag",""));

    el.remove();
    el = get("blockdeletebutton"+id);
    el.remove();

    console.log("overresetting",getel1);
    currentcode[getel1] = "";

    console.log(currentcode);
}

function adddropblock(){
    document.getElementById("currentcode").innerHTML += `
        <div    class="blockreceiver"
                style="margin-left: 25px" 
                id="blockreceiver${f1statements}" 
                droppable="true" 
                ondrop="
                    drop(event);
                    lastdropnumber=${f1statements}; 
                    moverout('blockreceiver${f1statements}');
                    adddropblock(${f1statements});
                    "
                ondragleave="
                    moverout('blockreceiver${f1statements}');"
                ondragover="
                    if(!(get('blockreceiver${f1statements}').innerHTML.includes('div'))){
                        allowDrop(event); 
                        msmover('blockreceiver${f1statements}');
                    } else {
                        msmoverdeny('blockreceiver${f1statements}'); 
                    }" 
                aria-dropeffect="copy"
        ></div>
        <div class="deletereceiver" id="blockdeletebutton${f1statements}" onclick="deletereceiver(${f1statements})">Delete</div>`;
    
    currentcode.push("");
    f1statements += 1;
}



// open the "how to use" if its the first time this user has opened this
let bt1 = localStorage.getItem('binarytree');
if (bt1 == null){
    localStorage.setItem('binarytree','opened');
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('instructions').style.opacity = 1;
    document.getElementById('instructions').style.left = '25%';
}

// load the settings from localstorage
let theme = localStorage.getItem('bttheme');
let angle = localStorage.getItem('btangle');
let demospeed = localStorage.getItem('btspeed');

let lasttoggle = new Date();

let rnzindex = 10;
let stayingup = false;


if (theme == null){
    localStorage.setItem("bttheme",'light');
    theme = 'light';
} else if (theme == 'dark'){
    forcedark();
}

const sleep = ms => new Promise(res => setTimeout(res, ms));


let univlst = [1,2,3,4,5];

drawlist(univlst);

elfar = 0;
inputnums = -1;

function getlittleinput(){
    inputnums += 1;
    return `<input class="littleinput" id="littleinput${inputnums}" oninput="checkinput('littleinput${inputnums}');" type="text" value="0">`;
}

function checkinput(id){
    inp = get(id);
    inp.style.width = 12*(String(inp.value).length) + "px";
    if ((String(inp.value).length) <= 1){
        inp.style.width = "15px";
    }

    if ((String(inp.value).length) >= 10){
        inp.style.width = "120px";
    }
}

torepopulate = 0;


function getstatementbank(i){
    if (i == 0){
        return `lst[${getlittleinput()}] = ${getlittleinput()}`;
    } else if (i == 1){
        return `lst.append(${getlittleinput()})`;
    } else if (i == 2){
        return `lst.insert(${getlittleinput()},${getlittleinput()})`;
    } else {
        return `lst.pop(${getlittleinput()})`
    }
}

statements = [
    `lst[${getlittleinput()}] = ${getlittleinput()}`,
    `lst.append(${getlittleinput()})`,
    `lst.insert(${getlittleinput()},${getlittleinput()})`,
    `lst.pop(${getlittleinput()})`
];

f1statements = 0;

currentcode = [];

adddropblock();



j = 0;
while (j < statements.length){
    adddraggable(j);
    j += 1;
}




if (localStorage.getItem("skpbinarytreeft") == null){
    // openel('instructions'); openscreen();
    localStorage.setItem("skpbinarytreeft", "opened");
}
    

// update the count without interfereing with the stuff
(async () => {
    fetch((`https://skparabapi-1-x8164494.deta.app/increment?key=binarytree`))
      .then(response => {
          return response.json();
      })
      .then(data => {
          console.log(data);
      })
  })();