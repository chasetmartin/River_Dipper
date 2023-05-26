<script lang="ts">
import { browser } from '$app/environment';
import { Chart, registerables } from 'chart.js';
import { onMount } from 'svelte';

let lineChartElement: HTMLCanvasElement;

export let stream: any;
const data2 = stream.values[0].value;

const values = data2.map(({ value }: { value: string }) => parseInt(value));
const maxValue = Math.max(...values);
const suggestedMax = maxValue + maxValue * 0.05;

const formatDateTime = (dateTime: string | number | Date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', options);
};

const formatDate = (index: number) => {
  const dateTime = chartData.labels[index];
  const date = formatDateTime(dateTime);
  const parts = date.split(', ');
  return parts[0];
};

const chartData = {
  labels: data2.map(({ dateTime }: {dateTime: string }) => formatDateTime(dateTime)),
  datasets: [
    {
      label: 'CFS',
      data: data2.map(({ value }: {value: string}) => parseInt(value)),
      backgroundColor: ['#f90404'],
      borderColor: ['#f90404'],
      fill: false,
    },
  ],
};

onMount(async () => {
  if (browser) {
    const { default: zoomPlugin } = await import('chartjs-plugin-zoom');

    Chart.register(...registerables);
    Chart.register(zoomPlugin);

    new Chart(lineChartElement, {
      type: 'line',
      data: chartData,
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            intersect: false,
            caretSize: 10,
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              drag: {
                enabled: true,
                borderWidth: 2,
              },
              pinch: {
                enabled: true,
              },
              mode: 'x',
            },
          },
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            borderWidth: 6,
            tension: 0.2,
          },
        },
        scales: {
          x: {
            grid: {
              color: '#D1D5DF',
            },
            ticks: {
              color: '#000000',
              maxTicksLimit: 7,
              font: { size: 14 },
              callback: function (value, index, values) {
                return formatDate(index);
              },
              padding: 10,
            },
          },
          y: {
            beginAtZero: true,
            suggestedMax: suggestedMax,
            ticks: { color: '#000000', font: { size: 16 } },
            grid: {
              color: '#D1D5DF',
            },
            title: {
              display: true,
              text: 'Cubic Feet per Second',
              color: '#000000',
              font: { size: 18 },
            },
          },
        },
      },
    });
  }
});

function resetZoomChart() {
  const chart = Chart.getChart(lineChartElement);
  if (chart) {
    chart.resetZoom();
  }
}


  </script>
  
  <div class="container">
    <canvas class="tooltip" bind:this={lineChartElement} />
    <button class="btn-sm variant-filled" on:click={resetZoomChart}>Reset Zoom</button>

  </div>
  <div class="container">
  </div>
   
  <style>
    .tooltip {
      cursor: crosshair;
    }
  </style>
  
  
  
  
  