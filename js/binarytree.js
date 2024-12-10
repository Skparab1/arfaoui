// DS visualizer: Binary Tree


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



// class for a treenode that makes up the tree
class treenode {

    // basic constructor with value, left, and right
    constructor(value, left, right) {
      this.value = value;
      this.left = left;
      this.right = right;
    }


    // getter functions
    get getvalue() {
        return this.value;
    }

    get getleft(){
        return this.left;
    }

    get getright(){
        return this.right;
    }


    // setter functions
    setvalue(val){
        this.value = val;
    }

    setleft(l){
        this.left = l;
    }

    setright(r){
        this.right = r;
    }
}



// get the div that holds the tree
let treeholder = document.getElementById('treeholder');
let nodesadded = 0;

// draw a specific node at the coordinates x,y (by creating an element for it)
function drawnode(node,x,y){

    // create element
    const div = document.createElement('div');

    // get the value that should be in the node
    let thisnum = nodearr.indexOf(node);
      
    // put the value into the element
    div.innerHTML = `
    <input id='val${thisnum}' type='text' class='nodevalbin' value='${node.getvalue}' onchange="modvalue(${thisnum});">
    `;

    // put in the left adder button, if there isnt already a left child
    let theleft = node.getleft;
    if (theleft == null || theleft.getvalue == 'deleted'){
        div.innerHTML += ` <button id='leftadder${thisnum}' class='nodeadderleft' onclick='addleft(${thisnum});'>left</button>`
    } else {
        div.innerHTML += ` <button id='leftadder${thisnum}' class='nodeadderleft' style='opacity: 0;'>left</button>`
    }

    // put in the right adder button, if there isnt already a right child
    let theright = node.getright;
    if (theright == null || theright.getvalue == 'deleted'){
        div.innerHTML += `<button id='rightadder${thisnum}' class='nodeadderright' onclick='addright(${thisnum});'>right</button>`;
    } else {
        div.innerHTML += `<button id='rightadder${thisnum}' class='nodeadderright' style='opacity: 0;'>right</button>`;
    }

    // put in the delete button, if the node has no children
    if ((theright == null || theright.getvalue == 'deleted') && (theleft == null || theleft.getvalue == 'deleted') && node != root){
        div.innerHTML += ` <button id='deletenode${thisnum}' onclick='delnode(${thisnum});' class='deletenode'>del</button>`
    } else {
        div.innerHTML += ` <button id='deletenode${thisnum}' class='deletenode' style='opacity: 0;'>del</button>`
    }

    // position the element
    div.style.position = 'absolute';
    div.style.marginLeft = x+'%';
    div.style.marginTop = y+'px';

    // set the id and classname
    div.id = 'thenode'+String(thisnum);
    div.className = 'nodebin';


    // if a node is clicked then bring it to the front
    div.onclick = function() {document.getElementById(div.id).style.zIndex = rnzindex; rnzindex += 1; operationwhenclicked(thisnum)};

    // rnzindex is the z index
    // this should be the highest for the most recently clicked elements
    rnzindex += 1;

    // put the element in
    treeholder.appendChild(div);
}


// if the value is edited, then modify the array and store the tree
function modvalue(n){
    let el = document.getElementById('val'+n);
    nodearr[n].setvalue(el.value);
}

// deleting a node
function delnode(n){
    //console.log(nodearr,n,nodearr[n].getvalue);
    //nodearr[n].setvalue('deleted');

    // set the value
    let thing = nodearr[n];
    thing.setvalue('deleted');

    //and remove it
    nodearr[n] = null;
    nodearr.splice(n,1);
    //nodearr[n] = null;

    // go through and find whos left or right this is
    // console.log(findnode(root,nodearr[n]));

    //delnodes.push(n);
    // console.log(root.getleft);

    // update
    nodesadded -= 1;

    // redraw
    redrawtree();
}

// erase and draw tree
function redrawtree(){
    //console.log(nodearr);

    // erase
    treeholder.innerHTML = "";
    connectors.innerHTML = "";

    // // store
    // storetree();
    
    // draw
    drawtree(root, 50, 0, 50);
}



