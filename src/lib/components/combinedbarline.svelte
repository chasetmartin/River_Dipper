<script lang="ts">
    import { browser } from '$app/environment';
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';
    
    let lineChartElement: HTMLCanvasElement;
    
    export let stream: any;
    const data2 = stream.values[0].value;
    
    const values = data2.map(({ value }: { value: string }) => parseInt(value));
    const maxValue = Math.max(...values);
    const suggestedMax = maxValue + maxValue * 0.04;
    
    const formatDateTime = (dateTime: string | number | Date) => {
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
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
    labels: data2.map(({ dateTime }: { dateTime: string }) => formatDateTime(dateTime)),
    datasets: [
        {
        type: 'bar',
        label: 'CFS',
        data: data2.map(({ value }: { value: string }) => parseInt(value)),
        backgroundColor: 'rgba(68, 111, 167, 0.4)',
        borderColor: '#446FA7',
        barPercentage: 1,
        categoryPercentage: 1,
        barThickness: 'flex',
        },
        {
        type: 'line',
        label: 'CFS',
        data: data2.map(({ value }: { value: string }) => parseInt(value)),
        backgroundColor: 'transparent',
        borderColor: '#446FA7',
        fill: false,
        line: {
            tension: 0.8,
        },
        },
    ],
    };
    
    onMount(async () => {
      if (browser) {
        const { default: zoomPlugin } = await import('chartjs-plugin-zoom');
    
        Chart.register(...registerables);
        Chart.register(zoomPlugin);
    
        new Chart(lineChartElement, {
          type: 'bar',
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
                                backgroundColor: 'rgba(48, 56, 74,0.5)',
                                borderColor: 'rgba(48, 56, 74,0.5)',
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: 'x',
                //             onZoom: ({ chart }: { chart: Chart }) => {
                //                 const { minIndex, maxIndex } = chart.scales.x as any;
                //                 const tickFrequency = 7;

                //                 // Update the x-axis tick labels
                //                 chart.options.scales.x.ticks.callback = (value: string, index: number, values: string[]) => {
                //                 if (index % tickFrequency === 0 && index >= minIndex && index <= maxIndex) {
                //                     return formatDate(index);
                //                 }
                //                 return '';
                //                 };

                //                 chart.update();
                //         },
                    },
                },
            },
                elements: {
                    point: {
                        radius: 2,
                    },
                },
                scales: {
                    x: {
                        grid: {
                                display: false,
                            },
                        ticks: {
                            display: true,
                            align: 'start',
                            color: '#000000',
                            minRotation: 45,
                            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                            callback: function(val, index) {
                                // Hide every 2nd tick label
                                return index % 3 === 0 ? this.getLabelForValue(val) : '';
                            },
                        // callback: (value, index, values) => {
                        //     // Show label for every nth tick
                        //     if (index % 7 === 0) {
                        //     return formatDate(index);
                        //     }
                        //     return '';
                        // },
                        },
                    },
                    y: {
                        beginAtZero: true,
                        suggestedMax: suggestedMax,
                        ticks: { color: '#000000'},
                        title: {
                            display: true,
                            text: 'CFS',
                            color: '#000000',
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
        <div class="container items-center justify-center flex pb-2">
            <p class="pr-4">Zoom with scroll wheel or click and drag!</p>
            <button class="btn-sm variant-filled" on:click={resetZoomChart}>Reset Zoom</button>
        </div>
        <div class="pt-6 bg-slate-200 p-2 rounded-md">
        <canvas class="tooltip" bind:this={lineChartElement} />
        </div>    
      </div>
      <div class="container">
      </div>
       
      <style>
        .tooltip {
          cursor: crosshair;
        }
      </style>