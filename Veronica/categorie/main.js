
let bouton = document.querySelector('.arrow');
let cible = document.querySelector('.page_evenements');
let rick = document.querySelector('.testooo');

bouton.addEventListener('click', function() {
    smooth_scroll('.testooo', 9000);
});

rick.addEventListener('click', function() {
    smooth_scroll('.page_evenements', 3000);
})

// Clic sur fleche execute la function
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