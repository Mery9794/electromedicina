import { Component, Input, OnInit } from '@angular/core';
import { Metrica, UserPaciente } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { FavService } from '../fav.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-signos-vitales',
  templateUrl: './signos-vitales.component.html',
  styleUrls: ['./signos-vitales.component.css']
})
export class SignosVitalesComponent implements OnInit {
  @Input() paciente: UserPaciente | undefined;
  historialClinico: Metrica[] = [];
  loading: boolean = true;
  selectedIcon: string = 'Temperatura'; // Icono seleccionado por defecto
  currentTemperature: number | string | undefined;
  currentPressure: number | string | undefined;
  currentOxygen: number | string | undefined;
  days: string[] = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
  currentDate: Date = new Date(); // Var para almacenar la fecha actual
  currentIndex: number = 0; // Índice actual para el carrusel
  showChart: boolean = false;
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };
  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartLegend = true;
  chartType: ChartType = 'line'; // Definir el tipo de gráfico

  constructor(private route: ActivatedRoute, private favService: FavService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pacienteId = +params['id']; // Convertir el parámetro a número
      this.loadPaciente(pacienteId);
      this.loadHistorialClinico(pacienteId);
    });
  }

  loadPaciente(id: number): void {
    this.favService.getPacienteById(id).subscribe(paciente => {
      if (paciente) {
        this.paciente = paciente;

        // Inicializar las métricas si aún no están definidas
        if (!this.paciente.metricas) {
          this.paciente.metricas = [];
        }
      }
    });
  }

  loadHistorialClinico(idPaciente: number): void {
    this.favService.getHistorialClinico(idPaciente).subscribe(historial => {
      if (historial && historial.length > 0) {
        this.historialClinico = historial;
        this.loading = false;

        this.updateCurrentMetrics();
        // Obtener la última métrica tomada
        const ultimaMetrica = historial[historial.length - 1];

        // Actualizar los valores de las métricas actuales solo para la sección correspondiente
        switch (ultimaMetrica.signoVital) {
          case 'Temperatura':
            this.currentTemperature = parseFloat(ultimaMetrica.valor);
            break;
          case 'Presión Arterial':
            this.currentPressure = parseFloat(ultimaMetrica.valor);
            break;
          case 'Oxigeno':
            this.currentOxygen = parseFloat(ultimaMetrica.valor);
            break;
          default:
            break;
        }
      }
    });
  }

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
    this.updateCurrentMetrics();
    if (this.showChart) {
      this.loadChart(icon);
    }
  }

  getButtonClass(icon: string): string {
    if (this.historialClinico.length === 0) {
      return 'no-data'; // Si no hay datos, se aplica una clase específica
    }

    let metrica: Metrica | undefined = this.historialClinico[this.historialClinico.length - 1]; // Última métrica
    let valor: number | undefined = undefined;

    switch (icon) {
      case 'Temperatura':
        valor = parseFloat(metrica?.valor || '0');
        break;
      case 'Presión Arterial':
        valor = parseFloat(metrica?.valor || '0');
        break;
      case 'Oxigeno':
        valor = parseFloat(metrica?.valor || '0');
        break;
      default:
        break;
    }

    if (isNaN(valor!)) {
      return 'no-data';
    } else if (valor! < 36 || valor! > 37.5) {
      return 'danger';
    } else if (valor! < 37) {
      return 'warning-low';
    } else {
      return 'normal';
    }
  }

  getMetricValue(day: string, metricType: string): number | string {
    const metrica = this.historialClinico
      .filter(m => {
        const date = new Date(m.fecha);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
        return dayName === day && m.signoVital === metricType;
      })
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]; // Ordenar y tomar la más reciente

    if (metrica && !isNaN(parseFloat(metrica.valor))) {
      return parseFloat(metrica.valor);
    }
    return 'N/A';
  }

  updateCurrentMetrics(): void {
    this.currentTemperature = this.getMetricValue(this.getCurrentDay(), 'Temperatura');
    this.currentPressure = this.getMetricValue(this.getCurrentDay(), 'Presión Arterial');
    this.currentOxygen = this.getMetricValue(this.getCurrentDay(), 'Oxigeno');
  }

  getCurrentDay(): string {
    const options = { weekday: 'short' } as const;
    return this.currentDate.toLocaleDateString('es-ES', options).toUpperCase();
  }

  prevDay(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  nextDay(): void {
    if (this.currentIndex < this.days.length - 3) {
      this.currentIndex += 1;
    }
  }

  loadChart(metricType: string): void {
    this.showChart = true;
    const data = this.historialClinico
      .filter(m => m.signoVital === metricType)
      .map(m => ({
        x: new Date(m.fecha).toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase(),
        y: parseFloat(m.valor)
      }));

    this.chartData = {
      labels: data.map(d => d.x),
      datasets: [{
        data: data.map(d => d.y),
        label: metricType
      }]
    };
  }

  toggleChart(): void {
    if (this.showChart) {
      this.showChart = false;
    } else {
      this.loadChart(this.selectedIcon);
    }
  }
}

