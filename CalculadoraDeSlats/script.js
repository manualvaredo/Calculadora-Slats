function calcularPlacas() {
    const tipoPlaca = document.getElementById("tipoPlaca").value;
    const anchoRecinto = parseFloat(document.getElementById("anchoRecinto").value);
    const largoRecinto = parseFloat(document.getElementById("largoRecinto").value);

    let areaPlaca, anchoPlaca, largoPlaca, vigas, columnas;

    if (tipoPlaca === "SSHD200") {
        areaPlaca = 0.66;
        anchoPlaca = 2;
        largoPlaca = 0.33;
        vigas = ((anchoRecinto / 2) + 1) * (largoRecinto / 2);
        columnas = vigas + Math.ceil(anchoRecinto / 2 + 1);
    } else if (tipoPlaca === "SSHD250") {
        areaPlaca = 1.25;
        anchoPlaca = 2.5;
        largoPlaca = 0.5;
        vigas = ((anchoRecinto / 2.5) + 1) * (largoRecinto / 2);
        columnas = vigas + Math.ceil(anchoRecinto / 2 + 1);
    }

    const areaRecinto = anchoRecinto * largoRecinto;
    const cantidadPlacas = Math.ceil(areaRecinto / areaPlaca);

    const resultado = `
        <p>PLACAS ${tipoPlaca}: ${cantidadPlacas}</p>
        <p>VIGAS VSHC160: ${Math.ceil(vigas)}</p>
        <p>COLUMNAS CRHE250: ${Math.ceil(columnas)}</p>
    `;
    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("tipoPlacaSeleccionado").innerText = tipoPlaca;

    dibujarEsquema(anchoRecinto, largoRecinto, anchoPlaca, largoPlaca);
}

function dibujarEsquema(anchoRecinto, largoRecinto, anchoPlaca, largoPlaca) {
    const canvas = document.getElementById("esquemaCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 20;
    const escala = Math.min((canvas.width - padding * 2) / anchoRecinto, (canvas.height - padding * 2) / largoRecinto);
    const offsetX = (canvas.width - anchoRecinto * escala) / 2;
    const offsetY = (canvas.height - largoRecinto * escala) / 2;

    ctx.beginPath();
    ctx.rect(offsetX, offsetY, anchoRecinto * escala, largoRecinto * escala);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "12px Arial";
    ctx.fillStyle = "#000";

    // Cotas del recinto
    ctx.fillText(`${anchoRecinto} m`, offsetX + (anchoRecinto * escala) / 2 - 15, offsetY - 10);
    ctx.fillText(`${largoRecinto} m`, offsetX - 30, offsetY + (largoRecinto * escala) / 2);

    let x = offsetX;
    let y = offsetY;
    for (let i = 0; i < Math.ceil(largoRecinto / largoPlaca); i++) {
        for (let j = 0; j < Math.ceil(anchoRecinto / anchoPlaca); j++) {
            ctx.beginPath();
            ctx.rect(x, y, anchoPlaca * escala, largoPlaca * escala);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
            ctx.stroke();
            x += anchoPlaca * escala;
        }
        x = offsetX;
        y += largoPlaca * escala;
    }
}







