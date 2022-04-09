const ingresos = [
    new Ingreso('Sueldo', 130000.00),
    new Ingreso('Venta pagina web',40000.00),
    new Ingreso('nuevo ingreso', 5000)
];

const egresos = [
    new Egreso('Pago alquiler', 50000.00),
    new Egreso('Compra de ropa', 6000.00),
    new Egreso('Compra Alimentos',10000.00)
];

let cargarApp = ()=>{
    cargarHeader();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarHeader = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto); 
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos()); 
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-AR',{style:'currency', currency:'ARS', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-AR',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
        
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos" >
        <div class="elemento__descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento__valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento__eliminar">
                <button class='elemento__eliminar--btn'>
                    <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso =(id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarHeader();
    cargarIngresos();
}

const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento__descripcion"> ${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento__valor">- ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento__porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento__eliminar">
                        <button class='elemento__eliminar--btn'>
                        <ion-icon name="close-circle-outline" onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                    </button>
                            </button>
                        </div>
                    </div>
    </div>
    `;
    return egresoHTML;
}

let eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarHeader();
    cargarEgresos();
}

//const btnEliminar = document.querySelector("#btn-eliminar")

//btnEliminar.addEventListener('click', ()=> {

//    Swal.fire({
//        title: '¿Estás seguro de eliminar este dato?',
//        icon: 'warning',
//        showCancelButtonText: true,
//        confirmButtonText: 'Sí',
//        showCancelButtonText:'No'
//    }).then((result) => {
//        if (result.isConfirmed) {
//            Swal.fire({
//                title:'Eliminado',
//                icon: 'success',
//                text: 'el dato se ha eliminado con éxito'
//            })
//        }
//    })
//
//})

function alerta(){ 
    Swal.fire({title:"¡Listo!", text:"El dato fue agregado correctamente.", icon:"success", confirmButtonText:"OK", timer:3000 })
}

const agregarDato = ()=>{
    let form = document.forms['form'];
    let tipo = form['tipo'];
    let descripcion = form['descripcion']; 
    let valor = form['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarHeader();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarHeader();
            cargarEgresos();
        }
        return alerta()
    }
    
}
//local storage
const guardarDatosJSON = ()=>{
    const datosForm = {descripcion:"", tipo:"", valor:0}
        datosForm.descripcion = descripcion.value;
        datosForm.tipo = tipo.value;
        datosForm.valor = valor.value;
        localStorage.setItem("datosForm", JSON.stringify(datosForm))
}
const guardarDatos = document.getElementById('guardar')


guardarDatos.addEventListener("click", guardarDatosJSON)


const recuperarDatosJSON = ()=> {
    if (localStorage.getItem("datosForm") != null)
    {
        datosForm = JSON.parse(localStorage.getItem("datosForm"))
        descripcion.value = datosForm.descripcion
        tipo.value = datosForm.tipo
        valor.value = datosForm.value
    }
}
recuperarDatosJSON ()

//CONVERSOR DE DIVISA 
const select = document.querySelectorAll("form-select");//si no intentar por name: currency
const number = document.getElementById("number");
const output = document.getElementById("inputState");

fetch('').then((data))
