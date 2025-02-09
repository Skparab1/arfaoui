// DS visualizer: hash hap chaining


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

    let startx = 100;

    let starty = 10;

    let i = 0;
    while (i < lst.length){

        if (lst[i] == "None"){
            drawnode(lst, i, startx, starty, "None");
        } else {
            console.log(String(lst[i]));
            let lstels = String(lst[i]).split(",");

            let j = 0;
            let downindent = 0;
            while (j < lstels.length){
                if (lstels[j] != "None"){
                    drawnode(lst, j, startx, starty+50*downindent, lstels[j]);
                    downindent += 1;
                }
                j += 1;
            }
        }
    

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


function drawnode(lst, index, x, y, content){

    // create element
    const div = document.createElement('div');

    // get the value that should be in the node
    let thisnum = index;
      
    // put the value into the element
    div.innerHTML = `
    <input id='val${thisnum}' type='text' class='nodeval' value='${content}' style='font-size: 25px; margin-top: 5px;' oninput="modvalue(${thisnum});" disabled>
    `;

    // position the element
    div.style.position = 'absolute';
    div.style.marginLeft = x+'px';
    div.style.marginTop = y+'px';

    // set the id and classname
    div.id = 'thenode'+String(thisnum);
    div.className = 'node';

    // rnzindex is the z index
    // this should be the highest for the most recently clicked elements
    rnzindex += 1;

    // put the element in
    treeholder.appendChild(div);
}

function modvalue(id){
    elid = get("val"+id);
    univlst[id] = elid.value;
}

function resetcontrols(){
    get("run1").style.opacity = 1;
    get("run1").style.cursor = "pointer";
    get("run2").style.opacity = 1;
    get("run2").style.cursor = "pointer";
    get("run3").style.opacity = 1;
    get("run3").style.cursor = "pointer";
    muted2 = false;
    muted3 = false;
}

function mutecontrols2(){
    get("run1").style.opacity = 0.25;
    get("run1").style.cursor = "not-allowed";
    get("run3").style.opacity = 0.25;
    get("run3").style.cursor = "not-allowed";
    muted2 = true;
}

function mutecontrols3(){
    get("run1").style.opacity = 0.25;
    get("run1").style.cursor = "not-allowed";
    get("run2").style.opacity = 0.25;
    get("run2").style.cursor = "not-allowed";
    muted3 = true;
}

muted2 = false;
muted3 = false;

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
    res.style.top = "70%"
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


async function transitiondowndisappear(elid){
    let el = get(elid);
    let i = 0;
    while (i < 100){
        el.style.marginTop = i+"px";
        el.style.opacity = 1-(i/100);
        if (runspeed == "normal"){
            await sleep();
        }
        i += 0.5;
    }
}

async function transitionupappear(elid){
    let el = get(elid);
    let i = 100;
    while (i > 10){
        el.style.marginTop = i+"px";
        el.style.opacity = 1-(i/100);
        if (runspeed == "normal"){
            await sleep();
        }
        i -= 0.5;
    }
}

async function animateshiftleftby1(elids){

    let els = [];
    let g = 0;
    while (g < elids.length){
        els.push(get(elids[g]));
        g += 1;
    }

    let i = 0;
    while (i < 96){
        let j = 0;
        while (j < els.length){
            els[j].style.marginLeft = (els[j].offsetLeft-1)+"px";
            j += 1;
        }
        if (runspeed == "normal"){
            await sleep();
        }
        i += 1;
    }
}


async function animateshiftrightby1(elids){

    let els = [];
    let g = 0;
    while (g < elids.length){
        els.push(get(elids[g]));
        g += 1;
    }

    let i = 0;
    while (i < 96){
        let j = 0;
        while (j < els.length){
            if (els[j] != null){
                els[j].style.marginLeft = (els[j].offsetLeft+1)+"px";
            }
            j += 1;
        }
        if (runspeed == "normal"){
            await sleep();
        }
        i += 1;
    }
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

        let droppedid = parseInt(data.replace("drag",""));
        console.log("dropped ",data, " into ",droppedid);

        codeel = get(data);
        let indata1 = String(codeel.innerHTML);

        let type = ""
        let repopulatet = 0;
        if (indata1.includes("del")){
            type = "del";
            repopulatet = 1;
        } else {
            type = "add";
            repopulatet = 0;
        }

        let inputpossible = indata1.split('<input class="littleinput" id="');
        
        // console.log("step1", get("littleinput0").value, get("littleinput1").value);

        let accountedinputs = [];
        let i = 1
        while (i < inputpossible.length){
            crrnt = inputpossible[i].split('" oninput="checkinput')[0];
            accountedinputs.push(crrnt);
            i += 1;
        }

        // console.log("step2", get("littleinput0").value, get("littleinput1").value);


        currentcode[droppedid] = [boxid,type,accountedinputs];

        console.log(currentcode);

        // console.log("step3", get("littleinput0").value, get("littleinput1").value);


        repopulateall();

        // console.log("step4", get("littleinput0").value, get("littleinput1").value);

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
    get(id).style.border = "2px dashed rgb(120, 120, 120)";
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
    elfaruponly += 1;

    document.getElementById("codebank").innerHTML += htm;
}

function repopulateall(){
    j = 0;
    while (j < statements.length){
        repopulate(j);
        j += 1;
    }
}

// function hash(input){

// }

function repopulate(i){
    let el = document.getElementById("receiver"+i);
    // console.log("loggy beeny", el.innerHTML.includes("div"));

    if (el.innerHTML.includes("div")){
        // alert("just leave");
        return; // just leave
    }

    el.innerHTML = `
    <div id="drag${elfaruponly}" class="command" draggable="true" droppable="false" ondragstart="lastdragnestable=false; drag(event);">
    ${getstatementbank(i)}
    </div>
    `;

    elfar += 1;
    elfaruponly += 1;
}

function deletereceiver(id){
    // first check if you even can

    if (elfar <= statements.length){
        return;
    }

    elfar -= 1;


    // currentcode[] = ""

    let el = get("blockreceiver"+id);

    let getel1 = String(el.innerHTML);

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
    // try{
    //     console.log("step5", get("littleinput0").value, get("littleinput1").value);
    // } catch {

    // }

    div1 = document.createElement('div');


    div1.innerHTML += `
        <div    class="blockreceiver"
                style="margin-left: 25px;" 
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

    let cc = document.getElementById("currentcode");
    cc.appendChild(div1);

    cc.scrollTo({
        top: cc.offsetHeight+cc.scrollTop,
        left: 0,
        behavior: "smooth",
      });
      

    
    // try{
    //     console.log("step6", get("littleinput0").value, get("littleinput1").value);
    // } catch {
        
    // }

    currentcode.push("");

    // try{
    //     console.log("step7", get("littleinput0").value, get("littleinput1").value);
    // } catch {
        
    // }
    f1statements += 1;
}

function resetreceiverglows(){
    // use currentcode

    let i = 0;
    while (i < currentcode.length){
        if ((typeof currentcode[i] !== 'undefined') && currentcode[i] != ""){
            let thisid = currentcode[i][0];
            let tel = get("blockreceiver"+thisid);
            tel.style.border = "2px dashed rgb(120, 120, 120)";
        }
        i += 1;
    }
}

function glowreceiveryellow(id) {
    let el = get("blockreceiver"+id);
    el.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    el.style.border = " 3px solid rgba(0,255,100,0.5)";
}

function glownodeyellow(id) {

    try {
        console.log("glownode",id);
        let el = get("thenode"+id);
        el.scrollIntoView({ block: 'end',  behavior: 'smooth' });
        el.style.boxShadow = '7px 7px 5px rgba(0, 255, 100, 0.7)';
    } catch (error) {
        
    }
}

function glowreceiver(id) {
    let el = get("blockreceiver"+id);
    el.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    el.style.border = " 3px solid rgba(220,0,25,0.5)";
}

function getnextstatement(alreadyrun){
    let i = 0;

    let lowesti = 10000;
    let lowestdata = [];

    while (i < currentcode.length){
        if ((typeof currentcode[i] !== 'undefined') && currentcode[i] != ""){
            if (currentcode[i][0] <= lowesti && !alreadyrun.includes(currentcode[i][0])){
                lowesti = currentcode[i][0];
                lowestdata = currentcode[i];
            }
        }
        i += 1
    }

    return lowestdata;
}

async function runall(){
    resetreceiverglows();

    runspeed = "expedited";

    let runallctr = 0;
    
    let runsofar = [];

    let errorscount = 0;

    while (runallctr < currentcode.length){
        let datanow = getnextstatement(runsofar);
        runsofar.push(datanow[0]);

        if ((typeof datanow !== 'undefined') && datanow != ""){
            console.log(currentcode)
            let cd;
            if (datanow[1] == "add"){
                cd = await runadd(datanow);
            } else if (datanow[1] == "del"){
                cd = await rundel(datanow);
            }
            if (cd == 1){
                // something errored
                errorscount += 1;
                glowreceiver(datanow[0]);
            }
        }
        // console.log("ranone",datanow,currentcode);
        runallctr += 1;
    }

    let ntf = get("runnotif");
    ntf.textContent = "Finished running with "+errorscount+" error(s).";

    drawlist(univlst);
}

async function animrunall(){
    runspeed = "normal";
    stepinsession = true;
    while (stepinsession){
        stepforward();
        await sleep(get("waittime").value);
    }
}


let stepinsession = false;
let stepctr = 0;
let numactuallyrun = 0;
let totalerrors = 0;
let stepsofar = [];

async function stepforward(){
    runspeed = "normal";
    
    resetreceiverglows();
    if (!stepinsession){
        stepctr = 0;
        stepsofar = [];
        totalerrors = 0;
    }
    stepinsession = true;

    let datanow = getnextstatement(stepsofar);
    stepsofar.push(datanow[0]);

    succeeded = false;

    if (get("blockreceiver"+datanow[0]) == null){

        let ntf = get("runnotif");
        ntf.textContent += "\nFinished running with "+totalerrors+" errors.";

        stepctr = 0;
        numactuallyrun = 0;
        stepsofar = [];
        totalerrors = 0;
        stepinsession = false;
        resetcontrols();
        return;
    }


    glowreceiveryellow(datanow[0]);

    if ((typeof datanow !== 'undefined') && datanow != ""){
        console.log(currentcode)
        let cd;
        if (datanow[1] == "add"){
            cd = await runadd(datanow);
        } else if (datanow[1] == "del"){
            cd = await rundel(datanow);
        }

        if (cd == 1){
            // something errored
            console.log("errored on ", datanow[0]);
            glowreceiver(datanow[0]);
            totalerrors += 1;
        }
        numactuallyrun += 1;
        succeeded = true;
    }
    // console.log("ranone",datanow,currentcode);
    stepctr += 1;

    if (!succeeded){
        stepforward();
    }

    let ntf = get("runnotif");
    ntf.textContent = "Ran step "+numactuallyrun+" of "+(elfar-statements.length)+".";
    if (get("blockreceiver"+datanow[0]) == null){
        let ntf = get("runnotif");
        ntf.textContent += "\nFinished running with "+totalerrors+" errors.";

        stepctr = 0;
        numactuallyrun = 0;
        stepsofar = [];
        totalerrors = 0;
        stepinsession = false;
        return;
    }
}


async function runadd(data, forceval=null){

    let values;
    let value1;
    if (forceval != null){
        value1 = forceval;
        values = data;
    } else {
        values = data[2];

        // there should be one values
        value1 = get(values[0]).value;

        if (isNaN(parseInt(value1))){
            alert("This MAD hash function only accepts integers!");
            return 1;
        }

        value1 = parseInt(value1);
    }

    // console.log("value index bucket", value1);
    // alert("check console");

    let valuetoput;
    if (get(values[1]) === null){
        valuetoput = "None";
    } else {
        valuetoput = get(values[1]).value;
    }

    if (isNaN(parseInt(value1))){
        alert("This MAD hash function only accepts integers!");
        return 1;
    }

    value1 = parseInt(value1);

    let hashed = dohash(value1);


    if (numbersofar.includes(parseInt(value1))) {
        // go through the thing and then replace
        let oldstuff = univlst[hashed];

        oldstuff = oldstuff.split(",");

        let i = 0;
        while (i < oldstuff.length) {
            let splitsubj = oldstuff[i].split(" : ");
            if (splitsubj[0] == String(value1)){
                oldstuff[i] = String(value1)+" : "+valuetoput;
            }

            i += 1;
        }

        univlst[hashed] = oldstuff.join(',');
    } else {
        numbersofar.push(value1);
        
        if (univlst[hashed] == "None"){
            univlst[hashed] = String(value1)+" : "+valuetoput;
        } else {
            univlst[hashed] += ","+String(value1)+" : "+valuetoput;
        }
    }

    glownodeyellow(univlst.length-1);
    glownodeyellow(univlst.length-2);

    drawlist(univlst);

    glownodeyellow(univlst.length-1);
    glownodeyellow(univlst.length-2);

    if (runspeed == "normal"){
        await sleep();
    }

    drawlist(univlst);

    glownodeyellow(hashed);

    return 0;
}



async function rundel(data){

    let values = data[2];

    // there should be two values
    let value1 = get(values[0]).value;

    console.log(numbersofar);

    if (!numbersofar.includes(parseInt(value1))){
        alert("Value does not exist in Hashmap!"+value1);
        return 1;
    }

    value1 = parseInt(value1);

    let hashed = dohash(value1);


    // go through the thing and then replace
    let oldstuff = univlst[hashed];

    oldstuff = oldstuff.split(",");

    let i = 0;
    while (i < oldstuff.length) {
        let splitsubj = oldstuff[i].split(" : ");
        if (splitsubj[0] == String(value1)){
            oldstuff[i] = "None";
        }

        i += 1;
    }

    const index = numbersofar.indexOf(value1);
    if (index > -1) {
        numbersofar.splice(index, 1);
    }


    univlst[hashed] = oldstuff.join(',');

    glownodeyellow(univlst.length-1);
    glownodeyellow(univlst.length-2);

    drawlist(univlst);

    glownodeyellow(univlst.length-1);
    glownodeyellow(univlst.length-2);

    if (runspeed == "normal"){
        await sleep();
    }

    drawlist(univlst);

    glownodeyellow(hashed);

    return 0;
}



function rehash(randomhash, increasefactor){

    let newunivlst = [];
    let i = 0;
    while (i < increasefactor*univlst.length){
        newunivlst.push("None");
        i += 1;
    }

    // make a new hash function

    if (randomhash){
        hashp = getRandPrime(1,102);
        hasha = getRandNum(1,hashp);
        hashb = getRandNum(0,hashp);    
    }

    get("hashfunction").innerHTML = `MAD Hash Function: h(k) = [(
        <input id=hasha class="littleinput" style="color: var(--main); width: 25px; margin: 0px;" value=${hasha} onchange="changehash();">
        k + 
        <input id=hashb class="littleinput" style="color: var(--main); width: 25px; margin: 0px;" value=${hashb} onchange="changehash();">
        ) mod 
        <input id=hashp class="littleinput" style="color: var(--main); width: 25px; margin: 0px;" value=${hashp} onchange="changehash();">
        ] mod 10
        `;


    let oldlst = univlst;
    univlst = newunivlst;

    // reset numbersofar 
    numbersofar = [];

    // alert("created new hash, going to rummage through");

    i = 0;
    while (i < oldlst.length){
        console.log("actual subj is",oldlst[i]);
        if (oldlst[i] != "None"){
            splitstr = oldlst[i].split(",");
            let j = 0;
            while (j < splitstr.length){
                let subj = splitstr[j].split(" : ");
                // console.log("converted with", subj[1], "and", subj[0]);
                // alert("converted with check console");
                runadd([null, subj[1]], parseInt(subj[0]));
                // console.log("trying to add ",parseInt(subj[0]),subj[1])
                j += 1;
            }
        }
        i += 1;
    }

    // alert("finished converting");
}


function changehash(){
    // check each of the input

    let newhasha = parseInt(get("hasha").value);
    let newhashb = parseInt(get("hashb").value);
    let newhashp = parseInt(get("hashp").value);

    if (isNaN(parseInt(newhasha)) || isNaN(parseInt(newhashb)) || isNaN(parseInt(newhashp)) || parseInt(newhashp) == 0){
        alert("Hash function parameters must be integers, and P value cannot be 0!");
        get("hasha").value = hasha;
        get("hashb").value = hashb;
        get("hashp").value = hashp;
        return;
    }

    hasha = newhasha;
    hashb = newhashb;
    hashp = newhashp;

    // alert("just changed values");


    rehash(false, 1);

}


function dohash(num){
    return ((hasha*num + hashb) % hashp) % 10;
}

const getPrimes = (min, max) => {
    const result = Array(max + 1)
        .fill(0)
        .map((_, i) => i);
    for (let i = 2; i <= Math.sqrt(max + 1); i++) {
        for (let j = i ** 2; j < max + 1; j += i) delete result[j];
    }
    return Object.values(result.slice(Math.max(min, 2)));
};

const getRandNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandPrime = (min, max) => {
    const primes = getPrimes(min, max);
    return primes[getRandNum(0, primes.length - 1)];
};

// generate the mad hash

let hashp = getRandPrime(1,102);
let hasha = getRandNum(1,hashp);
let hashb = getRandNum(0,hashp);


get("hashfunction").innerHTML = `MAD Hash Function: h(k) = [(
    <input id=hasha class="littleinput" style="color: var(--main); width: 25px; margin: 0px;" value=${hasha} onchange="changehash();">
    k + 
    <input id=hashb class="littleinput" style="color: var(--main); width: 25px; margin: 0px;" value=${hashb} onchange="changehash();">
    ) mod 
    <input id=hashp class="littleinput" style="color: var(--main); width: 25px; margin: 0px;" value=${hashp} onchange="changehash();">
    ] mod 10
    `;


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
    localStorage.setItem("bttheme",'dark');
    theme = 'dark';
    forcedark();
} else if (theme == 'dark'){
    forcedark();
}

const sleep = ms => new Promise(res => setTimeout(res, ms));


let univlst = ["None","None","None","None","None","None","None","None","None","None"];

drawlist(univlst);

let elfar = 0;
let elfaruponly = 0;
let inputnums = -1;

function getlittleinput(){
    inputnums += 1;
    return `<input class="littleinput" id="littleinput${inputnums}" oninput="checkinput('littleinput${inputnums}');" onclick="get('littleinput${inputnums}').select();" type="text" value="0">`;
}

function checkinput(id){
    let inp = get(id);
    inp.style.width = 12*(String(inp.value).length) + "px";
    if ((String(inp.value).length) <= 1){
        inp.style.width = "15px";
    }

    if ((String(inp.value).length) >= 10){
        inp.style.width = "120px";
    }
}

let torepopulate = 0;


function getstatementbank(i){
    if (i == 0){
        return `dict[${getlittleinput()}] = ${getlittleinput()}`;
    } else {
        return `del dict[${getlittleinput()}]`;
    }
}

let statements = [
    `dict[${getlittleinput()}] = ${getlittleinput()}`,
    `del dict[${getlittleinput()}]`,
];

let f1statements = 0;

let numbersofar = [];

let currentcode = [];

adddropblock();

let runspeed = "normal";


jiniter= 0;
while (jiniter < statements.length){
    adddraggable(jiniter);
    jiniter += 1;
}




if (localStorage.getItem("dsvislists") == null){
    openel('instructions'); openscreen();
    localStorage.setItem("dsvislists", "opened");
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