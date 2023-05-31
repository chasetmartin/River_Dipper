<script lang="ts">
    import { browser } from '$app/environment';
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';
  
 
    export let stream: any;
    const data2 = stream.values[0].value;
  
    const values = data2.map(({ value }: { value: string }) => parseInt(value));
    const maxValue = Math.max(...values);
    const suggestedMax = maxValue + maxValue * 0.05;
  
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
  
    let originalData = data2;
    let lineChartElement: HTMLCanvasElement;
  
    function getRecentSevenDaysData() {
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 6); // Get the date 6 days ago
  
      return originalData.filter(({ dateTime }: { dateTime: string }) => {
        const date = new Date(dateTime);
        return date >= sevenDaysAgo && date <= currentDate;
      });
    }

    let isgraphMobile = false;
    let mobilexrotation = 45;
    let mobileticknumber = 8;
    function checkgraphMobile() {
    isgraphMobile = window.innerWidth < 1024; // Adjust the breakpoint as needed
    }

 
    $: mobilexrotation = isgraphMobile ? 90 : 45;
    $: aspectgraphRatio = isgraphMobile ? 0.75 : 1.3;
    $: mobileticknumber = isgraphMobile ? 2 : 8;
  
    let chartData = {
      labels: originalData.map(({ dateTime }: { dateTime: string }) => formatDateTime(dateTime)),
      datasets: [
        {
          type: 'bar',
          label: 'CFS',
          data: originalData.map(({ value }: { value: string }) => parseInt(value)),
          backgroundColor: 'rgba(68, 111, 167, 0.4)',
          borderColor: '#446FA7',
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 'flex',
        },
        {
          type: 'line',
          label: 'CFS',
          data: originalData.map(({ value }: { value: string }) => parseInt(value)),
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
        checkgraphMobile();

      if (browser) {
        const { default: zoomPlugin } = await import('chartjs-plugin-zoom');
  
        Chart.register(...registerables);
        Chart.register(zoomPlugin);
  
        new Chart(lineChartElement, {
          type: 'bar',
          data: chartData,
          options: {
            aspectRatio: aspectgraphRatio,
            // animation: false,
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
                            minRotation: mobilexrotation,
                            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                            callback: function(val, index) {
                                // Hide every 2nd tick label
                                return index % mobileticknumber === 0 ? this.getLabelForValue(val) : '';
                            },
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

    function updateChartData() {
    if (browser) {
      if (timeframe === '7-days') {
        const recentData = getRecentSevenDaysData();
        chartData = {
          labels: recentData.map(({ dateTime }: { dateTime: string }) => formatDateTime(dateTime)),
          datasets: [
            // ... Bar and line dataset configurations ...
            {
              type: 'bar',
              label: 'CFS',
              data: recentData.map(({ value }: { value: string }) => parseInt(value)),
              backgroundColor: 'rgba(68, 111, 167, 0.4)',
              borderColor: '#446FA7',
              barPercentage: 1,
              categoryPercentage: 1,
              barThickness: 'flex',
            },
            {
              type: 'line',
              label: 'CFS',
              data: recentData.map(({ value }: { value: string }) => parseInt(value)),
              backgroundColor: 'transparent',
              borderColor: '#446FA7',
              fill: false,
              line: {
                tension: 0.8,
              },
            },
          ],
        };
      } else {
        chartData = {
          labels: originalData.map(({ dateTime }: { dateTime: string }) => formatDateTime(dateTime)),
          datasets: [
            // ... Bar and line dataset configurations ...
            {
              type: 'bar',
              label: 'CFS',
              data: originalData.map(({ value }: { value: string }) => parseInt(value)),
              backgroundColor: 'rgba(68, 111, 167, 0.4)',
              borderColor: '#446FA7',
              barPercentage: 1,
              categoryPercentage: 1,
              barThickness: 'flex',
            },
            {
              type: 'line',
              label: 'CFS',
              data: originalData.map(({ value }: { value: string }) => parseInt(value)),
              backgroundColor: 'transparent',
              borderColor: '#446FA7',
              fill: false,
              line: {
                tension: 0.8,
              },
            },
          ],
        };
      }

      const chart = Chart.getChart(lineChartElement);
      if (chart) {
        chart.data = chartData;
        chart.update();
      }
    }
  }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0
        })

    let timeframe = '7-days';

    function section(selectedTimeframe: string) {
        timeframe = selectedTimeframe;
        updateChartData();
    }

    function resetZoomChart() {
      const chart = Chart.getChart(lineChartElement);
      if (chart) {
        chart.resetZoom();
      }
    }

  </script>
  
  <div class="container">
    <div class="w-full text-token grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div class="container flex pb-2">
            <h6 class="pr-2">Current Flow: </h6> 
            <h6 class="badge variant-filled-warning">{formatter.format(stream.values[0].value.slice(-1)[0].value)} CFS</h6>
        </div>
        <div class="container flex pb-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span class="chip variant-filled-primary" on:click={resetZoomChart}>Reset Zoom</span>
        </div>
        <div class="container flex pb-2">
            <p class="pr-2">Timeframe: </p>
            {#each ['7-days'] as c}
                <span
                    class="chip {timeframe === c ? 'variant-filled-primary' : 'variant-filled'}"
                    on:click={() => { section(c); }}
                    on:keypress
                >
                    {#if timeframe === c}<span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M20 6L9 17l-5-5"></path></svg></span>{/if}
                    <span>{c}</span>
                </span>
            {/each}
        </div>
    </div>

    <div class="pt-6 bg-slate-200 p-2 rounded-md">
      <canvas class="tooltip" bind:this={lineChartElement} />
    </div>
  </div>
  
  <style>
    .tooltip {
      cursor: crosshair;
    }
  </style>