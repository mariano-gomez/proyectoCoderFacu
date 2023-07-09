//Desafio 2  - Castellano Facundo.
//El archivo prueba.json contiene elementos de prueba, por lo que se lo debe descargar si se quiere probar según los comentarios de mas abajo.

const fs = require("fs");
const path = require("path");

class ChartManager {
  constructor(fileNameDB) {
    this.charts = [];
    this.currentId = 0;
    this.path = path.join(__dirname, "..", "data", fileNameDB); // se debe poner de forma correcta y completa al momento de inicializar la clase.

    this.getSavedCharts = async function () {
      if (fs.existsSync(this.path)) {
        const allChartsFile = fs.readFileSync(this.path);
        this.charts = JSON.parse(allChartsFile);
        this.currentId = this.charts[this.charts.length - 1].id;
      }
    };
    this.getSavedCharts();
  }

  async addChart(CarritoNuevo) {
    const { products } = CarritoNuevo;
    this.currentId += 1;
    const chartToAdd = {};
    chartToAdd.products = products;
    chartToAdd.id = this.currentId;

    this.charts.push(chartToAdd);

    //si lo creo lo guarod en el archivo
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify(this.charts));
    } else {
      const allChartsFile = fs.readFileSync(this.path);
      const allChartssAsArray = JSON.parse(allChartsFile);
      allChartssAsArray.push(chartToAdd);
      fs.writeFileSync(this.path, JSON.stringify(allChartssAsArray));
    }
  }

  getCharts() {
    return this.charts;
  }

  // el metodo getChartById, retorna el carrito (es decir no es que lo muestre por pantalla.)
  getChartById(idFounded) {
    for (let chart of this.charts) {
      if (chart.id === idFounded) {
        //decido usar el operador de comparacion estricto, por lo que se espera recibir un tipo Number, no un string.
        return chart;
      }
    }
    throw new Error("Not found");
  }

  deleteChartByID(chartId) {
    try {
      const chartToDelete = this.getChartById(chartId);
      const index = this.charts.indexOf(chartToDelete);
      this.charts.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.charts));
    } catch (err) {
      throw err;
    }
  }

  addProductToChart(chartId, product) {
    try {
      const chart = this.getChartById(chartId)
      chart.products.push(product);
      const index = this.charts.indexOf(chart);
      this.charts.splice(index, 1, chart);
      fs.writeFileSync(this.path, JSON.stringify(this.charts));
      return
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  ChartManager,
};
