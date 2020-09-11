var product = {};
let comentario ={};
var products = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];
        
        htmlContentToAppend += `
        <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="">
              </div>
        `
    }
    document.getElementById("productImage").innerHTML += htmlContentToAppend;
}




function mostrarComentarios(array){

    let htmlContentToAppend = "";
   


    for(let i = 0; i < array.length; i++){
        let coment = array[i];
        htmlContentToAppend += `
            <div class="comentarios">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                     <h4 class="text-muted">`+ coment.user +"  "+ `<span class="fa fa-star checked"></span> `.repeat(coment.score) +
                    `<span class="fa fa-star"></span> `.repeat(5-coment.score) +`</h4>
                    <small class="text-muted">` + coment.dateTime + `</small>
                </div>
                <div>
                    <p class="mb-1">` +coment.description+ `</p>
                    
                </div>
        
        </div>
            </div>    
        `

        document.getElementById("comentario").innerHTML = htmlContentToAppend;
        
    }
}

function productosRecomendados(){

    let htmlContentToAppend = "";
    let a =product.relatedProducts;
    for(let i = 0; i < a.length; i++){
        htmlContentToAppend += `
                <div class="col-lg-3 col-md-6 col-6">
                    <div class="precomendados">
                    <a href="product-info.html">
                    <img style="width: 15rem;" src="` + products[a[i]].imgSrc + `" >
                    <div>
                        <h5>`+ products[a[i]].name +`</h5>
                        <p>` + products[a[i]].description + `</p>
                        <h3 class="text-muted"><b>` +"US$ "+ products[a[i]].cost + `</b></h3>
                    </div>
                    <a>
                    </div>
                </div>
             
            `
             document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}


var puntuacion = ["1 estrella", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas"];
var aux1 = document.querySelectorAll(".puntuaciones>a");
var puntos = document.querySelector(".puntuaciones .calificacion");
for (const item of aux1) {
    item.addEventListener('mouseenter', cal);
}
function cal(e) {
    e.stopPropagation();
    var auxi = parseInt(e.target.id);
    var elementos = e.target.parentElement.querySelectorAll(".puntuaciones>a");

 
    Array.from(elementos).forEach(e => e.classList.remove("seleccionado"));


    Array.from(elementos).filter(item => { return parseInt(item.id) <= auxi })
        .forEach(e => e.classList.add("seleccionado"));


    puntos.innerHTML = `${puntuacion[auxi - 1]}`;
}


function addComent(){
    let fecha = new Date();
    let htmlContentToAppend = "";
    let agregarComentario = document.getElementById("addcoment")
    

    htmlContentToAppend += `<div class="comentarios">
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="text-muted">`+ localStorage.getItem("login") +"  "+ `<span class="fa fa-star checked"></span> `.repeat(puntuacion.indexOf(puntos.innerHTML)+1) +
            `<span class="fa fa-star"></span> `.repeat(4-puntuacion.indexOf(puntos.innerHTML)) +`</h4>
            <small class="text-muted">` + fecha.getFullYear() + `-` + fecha.getMonth() + `-` + fecha.getDate()+ ` ` + fecha.getHours()+ `:` + fecha.getMinutes() + `:` + fecha.getSeconds() +   `</small>
        </div>
        <div>
        <p class="mb-1">` + agregarComentario.value + `</p>
    </div>
    </div>
    </div>    
`
    document.getElementById("comentario").innerHTML += htmlContentToAppend;
        
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productcategoryHTML = document.getElementById("productcat");
            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productcostHTML = document.getElementById("productcost");
            let productcurrencyHTML = document.getElementById("productcost");

            
            productcategoryHTML.innerHTML = product.category;
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productcostHTML.innerHTML = product.currency + " ";
            productcostHTML.innerHTML += product.cost;
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    products = resultObj.data;
                    productosRecomendados();
        
                 }
            });
            
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentario = resultObj.data;
            mostrarComentarios(comentario);

         }
    });
    

});