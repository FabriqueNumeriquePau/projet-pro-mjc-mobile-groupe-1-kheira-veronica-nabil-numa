
let bouton = document.querySelector('.arrow');
let cible = document.querySelector('.page_evenements');
let rick = document.querySelector('.testooo');

bouton.addEventListener('click', function() {
    smooth_scroll('.testooo', 8000);
});

// rick.addEventListener('click', function() {
//     smooth_scroll('.page_evenements', 3000);
// })

// Clic sur fœleche execute la function
/* bouton.addEventListener('click', function() {
    smooth_scroll('.page_evenements', 3000);
});*/

function smooth_scroll(target,duration) {
    var target = document.querySelector(target);
    let target_position = target.getBoundingClientRect().top;
    // Prend la position du haut de l'element par rapport au haut de l'ecran du user
    let start_position = window.pageYOffset; 
    console.log(start_position);
    console.log(target_position);

    // Prend en compte la position du user sur la page en Y
    // Calcule la difference entre l'user et le target
    let start_time = null;;

    function animation_scroll(current_time) {
        if(start_time === null) start_time = current_time ;
        let time_elapsed = current_time - start_time;
        let run = ease_it(time_elapsed, start_position, target_position, duration);
        window.scrollTo(0,run);
        if(time_elapsed < duration) requestAnimationFrame(animation_scroll);
    }
        // gizma.com/easing/
    function ease_it(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

   /* function ease_it(t, b, c, d) {
        t /= d;
        return c*t*t*t + b;
    };*/
    requestAnimationFrame(animation_scroll);

}

class Calendario {
    constructor(selector) {
        this.selector = selector
        this.fechas = []
        this.dias = ["L", "M", "M", "J", "V", "S", "D"]
        this.meses = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        this.fechaActual = new Date()
        this.mesActual = this.fechaActual.getMonth()
        this.anoActual = this.fechaActual.getFullYear()
        this.init(this.anoActual, this.mesActual)
    }
    init(year, month) {
        this.fecha = new Date(year, month, 1)
        this.diasMes = new Date(year, month + 1, 0)
        this.ano = year
        if (document.querySelector(`${this.selector} > .calendario`)) document.querySelector(`${this.selector} > .calendario`).remove()
        if (!document.querySelector(`${this.selector} > .calendario`)) {
            let nodoParent = document.createElement("DIV")
            // Nodo Parent
            nodoParent.className = "calendario"
            let nodoTitleMonth = document.createElement("DIV")
            nodoTitleMonth.className = "CalendarioHeader"
            // Button month before
            let nodoTitleBack = document.createElement("BUTTON")
            nodoTitleBack.onclick = () => this.anterior()
            if (month - 1 < 0) nodoTitleBack.textContent += this.meses[11]
            else nodoTitleBack.textContent += this.meses[month - 1]
            nodoTitleBack.style.cursor = "pointer"
            nodoTitleMonth.appendChild(nodoTitleBack)
            // title month
            let nodoTitle = document.createElement("aside")
            let nodoTitle_h1 = document.createElement("H1")
            nodoTitle_h1.textContent = this.meses[month]
            nodoTitle_h1.style.cursor = "pointer"
            nodoTitle_h1.onclick = () => this.reset()
            let nodoTitle_h3 = document.createElement("H4")
            nodoTitle_h3.textContent = this.ano
            nodoTitle.appendChild(nodoTitle_h3)
            nodoTitle.appendChild(nodoTitle_h1)
            nodoTitleMonth.appendChild(nodoTitle)
            // Button month after
            let nodoTitleNext = document.createElement("BUTTON")
            nodoTitleNext.onclick = () => this.siguiente()
            if (month + 1 >= 12) nodoTitleNext.textContent = this.meses[0]
            else nodoTitleNext.textContent = this.meses[month + 1]
            nodoTitleNext.style.cursor = "pointer"
            nodoTitleMonth.appendChild(nodoTitleNext)
            // Add Child nodoParent
            nodoParent.appendChild(nodoTitleMonth)
            // title day [d -l - m - m - j - v - s]
            let nodoHeader = document.createElement("DIV")
            nodoHeader.className = "header"
            for (let k in this.dias) {
                let nodoChild = document.createElement("H3")
                nodoChild.textContent = this.dias[k]
                nodoHeader.appendChild(nodoChild)
            }
            nodoParent.appendChild(nodoHeader)
            // All before day month
            let afterMonth = new Date(year, month, 0).getUTCDate() - this.fecha.getUTCDay()
            for (let k = 1; k <= this.fecha.getUTCDay(); k++) {
                let nodoChild = document.createElement("H3")
                nodoChild.textContent = afterMonth + k
                nodoChild.style.color = "rgba(0,0,0,0.2)"
                nodoChild.onclick = (e) => this.anterior()
                nodoParent.appendChild(nodoChild)
            }
            // All day month
            for (let k = 1; k <= this.diasMes.getDate(); k++) {
                let nodoChild = document.createElement("H3")
                nodoChild.textContent = `${k}`
                nodoChild.id = `A${year}M${month}D${k}`
                nodoParent.appendChild(nodoChild)
            }
            // All after day month
            let relleno = 42 - (this.fecha.getUTCDay() + this.diasMes.getDate())
            for (let k = 0; k < relleno; k++) {
                let nodoChild = document.createElement("H3")
                nodoChild.textContent = k + 1
                /*Colocar colores de variables*/
                nodoChild.style.color = "rgba(0,0,0,0.2)"
                nodoChild.onclick = (e) => this.siguiente()
                nodoParent.appendChild(nodoChild)
            }
            // ElementHTML add nodoParent
            document.querySelector(this.selector).appendChild(nodoParent)
            // Current Day
            let idActual = document.getElementById(`A${this.anoActual}M${this.mesActual}D${this.fechaActual.getDate()}`)
            if (idActual) {
                ((s) => {
                    s.fontSize = "1.5rem"
                    s.boxShadow = "1px 1px 10px 2px #D6859E"
                    s.background = "#D6859E"
                    s.borderRadius = "50%"
                    /*Colocar colores de variables*/
                    s.color = "#34495e"
                })(idActual.style)
            }
        }
    }
    siguiente() {
        this.nextMonth = this.fecha.getMonth() + 1
        this.nextYear = this.ano
        if (this.nextMonth + 1 > 12) {
            this.nextMonth = 0
            this.nextYear++
        }
        this.init(this.nextYear, this.nextMonth)
    }
    anterior() {
        this.backMonth = this.fecha.getMonth() - 1
        this.backYear = this.ano
        if (this.backMonth - 1 <= 0) {
            this.backMonth = 11
            this.backYear--
        }
        this.init(this.backYear, this.backMonth)
    }
    reset() {
        this.init(this.anoActual, this.mesActual)
    }
}
// CODE
const calendario = new Calendario(".app")