// add a left child node to whatever node
function addleft(num, val=0, directed=false){
    //console.log('addleft on '+num+' with '+nodearr);

    // create a new node
    let newnode = new treenode(val,null,null);
    nodearr[num].setleft(newnode);

    // update
    nodesadded += 1;


    // add to the array
    nodearr[nodesadded] = newnode;
    //console.log(nodearr);

    redrawtree();
    
    return nodesadded;
}

// add a right child to the node
function addright(num, val=0, directed=false){

    // create the node
    let newnode = new treenode(val,null,null);
    nodearr[num].setright(newnode);

    // update
    nodesadded += 1;
    
    // add to array
    nodearr[nodesadded] = newnode;

    redrawtree();
}

// draw the tree recursively
function drawtree(root, x, y, prevx){

    // if current node has been deleted, treat it like its a null (dont draw it or anything)
    if (root.getvalue == 'deleted'){
        root = null;
    }

    // if its not null or deleted do this
    // root.getvalue != 'deleted' shouldnt be needed idk why its there but not gonna change it
    if (root != null && root.getvalue != 'deleted'){
        
        // draw the current node
        drawnode(root,x,y);

        //figure out the x and y coordinates at which the child nodes should be located
        let newy = y + 75;
        let leftx;
        let rightx;
        if (x == 50){
            leftx = 25;
            rightx = 75;
        } else {
            // distance from middle Math.abs(50-x)
            leftx = x-Math.abs(prevx-x)/2;
            rightx = x+Math.abs(prevx-x)/2;
            // console.log(leftx);
        }

        // leftx = leftx-(5000/window.innerWidth);
        // rightx = rightx-(5000/window.innerWidth);


        // create the connector line for the left side
        const div = document.createElement('div');
        let wid = Math.abs(leftx-x);
        div.className = 'connector';
        div.style.borderLeft = '7px solid var(--contrast)';
        div.style.borderRight = '0px solid white';
        div.style.width = wid+'%';
        div.style.height = '75px'
        div.style.left = (leftx+(5000/window.innerWidth))+'%';
        div.style.top = (y+150)+'px';
        div.style.zIndex = -1;

        // create the connector line for the right side 
        const div1 = document.createElement('div');
        div1.className = 'connector';
        div1.style.borderRight = '7px solid var(--contrast)';
        div1.style.borderLeft = '0px solid white';
        div1.style.width = wid+'%';
        div1.style.height = '75px'
        div1.style.left = (x+(5000/window.innerWidth))+'%';
        div1.style.top = (y+150)+'px';
        div1.style.zIndex = -1;

        // as long as the left child isnt null or deleted, draw it
        if (root.getleft != null && root.getleft.getvalue != 'deleted'){
            document.getElementById('connectors').appendChild(div);
            drawtree(root.getleft,leftx,newy, x);
        }

        // as long as the right child isnt null or deleted, draw it
        if (root.getright != null && root.getright.getvalue != 'deleted'){
            document.getElementById('connectors').appendChild(div1);
            drawtree(root.getright,rightx,newy, x);
        }
    }
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
    // console.log(parseInt(el.style.marginTop.replace("px", "")));
    let upg = parseInt(el.style.marginTop.replace("px", ""));
    let i = 100;
    while (i > 0){
        el.style.marginTop = (i+upg)+"px";
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
    while (i < 150){
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
    while (i < 150){
        let j = 0;
        while (j < els.length){
            if (els[j] != null){
                // if (elids[j].includes("line")){
                //     els[j].style.left = (els[j].offsetLeft+1)+"px";
                // } else {
                els[j].style.marginLeft = (els[j].offsetLeft+1)+"px";
                // }
            }
            j += 1;
        }

        if (runspeed == "normal"){
            await sleep();
        }
        i += 1;
    }
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
        if (indata1.includes(".left = Node(")){
            type = "setleft";
            repopulatet = 0;
        } else if (indata1.includes(".right = Node(")){
            type = "setright";
            repopulatet = 1;
        } else if (indata1.includes("left")){
            type = "deleteleft";
            repopulatet = 2;
        } else if (indata1.includes("right")){
            type = "deleteright";
            repopulatet = 3;
        } else if (indata1.includes("data")){
            type = "setdata";
            repopulatet = 4;
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

function movenodeselector(mirror){
    console.log("getting", mirror);

    try {
        let mirror1 = get(mirror);
        let nodeselector = get("nodeselector");
        fillinput = mirror;
        nodeselector.style.opacity = 1;
        nodeselector.style.left = 100*(mirror1.offsetLeft + document.body.scrollLeft)/window.innerWidth + "%";
        nodeselector.style.top = 100*(mirror1.offsetTop + document.body.scrollTop + get("res").offsetTop-100)/window.innerHeight + "%";
    
    } catch (error) {
        
    }
  }

function movenodenotif(mirror){
    let mirror1 = get(mirror);
    let nodenotif = get("nodenotif");
    nodenotif.style.opacity = 1;
    nodenotif.style.left = 100*(mirror1.offsetLeft + document.body.scrollLeft)/window.innerWidth + "%";
    nodenotif.style.top = 100*(mirror1.offsetTop + document.body.scrollTop + get("res").offsetTop-100)/window.innerHeight + "%";
}

function adddraggable(ctr){
    htm = `
    <div class="bankbox" id="receiver${ctr}" droppable="true" ondrop="drop(event); moveroutbox('receiver${ctr}');" ondragover="if(!(get('receiver${ctr}').innerHTML.includes('div'))){allowDrop(event); msmover('receiver${ctr}');}else{msmoverdeny('receiver${ctr}');}" ondragleave="moveroutbox('receiver${ctr}');" aria-dropeffect="copy">
        <div id="drag${elfar}" class="command" style="font-size: 17px;" draggable="true" droppable="false" ondragstart="lastdragnestable=false; drag(event)">
        ${statements[ctr]}
        </div>
    </div>
    `;

    elfar += 1;
    elfaruponly += 1;

    if (ctr < 3){
        document.getElementById("codebank1").innerHTML += htm;
    } else {
        document.getElementById("codebank2").innerHTML += htm;
    }
}

function repopulateall(){
    j = 0;
    while (j < statements.length){
        repopulate(j);
        j += 1;
    }
}

function repopulate(i){
    let el = document.getElementById("receiver"+i);
    // console.log("loggy beeny", el.innerHTML.includes("div"));

    if (el.innerHTML.includes("div")){
        // alert("just leave");
        return; // just leave
    }

    el.innerHTML = `
    <div id="drag${elfaruponly}" class="command" style="font-size: 17px;" draggable="true" droppable="false" ondragstart="lastdragnestable=false; drag(event);">
    ${getstatementbank(i)}
    </div>
    `;

    elfar += 1;
    elfaruponly += 1;
}



function deletereceiver(id){
    // first check if you even can

    if (elfar <= statements.length-1){
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

    div1.style.width = "160%";
    div1.style.marginLeft = "-5%";

    let cc = document.getElementById("currentcode");
    cc.appendChild(div1);

    cc.scrollTo({
        top: cc.offsetHeight,
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
            if (datanow[1] == "setleft"){
                cd = await runsetleft(datanow);
            } else if (datanow[1] == "setright"){
                cd = await runsetright(datanow);
            } else if (datanow[1] == "deleteleft"){
                cd = await rundeleteleft(datanow);
            } else if (datanow[1] == "deleteright"){
                cd = await rundeleteright(datanow);
            } else if (datanow[1] == "setdata"){
                cd = await runsetdata(datanow);
            }
            
            if (cd == 1){
                // something errored
                errorscount += 1;
                console.log("errored on ", datanow[0]);
                glowreceiver(datanow[0]);
            }
        }
        // console.log("ranone",datanow,currentcode);
        runallctr += 1;
    }

    let ntf = get("runnotif");
    ntf.textContent = "Finished running with "+errorscount+" error(s).";

    redrawtree();
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
        ntf.textContent += "\nFinished running with "+totalerrors+" error(s).";

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
        if (datanow[1] == "setleft"){
            cd = await runsetleft(datanow);
        } else if (datanow[1] == "setright"){
            cd = await runsetright(datanow);
        } else if (datanow[1] == "deleteleft"){
            cd = await rundeleteleft(datanow);
        } else if (datanow[1] == "deleteright"){
            cd = await rundeleteright(datanow);
        } else if (datanow[1] == "setdata"){
            cd = await runsetdata(datanow);
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

    if (stepinsession){
        let ntf = get("runnotif");
        ntf.textContent = "Ran step "+numactuallyrun+" of "+(elfar-statements.length)+".";
    }
    if (get("blockreceiver"+datanow[0]) == null){
        stepctr = 0;
        numactuallyrun = 0;
        stepsofar = [];
        totalerrors = 0;
        stepinsession = false;

        let ntf = get("runnotif");
        ntf.textContent += "\nFinished running with "+totalerrors+" error(s).";
        return;
    }
}



async function runsetleft(data){

    let values = data[2];

    // there should be two values
    let index = parseInt(String(get(values[0]).value).replace("<selectednode>", ""));

    if (isNaN(index)){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    let value1 = get(values[1]).value;

    if (index < -1){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    recallibratenodes(nodearr[index].left)

    addleft(index, value1, true);


    console.log("glew",(nodesadded));

    get("connectors").style.display = "none";

    get("connectors").style.opacity = 0;

    await sleep(300);

    get("connectors").style.display = "block";

    redrawtree();

    get("connectors").style.opacity = 1;

    glownodeyellow(nodesadded);

    return 0;
}

async function runsetright(data){

    let values = data[2];

    // there should be two values
    let index = parseInt(String(get(values[0]).value).replace("<selectednode>", ""));

    if (isNaN(index)){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    let value1 = get(values[1]).value;

    if (index < -1){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    recallibratenodes(nodearr[index].right)

    addright(index, value1, true);


    console.log("glew",(nodesadded));

    get("connectors").style.display = "none";

    get("connectors").style.opacity = 0;

    await sleep(300);

    get("connectors").style.display = "block";

    redrawtree();

    get("connectors").style.opacity = 1;

    glownodeyellow(nodesadded);

    return 0;
}


async function rundeleteleft(data){

    let values = data[2];

    // there should be two values
    let index = parseInt(String(get(values[0]).value).replace("<selectednode>", ""));

    if (isNaN(index)){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    if (index < -1){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    // get the index of the left one

    if (nodearr[index].left === null){
        // do nothing
        return 0;
    }

    recallibratenodes(nodearr[index].left)

    leftidx = nodearr.indexOf(nodearr[index].left);

    delnode(leftidx);

    get("connectors").style.display = "none";

    get("connectors").style.opacity = 0;

    await sleep(300);

    get("connectors").style.display = "block";

    redrawtree();

    get("connectors").style.opacity = 1;

    return 0;
}



async function rundeleteright(data){

    let values = data[2];

    // there should be two values
    let index = parseInt(String(get(values[0]).value).replace("<selectednode>", ""));

    if (isNaN(index)){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    if (index < -1){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    // get the index of the left one

    if (nodearr[index].right === null){
        // do nothing
        return 0;
    }

    recallibratenodes(nodearr[index].right)

    rightidx = nodearr.indexOf(nodearr[index].right);

    delnode(rightidx);

    get("connectors").style.display = "none";

    get("connectors").style.opacity = 0;

    await sleep(300);

    get("connectors").style.display = "block";

    redrawtree();

    get("connectors").style.opacity = 1;

    return 0;
}




async function runsetdata(data){

    let values = data[2];

    // there should be two values
    let index = parseInt(String(get(values[0]).value).replace("<selectednode>", ""));

    if (isNaN(index)){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    let value1 = get(values[1]).value;

    if (index < -1){
        movenodeselector(values[0]);
        alert("Node Invalid. Please ensure you have clicked on the input box and selected a node. In addition, check that addafter can be performed on the node, and that the node has not been deleted.");
        return 1;
    }

    nodearr[index].setvalue(value1);

    get("connectors").style.display = "none";

    get("connectors").style.opacity = 0;

    await sleep(300);

    get("connectors").style.display = "block";

    redrawtree();

    get("connectors").style.opacity = 1;

    glownodeyellow(index);

    return 0;
}


function setdeleted(index){
    let i = 0;
    while (i < inputnums+1){
        let thisinp = get("littleinput"+i);
        try {
            let vl = String(thisinp.value);

            // alert(vl);

            if (vl.includes("<selectednode>"+index)){
                thisinp.value = "<DELETED NODE>";
            }
        } catch (error) {
            
        }

        i += 1;
    }
}


function recallibratenodes(deletedroot){

    if (deletedroot == null){
        return;
    }

    indexofthis = nodearr.indexOf(deletedroot);

    console.log("setting deleted", indexofthis);

    setdeleted(indexofthis);

    recallibratenodes(deletedroot.right);
    recallibratenodes(deletedroot.left);
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

let root = new treenode('root',null,null);


let leftbuttons = [];
let delnodes = [];

// i know having a set capacity generally isnt good but im confident this will be more than enough
// could be increased but may impact performance if there are a bunch of not used really
let nodearr = [root,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let disabled = false;

// intialx
let x = 50;
let y = 0;

let rnzindex = 10;
let stayingup = false;

redrawtree();



if (theme == null){
    localStorage.setItem("bttheme",'dark');
    theme = 'dark';
    forcedark();
} else if (theme == 'dark'){
    forcedark();
}

const sleep = ms => new Promise(res => setTimeout(res, ms));


let elfar = 0;
let elfaruponly = 0;
let inputnums = -1;

let fillinput = 0;

async function turnoffnodeselector(){
    get("nodeselector").style.opacity = 0;

    await sleep(250);

    get("nodeselector").style.left = "-20%";
}

async function operationwhenclicked(index){

    if (fillinput == 0){
        return;
    }

    get("nodeselector").style.opacity = 0;

    await sleep(250);

    get("nodeselector").style.left = "-20%";


    glownodeyellow(index);

    if (fillinput == 0){
        // do nothing
    } else {
        get(fillinput).value = "<selectednode>"+index;
    }

    movenodenotif(fillinput);

    fillinput = 0;

    get("nodenotif").innerHTML = "This argument now points to the highlighted node, containing '"+ nodearr[index].value +"'"; //+todo;


    get("nodenotif").style.opacity = 1;

    await sleep(5000);

    get("nodenotif").style.opacity = 0;

    await sleep(250);

    redrawtree();

    get("nodenotif").style.left = "-20%";


    
}

function getlittleinput(value){
    inputnums += 1;

    const useinp = inputnums;

    let wt = 8.5*(String(value).length) + "px";
    if ((String(value).length) <= 1){
        wt = "12px";
    }

    if ((String(value).length) >= 10){
        wt = "80px";
    }

    let otherclick = "";
    let outclick = "";
    if (value == "node1"){
        otherclick = `movenodeselector('littleinput${useinp}');`;
        outclick = "turnoffnodeselector()";
    }

    return `<input class="littleinput" id="littleinput${useinp}" oninput="checkinput('littleinput${useinp}');" onclick="get('littleinput${useinp}').select();" onmouseover="${otherclick}" onmouseout="${outclick}" type="text" value="${value}" style="font-size: 17px; width: ${wt};">`;
}

function checkinput(id){
    let inp = get(id);
    inp.style.width = 8.5*(String(inp.value).length) + "px";
    if ((String(inp.value).length) <= 1){
        inp.style.width = "12px";
    }

    if ((String(inp.value).length) >= 10){
        inp.style.width = "85px";
    }
}

let torepopulate = 0;



// ANNOYING. YOU CANNOY USE THE ARRAY STATEMENTS. MANUALLY EACH FUNCTION VIA IF THEN
function getstatementbank(i){
    if (i == 0){ 
        return `${getlittleinput("node1")}.left = Node(${getlittleinput(1)}, None, None)`;
    } else if (i == 1){ 
        return `${getlittleinput("node1")}.right = Node(${getlittleinput(1)}, None, None)`;
    } else if (i == 2){ 
        return `${getlittleinput("node1")}.left = None`;
    } else if (i == 3){ 
        return `${getlittleinput("node1")}.right = None`;
    } else if (i == 4){ 
        return `${getlittleinput("node1")}.data = ${getlittleinput(1)}`;
    }
}

let statements = [
    `${getlittleinput("node1")}.left = Node(${getlittleinput(1)}, None, None)`,
    `${getlittleinput("node1")}.right = Node(${getlittleinput(1)}, None, None)`,
    `${getlittleinput("node1")}.left = None`,
    `${getlittleinput("node1")}.right = None`,
    `${getlittleinput("node1")}.data = ${getlittleinput(1)}`
];

let f1statements = 0;

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