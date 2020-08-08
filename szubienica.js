const passwords = new Array(10);

passwords[0] = "Darowanemu koniowi w zęby się nie zagląda";
passwords[1] = "Bez pracy nie ma kołaczy";
passwords[2] = "Fortuna kołem się toczy";
passwords[3] = "Nie chwal dnia przed zachodem słońca";
passwords[4] = "Lepszy wróbel w garści niż gołąb na dachu";
passwords[5] = "Apetyt rośnie w miarę jedzenia";
passwords[6] = "Dzieci i ryby głosu nie mają";
passwords[7] = "Łaska pańska na pstrym koniu jeździ";
passwords[8] = "Dobrymi chęciami jest piekło wybrukowane";
passwords[9] = "Cicha woda brzegi rwie";

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let password = passwords[getRandomInt(0, 10)];
password = password.toUpperCase();

const length = password.length;
let mistakes = 0;

const yes = new Audio("yes.wav");
const no = new Audio("no.wav");

let password1 = "";

for (let i=0; i<length; i++)
{
    if (password.charAt(i) == " ") password1 = password1 + " ";
    else password1 = password1 + "-";
}

function writeThePassword()
{
    document.getElementById("board").innerHTML = password1;
}

window.onload = start;

const letters = ["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ź","Ż"];

function start()
{
    let divContent = "";
    for (let i=0; i<35; i++)
    {
        let element = "letter" + i;
        divContent = divContent + '<div class="letter" onclick="check('+i+')" id="'+element+'">' + letters[i] + '</div>'
        if ((i+1) % 7 == 0) divContent = divContent + '<div style="clear:both;"></div>';
    }

    document.getElementById("alphabet").innerHTML = divContent;

    writeThePassword();
}

String.prototype.setChar = function(position, char)
{
    if (position > this.length - 1) return this.toString();
    else return this.substr(0, position) + char + this.substr(position+1);
}

function check(nr)
{
    let hit = false;

    for (let i=0; i<length; i++)
    {
        if (password.charAt(i) == letters[nr])
        {
            password1 = password1.setChar(i, letters[nr]);
            hit = true;
        }
    }

    if (hit == true)
    {
        yes.play();
        let element = "letter" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00c000";
        document.getElementById(element).style.border = "3px solid #00c000";
        document.getElementById(element).style.cursor = "default";

        writeThePassword();
    }
    else
    {
        no.play();
        let element = "letter" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#c00000";
        document.getElementById(element).style.border = "3px solid #c00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");

        mistakes++;
        if (mistakes<9) document.getElementById("gallows").innerHTML = '<img src="img/s' + mistakes + '.jpg" alt="" />';
        else
        {
            document.getElementById("gallows").innerHTML = '<img src="img/s9.jpg" alt="" />';
            document.getElementById("alphabet").innerHTML = 'PRZEGRANA! Niestety nie udało się odgadnąć hasła :( <br /><br /><span class="loss" onclick="location.reload()">SPRÓBUJ JESZCZE RAZ!<span/>';
        }
    }

    if (password == password1) document.getElementById("alphabet").innerHTML = 'GRATULACJE! Podano prawidłowe hasło: ' + password + '<br /><br /><span class="win" onclick="location.reload()">JESZCZE RAZ?</span>';

    writeThePassword();
}