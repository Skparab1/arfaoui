// Arfaoui

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


// put all the tree data into the url
function createshareURL(){

    document.getElementById("copysharelink").textContent = "Copy link";

    let query = preorderwithnullpointers(root);

    query = query.replaceAll(" ","%20"); 

    document.getElementById("shareurldisp").textContent = location.href.replace("/index.html","")+"/share?data="+query;
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

function openprefs(){
    document.getElementById('preferences').style.display = 'block';
    document.getElementById('preferences').style.opacity = 1;
    document.getElementById('preferences').style.top = '25%';
}

function openel(el){
    document.getElementById(el).style.display = 'block';
    document.getElementById(el).style.opacity = 1;
    document.getElementById(el).style.top = '25%';
}

function toggletheme(override){
    var r = document.querySelector(':root');

    let endtime = new Date();
    var timediff = endtime - lasttoggle; 
    lasttoggle = endtime;

    if (timediff < 333 && !override){
        return;
    }

    console.log('changeing from  '+theme);
    if (theme == 'dark'){
        // make light
        theme = 'light';
        localStorage.setItem('bttheme','light');
        document.getElementById('theme').textContent = "Theme: (light)";
        r.style.setProperty('--bg', 'white');
        r.style.setProperty('--bgslight', 'rgba(255,255,255,0.6)');
        r.style.setProperty('--contrast', 'black');
        r.style.setProperty('--main', '#0d6efd');
        r.style.setProperty('--secondary', '#0a4bad');
        r.style.setProperty('--slight', 'rgb(220,220,220)');
    } else {
        // make dark
        theme = 'dark';
        localStorage.setItem('bttheme','dark');
        document.getElementById('theme').textContent = "Theme: (dark)";
        r.style.setProperty('--bgslight', 'rgba(30,30,30,0.6)');
        r.style.setProperty('--bg', 'black');
        r.style.setProperty('--contrast', 'white');
        r.style.setProperty('--main', '#0d6efd');
        r.style.setProperty('--secondary', '#0a4bad');
        r.style.setProperty('--slight', 'rgb(30, 30, 30)');
    }
}

function forcedark(){
    theme = 'dark';
    localStorage.setItem('bttheme','dark');
    document.getElementById('theme').textContent = "Theme: (dark)";
    
    var r = document.querySelector(':root');
    r.style.setProperty('--bgslight', 'rgba(30,30,30,0.6)');
    r.style.setProperty('--bg', 'black');
    r.style.setProperty('--contrast', 'white');
    r.style.setProperty('--main', '#0d6efd');
    r.style.setProperty('--secondary', '#0a4bad');
    r.style.setProperty('--slight', 'rgb(30, 30, 30)');
}

function closeprefs(){
    //document.getElementById('solutions').style.display = 'none';
    document.getElementById('preferences').style.opacity = 0;
    document.getElementById('preferences').style.top = '100%';
}

function closeel(el){
    //document.getElementById('solutions').style.display = 'none';
    document.getElementById(el).style.opacity = 0;
    document.getElementById(el).style.top = '100%';

}

function closesolutions(){
    //document.getElementById('solutions').style.display = 'none';
    document.getElementById('solutions').style.opacity = 0;
    document.getElementById('solutions').style.top = '100%';
}

function closeinstructions(){
    document.getElementById('instructions').style.top = '100%';
    document.getElementById('instructions').style.opacity = 0;
}
  



// load the settings from localstorage
let theme = localStorage.getItem('bttheme');
let angle = localStorage.getItem('btangle');
let demospeed = localStorage.getItem('btspeed');

let lasttoggle = new Date();


if (theme == null){
    localStorage.setItem("bttheme",'dark');
    theme = 'dark';
    forcedark();
} else if (theme == 'dark'){
    forcedark();
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

function appearpanel(id){
    document.getElementById("panel"+id).style.transition = "all 0.5s";
    document.getElementById("panel"+id).style.marginLeft = "1.25%";
    document.getElementById("panel"+id).style.opacity = 1;
}

(async () => {
    let i = 1;
    await sleep(500);
    
    while (i <= 6){
        appearpanel(i);
        await sleep(100);
        i += 1;
    }

    await sleep(500);

    document.getElementById("panel"+6).style.opacity = 0.5;
})();



if (localStorage.getItem("skpbinarytreeft") == null){
    openel('instructions'); openscreen();
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